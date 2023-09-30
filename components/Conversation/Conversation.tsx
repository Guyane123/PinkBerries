import { ConversationType } from "@/app/types";
import { prisma } from "../../lib/prisma";
import ConversationClient from "./ConversationClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type propsType = {
    conversation: ConversationType;
    // onConversationChange: any;
};

export default async function Conversation({ conversation }: propsType) {
    const session = await getServerSession(authOptions);

    const currentUserEmail = session?.user?.email;

    const currentUserId = await prisma.user
        .findUnique({ where: { email: currentUserEmail! } })
        .then((user) => user?.id);

    const conversatingUser = await prisma.user.findUnique({
        where: {
            id:
                conversation.conversaterId == currentUserId
                    ? conversation.conversatingId
                    : conversation.conversaterId,
        },
    });
    const conversaterUser = await prisma.user.findUnique({
        where: { id: currentUserId },
    });

    const conversaterId =
        conversation.conversaterId == currentUserId
            ? conversation.conversatingId
            : conversation.conversaterId;

    const messages = await prisma.messages.findMany({
        where: {
            conversationId:
                conversation.conversaterId + conversation.conversatingId,
        },
    });

    return (
        <ConversationClient
            lastMessage={messages[messages.length - 1]!}
            conversation={conversation}
            currentUserId={currentUserId!}
            conversatingUser={conversatingUser!}
        />
    );
}