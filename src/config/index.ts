/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
require("dotenv").config();

export const OBNIZ_ID = process.env.OBNIZ_ID;
export const PORT = process.env.PORT || 3000;

// firebase
export const API_KEY = process.env.API_KEY;
export const AUTH_DOMAIN = process.env.AUTH_DOMAIN;
export const PROJECT_ID = process.env.PROJECT_ID;
export const STORAGE_BUCKET = process.env.STORAGE_BUCKET;
export const MESSAGING_SENDER_ID = process.env.MESSAGING_SENDER_ID;
export const APP_ID = process.env.APP_ID;
export const MEASUREMENT_ID = process.env.MEASUREMENT_ID;
