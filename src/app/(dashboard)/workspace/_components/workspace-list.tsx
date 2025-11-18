"use client";

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { orpc } from "@/lib/orpc/client";
import { cn } from "@/lib/utils";

import { CreateWorkspace } from "./create-workspace";

const colorCombinations = [
  "bg-red-500 hover:bg-red-600 text-white",
  "bg-emerald-500 hover:bg-emerald-600 text-white",
  "bg-blue-500 hover:bg-blue-600 text-white",
  "bg-purple-500 hover:bg-purple-600 text-white",
  "bg-pink-500 hover:bg-pink-600 text-white",
  "bg-orange-500 hover:bg-orange-600 text-white",
  "bg-yellow-500 hover:bg-yellow-600 text-black",
  "bg-gray-500 hover:bg-gray-600 text-white",
];

const getWorkspaceColor = (id: string) => {
  const charSum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = charSum % colorCombinations.length;

  return colorCombinations[colorIndex];
};

export const WorkspaceList = () => {
  const {
    data: { workspaces, currentWorkspace },
  } = useSuspenseQuery(orpc.workspace.list.queryOptions());
  return (
    <TooltipProvider>
      <div className="flex flex-col items-center gap-2">
        {workspaces.map((workspace) => {
          const isActive = currentWorkspace?.orgCode === workspace.id;

          return (
            <Tooltip key={workspace.id}>
              <TooltipTrigger asChild>
                <LoginLink orgCode={workspace.id}>
                  <Button
                    className={cn(
                      "size-12 transition-all duration-100",
                      getWorkspaceColor(workspace.id),
                      isActive ? "rounded-lg" : "rounded-xl transition-all hover:rounded-lg"
                    )}
                  >
                    <span>{workspace.avatar}</span>
                  </Button>
                </LoginLink>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{isActive ? "Current Workspace" : workspace.name}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
        <div className="mt-2">
          <CreateWorkspace />
        </div>
      </div>
    </TooltipProvider>
  );
};
