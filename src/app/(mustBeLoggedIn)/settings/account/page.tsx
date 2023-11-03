import { prisma } from "@/../lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ProfileForm } from "./ProfileForm";
export default async function SettingsPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const currentEmail = session?.user?.email!;

    const user = prisma.user.findUnique({ where: { email: currentEmail } });

    const settings = [
        {
            name: "Your profile",
            link: "account",
        },
        {
            name: "Notifications",
            link: "notifications",
        },
    ];

    return <ProfileForm user={user} />;
}
