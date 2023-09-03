/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useTransition } from "react";
import DeleteButtonImage from "../../public/trash.svg";
import styles from "./Post.module.css";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

type Props = {
    post: {
        id: string;
        content: string;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    };
    currentUserId: string;
};

export default function DeleteButton({ post, currentUserId }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const [isFetching, setIsFetching] = useState(false);
    const [pending, startTransition] = useTransition();
    const isMutating = isFetching || pending;

    async function handleClick(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        setIsFetching(true);

        const isComment = !!parseInt(post.id);

        console.log(isComment + "dddddddddd");

        if (!isComment) {
            const res = await fetch(`/api/posts?targetPostId=${post.id}`, {
                method: "DELETE",
            });
        } else {
            const pathnames = pathname.split("/");
            const currentPostId = pathnames[pathnames.length - 1];

            console.log(currentPostId);

            const data = {
                currentPostId: currentPostId,
            };

            const res = await fetch(`/api/comment?targetPostId=${post.id}`, {
                method: "DELETE",
                body: JSON.stringify(data),
            });
        }

        setIsFetching(false);

        startTransition(() => router.refresh());
    }

    if (post.authorId == currentUserId) {
        return (
            <button className={styles.btn} onClick={handleClick}>
                <Image
                    src={DeleteButtonImage}
                    alt="Delete Button"
                    width={16}
                    height={16}
                />
            </button>
        );
    }
}