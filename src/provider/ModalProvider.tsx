import { ReactNode, createContext, useCallback, useContext, useRef, useState } from "react";
import ModalPortal from "../utils/ModalPortal";



const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [modals, setModals] = useState<ModalContent[]>(() => []);
    const modalIdRef = useRef(0);
    const showModal = useCallback(({ component }: ModalContent) => {
        modalIdRef.current += 1;
        setModals((prevModals) => [...prevModals, { modalId: modalIdRef.current, component },]);
    }, []);

    const hideModal = useCallback((modalId: number = 0) => {
        const closeModalId = modalId || modalIdRef.current;
        modalIdRef.current -= 1;
        setModals((modalsState) => modalsState.filter((modal) => modal.modalId !== closeModalId));
    }, []);


    const renderModals = () => (
        modals.map((modalContent, index) => {
            return (
                <ModalPortal key={index}>
                    <div
                        onClick={() => hideModal(modalContent.modalId)}
                        className="modal-overlay"
                        key={index}
                    >
                        {modalContent.component}
                    </div>
                </ModalPortal>
            )
        })
    );


    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
            {renderModals()}
        </ModalContext.Provider>
    )

}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}


interface ModalContent {
    modalId?: number;
    component: ReactNode;
}

interface ModalContextType {
    showModal: (modalContent: ModalContent) => void;
    hideModal: (modalId: number | undefined) => void;
}
