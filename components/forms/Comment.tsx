"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { CommentValidation } from "@/lib/validations/thread";
import { usePathname } from "next/navigation";
import { addCommentToThread } from "@/lib/actions/thread.action";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "../ui/input";
import Image from "next/image";

interface CommentProps {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({ currentUserImg, threadId, currentUserId }: CommentProps) => {
  const pathname = usePathname();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    try {
      await addCommentToThread(
        threadId,
        values.thread,
        JSON.parse(currentUserId),
        pathname
      );

      form.reset();
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full space-y-0">
              <FormLabel className="relative w-[48px] aspect-square">
                <Image
                  src={currentUserImg}
                  alt={"profile image"}
                  fill
                  className="rounded-full"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  placeholder="Add a comment..."
                  type="text"
                  {...field}
                  disabled={isSubmitting}
                  className="no-focus text-light-1 outline-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          className="comment-form_btn"
        >
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
