import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

import { CreateWorkspace } from "./create-workspace";

const workspaces = [
  {
    id: 1,
    name: "Organization 1",
    avatar: "TF",
  },
  {
    id: 2,
    name: "Organization 2",
    avatar: "TF",
  },
  {
    id: 3,
    name: "Organization 3",
    avatar: "TF",
  },
  {
    id: 4,
    name: "Organization 4",
    avatar: "TF",
  },
];

const colorCombinations = [
  "bg-red-500 hover:bg-blue-600 text-white",
  "bg-emerald-500 hover:bg-emerald-600 text-white",
  "bg-blue-500 hover:bg-blue-600 text-white",
  "bg-purple-500 hover:bg-purple-600 text-white",
  "bg-pink-500 hover:bg-pink-600 text-white",
  "bg-orange-500 hover:bg-orange-600 text-white",
  "bg-yellow-500 hover:bg-yellow-600 text-white",
  "bg-gray-500 hover:bg-gray-600 text-white",
  "bg-black-500 hover:bg-black-600 text-white",
];

const getWorkspaceColor = (id: number) => {
  const charSum = id
    .toString()
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = charSum % colorCombinations.length;

  return colorCombinations[colorIndex];
};

export const WorkspaceList = () => {
  return (
    <TooltipProvider>
      <div className="flex flex-col items-center gap-2">
        {workspaces.map((workspace) => (
          <Tooltip key={workspace.id}>
            <TooltipTrigger asChild>
              <Button className={cn("size-12 transition-all duration-100", getWorkspaceColor(workspace.id))}>
                <span>{workspace.avatar}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{workspace.name}</TooltipContent>
          </Tooltip>
        ))}
        <div className="mt-2">
          <CreateWorkspace />
        </div>
      </div>
    </TooltipProvider>
  );
};
