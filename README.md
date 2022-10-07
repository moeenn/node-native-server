# node-native-server
Implementation of a basic HTTP API server using the `node:http` module.

## Setup
```bash
$ npm i --save-dev
```

## Run in Development Mode
```bash
$ npm run dev
```

## Run in Production Mode
```bash
$ npm run build
$ npm run start
```
*Note*: The `NODE_ENV` environment variable will be set to `production` when running the app in production mode.

### TODO
- [ ] Parse query strings
- [ ] Add error handling if invalid JSON is sent in request body
- [ ] Add request body validation using zod
- [ ] Implement parsing of bearer tokens
- [ ] Implement storage (map) on Context object
- [ ] Implement CORS (configuration through server constructor)
- [ ] Implement token validation
- [ ] Handle situation where request `Content-Type` of not `application/json`
