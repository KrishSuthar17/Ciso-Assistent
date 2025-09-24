# core/models.py
from django.db import models

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