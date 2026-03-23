import type { JwtPayload } from 'jsonwebtoken';

interface AuthPayload extends JwtPayload {
  userID: string;
}
