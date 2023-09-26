/* eslint-disable @next/next/no-img-element */

"use client";
import { useState, useTransition } from "react";
import DeleteButtonImage from "../../public/trash.svg";
import styles from "./NewComment.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { deletePost } from "../Post/actions";
import { PostType } from "@/app/types";

type Props = {
    post: PostType;
    currentUserId: string;
};

export default function DeleteButton({ post, currentUserId }: Props) {
    if (post.authorId == currentUserId) {
        return (
            <button className={styles.btn} onClick={() => deletePost(post.id)}>
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
