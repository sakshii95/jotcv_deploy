from accounts.models import *
from .sections import section_list
from .categories import category_list
from django.core.management.base import BaseCommand
from superuser.models import Section, Category, SubCategories
from .quotes import quotes


class Command(BaseCommand):
    help = "Adding default values to Database by Admin"
    def handle(self, *args, **options):
        confirm = input("Do you want to add default, (y/n):")
        try:        
            user=User.objects.filter(is_superuser=1)
            user = user.first()
        except:
            self.stdout.write(self.style.NOTICE("Admin rights, Create Admin First"))
            return None
        if confirm.lower()=="y":
            self.stdout.write(self.style.HTTP_NOT_MODIFIED('Category and Sub Category'))
            categories = Category.objects.all()
            if categories.count() == 0:
                for cat in category_list:
                    category = Category.objects.create(
                        title=cat["title"],
                        description=cat["title"],
                        created_by = user
                    )
                    self.stdout.write(self.style.SUCCESS('Category %s added seccussfully!' %cat["title"]))
                    self.stdout.write(self.style.NOTICE('Sub-Categories for %s' %cat["title"]))
                    for sub_item in cat["sub"]:
                        sub_category=SubCategories.objects.create(
                            category=category,
                            title=sub_item,
                            description = f"sub_item - {category.title}",
                            created_by = user,
                        )
                        self.stdout.write(self.style.SUCCESS('Sub Category %s added seccussfully!' %sub_item))
            else:
                self.stdout.write(self.style.NOTICE("Categories already added"))

            self.stdout.write(self.style.HTTP_NOT_MODIFIED('Section List'))
            sections = Section.objects.all()
            if sections.count() == 0:
                for item in section_list:
                    section = Section.objects.create(title=item,description=item)
                    self.stdout.write(self.style.SUCCESS('Section %s added successfully!' %item))
            else:
                self.stdout.write(self.style.NOTICE("Section already added"))


        elif confirm.lower()=="n":
            pass
        else:
            self.stdout.write(self.style.NOTICE("Enter response from given choices"))
