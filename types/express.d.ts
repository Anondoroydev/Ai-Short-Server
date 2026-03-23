import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface UserPayload extends JwtPayload {
      userID: string;
    }

    interface Request {
      user?: {
        id: string;
      };
    }
  }
}
