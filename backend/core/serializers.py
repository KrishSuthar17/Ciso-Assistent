from rest_framework import serializers
from .models import Control, Asset, Risk, Audit, Domain, perimeter, User, UserGroup

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
    default_asigned = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        required=False,
        allow_null=True
    )
    default_asigned_email = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = perimeter
        fields = '__all__'

    def get_default_asigned_email(self, obj):
        return obj.default_asigned.email if obj.default_asigned else None

    


class UserGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGroup
        fields = ['id', 'name', 'description', 'created_at', 'updated_at']


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, allow_blank=False)
    user_group = serializers.PrimaryKeyRelatedField(
        queryset=UserGroup.objects.all(), allow_null=True, required=False
    )

    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff',
            'date_of_joining', 'user_group', 'exclude_from_force_sso',
            'is_third_party', 'observation', 'mfa_enabled', 'expired_date',
            'is_superuser', 'password', 'created_at', 'updated_at'
        ]
        read_only_fields = ('is_superuser', 'created_at', 'updated_at')

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance