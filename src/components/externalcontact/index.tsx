//@ts-nocheck
import { useState, type ReactNode } from "react";

// hooks
import useArray from "../../hooks/useArray";
import { useUpdateElement } from "../../hooks/useUpdate";
import { useModal } from "../../provider/ModalProvider";
import TableProvider, { useTable } from "../../provider/TableProvider";

// components
import Table from "../ui/table";
import { DeleteModal, EditModal } from "../ui/modal/common";
import EditComponent from "../editcompoent";

//types
import { Idata, TableRowProps } from "../../types";




function TableRow({ element }: TableRowProps) {    
    const { showModal, updateById, hideModal, deleteById } = useTable();
    
    const handleEditClick = () =>
        showModal({
            component: (
                <EditModalParent
                    element={element}
                    updateById={updateById}
                    hideModal={hideModal}
                    deleteById={deleteById}
                />
            ),
    });

    const handelDelte = () =>
        showModal({
            component: (
                <DelteModalParent
                element={element}
                deleteById = {deleteById}
                hideModal={hideModal}
                />
            ),
    });

    return (
        <Table.Tr>
        <Table.Td>
            <div>
                <h4 className='tableHeader'>
                    {element.name}{" "}
                </h4>
                <h5 className='tableSubheader'>
                    {element.role}
                </h5>
            </div>
        </Table.Td>
        <Table.Td>{element.symbol}</Table.Td>
        <Table.Td className='tableSubheader'>
            {element.email}
        </Table.Td>
        <Table.Td>
            <button className="actionBtn" onClick={handleEditClick}>
                Edit
            </button>
        </Table.Td>
        <Table.Td>
            <button className="actionBtn" onClick={handelDelte}>
                Delete
            </button>
        </Table.Td>
        </Table.Tr>
    );
}

function EditModalParent({ element, updateById, hideModal }: UpdateModalProps) {
    const [_, setErrors] = useState({});
    const { updatedElement, handleInputChange, handleSubmit } = useUpdateElement(
        element,
        updateById
    );
  
    const validateForm = () => {
        const newErrors = {name: "", email: ""};
        if (!updatedElement.name.trim()) newErrors.name = "Name is required";
        if (!updatedElement.email.trim()) newErrors.email = "Email is required";
        return newErrors;
    };
    
    const handleFormSubmit = async () => {
        const validationErrors = validateForm();
        if (validationErrors?.name || validationErrors?.email) {
            setErrors(validationErrors);
            return;
        }

        try {
            //! if we have integrated api we can have a api call here to update
            // await updateById(updatedElement._id, updatedElement);
            handleSubmit()
            hideModal();
        } catch (error) {
            alert('Update failed. Try again.');
        }
    };
    
    return (
        <EditModal
            updateById={updateById}
            hideModal={hideModal}
            handleSubmit={handleFormSubmit}
            text="Edit external contact"
        >
            <EditComponent data={updatedElement} onchange={handleInputChange} />
        </EditModal>
    );
}

export function DelteModalParent({ element, deleteById, hideModal }: UpdateModalProps){
const handleDelete = async () => {
        try {
            //! if we have integrated api we can have a api call here to delete the id
            // await updateById(updatedElement._id, updatedElement);
            deleteById(element.id)
            hideModal();
        } catch (error) {
            alert('Update failed. Try again.');
        }
    };
     return (
        <DeleteModal
        handleDelete={handleDelete}
        hideModal={hideModal}
        text="delete externalcontact"
    >
        <h4 className="error" >
            Do you want to delete {element.name}
        </h4>
    </DeleteModal>
     )
}

export default function ExternalContact({data} ) {
    const { showModal, hideModal } = useModal();
    const { state, updateById, deleteById } = useArray<Idata>(data);
    return (
        <div>
            <TableProvider
                value={{ updateById, showModal, hideModal, deleteById }}
            >
                <div className="card">
                    <h3 className="card-title"  >
                        external contact
                    </h3>
                    <Table>
                        <Table.Tbody>
                            {state.map((element) => (
                                <TableRow key={element.id} element={element} />
                            ))}
                        </Table.Tbody>
                    </Table>
                </div>
            </TableProvider>
        </div>
    );
}

interface UpdateModalProps {
    element: ReactNode;
    updateById: (id: string | number) => void;
    deleteById: (id: string | number) => void;
    hideModal: () => void;
}