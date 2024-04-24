import {socket} from "@/components/socket";
import {useState} from "react";

export default function TypingIndicator() {
    const [usersTyping, setUsersTyping] = useState([]);



    if (usersTyping.length === 0) {
        return null;
    }

    return (
        <div>
            {usersTyping.map(userId => (
                <p key={userId}>{userId} is typing...</p>
            ))}
        </div>
    );
};
