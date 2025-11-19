import { createChannel, listChannels } from "./routes/channel";
import { createMessage, listMessages } from "./routes/message";
import { createWorkspace, listWorkspaces } from "./routes/workspaces";

export const router = {
  workspace: {
    list: listWorkspaces,
    create: createWorkspace,
  },

  channel: {
    list: listChannels,
    create: createChannel,
  },

  message: {
    list: listMessages,
    create: createMessage,
  },
};
