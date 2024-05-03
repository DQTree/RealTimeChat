import {useState} from "react";
import {useOverlay} from "@/components/context/OverlayContext";
import {useSocket} from "@/components/context/SocketContext";
import {Button, Container, TextField} from "@mui/material";

export default function AddChannelForm() {
    const { handleClose } = useOverlay()
    const {createChannel} = useSocket()
    const [channelName, setChannelName] = useState("");
    const [channelDescription, setChannelDescription] = useState("");

    const handleCreateChannel = () => {
        createChannel(channelName, channelDescription);
        handleClose();
    };

    return (
        <Container maxWidth="sm">
            <div>
                <div>
                    <h2>Create channel</h2>
                    <Button onClick={handleClose}>Close</Button>
                </div>
                <div>
                    <form>
                        <TextField
                            type="text"
                            label="Name"
                            placeholder="Enter name of the channel"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            type="text"
                            label="Description"
                            placeholder="Enter description of the channel"
                            value={channelDescription}
                            onChange={(e) => setChannelDescription(e.target.value)}
                            fullWidth
                        />
                        <Button variant="contained" color="primary" onClick={handleCreateChannel}>
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Container>
    );
}
