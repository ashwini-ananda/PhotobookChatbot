The irtual environment has to be activated by going into the /env/Scripts directory. Then run
.\Scripts\activate

Then go into the main directory and run 
python manage.py migrate

Make sure other dependencies are installed. Any errors should be solves by the following commands:
pip install Django
pip install Pillow
pip install crispy-forms-gds
pip install widget_tweaks
pip install django-widget-tweaks  
python manage.py makemigrations
python manage.py migrate

