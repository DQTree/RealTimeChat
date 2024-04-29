import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useOverlay} from "@/components/context/OverlayContext";
import {Form} from "react-bootstrap";
import {useSocket} from "@/components/context/SocketContext";
import {useState} from "react";
import ImageCrop from "@/components/image/ImageCropper";
import ImageCropper from "@/components/image/ImageCropper";

export default function LoginForm() {
    const { handleClose } = useOverlay()
    const {login} = useSocket()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => login(username)}>
                    Login
                </Button>
            </Modal.Footer>
        </>
    )
}
