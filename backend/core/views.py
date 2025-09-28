from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from django.db.models import Sum
from .models import Risk, Control, Asset, Audit, Domain, perimeter, User

from .serializers import PerimeterSerializer, RiskSerializer, ControlSerializer, AssetSerializer, AuditSerializer, DomainSerializer, UserSerializer


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


# --- Custom API for Dashboard Overview ---
@api_view(['GET'])
def dashboard_overview(request):
    controls = Control.objects.all()
    audits = Audit.objects.order_by('-last_status')  # use last_status instead of updated_at
    risks = Risk.objects.all()

    data = {
        "controls": {
            "total": controls.count(),
            "active": controls.filter(status="active").count(),
            "deprecated": controls.filter(status="deprecated").count(),
            "todo": controls.filter(status="todo").count(),
            "in_progress": controls.filter(status="in progress").count(),
            "on_hold": controls.filter(status="on hold").count(),
            "pending_p1": controls.filter(priority="P1").count(),
            "missed_eta": controls.filter(status="missed").count(),
        },
        "audits": [
            {
                "name": audit.name,
                "notAssessed": audit.not_assessed,
                "partial": audit.partial,
                "nonCompliant": audit.non_compliant,
                "compliant": audit.compliant,
                "notApplicable": audit.not_applicable,
            }
            for audit in audits.order_by("-updated_at")[:5]
        ],
        "compliance": {
            "frameworks": 4,
            "active_audits": f"0/{audits.count()}",
            "progress": "68%",
            "non_compliant_items": 42,
            "evidences": 5,
        },
        "risks": {
            "assessments": risks.count(),
            "accepted": risks.aggregate(total=Sum("risk_accepted"))["total"] or 0,
            "scenarios": risks.aggregate(total=Sum("risk_scenarios"))["total"] or 0,
            "mapped_threats": risks.aggregate(total=Sum("risk_mapped_threats"))["total"] or 0,
        },
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
