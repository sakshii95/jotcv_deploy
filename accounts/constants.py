ADMIN = 1
SUBADMIN = 2
USER = 3
USER_ROLE = [(ADMIN, "admin"),(SUBADMIN, "Sub-Admin"), (USER, "User"), ]

GENDER  = [(1,"Male"),(2,"Female"),(3, "Other")]

PROFILE_FOR  = [(1,"Myself"),(2, "Other")]

DEVICE_TYPE = [(1,'Android'),(2,'ios'),]

MARITIAL_STATUS= [(1,'Un-Married'),(2,'Married'),]

EMPLOYMENT_TYPE = [(1, "Job/Employment"),(2, "Internship"),(2, "Training")]

SKILL_TYPE = ((1, "Begginer"),(2, "Intermediate"),(2, "Advanced"))

JOB_SHIFT_CHOICES = [(1, "Day-Shift"),(2, "Night-Shift")]

JOB_TYPE = [(1, "Full-Time"),(2, "Part Time"),(3, "Internship"),(4 , "Remote") ]

SPOKEN_LANGUAGE_LEVEL = [(1, "Read"),(2, "Write"),(3, "Speak")]

SECTION_ID = [(1, "Profile"),(2, "Education"),(3, "Experience"),(4,"Social"),(5, "Projects"),(6, "Interest"),(7, "Preferences"),(8, "Courses"),(9,"Skills"),(10, "SpokenLanguages"),(11, "Reference") ]

class PaymentStatus:
    SUCCESS = 1
    FAILURE = 2
    PENDING = 3