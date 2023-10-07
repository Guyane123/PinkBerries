"use client";

import Link from "next/link";
import Image from "next/image";
import Messages from "../../public/message.svg";
import Notifications from "../../public/notification.svg";
import Logo from "../../public/logo.svg";
import styles from "./NavMenu.module.css";
import { usePathname } from "next/navigation";
import { SyntheticEvent } from "react";
import setCookie from "../Categories/actions";
import Menu from "./Menu";

type propsType = {
    currentCategory: String;
    nbrOfNotifications?: Number | undefined | null;
    currentUserId: String;
};
export default function NavMenu({
    currentCategory,
    nbrOfNotifications,
    currentUserId,
}: propsType) {
    const currentPathname = usePathname();
    const isHome = currentPathname == "/" ? true : false;

    function handleChange(e: SyntheticEvent<HTMLSelectElement, Event>) {
        const currentSelection = e.currentTarget.value;

        setCookie("currentCategory", currentSelection);
    }
    return (
        <nav className={styles.nav}>
            <div className={styles.flex}>
                <Link href={"/"} className={styles.a}>
                    <Image src={Logo} alt="logo" height={48} width={117} />
                </Link>

                {isHome ? (
                    <select
                        defaultValue={currentCategory as string}
                        onChange={(e) => handleChange(e)}
                    >
                        <option value="Home">Home</option>
                        <option value="Subscribtions">Subscribtions</option>
                    </select>
                ) : (
                    ""
                )}
            </div>

            <ul className={styles.ul}>
                <li className={styles.li}>
                    <Link href={"/users"}>Users</Link>
                </li>
            </ul>

            <ul className={styles.ul}>
                <li className={styles.li}>
                    <Link href={"/notifications"}>
                        <Image
                            src={Notifications}
                            alt="logo"
                            height={32}
                            width={32}
                        />
                    </Link>
                    {nbrOfNotifications != null ? (
                        <div className={styles.nbrOfNotifications}>
                            {nbrOfNotifications.toString()}
                        </div>
                    ) : (
                        ""
                    )}
                </li>
                <li className={styles.li}>
                    <Link href={"/messages"} className={styles.li}>
                        <Image
                            src={Messages}
                            style={{ display: "inline" }}
                            alt="logo"
                            height={32}
                            width={32}
                        />
                    </Link>
                </li>
                <li className={styles.li}>
                    <Menu currentUserId={currentUserId} />
                </li>
            </ul>
        </nav>
    );
}