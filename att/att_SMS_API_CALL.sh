# Step 1:

# Authentication parameter. For directions on how to obtain the OAuth access
# token, see the OAuth section.
OAUTH_ACCESS_TOKEN="BF-ACSI~4~20180325001822~ZCleLfIQn7OODNlq3WgxZSQ1icLkSn45"

# Step 2:

# Fully qualified domain name for the API Gateway.
FQDN="https://api.att.com"

# SMS message text body.
SMS_MSG_TEXT="SMS Message Text"

# Enter telephone number to which the SMS message will be sent.
# For example: TEL="tel:+1234567890"
TEL="+5716650861"

# Send the Send SMS method request to the API Gateway.
curl "${FQDN}/sms/v3/messaging/outbox" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --header "Authorization: Bearer ${OAUTH_ACCESS_TOKEN}" \
    --data "{\"outboundSMSRequest\":{\"address\":\"${TEL}\",\"message\":\"${SMS_MSG_TEXT}\"}}" \
    --request POST

# curl -k  -H "Accept: application/json" \ 
# 		 -H "Content-type: application/json" \
# 		 -H "Authorization: Bearer ${OAUTH_ACCESS_TOKEN}" \
# 		 -X POST ${FQDN}/sms/v3/messaging/outbox \
# 		 -d {"outboundSMSRequest": {"address":"tel:${TEL}","message":"${SMS_MSG_TEXT}"}}