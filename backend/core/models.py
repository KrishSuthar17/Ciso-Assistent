# core/models.py
from django.db import models

class Risk(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    likelihood = models.IntegerField()
    impact = models.IntegerField()
    mitigation = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=[
            ('Not Started', 'Not Started'),
            ('In Progress', 'In Progress'),
            ('Complete', 'Complete'),
            ('Incomplete', 'Incomplete'),
        ],
        default='Not Started'
    )

    def __str__(self):
        return self.title



class Control(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    status = models.CharField(
        max_length=20,
        choices=[
            ('Not Started', 'Not Started'),
            ('In Progress', 'In Progress'),
            ('Complete', 'Complete'),
            ('Incomplete', 'Incomplete'),
        ],
        default='Not Started'
    )

    def __str__(self):
        return self.name


class Asset(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    critical = models.BooleanField(default=False)  # make sure this line exists

    def __str__(self):
        return self.name

