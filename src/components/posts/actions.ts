"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/type";

export async function DeletePost(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("unauthorized");

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) throw new Error("Post not found");

  if (post.userId !== user.id) throw new Error("unauthorized");

  const deletedPost = await prisma.post.delete({
    where: { id },
    include: postDataInclude,
  });

  return deletedPost;
}
