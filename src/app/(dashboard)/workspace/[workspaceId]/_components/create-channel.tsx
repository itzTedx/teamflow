"use client";

import { useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { isDefinedError } from "@orpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";

import { orpc } from "@/lib/orpc/client";
import { cn } from "@/lib/utils";
import { ChannelSchema, channelSchema, transformChannelName } from "@/schema/channel";

interface Props {
  className?: string;
}

export const CreateChannel = ({ className }: Props) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const form = useForm<ChannelSchema>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      name: "",
    },
  });

  const createChannel = useMutation(
    orpc.channel.create.mutationOptions({
      onSuccess: (newChannel) => {
        toast.success("Channel created", {
          description: `Channel ${newChannel.name} created successfully`,
        });

        queryClient.invalidateQueries({
          queryKey: orpc.channel.list.queryKey(),
        });

        form.reset();
        setOpen(false);

        router.push(`/workspace/${workspaceId}/channel/${newChannel.id}`);
      },

      onError: (error) => {
        if (isDefinedError(error)) {
          if (error.code === "NOT_FOUND") {
            toast.error("Oops! Something went wrong.", { description: error.message });
            return;
          }
          toast.error("Failed to create channel, try again later!", { description: error.message });
          return;
        }
        toast.error(error.message);
      },
    })
  );

  const watchedName = form.watch("name");
  const transformedName = watchedName ? transformChannelName(watchedName) : "";

  function onSubmit(data: ChannelSchema) {
    createChannel.mutate(data);
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className={cn("w-full", className)} variant="outline">
          <Plus className="size-4" /> Create Channel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>
          <DialogDescription>Create a new channel to start a conversation.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Channel" {...field} />
                  </FormControl>
                  {transformedName && transformedName !== watchedName && (
                    <p className="mt-1.5 text-muted-foreground text-sm">
                      Will be transformed to:{" "}
                      <span className="rounded bg-muted px-1 py-0.5 text-xs">{transformedName}</span>
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={createChannel.isPending} type="submit">
              <LoadingSwap isLoading={createChannel.isPending}>Create new channel</LoadingSwap>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
