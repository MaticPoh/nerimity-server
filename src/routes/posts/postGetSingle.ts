import { Request, Response, Router } from 'express';
import { param } from 'express-validator';
import { customExpressValidatorResult } from '../../common/errorHandler';
import { authenticate } from '../../middleware/authenticate';
import { rateLimit } from '../../middleware/rateLimit';
import { fetchPost, fetchPosts } from '../../services/Post';
import { isUserAdmin } from '../../common/Bitwise';


export function postGetSingle(Router: Router) {
  Router.get('/posts/:postId', 
    authenticate(),
    rateLimit({
      name: 'post_get_signle',
      expireMS: 20000,
      requestCount: 100,
    }),
    param('postId')
      .isString().withMessage('postId must be a string!')
      .isLength({ min: 1, max: 100 }).withMessage('userId length must be between 1 and 100 characters.'),
    route
  );
}


interface Param {
  postId: string;
}

async function route (req: Request, res: Response) {
  const params = req.params as unknown as Param;

  const validateError = customExpressValidatorResult(req);

  if (validateError) {
    return res.status(400).json(validateError);
  }

  const isAdmin = isUserAdmin(req.accountCache.user.badges);

  const post = await fetchPost({
    postId: params.postId, 
    requesterUserId: req.accountCache.user.id,
    bypassBlocked: isAdmin
  });

  res.json(post);
}