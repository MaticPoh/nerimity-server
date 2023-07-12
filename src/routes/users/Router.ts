import { Router } from 'express';
import { login } from './login';
import { register } from './register';
import { userDetails } from './userDetails';
import { userFollow } from './userFollow';
import { userFollowers } from './userFollowers';
import { userFollowing } from './userFollowing';
import { userOpenDMChannel } from './userOpenDMChannel';
import { userUnfollow } from './userUnfollow';
import { userUpdate } from './userUpdate';
import { userUpdatePresence } from './userUpdatePresence';
import { userUpdateServerSettings } from './userUpdateServerSettings';
import { userRegisterFCM } from './userRegisterFCM';
import { userDeleteAccount } from './userDeleteAccount';
import { userBlock } from './userBlock';
import { userUnblock } from './userUnblock';

const UsersRouter = Router();

register(UsersRouter);
login(UsersRouter);
userUpdate(UsersRouter);

userBlock(UsersRouter);
userUnblock(UsersRouter);

userRegisterFCM(UsersRouter);
userOpenDMChannel(UsersRouter);
userUpdatePresence(UsersRouter);
userDeleteAccount(UsersRouter);
userDetails(UsersRouter);
userFollow(UsersRouter);
userUnfollow(UsersRouter);
userFollowers(UsersRouter);
userFollowing(UsersRouter);
userUpdateServerSettings(UsersRouter);

export { UsersRouter };
