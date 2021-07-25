# Tun-Cake
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


BASE ROUTE: BASEURL/strain

|FLOWER-ROUTES| REQUEST TYPES | ENDPOINTS|
|-----------|--------------|---------|
|Flowers| GET | /flower|
|Flower By Name| GET | /flower/name/:name|
|Flower By Id |GET | /flower/:flower_id|
|Add Flower|POST|/flower|
|Update Flower|PUT|/flower/:flower_id|


|CURRENT_FLOWER-ROUTES| REQUEST TYPES | ENDPOINTS|
|-----------|--------------|---------|
|Current Flower| GET | /flower_stock|
|Current Flower By Id |GET | /flower_stock/:currentFlower_id|
|Add Current Flower|POST |/flower_stock|
|Delete Current Flower|DELETE|/flower_stock/:currentFlower_id|

|IN_HOUSE_PREROLL-ROUTES| REQUEST TYPES | ENDPOINTS|
|-----------|--------------|---------|
|Pre-rolls | GET | /preRoll|
|Pre-rolls By Id |GET | /preRoll/:preRoll_id|
|Add Pre-rolls|POST |/preRoll|
|Delete Pre-Roll|DELETE|/preRoll/:preRoll_id|


BASE ROUTE: BASEURL/pr

|COMPANY-PREROLL-ROUTES| REQUEST TYPES | ENDPOINTS|
|-----------|--------------|---------|
|PreRolls| GET | /companyPR|
|PreRolls By Name| GET | /companyPR/name/:name|
|PreRolls By Id |GET | /companyPR/:pr_id|
|Add PreRolls|POST|/companyPR|
|Update PreRolls|PUT|/companyPR/:pr_id|


|CURRENT-COMPANY-PREROLL-ROUTES| REQUEST TYPES | ENDPOINTS|
|-----------|--------------|---------|
|Current PreRolls| GET | /pr_stock|
|Current PreRolls By Id |GET | /pr_stock/:currentPR_id|
|Add Current PreRolls|POST |/pr_stock|
|Delete Current PreRolls|DELETE|/pr_stock/:currentPR_id|

BASE ROUTE: BASEURL/stock
|PATIENT-INFO-STOCK| REQUEST TYPES | ENDPOINTS|
|-----------|--------------|---------|
|Current PreRolls| GET | /pr_stock|
|Pre-rolls | GET | /preRoll|
|Current Flower| GET | /flower_stock|
