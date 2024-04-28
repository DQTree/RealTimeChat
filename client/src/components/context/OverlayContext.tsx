import {createContext, ReactNode, useContext, useState} from "react";

import './overlay.css'
import Modal from "react-bootstrap/Modal";

interface OverlayContextType {
    handleClose: () => void;
    handleShow: (modal: ReactNode) => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: ReactNode }) {
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState<ReactNode>(null);

    const handleClose = () => setShow(false);
    const handleShow = (modal: ReactNode) => {
        setModal(modal);
        setShow(true)
    };

    return (
        <OverlayContext.Provider
            value={{
                handleClose,
                handleShow
            }}
        >
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                {modal}
            </Modal>
            {children}
        </OverlayContext.Provider>
    )
}

export function useOverlay() {
    const context = useContext(OverlayContext);
    if (context === undefined) {
        throw new Error('useOverlay must be used within a OverlayProvider');
    }
    return context;
}
