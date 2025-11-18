import { listWorkspaces } from "./routes/workspaces";

export const router = {
  workspace: {
    list: listWorkspaces,
  },
};
