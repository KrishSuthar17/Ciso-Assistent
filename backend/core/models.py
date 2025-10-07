# core/models.py
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)

class Risk(models.Model):
    risk_assessments = models.TextField(blank=True, null=True)
    risk_scenarios = models.TextField(blank=True, null=True)
    risk_mapped_threats = models.TextField(blank=True, null=True)
    risk_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)


class Control(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    category = models.CharField(max_length=255, blank=True, null=True)

    # 👇 Add a safe default for status
    status = models.CharField(
        max_length=50,
        choices=[
            ("active", "Active"),
            ("deprecated", "Deprecated"),
            ("todo", "To Do"),
            ("in progress", "In Progress"),
            ("on hold", "On Hold"),
            ("missed", "Missed ETA"),
        ],
        default="todo"  # ✅ Default so migration won’t get stuck
    )

    priority = models.CharField(
        max_length=10,
        choices=[("P1", "Priority 1"), ("P2", "Priority 2"), ("P3", "Priority 3")],
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name or "Unnamed Control"




class Asset(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    critical = models.BooleanField(default=False)  # make sure this line exists

    def __str__(self):
        return self.name

class Audit(models.Model):
    STATUS_CHOICES = [
        ("Not Assessed", "Not Assessed"),
        ("Partial", "Partial"),
        ("Non Compliant", "Non Compliant"),
        ("Compliant", "Compliant"),
        ("Not Applicable", "Not Applicable"),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    framework = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    progress = models.IntegerField(default=0)
    not_assessed = models.BooleanField(default=False)
    last_status = models.DateField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.status})"

    # Convenience boolean properties for templates / views that expect them
    # if i dont add this then i got error: AttributeError at /api/dashboard/'Audit' object has no attribute 'partial'
    @property
    def partial(self):
        return self.status == "Partial"

    @property
    def non_compliant(self):
        return self.status == "Non Compliant"

    @property
    def compliant(self):
        return self.status == "Compliant"

    @property
    def not_applicable(self):
        return self.status == "Not Applicable"
    


# organization model to represent organizational details

class Domain(models.Model):
    name = models.CharField(max_length=255,unique=True)
    description = models.TextField(blank=True,null=True)

    def __str__(self):
        return self.name

class perimeter(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True,null=True)
    domain = models.ForeignKey(Domain, on_delete=models.CASCADE, related_name='perimeters')

    id = models.AutoField(primary_key=True) # auto increment the id
    
    status = models.CharField(max_length=50, 
    choices=[
        ('design','design'),
        ('development','development'),
        ('production','production'),
        ('End of life','End of life'),
        ('Dropped','Dropped')
        ])
                        
    # default_asigned = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='default_perimeter')
    default_asigned = models.ForeignKey(
    'core.User',   # <-- string reference with app name
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name='default_perimeter')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    

# get data from forigen key for a department and may be role also

class UserGroup(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            # Set an unusable password if none provided
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_of_joining = models.DateTimeField(blank=True, null=True)
    user_group = models.ForeignKey(
        UserGroup, on_delete=models.SET_NULL, null=True, blank=True, related_name="users"
    )
    exclude_from_force_sso = models.BooleanField(default=False)
    is_third_party = models.BooleanField(default=False)
    observation = models.TextField(blank=True, null=True)
    mfa_enabled = models.BooleanField(default=False)
    expired_date = models.DateField(blank=True, null=True)

    # is_superuser comes from PermissionsMixin

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self):
        return self.email