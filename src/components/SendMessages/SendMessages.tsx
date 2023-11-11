"use client";

import styles from "./SendMessages.module.css";
import { sendMessage } from "./actions";
import Image from "next/image";
import sendButton from "@/../public/send.svg";
import React, { useRef, useState } from "react";
import { SendMessage } from "../Buttons/Buttons";
import { EmojiList } from "../EmojiList/EmojiList";

type propsType = {
    conversaterId: string;
    conversatingId: string;
    style?: React.CSSProperties | undefined;
};

export default function SendMessages({
    conversaterId,
    conversatingId,
    style = undefined,
}: propsType) {
    const ref = useRef<HTMLTextAreaElement | null>(null);

    const [value, setValue] = useState<string>("");
    const [selectionStart, setSelectionStart] = useState<number>(0);
    function handleSubmit(
        e: React.FormEvent,
        conversatingId: string,
        conversaterId: string
    ) {
        e.preventDefault();
        let conversationId = conversaterId + conversatingId;

        const body = {
            content: value,
            conversaterId: conversaterId,
            conversatingId: conversatingId,
            authorId: conversaterId!,
        };

        if (value) {
            sendMessage(value, conversatingId);
        }

        setValue("");
    }

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        const el = e.target;

        setValue(e.target.value);

        setSelectionStart(e.target.selectionStart);

        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    }

    return (
        <div className={styles.sendMessages}>
            <hr />
            <form
                className={styles.form}
                onSubmit={(e) => handleSubmit(e, conversatingId, conversaterId)}
            >
                <div className={styles.content}>
                    <textarea
                        ref={ref}
                        maxLength={280}
                        className={styles.input}
                        name="text"
                        cols={1}
                        rows={1}
                        onChange={(e) => handleChange(e)}
                        placeholder="New Message..."
                        onClick={(e) =>
                            setSelectionStart(ref.current?.selectionStart!)
                        }
                        value={value}
                    ></textarea>

                    <EmojiList
                        style={style}
                        setValue={setValue}
                        value={value}
                        selectionStart={selectionStart}
                    />
                    <button type="submit" className={styles.btn}>
                        <Image
                            height={32}
                            width={32}
                            src={sendButton}
                            alt="send btn"
                        />
                    </button>
                </div>
            </form>
        </div>
    );
}
