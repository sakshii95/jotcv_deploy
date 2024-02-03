from django.contrib import admin
from django_db_logger.models import StatusLog


admin.site.unregister(StatusLog)

class LogAdmin(admin.ModelAdmin):
    list_display =["id","get_msg", "get_trace","create_datetime"]
    def get_trace(self, obj):
        if obj.trace:
            return obj.trace[-100:]
        else:
            return []  
    get_trace.trace = "trace"
    def get_msg(self, obj):
        return obj.msg[-20:]
    get_msg.msg = "msg"
admin.site.register(StatusLog, LogAdmin)