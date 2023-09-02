import { prisma } from "@/../lib/prisma";
import UserCard from "../../../components/usercard/UserCard";
import styles from "./page.module.css";
import Post from "../../../components/posts/Post";

export default async function Users() {
    const users = await prisma.user.findMany();

    return (
        <div className={styles.users}>
            {users.map((user) => {
                return <UserCard key={user.id} {...user} />;
            })}
        </div>
    );
}
