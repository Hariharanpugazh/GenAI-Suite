from django.urls import path
from .views import *
from .admin_views import *
from .chatbot_views import *

urlpatterns = [

    #USERS
    path("user_signup/", user_signup, name="user_signup"),
    path("user_login/", user_login, name="user_login"),
    path("forgot_password/", forgot_password, name="forgot_password"),
    path("verify_reset_token/", verify_reset_token, name="verify_reset_token"),
    path("reset_password/", reset_password, name="reset_password"),

    #ADMIN
    path("admin_signup/", admin_signup, name="admin_signup"),
    path("admin_login/",admin_login, name="admin_login"),
    path("get-admin-products/", get_admin_products, name="get_admin_products"),

    #SUPERADMIN
    path("superadmin_signup/", superadmin_signup, name="superadmin_signup"),
    path("superadmin_login/",superadmin_login, name="superadmin_login"),

    #PRODUCTS
    path("post_product/", post_product, name="post_product"),
    path('get-all-products/',get_all_products, name="get_all_products"),
    
    #CHATBOT
    path("chat/", chatbot_view, name="chatbot"),
    path("event/", create_google_calendar_event, name="create_google_calendar_event"),
]
