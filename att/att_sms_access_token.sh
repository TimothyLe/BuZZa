# Obtain these from your account on the AT&T Developer Program website.
APP_KEY="ntswdqivagmrr5ectvwrzpx9tev2emhg"
APP_SECRET="xoa4fjxvijx2z3kuuvc0cary1hzvtdkq"

# Set up the scopes for requesting API access. 
API_SCOPES="SMS"

curl "https://api.att.com/oauth/v4/token" \
    --insecure \
    --header "Accept: application/json" \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --data "client_id=${APP_KEY}&client_secret=${APP_SECRET}&grant_type=client_credentials&scope=${API_SCOPES}"
