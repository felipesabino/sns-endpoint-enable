# SNS Enable Endpoints

Edit all your SNS Application Endpoints Attribute `Enable` to `true`.

## Why?

1. You might have set up a wrong certificate and need to rollback the enable flag for all devices that amazon wrongly disabled
2. There is no way to perform such action for all devices at once using current Amazon Console


## What does this script do?

It just iterates through all endpoints of an application and sets the `Enabled` attribute to `true`. This is the **only** attribute being changed for the endpoint, nothing else changes.

## Steps

1. `$ npm install`
2. Add a `aws.config.json` file to the root of the project with your AWS credentials (There is an `aws.config.json.example` that can be used as a template)
3. `$ node run.js`
