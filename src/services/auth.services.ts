import { config } from '../config/index.ts';
import { google, type Auth } from 'googleapis';

console.log(
  'Initializing OAuth2Client with redirect URI:',
  config.GOOGLE_REDIRECT_URI,
);
const oauth2Client: Auth.OAuth2Client = new google.auth.OAuth2(
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

const loginCallbackService = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};

export { loginService, loginCallbackService, oauth2Client, google };
