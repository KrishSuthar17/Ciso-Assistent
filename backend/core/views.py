from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Risk,Control,Asset
from .serializers import ControlSerializer, AssetSerializer, RiskSerializer
from rest_framework import viewsets


class RiskViewSet(viewsets.ModelViewSet):
    queryset = Risk.objects.all()
    serializer_class = RiskSerializer

class ControlViewSet(viewsets.ModelViewSet):
    queryset = Control.objects.all()
    serializer_class = ControlSerializer

class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer

from .models import Risk, Control, Asset

@api_view(['GET'])
def dashboard_overview(request):
    total_controls = Control.objects.count()
    completed_controls = Control.objects.filter(status="Complete").count()

    total_risks = Risk.objects.count()
    completed_risks = Risk.objects.filter(status="Complete").count()
    active_risks = Risk.objects.filter(status="Active").count()

    total_assets = Asset.objects.count()
    critical_assets = Asset.objects.filter(critical=True).count()

    data = {
        "total_controls": total_controls,
        "completed_controls": completed_controls,
        "total_risks": total_risks,
        "active_risks": active_risks,
        "completed_risks": completed_risks,
        "total_assets": total_assets,
        "critical_assets": critical_assets,
        # Simple example for "last month diff" (for demo we just put random/static numbers, 
        # later we can implement timestamp filtering)
        "diff": {
            "controls": +12,
            "risks": -5,
            "completed": +23,
            "assets": +7
        }
    }
    return Response(data)






@api_view(['GET'])
def risk_list(request):
    risks = Risk.objects.all()
    serializer = RiskSerializer(risks, many=True)
    return Response(serializer.data)

