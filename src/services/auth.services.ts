import { config } from '../config/index.ts';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  config.GOOGLE_CLIENT_ID,
  config.GOOGLE_CLIENT_SECRET,
  config.GOOGLE_REDIRECT_URI,
);

const loginService = async () => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: config.GOOGLE_SCOPES,
  });
  return url;
};

export { loginService };
