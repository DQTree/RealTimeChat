import {createContext, MouseEvent, ReactNode, useContext, useState} from "react";
import {Menu, MenuItem} from "@mui/material";

interface ContextMenuContextType {
    openContextMenu: (event: MouseEvent<HTMLDivElement, MouseEvent>, options: ContextMenuOption[]) => void;
    closeContextMenu: () => void;
}

export type ContextMenuOption = {
    label: string;
    action: (...args: any[]) => void;
};

const ContextMenuContext = createContext<ContextMenuContextType | undefined>(undefined);

export function ContextMenuContextProvider({ children }: { children: ReactNode }) {
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [contextMenuOptions, setContextMenuOptions] = useState<ContextMenuOption[]>([]);

    const openContextMenu = (event: MouseEvent<HTMLDivElement, MouseEvent>, options: ContextMenuOption[]) => {
        event.preventDefault();
        setContextMenuOptions(options);
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
        setContextMenuOpen(true);
    };

    const closeContextMenu = () => {
        setContextMenuOptions([]);
        setContextMenuOpen(false);
    };

    return (
        <ContextMenuContext.Provider
            value={{
                openContextMenu,
                closeContextMenu
            }}
        >
            <Menu
                open={contextMenuOpen}
                onClose={closeContextMenu}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenuPosition.y !== 0 && contextMenuPosition.x !== 0
                        ? { top: contextMenuPosition.y, left: contextMenuPosition.x }
                        : undefined
                }
            >
                {contextMenuOptions && contextMenuOptions.map((option, index) => (
                    <MenuItem key={index} onClick={option.action}>
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
            {children}
        </ContextMenuContext.Provider>
    );
}

export function useContextMenu() {
    const context = useContext(ContextMenuContext);
    if (context === undefined) {
        throw new Error('useContextMenu must be used within a ContextMenuProvider');
    }
    return context;
}
