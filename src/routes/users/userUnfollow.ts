import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { customExpressValidatorResult } from '../../common/errorHandler';
import { authenticate } from '../../middleware/authenticate';
import { rateLimit } from '../../middleware/rateLimit';
import { followUser, unfollowUser, updateUser } from '../../services/User/User';

export function userUnfollow(Router: Router) {
  Router.delete('/users/:userId/follow',
    authenticate(),
    rateLimit({
      name: 'user_unfollow',
      expireMS: 60000,
      requestCount: 20,
    }),
    route
  );
}

interface Params {
  userId: string;
}

async function route(req: Request, res: Response) {
  const body = req.params as unknown as Params;

  const [, error] = await unfollowUser(req.accountCache.user.id, body.userId);

  if (error) {
    return res.status(400).json(error);
  }

  res.json({ status: true });

}