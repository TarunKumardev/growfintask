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
                <button  onClick={handleSubmit}
                                    className="edit-btn"
                
                >Submit</button>
            </Modal.Footer>
        </Modal>
    );
}

export function DeleteModal({ children, hideModal, handleDelete , text }: IDeleteModalprops) {
    return (
        <Modal onClose={hideModal}>
            <Modal.Header>
                <h2>{text}</h2>
            </Modal.Header>
            <Modal.Body>
                    {children}
            </Modal.Body>
            <Modal.Footer  >
                <button
                    onClick={handleDelete}
                    className="delete-btn"
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
    handleDelete : () => void;
    text : string
}


interface IEditModalprops{
    children : ReactNode;
    hideModal ?: (id : number | undefined) => void;
    deleteById ?: () => void;
    text :string;
    handleSubmit : () => void;
}