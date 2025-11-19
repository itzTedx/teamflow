"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { isDefinedError } from "@orpc/client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { orpc } from "@/lib/orpc/client";
import { MessageType, messageSchema } from "@/schema/message";

import { MessageComposer } from "./message-composer";

interface MessageInputFormProps {
  channelId: string;
}

export const MessageInputForm = ({ channelId }: MessageInputFormProps) => {
  const form = useForm<MessageType>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      channelId,
      content: "",
      imageUrl: undefined,
    },
  });

  const createMessage = useMutation(
    orpc.message.create.mutationOptions({
      onSuccess: () => {
        toast.success("Message sent");
      },
      onError: (error) => {
        if (isDefinedError(error)) {
          toast.error(error.message);
        }
      },
    })
  );

  const onSubmit = (data: MessageType) => {
    createMessage.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MessageComposer field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
