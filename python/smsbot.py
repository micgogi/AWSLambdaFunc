import json
import boto3


def lambda_handler(event, context):
    sns = boto3.client('sns')
    num = 'mobile number with country code'
    msg = 'Hi this is test'
    sns.publish(PhoneNumber = num, Message = msg )
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
