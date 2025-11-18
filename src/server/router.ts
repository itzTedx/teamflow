import { createChannel, listChannels } from "./routes/channel";
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
};
