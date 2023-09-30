import { getServerSession } from "next-auth";
import { NotificationsModule } from "../../../components/Notifications/Notifications";
import { fetchNotifications } from "./actions";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

export default async function Notifications() {
    const notifications = await fetchNotifications();

    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    return (
        <div>
            <NotificationsModule notifications={notifications!} />
        </div>
    );
}
