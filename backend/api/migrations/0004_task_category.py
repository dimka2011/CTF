# Generated by Django 5.1.4 on 2024-12-09 16:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.category'),
            preserve_default=False,
        ),
    ]
