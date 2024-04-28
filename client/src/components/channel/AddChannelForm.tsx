import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {useOverlay} from "@/components/context/OverlayContext";
import {useSocket} from "@/components/context/SocketContext";
import {channel} from "node:diagnostics_channel";

export default function AddChannelForm() {
    const { handleClose } = useOverlay()
    const {createChannel} = useSocket()
    const [channelName, setChannelName] = useState("");
    const [channelDescription, setChannelDescription] = useState("");

    return(
        <>
            <Modal.Header closeButton>
                <Modal.Title>Create channel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name of the channel"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description of the channel"
                            value={channelDescription}
                            onChange={(e) => setChannelDescription(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => createChannel(channelName, channelDescription)}>
                    Create
                </Button>
            </Modal.Footer>
        </>
    )
}
