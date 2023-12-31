"use server";

import { authOptions } from "../src/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CheckSession() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }
}
