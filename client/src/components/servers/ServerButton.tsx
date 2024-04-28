import {useSocket} from "@/components/context/SocketContext";

export default function ServerButton({id, name, image}: {id: number, name: string, image: string}) {
    const {changeServer} = useSocket()

    return(
        <button className="server" id={name} onClick={() => {changeServer(id)}}>
            {name}
        </button>
    )
}
