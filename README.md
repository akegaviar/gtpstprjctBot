# gtpstprjctBot

A sample Node.js Telegram bot to interact with Chainstack API.

## Get Telegram bot token

Talk to @BotFather and `/newbot` to token.

## Get a Chainstack API key

Get the key.

## Install the required packages

`npm i node-telegram-bot-api`

`npm i axios`

`npm i dotenv`

## Configure .env

Rename `env.template` to `.env`.

Provide the tokens and base API url:

* `TELEGRAM_TOKEN=`{your token from @BotFather}
* `CHAINSTACK_API_KEY=`{your Chainstack API token}
* `CHAINSTACK_API_URL=`{Chainstack API base URL}

## Start bot.js

`node bot.js`

## Interact with the bot

Create a project: `/newProject name description`

Get project info `/project PR-123-456`
