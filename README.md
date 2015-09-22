## SNS -> Lambda -> twitter tutorial

### Required

- nodejs
- [mtwitter](https://www.npmjs.com/package/mtwitter)
- twitter Account

### How to use

- [mtwitter](https://www.npmjs.com/package/mtwitter) Install

```sh
% npm install mtwitter
```

- Chnage config.js

```javascript
var config = {};

config.consumer_key        = 'Please set your info.';
config.consumer_secret     = 'Please set your info.';
config.access_token_key    = 'Please set your info.';
config.access_token_secret = 'Please set your info.';

module.exports = config;
```

- Creata Lambda function

```sh
% aws lambda --region ap-northeast-1 \
  create-function \
    --function-name your_function \
    --runtime nodejs \
    --role arn:aws:iam::1234567890123:role/lambda_basic_execution \
    --handler index.handler \
    --zip-file fileb://tweet.zip 
```

- Adjust Timeout

Please adjust Timeout.

- Update function

```sh
% zip -r your_function.zip index.js config.js node_modules
# Important 'fileb//', See http://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-code.html.
% aws lambda --region ap-northeast-1 update-function-code --function-name your_function --zip-file fileb://your_function.zip 
```

## Sample

### Create Lambda function

```sh
% aws lambda --region ap-northeast-1 \
  create-function \
    --function-name tweet \
    --runtime nodejs \
    --role arn:aws:iam::1234567890123:role/lambda_basic_execution \
    --handler index.handler \
    --zip-file fileb://tweet.zip 
```

output.

```javascript
{
    "FunctionName": "tweet", 
    "CodeSize": 1140981, 
    "MemorySize": 128, 
    "FunctionArn": "arn:aws:lambda:ap-northeast-1:1234567890123:function:tweet", 
    "Handler": "index.handler", 
    "Role": "arn:aws:iam::1234567890123:role/lambda_basic_execution", 
    "Timeout": 3, 
    "LastModified": "2015-09-18T23:57:18.536+0000", 
    "Runtime": "nodejs", 
    "Description": ""
}
```

### Create topic

```sh
% aws sns create-topic --name foo
```

output.

```javascript
{
    "TopicArn": "arn:aws:sns:ap-northeast-1:1234567890123:foo"
}
```

### Create subscribe

```sh
% aws sns --region ap-northeast-1 \
  subscribe \
    --topic-arn arn:aws:sns:ap-northeast-1:1234567890123:foo \
    --protocol lambda \
    --notification-endpoint arn:aws:lambda:ap-northeast-1:1234567890123:function:tweet
```

output.

```javascript
{
    "SubscriptionArn": "arn:aws:sns:ap-northeast-1:1234567890123:foo:714e76d4-9ac0-4b76-aece-124b1aaef68b"
}
```

### Create Message

```sh
% cat << EOT >> message.js
{ 
  "default": "JSON Message Test",
  "message": "foo bar",
  "url": "http://xxx.example.com/"
}
EOT
```
### Create Event source mapping

- Management console

![2015091902.png](https://qiita-image-store.s3.amazonaws.com/0/87189/b956061d-3fd1-cf1b-8dd1-e48ce87eddd0.png "2015091902.png")

### Publish to topic

```sh
% aws sns --region ap-northeast-1 publish --topic-arn arn:aws:sns:ap-northeast-1:1234567890123:foo --subject "hello lambda\!\!" --message file://message.js
```

output.

```javascript
{
    "MessageId": "18d431ee-dc22-5ab0-a5c2-7f9877071052"
}
```

### Check your Twitter Account

