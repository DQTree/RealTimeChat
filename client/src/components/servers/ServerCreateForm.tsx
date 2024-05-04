import {useOverlay} from "@/components/context/OverlayContext";
import {useSocket} from "@/components/context/SocketContext";
import {useState} from "react";
import ImageCropper from "@/components/image/ImageCropper";
import {Button, Container, TextField} from "@mui/material";

export default function ServerCreateForm() {
    const { handleClose } = useOverlay()
    const {createServer, joinServer} = useSocket()
    const [serverId, setServerId] = useState(-1);
    const [serverName, setServerName] = useState('');
    const [serverDescription, setServerDescription] = useState('');
    const [serverIcon, setServerIcon] = useState('');

    const handleCreateServer = () => {
        createServer(serverName, serverDescription, serverIcon);
        handleClose();
    };

    return (
        <Container maxWidth="sm">
            <div>
                <div>
                    <h2>Create server</h2>
                    <Button onClick={handleClose}>Close</Button>
                </div>
                <div>
                    <form>
                        <TextField
                            type="number"
                            label="ID"
                            placeholder="Enter ID to join"
                            value={serverId}
                            onChange={(e) => setServerId(parseInt(e.target.value))}
                            fullWidth
                        />
                        <TextField
                            type="text"
                            label="Name"
                            placeholder="Enter name"
                            value={serverName}
                            onChange={(e) => setServerName(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            type="text"
                            label="Description"
                            placeholder="Enter description"
                            value={serverDescription}
                            onChange={(e) => setServerDescription(e.target.value)}
                            fullWidth
                        />
                        <ImageCropper setServerIcon={setServerIcon} />
                        <Button variant="contained" color="primary" onClick={handleCreateServer}>
                            Create
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => joinServer(serverId)}>
                            Join
                        </Button>
                    </form>
                </div>
            </div>
        </Container>
    );
}
