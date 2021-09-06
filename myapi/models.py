from django.db import models

# Create your models here.
class ClientText(models.Model):
    text = models.TextField()

    def __str__(self):
        return self.text

class Keyword(models.Model):
    text = models.ForeignKey(ClientText, on_delete=models.CASCADE, related_name="keywords", null=True)
    word = models.CharField(max_length=100)
    entity_type = models.CharField(max_length=100)

    def __str__(self):
        return self.word