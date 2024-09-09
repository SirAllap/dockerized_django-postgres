# Project Name
Description

A Dockerized web application combining Django (backend), PostgreSQL (database), and React with Vite (frontend). This setup allows for isolated development and deployment environments using Docker.
Project Structure

```
djangoapp/
└── django-docker
    ├── backend
    │   ├── api
    │   │   ├── admin.py
    │   │   ├── apps.py
    │   │   ├── __init__.py
    │   │   ├── migrations
    │   │   ├── models.py
    │   │   ├── __pycache__
    │   │   ├── serializers.py
    │   │   ├── tests.py
    │   │   ├── urls.py
    │   │   └── views
    │   ├── backend
    │   │   ├── asgi.py
    │   │   ├── __init__.py
    │   │   ├── __pycache__
    │   │   ├── settings.py
    │   │   ├── urls.py
    │   │   └── wsgi.py
    │   ├── db.sqlite3
    │   ├── docker-compose.yml
    │   ├── Dockerfile
    │   ├── manage.py
    │   ├── requirements.txt
    │   └── tests
    │       ├── __init__.py
    │       ├── __pycache__
    │       └── tests_users.py
    └── frontend
        ├── bun.lockb
        ├── Dockerfile
        ├── index.html
        ├── package.json
        ├── postcss.config.js
        ├── public
        │   └── vite.svg
        ├── README.md
        ├── src
        │   ├── api.js
        │   ├── App.jsx
        │   ├── assets
        │   ├── components
        │   ├── constants.js
        │   ├── index.css
        │   ├── main.jsx
        │   ├── pages
        │   └── styles
        ├── tailwind.config.js
        └── vite.config.js
```
## Getting Started

Clone the Repository
```
git clone https://github.com/yourusername/your-repository.git
cd your-repository
```

### Build and Run

Navigate to the project directory:

    cd djangoapp/django-docker

### Start the application:
- This will build the Docker images and start the containers.
```
    docker-compose up --build
```
### Access the Application:
- Frontend: Open your browser and go to http://localhost:5174
- Backend (Django Admin): Open your browser and go to http://localhost:8000/admin
- PostgreSQL: The database is accessible within the Docker network, so you can connect to it from other services using postgres://postgres:postgres@db:5432/postgres

### Configuration

Frontend Port: The frontend application is bound to port 5174 on the host machine. Adjust as needed in the docker-compose.yml file.

### Database Configuration: Environment variables for PostgreSQL:

        DATABASE_NAME=postgres
        DATABASE_USER=postgres
        DATABASE_PASS=postgres

## Running Tests

### To run Django tests:
```
docker-compose exec backend python manage.py test
```

## Stopping the Application

### To stop the containers:
```
docker-compose down
```
