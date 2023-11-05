import { ReactNode } from "react";
import Modal from "..";


export function EditModal({ children, text, hideModal, handleSubmit }: IEditModalprops) {
    return (
        <Modal onClose={hideModal}>
            <Modal.Header>
                <h5>{text}</h5>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <button onClick={() => {
                    handleSubmit()
                    hideModal(undefined)
                }}>Submit</button>
            </Modal.Footer>
        </Modal>
    );
}


export function DeleteModal({ children, hideModal, deleteById , text }: IDeleteModalprops) {
    return (
        <Modal onClose={hideModal}>
            <Modal.Header>
                <h2>{text}</h2>
            </Modal.Header>
            <Modal.Body>
                <h4 style={{ textAlign: "center", color: "red" }}>
                    {children}
                </h4>
            </Modal.Body>
            <Modal.Footer>
                <button
                    onClick={() => {
                        deleteById();
                        hideModal(undefined);
                    }}
                >
                    Delete
                </button>
            </Modal.Footer>
        </Modal>
    );
}

interface IDeleteModalprops{
    children : ReactNode;
    hideModal : (id : number | undefined) => void;
    deleteById : () => void;
    text : string
}


interface IEditModalprops{
    children : ReactNode;
    hideModal : (id : number | undefined) => void;
    deleteById : () => void;
    text :string;
    handleSubmit : () => void;
}