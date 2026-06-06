import json
import os

FILE_PATH = "data/applications.json"


def load_applications():

    if not os.path.exists(FILE_PATH):
        return []

    with open(FILE_PATH, "r") as file:
        return json.load(file)


def save_applications(data):

    with open(FILE_PATH, "w") as file:
        json.dump(
            data,
            file,
            indent=4
        )


def add_application(application):

    applications = load_applications()

    applications.append(application)

    save_applications(applications)


def get_application(app_id):

    applications = load_applications()

    for app in applications:

        if app["id"] == app_id:
            return app

    return None