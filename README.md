# A Rate-Limited Notification Service Example

A notification service example developed within typescript + nodejs + nodecache. 

This service is configurable to execute with N type of notification as long as your previous configuration happens.

## Prerequisites

* You have installed the Node.js
* You have installed the NPM

## Installation

```
npm install
```

## Running developed

``
npm run start:dev
``

## Running the script

```
npm run buil
npm run start
```

## Testing

```
npm run test
```

## Check linter issues

``` 
npm run lint
```

## How to create a new limit 

Go to `rate_limiter` domain:

* Add a new type to LimitType
* Initialize the new type in the class constructor

Example:

```
export type LimitType = 'STATUS' | 'NEWS' | 'MARKETING' | 'PUSH';

    this.limits = [
      {
        type: 'STATUS',
        expiresAt: 120,
        maximum: 2,
        count: 0,
      },
      {
        type: 'NEWS',
        expiresAt: 86400,
        maximum: 1,
        count: 0,
      },
      {
        type: 'MARKETING',
        expiresAt: 3600,
        maximum: 3,
        count: 0,
      },
      {
        type: 'PUSH',
        expiresAt: 3600,
        maximum: 1,
        count: 0,
      }
    ];

```

## Contributing

To contribute, follow these steps:

1. Fork this repository.
2. Create a branch: `$ git checkout -b <branch_name>`.
3. Make your changes.
4. Run the test suite: `$ npm run test`
5. Run the linter suite: `$ npm run lint`
6. Fix the test and linter errors if exists.
7. Commit your changes: `$ git commit -m '<commit_message>'`
8. Push to the original branch: `$ git push origin rate-limit-notify/<branch_name>`
9. Create the pull request.

