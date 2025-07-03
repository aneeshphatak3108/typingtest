import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SESSION_COOKIE_SECURE = True           # Ensure cookie is sent over HTTPS
    SESSION_COOKIE_SAMESITE = 'None'       # Allow cross-site cookies
    SESSION_COOKIE_HTTPONLY = True         # Prevent JavaScript access