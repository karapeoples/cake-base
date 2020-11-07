# cake-base
BE
BASEURL: 'localhost'


BASE ROUTE: BASEURL/user

|USER-ROUTES| REQUEST TYPES | ENDPOINTS|
|-----------|--------------|---------|
|Users| GET | /all_user|
|Users By Id |GET | /all_user/:user_id|
|Update Users|PUT|/all_user/:user_id|
|Delete Users|DELETE|/all_user/:user_id|

|CLERK-ROUTES| REQUEST TYPES | ENDPOINTS|
|-----------|--------------|---------|
|Clerks| GET | /clerk|
|Clerks By ID |GET | /clerk:clerk_id|
|Single Clerk Role Info | GET | /clerk_info/:clerk_id|
|Delete Clerk Role Info|DELETE|/del_clerk/:clerk_id|

|PATIENT-ROUTES| REQUEST TYPES | ENDPOINTS|
|-----------|--------------|---------|
|Patients| GET | /patient|
|Patient By ID |GET | /patient/:patient_id|
|Patient Card | GET | /card/:patient_id|
|Update Card|PUT|/card/:patient_id|
|Delete Card|DELETE|/card/:patient_id|

|ADMIN-ROUTES| REQUEST TYPES | ENDPOINTS|
|-----------|--------------|---------|
|Admins| GET | /admin|
|Admins By ID |GET | /admin/:admin_id|
|Single Admin Role Info | GET | /admin_info/:admin_id|
|Delete Admin Role Info|DELETE|/del_admin/:admin_id|



