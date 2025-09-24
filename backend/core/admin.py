from django.contrib import admin
from .models import Risk, Asset, Audit, Control, Domain

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