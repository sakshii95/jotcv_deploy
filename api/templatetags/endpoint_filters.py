from django import template

register = template.Library()

@register.filter
def extract_endpoint(value):
    parts = value.split("/")

    if parts[-1].isdigit() and len(parts) >= 2:
        return parts[-2]

    return parts[-1]