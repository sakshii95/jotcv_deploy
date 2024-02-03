

# Introduction

The new-age Resume that gets you instantly hired. Create your Video Resume in 3 easy steps.
Our resume builder is packed with expert tips to show you how to make each part of your resume. 

Template is written with django 1.11 and python 3 in mind.

![Default Home View](__screenshots/home.png?raw=true "Title")

### Main features

* Easy Online Resume Builder

* Empowering Careers: Design, Download, Excel

* Eye-catching and modern resume templates.

* Unleash Your Professional Journey!

* Create your perfect resume.

* Tailored Content

* Your journey to professional growth

# Usage

To use this project to start:

### Existing virtualenv

If your project is already in an existing python3 virtualenv first install django by running

    $ pip install django
    
And then run the `django-admin.py` command to start the new project:

    $ django-admin.py startproject \
      --go to git repo git <private_repo>
      
### No virtualenv

This assumes that `python3` is linked to valid installation of python 3 and that `pip` is installed and `pip3`is valid
for installing python 3 packages.

Installing inside virtualenv is recommended, however you can start your project without virtualenv too.

If you don't have django installed for python 3 then run:

    $ pip3 install django
    
And then:

    $ python3 -m django startproject \
      --go to git repo git <private_repo>
      
      
After that just install the local dependencies, run migrations, and start the server.


# AI-Video-Resume

# Getting Started

First clone the repository from Github and switch to the new directory:

    $ git clone AI-Video-Resume git repo.git
    $ cd <cloned project_name>
    
Activate the virtualenv for your project.
    
Install project dependencies:

    $ pip install -r requirements.txt
    
    
Then simply apply the migrations:

    $ python manage.py migrate
    

You can now run the development server:

    $ python manage.py runserver