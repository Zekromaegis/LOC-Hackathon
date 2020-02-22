# Generated by Django 2.2.5 on 2020-02-22 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PlacementPrediction', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='dev_type',
            field=models.IntegerField(choices=[('Web', 0), ('App', 1), ('Software', 2), ('ML', 3)], default=0),
            preserve_default=False,
        ),
    ]
