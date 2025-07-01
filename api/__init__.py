from flask import Flask

app = Flask(__name__)
api.config.from_object(Config)

from api import routes  #to avoid circular import