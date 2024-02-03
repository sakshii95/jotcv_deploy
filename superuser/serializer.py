from rest_framework.serializers import ModelSerializer, ValidationError,SerializerMethodField, ReadOnlyField, CharField
from .models import *
from accounts.models import User
from wallet.models import UserSubscription
import logging
db_logger = logging.getLogger('db') 

class CategorySerializer(ModelSerializer):
    sub_category_count = SerializerMethodField(read_only = True)
    class Meta:
        model = Category
        exclude = ('created_by','created_on','updated_on','is_active' )
    def get_sub_category_count(self,category):
        try:
            return category.subcategories.all().count()
        except:
            return 0

class SubCategoriesSerializer(ModelSerializer):
    category = CategorySerializer(read_only=True)
    class Meta:
        model = SubCategories
        exclude = ('created_by','created_on','updated_on','is_active' )


class SectionSerializer(ModelSerializer):
    class Meta:
        model = Section
        exclude = ('created_at','updated_at','is_active' )

class FeatureSerializer(ModelSerializer):
    class Meta:
        model = Features
        fields = ('id', 'title', 'updated_on')

class SubscriptionSerializer(ModelSerializer):
    features = FeatureSerializer(many=True, read_only=False)

    class Meta:
        model = Subscription
        fields = '__all__'

class UserSubscriptionSerializer(ModelSerializer):
    subscription = SubscriptionSerializer()

    class Meta:
        model = UserSubscription
        fields = '__all__'


class SubscriptionSerializer(ModelSerializer):
    features = SerializerMethodField(read_only = True)
    activation = SerializerMethodField(read_only = True)
    amount = CharField(source='amount.amount', read_only=True)
    currency = CharField(source='amount.currency.code', read_only=True)
    class Meta:
        model = Subscription
        exclude = ('created_on','updated_on','is_active' )
    def get_features(self,subscription):
        try:
            features = subscription.features.all().values_list("title", flat=True)
            return features
        except:
            return None
    def get_activation(self,subscription):
        request = self.context.get("request")
        data = {}
        try:
            
            plan = request.user.user_subscription.filter(is_active=True,subscription_id=subscription.id).last()
            data ["activated"]=True
            data["expiry"]=plan.expiring_on
            return data
        except:
            return None


# class SubscriptionEditSerializer(ModelSerializer):
#     features = FeatureSerializer(many=True, required=False)

#     class Meta:
#         model = Subscription
#         exclude = ('created_on', 'updated_on', 'is_active')

#     def update(self, instance, validated_data):
#         instance.title = validated_data.get('title', instance.title)
#         instance.amount = validated_data.get('amount', instance.amount)
#         instance.description = validated_data.get('description', instance.description)
#         instance.months = validated_data.get('months', instance.months)
#         instance.days = validated_data.get('days', instance.days)
#         instance.save()

#         features_data = validated_data.get('features', None)

#         if features_data is not None:
#             instance.features.clear()
#             feature_serializer = FeatureSerializer(data=features_data, many=True)

#             if feature_serializer.is_valid():
#                 feature_serializer.save()
#             else:
#                 raise ValidationError(feature_serializer.errors)

#         return instance

# serializers.py

# serializers.py

# serializers.py

class SubscriptionUpdateSerializer(ModelSerializer):
    features = FeatureSerializer(many=True, required=False)

    class Meta:
        model = Subscription
        fields = ('id', 'title', 'amount', 'description', 'features', 'is_active', 'months', 'days', 'updated_on')
    def update(self, instance, validated_data):
        features_data = self.context.get('features', [])

        instance.title = validated_data.get('title', instance.title)
        instance.amount = validated_data.get('amount', instance.amount)
        instance.description = validated_data.get('description', instance.description)
        instance.months = validated_data.get('months', instance.months)
        instance.days = validated_data.get('days', instance.days)
        instance.save()

        for feature_data in features_data:
            feature_id = feature_data.get('id')
            feature_title = feature_data.get('title')
            db_logger.info(f"inside - feature_id: {feature_id}, feature_title: {feature_title},{validated_data}")

            if feature_id:
                try:
                    db_logger.info("inside")

                    feature = Features.objects.get(id=feature_id)
                    feature.title = feature_title
                    feature.save()
                    instance.features.add(feature)  
                except Features.DoesNotExist:
                    continue
            else:
                db_logger.info("outside")
                feature = Features.objects.create(title=feature_title)
                instance.features.add(feature)  

        return instance



class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UsersSubscriptionsSerializer(ModelSerializer):
    class Meta:
        model = UserSubscription
        fields = ('title',)

class UsersSerializer(ModelSerializer):
    user_subscription = UserSubscriptionSerializer(many=True, read_only=True)
    profiles = SerializerMethodField(read_only = True)

    class Meta:
        model = User
        fields = '__all__'
    def get_profiles(self,user):
        try:
            return user.cv_profiles.all().count()
        except:
            return 0