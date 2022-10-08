// eslint-disable-next-line
require('dotenv').config();

const { ONESIGNAL_APP_KEY, ONESIGNAL_USER_KEY } = process.env;

if (!ONESIGNAL_APP_KEY || !ONESIGNAL_USER_KEY) {
  throw new Error('No testing authorization provided in env!');
}
