from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

CustomUser = get_user_model()


class CreateUserViewTests(APITestCase):
    def setUp(self):
        # URL for creating a new user.
        self.create_user_url = reverse(
            "register"
        )  # Make sure this matches your URL name
        self.valid_user_data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "password123",
        }
        self.invalid_user_data_missing_email = {
            "username": "testuser",
            "password": "password123",  # Missing email field
        }
        self.invalid_user_data_existing_username = {
            "username": "testuser",  # Duplicate username
            "email": "newuser@example.com",
            "password": "password123",
        }
        self.invalid_user_data_existing_email = {
            "username": "newuser",
            "email": "testuser@example.com",  # Duplicate email
            "password": "password123",
        }

    def test_create_user_with_valid_data(self):
        """Test creating a user with valid data is successful"""
        response = self.client.post(
            self.create_user_url, self.valid_user_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CustomUser.objects.count(), 1)
        self.assertEqual(CustomUser.objects.get().username, "testuser")

    def test_create_user_with_missing_fields(self):
        """Test creating a user with missing fields fails"""
        response = self.client.post(
            self.create_user_url, self.invalid_user_data_missing_email, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)


def test_create_user_with_existing_username(self):
    """Test creating a user with an already taken username fails"""
    # Create an initial user
    CustomUser.objects.create_user(
        username="testuser", email="unique@example.com", password="password123"
    )

    # Try to create another user with the same username
    response = self.client.post(
        self.create_user_url,
        self.invalid_user_data_existing_username,
        format="json",
    )
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertIn("username", response.data)
    self.assertEqual(
        response.data["username"][0], "custom user with this username already exists."
    )


def test_create_user_with_existing_email(self):
    """Test creating a user with an already taken email fails"""
    # Create an initial user
    CustomUser.objects.create_user(
        username="uniqueuser", email="testuser@example.com", password="password123"
    )

    # Try to create another user with the same email
    response = self.client.post(
        self.create_user_url, self.invalid_user_data_existing_email, format="json"
    )
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertIn("email", response.data)
    self.assertEqual(
        response.data["email"][0], "custom user with this email already exists."
    )
