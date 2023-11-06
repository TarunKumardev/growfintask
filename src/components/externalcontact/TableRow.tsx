import { useState } from 'react';

import { useTable } from "../../provider/TableProvider";
import { useModal } from "../../provider/ModalProvider";
import { useUpdateElement } from "../../hooks/useUpdate";

import Table from "../ui/table";
import { DeleteModal, EditModal } from "../ui/modal/common";

import { UpdateModalProps } from "./types";
import { TableRowProps } from "../../types";
import EditCostumercontact from '../costumeredit';


export function TableRow({ element }: TableRowProps) {
    const { updateById, deleteById } = useTable();
    const { showModal, hideModal } = useModal();
    
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
                    deleteById={deleteById}
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
            <Table.Td >
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


export function DelteModalParent({
    element,
    deleteById,
    hideModal,
  }: UpdateModalProps) {
    const handleDelete = async () => {
      try {
        //! if we have integrated api we can have a api call here to delete the id
        // await updateById(updatedElement._id, updatedElement);
        deleteById(element?.id);
        hideModal(null);
      } catch (error) {
        alert("Update failed. Try again.");
      }
    };
    return (
      <DeleteModal
        handleDelete={handleDelete}
        hideModal={hideModal}
        text="delete internal"
      >
        <h4 className="error">Do you want to delete {element.name}</h4>
      </DeleteModal>
    );
}


export function EditModalParent({ element, updateById, hideModal , push }: UpdateModalProps) {
    const [_, setErrors] = useState({});
    const { updatedElement, handleInputChange, handleSubmit } = useUpdateElement(
      element,
      updateById
    );
  
    const validateForm = () => {
      const newErrors = { name: "", email: "" };
      if (!updatedElement?.name.trim()) newErrors.name = "Name is required";
      if (!updatedElement?.email.trim()) newErrors.email = "Email is required";
      return newErrors;
    };
  
    const handleFormSubmit = async () => {
      const validationErrors = validateForm();
      if (validationErrors?.name || validationErrors?.email) {
        setErrors(validationErrors);
        return;
      }
  
      try {
        //! if we have integrated api we can have a api call here to add or  update
        // await updateById(updatedElement._id, updatedElement);
        if (push) {
          push(updatedElement)
        }
        handleSubmit();
        hideModal(null);
      } catch (error) {
        alert("Update failed. Try again.");
      }
    };
  
    return (
      <EditModal
        hideModal={hideModal}
        handleSubmit={handleFormSubmit}
        text="Edit interrnal contact"
      >
        <EditCostumercontact data={updatedElement} onchange={handleInputChange} />
      </EditModal>
    );
}

export function useAddNewRow(updateById, push){
    const { showModal, hideModal  } = useModal();
    const initialdata =  {
        "id":  Math.random().toString(36).substr(2, 9),
        "image": "https://images.pexels.com/photos/18937801/pexels-photo-18937801/free-photo-of-wanna-play-football-or-drone.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "name": "",
        "role": "",
        "icon": "",
        "email": "",
        "phonenumber" :  "",
        "mobilenumber" : ""
      }
    const handlecick = () => showModal({
        component: (
          <EditModalParent
            element={initialdata}
            updateById={updateById}
            hideModal={hideModal}
            push = {push}
          />
        ),
      });
     return {handlecick}
  }