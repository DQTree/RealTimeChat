import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useOverlay} from "@/components/context/OverlayContext";
import {useSocket} from "@/components/context/SocketContext";
import {useState} from "react";

export default function ServerCreateForm() {
    const { handleClose } = useOverlay()
    const {createServer, joinServer} = useSocket()
    const [serverName, setServerName] = useState('');
    const [serverDescription, setServerDescription] = useState('');

    return(
        <>
            <Modal.Header closeButton>
                <Modal.Title>Create server</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={serverName}
                            onChange={(e) => setServerName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description"
                            value={serverDescription}
                            onChange={(e) => setServerDescription(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => createServer(serverName, serverDescription)}>
                    Create
                </Button>
                <Button variant="primary" onClick={() => joinServer(serverName)}>
                    Join
                </Button>
            </Modal.Footer>
        </>
    )
}
