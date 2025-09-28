from rest_framework import serializers
from .models import Control, Asset, Risk, Audit, Domain, perimeter, User

class ControlSerializer(serializers.ModelSerializer):
    class Meta:
        model = Control
        fields = '__all__'

class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = '__all__'

class RiskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Risk
        fields = '__all__'

class AuditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audit
        fields = '__all__'


# organization serializer
class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = '__all__'

class PerimeterSerializer(serializers.ModelSerializer):
    class Meta:
        model = perimeter
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'