# File Stat API

## Introduction

This project looked at some of the operations needed to support certain types of static file analysis. It was developed using [Node.js](https://nodejs.org/en/) and subsequently deployed using [Now](https://zeit.co/now) realtime deployment service. The project also took account of recent updates to Node.js and investigated imminent updates to the way [Node.js](https://nodejs.org/en/) supports [ES Modules](https://nodejs.org/api/esm.html#esm_ecmascript_modules) (ESM).

The project aimed at analysing the following file content statistics:

- Whitespace delimited word count
- Line count
- Mean (to 1 decimal place), mode and median letters per word
- Frequently used letter(s)

### API

The resource accepts remote file uploads of text file content (`text\plain`). Files can be uploaded using HTTP `POST` to a specified route. The API responds with file statistics, from analysis, in structured JSON format, which enables content to be more easily integrated with remote clients.

## Dependencies

Support was provided by this non-exhaustive list of vendors.

>[..] installs the stuff you need that Apple didn’t
> - https://brew.sh

>[..] hackable text editor for the 21st Century
> - http://atom.io

>[..] simple bash script to manage multiple active node.js versions
> - https://github.com/creationix/nvm

>[..] a JavaScript runtime built on Chrome's V8 JavaScript engine
> - https://nodejs.org/en

>[..] fast, reliable, and secure dependency management
> - https://yarnpkg.com/en

>[..] realtime global deployments
> - https://zeit.co/now

>[..] fast, unopinionated, minimalist web framework for Node.js
> - https://expressjs.com

>[..] a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
> - https://github.com/expressjs/multer

>[..] maintain\[s] consistent coding styles between different editors and IDEs
> - http://editorconfig.org

>[..] support for the latest version of JavaScript through syntax transformers
> - https://babeljs.io

>[..] a static type checker for JavaScript syntax transformers
> - https://flow.org

>[..] a pluggable linting utility for JavaScript
> - https://eslint.org

>[..] an API documentation generator for JavaScript
> - http://usejsdoc.org

>[..] a BDD / TDD assertion library for node and the browser
> - http://chaijs.com

>[..] a feature-rich JavaScript test framework running on Node.js and in the browser
> - https://mochajs.org

>[..] provides utilities that help test frameworks reduce the boiler-plate
> - http://sinonjs.org/

### Editor

The following packages were used with [Atom](http://atom.io) to support development.

>[..] helps developers maintain consistent coding styles between different editors
> - https://atom.io/packages/editorconfig
- - `apm install editorconfig`

>[..] lightweight alternative to Facebook's Flow plugin for facebook/flow
> - http://brewformulas.org/Flow
- - `brew install flow`
> - https://atom.io/packages/linter-flow
- - `apm install linter-flow`

>[..] lint JavaScript on the fly, using ESLint
> - https://atom.io/packages/linter-eslint
- - `apm install linter-eslint`

## Configuration

Most configuration sits within the project. The configuration can be extended and/or removed by inspecting the various configuration files hosted in the root of the project directory.

Out of the box the API runs on port `7080`.

## Installation

The API can be installed using the following commands. The recommended approach includes installation of required packages stated in the `Setup` section, but these for the most part will be installed automatiically.

```bash
$ brew install yarn
$ brew install flow
$ yarn install
```

## Preview

The API can be previewed using the following command. It is recommended that [jq](https://stedolan.github.io/jq/) is used to pretty print any JSON response data.

```bash
$ yarn run start # production
$ yarn run dev:start # development
$ curl -X GET http://localhost:7080 | jq
```

The API runs on port `7080` and can be previewed locally via the following URLs.

- Index: `GET` http://127.0.0.1:7080/
- Uploader: `POST` http://127.0.0.1:7080/upload

Valid `POST` requests must be accompanied with a `file` 'field' and use a [Content Type of multipart/form-data](https://ewiggin.gitbooks.io/expressjs-middleware/content/multer.html).

An example of a valid `POST` request made with [curl](https://curl.haxx.se/) is shown below, however, [postman](https://www.getpostman.com/postman) can also help construct different types of HTTP request for testing this API.

```bash
$ curl -X POST -H 'Content-Type:multipart/form-data' --form file=@spec/fixtures/request.txt http://localhost:7080/upload | jq
```

This should respond with JSON data similar to that shown below.

```json
{
  "api": "file-stat-api",
  "version": "0.1.0",
  "status": "OK",
  "success": true,
  "dateTime": "0000-00-00T00:00:00.000Z",
  "data": {
    "fieldname": "file",
    "originalname": "request.txt",
    "encoding": "7bit",
    "mimetype": "text/plain",
    "size": 477,
    "content": "Reports that say that something hasn't happened are always interesting to me, because as we know, there are known knowns; there are things we know we know. We also know there are known unknowns; that is to say we know there are some things we do not know. But there are also unknown unknowns – the ones we don't know we don't know. And if one looks throughout the history of our country and other free countries, it is the latter category that tend to be the difficult ones.\n",
    "statistics": {
      "mean": {
        "wordCount": 88,
        "characterCount": 373,
        "averageWordLength": 4.238636363636363,
        "averageWordLengthRounded": 4.2
      },
      "median": 4,
      "mode": {
        "4": 21
      },
      "characterFrequency": {
        "e": 49
      },
      "lineCount": 2
    }
  }
}
```

Making a `POST` request using an empty file can be tested with is command.

```bash
$ curl -X POST -H 'Content-Type:multipart/form-data' --form file=@spec/fixtures/requests/empty.txt http://localhost:7080/upload | jq
```

This should respond with JSON data similar to that shown below.

```json
{
  "api": "file-stat-api",
  "version": "0.1.0",
  "status": "400 Bad Request",
  "success": false,
  "dateTime": "0000-00-00T00:00:00.000Z",
  "message": "HttpError: looks like something went wrong."
}
```

Making a `POST` request to a unsupported endpoint can be tested with is command.

```bash
$ curl -X POST -H 'Content-Type:multipart/form-data' --form file=@spec/fixtures/requests/empty.txt http://localhost:7080/bad-route | jq
```

This should respond with JSON data similar to that shown below.

```json
{
  "api": "file-stat-api",
  "version": "0.1.0",
  "status": "404 Not Found",
  "success": false,
  "dateTime": "0000-00-00T00:00:00.000Z",
  "message": "HttpError: looks like something went wrong."
}
```

Making a `GET` request using `curl` to `/upload` can be tested with is command.

```bash
$ curl -X GET http://localhost:7080/upload | jq
```

This should respond with JSON data similar to that shown below.

```json
{
  "api": "file-stat-api",
  "version": "0.1.0",
  "status": "405 Method Not Allowed",
  "success": false,
  "dateTime": "0000-00-00T00:00:00.000Z",
  "message": "HttpError: looks like something went wrong."
}
```

## Deployment

The [Now](https://zeit.co/now) service was used to support integration and make future deployments. Minimal deployment support can be provided using the following commands. The services only allows files to be written to the servers `/tmp` directory. The documented [deployment constraints](https://zeit.co/docs/deployment-types/node#file-system-specifications) were considered acceptable to support this development.

```bash
$ yarn global add now
$ now login
```

Pleae use the following command to make your own deployment once you're set-up with a [Now](https://zeit.co/now) account.

```bash
$ now
```

## Linting

The development uses code linters to help with code consistency and adherence to recommended and/or the latest development standards.

The following commands were provided to support code linting. The tasks executed will report on [flow](https://flow.org) and javascript [eslint](https://eslint.org/) static code analysis. It is recommended that `eslint` and `flow` are installed globally.

```bash
$ yarn global add eslint
```

The following commands can be used to run lint tasks.

```bash
$ yarn run dev:lint # runn all lint tasks
$ yarn run lint:flow
$ yarn run lint:js
```

Aside, editor configuration files can also help with ensuring code edits are uniform, e.g., lines indentation, etc. More information on these configurations can be found via the [editorconfig.org](http://editorconfig.org/) website.

## Testing

Please use the following command to run tests associated to this project. It is recommended that test package support is installed globally to help with IDE (integrated development environment) integration.

```bash
$ yarn run dev:start
$ yarn run test
```

A [spec runner](./spec/runner) has been provided to generate basic test reports, including test coverage reports - which at the time of writing was:

| File      | % Stmts | % Branch | % Funcs | % Lines |
| ---       | ---     | ---      | ---     | ---     |
| All files | 96.53   | 70.27    | 93.05   | 97.38   |

The test suite can also be extended to include reporting for [CI](https://www.thoughtworks.com/continuous-integration) delivery pipelines.

## Documentation

Please install following support packages to generate documentation. The packages should be installed globally as they have not been included as part of this package.

- https://github.com/ctumolosus/jsdoc-babel
- https://github.com/jsdoc3/jsdoc

```bash
$ yarn global add jsdoc-babel
$ yarn global add jsdoc
$ yarn run docs
```

## License

[MIT License](./MIT-LICENSE)

Author: [dataday](http://github.com/dataday)
