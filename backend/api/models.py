from django.conf import settings
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)

# =======================
# Custom User Manager
# =======================


class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        """Create and return a regular user with an email and password."""
        if not email:
            raise ValueError("Email must be provided")
        if not username:
            raise ValueError("Username must be provided")
        if not password:
            raise ValueError("Password must be provided")  # Optional addition

        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None):
        """Create and return a superuser with the given email and password."""
        user = self.create_user(email=email, username=username, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


# =======================
# Custom User Model
# =======================


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=20, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.username


# =======================
# Note Model
# =======================


class Note(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="notes",
        null=True,
    )
    expense = models.ForeignKey(
        "Expense",
        on_delete=models.CASCADE,
        related_name="notes",
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.title


# =======================
# Expenses Model
# =======================


class Expense(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="expenses",
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.content
