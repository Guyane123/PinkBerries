"use server";

import { cookies } from "next/headers";

import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function setCookies(
    conversaterId: String,
    conversatingId: String
) {
    cookies().set("conversaterId", conversaterId.toString());
    cookies().set("conversatingId", conversatingId.toString());
}

export async function getCookies() {
    const cookieStore = cookies();

    const conversatingId = cookieStore.get("conversatingId")?.value.toString();
    const conversaterId = cookieStore.get("conversaterId")?.value.toString();

    const conversation = {
        conversaterId: conversaterId?.toString()!,
        conversatingId: conversatingId?.toString()!,
    };

    return conversation;
}

export async function fetchConversation(conversatingId: string) {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    let conversation = await prisma.conversation.findUnique({
        where: {
            conversatingId_conversaterId: {
                conversaterId: currentUserId,
                conversatingId: conversatingId,
            },
        },

        include: {
            messages: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    conversation = conversation
        ? conversation
        : await prisma.conversation.findUnique({
              where: {
                  conversatingId_conversaterId: {
                      conversaterId: conversatingId,
                      conversatingId: currentUserId,
                  },
              },

              include: {
                  messages: {
                      orderBy: {
                          createdAt: "desc",
                      },
                  },
              },
          });

    return conversation;
}
