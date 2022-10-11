// eslint-disable-next-line
require('dotenv').config();

const { ONESIGNAL_API_KEY, ONESIGNAL_APP_ID } = process.env;

if (!ONESIGNAL_API_KEY)
  throw new Error('No OneSignal app key defined in `.env`!');
if (!ONESIGNAL_APP_ID)
  throw new Error('No OneSignal app id defined in `.env`!');
