import { createWorkspace, listWorkspaces } from "./routes/workspaces";

export const router = {
  workspace: {
    list: listWorkspaces,
    create: createWorkspace,
  },
};
