from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Note, Expense


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("email", "is_staff", "is_active")
    search_fields = ("email",)
    ordering = ("email",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login",)}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )
    filter_horizontal = ("groups", "user_permissions")


# Register CustomUser model with CustomUserAdmin
admin.site.register(CustomUser, CustomUserAdmin)

# Register Note model as well
admin.site.register(Note)

# Resgiter Expense model as well
admin.site.register(Expense)
