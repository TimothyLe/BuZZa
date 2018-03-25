# Obtain these from your account on the AT&T Developer Program website.
APP_KEY="kmojirew4nleokibe3tjx8h5pokk2ldt"
APP_SECRET="xqud3ctiophupefoz3uytay00a8isaik"

# Set up the scopes for requesting API access. 
API_SCOPES="SMS"

curl "https://api.att.com/oauth/v4/token" \
    --insecure \
    --header "Accept: application/json" \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --data "client_id=${APP_KEY}&client_secret=${APP_SECRET}&grant_type=client_credentials&scope=${API_SCOPES}"

# curl https://api.att.com/oauth/v4/token --request POST --insecure --data "client_id=kmojirew4nleokibe3tjx8h5pokk2ldt&client_secret=xqud3ctiophupefoz3uytay00a8isaik&grant_type=client_credentials&scope=SMS"
