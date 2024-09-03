import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/type";

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user)
      return Response.json(
        {
          error: "Unauthorized",
        },
        { status: 500 },
      );

    const posts = await prisma.post.findMany({
      include: postDataInclude,
      orderBy: { createAt: "desc" },
    });

    return Response.json(posts);
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
