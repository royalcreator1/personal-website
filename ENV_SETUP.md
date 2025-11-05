# Environment Variables Setup

## Telegram Bot Configuration

To enable the contact form to send messages to your Telegram, you need to:

1. **Create a Telegram Bot:**
   - Open Telegram and search for `@BotFather`
   - Send `/newbot` command
   - Follow the instructions to create your bot
   - Copy the bot token you receive

2. **Get your Chat ID:**
   - Start a chat with your new bot
   - Send any message to the bot
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Look for `"chat":{"id":123456789}` in the response
   - Copy the chat ID number

3. **Set Environment Variables in Vercel:**
   - Go to your Vercel project dashboard
   - Settings → Environment Variables
   - Add:
     - `TELEGRAM_BOT_TOKEN` = your bot token
     - `TELEGRAM_CHAT_ID` = your chat ID
   - Redeploy your application

## Local Development

Create a `.env.local` file in the root directory:

```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

