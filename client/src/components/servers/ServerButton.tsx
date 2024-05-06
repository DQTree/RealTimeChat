import {useSocket} from "@/components/context/SocketContext";
import {Button} from "@mui/material";

export default function ServerButton({id, name, image}: {id: number, name: string, image: string}) {
    const {changeServer} = useSocket()

    return(
    )
}
