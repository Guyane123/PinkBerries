"use server";

import { cookies } from "next/headers";
import { ConversationType } from "../types";

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