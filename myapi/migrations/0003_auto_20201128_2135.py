# Generated by Django 3.1.3 on 2020-11-28 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0002_auto_20201128_2130'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clienttext',
            name='keywords',
            field=models.ManyToManyField(blank=True, to='myapi.Keyword'),
        ),
    ]