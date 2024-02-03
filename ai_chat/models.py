from django.db import models
PROMPY_TYPE  = [(1,"RESUME"),(2,"JOB"),(3, "WEBPORTFOLIO"),(4, "DEFAULT")]

class Prompt(models.Model):
    prompt_text     = models.CharField(max_length=255)
    prompt_type     = models.IntegerField(choices=PROMPY_TYPE,default=4, null=True, blank=False)
    updated_at      = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.prompt_text
    class Meta:
        ordering = ['-id']