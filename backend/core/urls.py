from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import RiskViewSet,ControlViewSet,AssetViewSet,DomainViewSet
# from .views import control_summary

from .views import dashboard_overview

router = DefaultRouter()
router.register(r'risks', RiskViewSet, basename='risk')
router.register(r'controls', ControlViewSet, basename='control')
router.register(r'assets', AssetViewSet, basename='asset')
router.register(r'Domain', DomainViewSet, basename='Domain')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', dashboard_overview),
    # path("api/controls/summary/", control_summary, name="control-summary"),
]


