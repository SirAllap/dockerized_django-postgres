from rest_framework import serializers
from .models import Note, Expense
from django.contrib.auth import get_user_model

CustomUser = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, required=True)

    class Meta:
        model = CustomUser
        fields = (
            "id",
            "email",
            "username",
            "password",
        )

    def create(self, validated_data):
        # Hash the password and create the user
        user = CustomUser(
            email=validated_data["email"], username=validated_data["username"]
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class ExpenseSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)

    class Meta:
        model = Expense
        fields = ("id", "amount", "content", "created_at", "author")
        extra_kwargs = {"author": {"read_only": True}}


class NoteSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)
    expense = serializers.PrimaryKeyRelatedField(
        queryset=Expense.objects.all(),
        write_only=True,
        required=False,
        allow_null=True,
    )
    expense_detail = ExpenseSerializer(source="expense", read_only=True)

    class Meta:
        model = Note
        fields = (
            "id",
            "title",
            "content",
            "created_at",
            "author",
            "expense",
            "expense_detail",
        )
        extra_kwargs = {
            "author": {"read_only": True},
        }
