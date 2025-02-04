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
import { userNotifications } from './userNotifications';
import { userEmailConfirmCodeSend } from './userEmailConfirmCodeSend';
import { userEmailConfirmCode } from './userEmailConfirmCode';
import { userChannelNoticeDelete } from './userChannelNoticeDelete';
import { userChannelNoticeGet } from './userChannelNoticeGet';
import { userChannelNoticeUpdate } from './userChannelNoticeUpdate';

const UsersRouter = Router();

userChannelNoticeGet(UsersRouter);
userChannelNoticeDelete(UsersRouter);
userChannelNoticeUpdate(UsersRouter);

userEmailConfirmCode(UsersRouter);
userEmailConfirmCodeSend(UsersRouter);

register(UsersRouter);
login(UsersRouter);
userUpdate(UsersRouter);

userBlock(UsersRouter);
userUnblock(UsersRouter);

userRegisterFCM(UsersRouter);
userOpenDMChannel(UsersRouter);
userUpdatePresence(UsersRouter);
userDeleteAccount(UsersRouter);

userNotifications(UsersRouter);
userDetails(UsersRouter);

userFollow(UsersRouter);
userUnfollow(UsersRouter);
userFollowers(UsersRouter);
userFollowing(UsersRouter);
userUpdateServerSettings(UsersRouter);

export { UsersRouter };
