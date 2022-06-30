import { getChannelCache } from '../cache/ChannelCache';
import { getServerMemberCache } from '../cache/ServerMemberCache';
import { emitNotificationDismissed } from '../emits/User';
import { ServerChannelLastSeenModel } from '../models/ServerChannelLastSeenModel';

export const dismissChannelNotification = async (userId: string, channelId: string, emit = true) => {
  const [channel] = await getChannelCache(channelId);
  if (!channel) return;

  if (channel.server) {
    const [serverMember] = await getServerMemberCache(channel.server._id, userId);
    if (!serverMember) return;
    const serverId = channel.server._id;

    await ServerChannelLastSeenModel.updateOne({ user: userId, server: serverId, channel: channelId }, {
      $set: {
        user: userId,
        server: serverId,
        channel: channelId,
        lastSeen: Date.now(),
      }
    }, {upsert: true});
    emit && emitNotificationDismissed(userId, channelId);

    return;
  }

  console.log('Not implemented DM Notifications yet.');
};


export const getLastSeenServerChannelIdsByUserId = async (userId: string) => {
  const results = await ServerChannelLastSeenModel.find({ user: userId }).select('channel lastSeen').lean();

  const lastSeenChannels: Record<string, number> = {};

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    lastSeenChannels[result.channel.toString()] = result.lastSeen;
  }
  return lastSeenChannels;
};