from django.urls import path
from .views import *
from .admin_views import *

urlpatterns = [

    #USERS
    path("signup/", user_signup, name="user_signup"),
    path("login/", user_login, name="user_login"),
    path("forgot-password/", forgot_password, name="forgot_password"),
    path("reset-password/", reset_password, name="reset_password"),

    #ADMIN
    path("admin_signup/", admin_signup, name="admin_signup"),
    path("admin_login/",admin_login, name="admin_login"),

    #SUPERADMIN
    path("superadmin_signup/", superadmin_signup, name="superadmin_signup"),
    path("superadmin_login/",superadmin_login, name="superadmin_login"),
]
