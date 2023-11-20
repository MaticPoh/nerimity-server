import { prisma } from '../common/database';
import { generateId } from '../common/flakeId';
import { ChannelType } from '../types/Channel';
import { MessageType } from '../types/Message';
import { createMessage } from './Message';

export enum TicketCategory {
  QUESTION = 0,
  ACCOUNT = 1,
  ABUSE = 2,
  OTHER = 3,
}

export enum TicketStatus {
  WAITING_FOR_MODERATOR_RESPONSE = 0,
  WAITING_FOR_USER_RESPONSE = 1,
  CLOSED_AS_DONE = 2,
  CLOSED_AS_INVALID = 3,
}

interface CreateTicketOpts {
  title: string;
  category: TicketCategory;
  body: string;
  requestedById: string;
}

export const createTicket = async (opts: CreateTicketOpts) => {
  // check if category is valid
  if (!Object.values(TicketCategory).includes(opts.category)) {
    return [null, 'Invalid category'] as const;
  }

  const newChannel = await prisma.channel.create({
    data: {
      id: generateId(),
      type: ChannelType.TICKET,
      createdById: opts.requestedById,
      ticket: {
        create: {
          status: TicketStatus.WAITING_FOR_MODERATOR_RESPONSE,
          category: opts.category,
          title: opts.title,
          openedById: opts.requestedById,
        },
      },
    },
    include: {
      ticket: true,
    },
  });

  await createMessage({
    channelId: newChannel.id,
    type: MessageType.CONTENT,
    userId: opts.requestedById,
    content: opts.body,
  });

  return [newChannel.ticket, null] as const;
};

export const getOwnTickets = async (userId: string) => {
  const tickets = await prisma.ticket.findMany({
    where: { openedById: userId },
    orderBy: { openedAt: 'desc' },
    select: {
      id: true,
      status: true,
      category: true,
      title: true,
      openedAt: true,
      channelId: true,
      lastUpdatedAt: true,
    },
  });
  return tickets;
};

export const getTicketById = async (ticketId: string, userId: string) => {
  const ticket = await prisma.ticket.findFirst({
    where: { openedById: userId, id: parseInt(ticketId) },
    select: {
      id: true,
      status: true,
      category: true,
      title: true,
      openedAt: true,
      channelId: true,
      lastUpdatedAt: true,
    },
  });
  return ticket;
};
