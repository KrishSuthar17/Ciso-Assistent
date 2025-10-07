from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Risk, Asset, Audit, Control, Domain, perimeter, User, UserGroup

@admin.register(Risk)
class RiskAdmin(admin.ModelAdmin):
    list_display = ("risk_assessments", "risk_scenarios", "risk_mapped_threats", "risk_accepted")



@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "critical")
    search_fields = ("name",)

@admin.register(Audit)
class AuditAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "status", "progress", "framework")
    list_filter = ("status", "framework")
    search_fields = ("name",)

@admin.register(Control)
class ControlAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "status")  # ✅ only actual model fields
    search_fields = ("name", "status")
    list_filter = ("status",)

@admin.register(Domain)
class DomainAdmin(admin.ModelAdmin):
    list_display=('name','description')
    search_fields=("name",)

@admin.register(perimeter)
class perimeterAdmin(admin.ModelAdmin):
    list_display = ('name', 'default_asigned', 'status')
    search_fields = ('name', 'default_asigned__email')

@admin.register(UserGroup)
class UserGroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'created_at', 'updated_at')
    search_fields = ('name',)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    ordering = ('email',)
    list_display = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser', 'user_group')
    search_fields = ('email', 'first_name', 'last_name')
    readonly_fields = ('last_login', 'created_at', 'updated_at')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'date_of_joining', 'expired_date', 'observation')}),
        ('Organization', {'fields': ('user_group',)}),
        ('Security', {'fields': ('mfa_enabled', 'exclude_from_force_sso', 'is_third_party')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'created_at', 'updated_at')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2', 'is_staff', 'is_superuser', 'is_active', 'user_group'),
        }),
    )

