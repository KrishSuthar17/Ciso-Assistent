from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from django.db.models import Sum
from .models import Risk, Control, Asset, Audit, Domain, perimeter, User, UserGroup
from django.db.models import Sum, Count, Case, When, IntegerField, Q

from .serializers import PerimeterSerializer, RiskSerializer, ControlSerializer, AssetSerializer, AuditSerializer, DomainSerializer, UserSerializer, UserGroupSerializer


# --- CRUD APIs (DRF ViewSets handle add/edit/delete/list) ---
class RiskViewSet(viewsets.ModelViewSet):
    queryset = Risk.objects.all()
    serializer_class = RiskSerializer


class ControlViewSet(viewsets.ModelViewSet):
    queryset = Control.objects.all()
    serializer_class = ControlSerializer


class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer


class AuditViewSet(viewsets.ModelViewSet):
    queryset = Audit.objects.all()
    serializer_class = AuditSerializer


# organization

class DomainViewSet(viewsets.ModelViewSet):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PerimeterViewSet(viewsets.ModelViewSet):
    queryset = perimeter.objects.all()
    serializer_class = PerimeterSerializer


class UserGroupViewSet(viewsets.ModelViewSet):
    queryset = UserGroup.objects.all()
    serializer_class = UserGroupSerializer


# --- Custom API for Dashboard Overview ---
@api_view(['GET'])
def dashboard_overview(request):
    # --- Controls Aggregation (Single Query) ---
    controls_agg = Control.objects.aggregate(
        total=Count('id'),
        active=Count('id', filter=Q(status="active")),
        deprecated=Count('id', filter=Q(status="deprecated")),
        todo=Count('id', filter=Q(status="todo")),
        in_progress=Count('id', filter=Q(status="in progress")),
        on_hold=Count('id', filter=Q(status="on hold")),
        pending_p1=Count('id', filter=Q(priority="P1")),
        missed_eta=Count('id', filter=Q(status="missed")),
    )

    # --- Latest 5 Audits ---
    latest_audits = Audit.objects.order_by('-updated_at')[:5]
    audits_data = [
        {
            "name": audit.name,
            "notAssessed": audit.not_assessed,
            "partial": audit.partial,
            "nonCompliant": audit.non_compliant,
            "compliant": audit.compliant,
            "notApplicable": audit.not_applicable,
        }
        for audit in latest_audits
    ]

    # --- Risks Aggregation (Boolean fields converted to integers) ---
    risks_agg = Risk.objects.aggregate(
        assessments=Count('id'),
        accepted=Sum(
            Case(When(risk_accepted=True, then=1), default=0, output_field=IntegerField())
        ),
        scenarios=Sum(
            Case(When(risk_scenarios=True, then=1), default=0, output_field=IntegerField())
        ),
        mapped_threats=Sum(
            Case(When(risk_mapped_threats=True, then=1), default=0, output_field=IntegerField())
        ),
    )

    # --- Dashboard Response ---
    data = {
        "controls": controls_agg,
        "audits": audits_data,
        "compliance": {
            "frameworks": 4,  # static, adjust if needed
            "active_audits": f"0/{Audit.objects.count()}",
            "progress": "68%",  # static, adjust if needed
            "non_compliant_items": 42,  # static, adjust if needed
            "evidences": 5,  # static, adjust if needed
        },
        "risks": risks_agg,
        "charts": {
            "current_risks": [
                {"name": "High", "value": 3, "color": "#f87171"},
                {"name": "Medium", "value": 5, "color": "#facc15"},
                {"name": "Low", "value": 7, "color": "#4ade80"},
            ],
            "residual_risks": [
                {"name": "High", "value": 2, "color": "#f87171"},
                {"name": "Medium", "value": 6, "color": "#facc15"},
                {"name": "Low", "value": 10, "color": "#4ade80"},
            ],
        },
    }

    return Response(data)



# organization 
# @api_view(['Get'])
