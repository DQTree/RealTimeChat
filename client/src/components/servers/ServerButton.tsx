import {useSocket} from "@/components/context/SocketContext";
import {Button} from "@mui/material";

export default function ServerButton({id, name, image}: {id: number, name: string, image: string}) {
    const {changeServer} = useSocket()

    return(
        <Button className="server" id={name} onClick={() => {changeServer(id)}}>
            {image ? <img src={image} alt={name} /> : name[0]}
        </Button>
    )
}
