from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import RiskViewSet,ControlViewSet,AssetViewSet,DomainViewSet, PerimeterViewSet,UserViewSet, dashboard_overview
# from .views import control_summary


router = DefaultRouter()
router.register(r'risks', RiskViewSet, basename='risk')
router.register(r'controls', ControlViewSet, basename='control')
router.register(r'assets', AssetViewSet, basename='asset')
router.register(r'domains', DomainViewSet, basename='domain')
router.register(r'perimeters', PerimeterViewSet, basename='perimeter')
router.register(r'User', UserViewSet, basename='User')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', dashboard_overview),
    # path("api/controls/summary/", control_summary, name="control-summary"),
]


