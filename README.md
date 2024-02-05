## Getting Started

Please follow the intstructions step by step in the right order:

To start the app unzip the repository, open terminal in the location of the unzipped repository and:

1. Inside the .env file that is in the **server** folder:

- add the gmail email address that should send the weather forecast to the subscribers.
- add the corresponding app password for this email account. For obtaining the app password follow the instructions: https://support.google.com/accounts/answer/185833?hl=en

the .env file should look like that.

```bash

EMAIL=yourEmailaccount
PASSWORD=xxxx xxxx xxxx xxxx

```

2. Start the **server** as given in the instructions:

- navigate to the server folder in the terminal:

```bash
cd deefini_challenge/server

# install all dependencies
npm i
```

To start run:

```bash
nodemon index.js
```

3. Start the **frontend** as given in the instructions:

In a different terminal navigate to the frontend

```bash
cd deefini_challenge/frontend

# install all dependencies
npm i
```

To start run:

```bash
npm start
```

## Thoughts

I really enjoyed working on this coding challenge. Provided more time I would have definitely

- added unit, integration and e2e tests.
- improved the design.
- dockerized the app and used docker compose to make it easy to start
