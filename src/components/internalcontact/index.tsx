//@ts-nocheck
import { useContext, createContext, ReactNode, } from "react";
import useArray from "../../hooks/useArray";
import { useModal } from "../../provider/ModalProvider";
import Table from "../ui/table";
import EditComponent from "../editcompoent";
import { ElemntContextType, Idata, TableRowProps } from "../../types";
import { DeleteModal, EditModal } from "../ui/modal/common";
import { useUpdateElement } from "../../hooks/useUpdate";

const ElementContext = createContext<ElemntContextType | undefined>(undefined);

function useElement(): ElemntContextType {
    const context = useContext(ElementContext);
    if (!context)
        throw new Error("useElement must be used within a ElementContext");
    return context;
}


function TableRow({ element }: TableRowProps) {
    const { showModal, updateById, hideModal, deleteById } = useElement();
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
                <DeleteModal
                    deleteById={() => deleteById(element.id)}
                    hideModal={hideModal}
                    text="delete internalcontact"
                >
                    <h4 style={{ textAlign: "center", color: "red" }}>
                        Do you want to delete {element.name}
                    </h4>
                </DeleteModal>
            ),
    });

    return (
        <Table.Tr >
            <Table.Td>
                <div style={{ width: '50px', height: "50px", borderRadius: '50%', overflow: 'hidden' }}>
                    <img
                        style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }}
                        loading='eager'
                        src={element?.image}
                        alt='Avatar'
                    />
                </div>
            </Table.Td>
            <Table.Td>
                <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "lighter" }}>
                        {element.name}{" "}
                    </h4>
                    <h5 style={{ fontSize: "12px", fontWeight: "lighter" }}>
                        {element.role}
                    </h5>
                </div>
            </Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
            <Table.Td style={{ fontSize: "12px", fontWeight: "lighter" }}>
                {" "}
                {element.email}
            </Table.Td>
            <Table.Td>
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
            </Table.Td>
        </Table.Tr>
    );
}

function EditModalParent({ element, updateById, hideModal }: EditModalProps) {
    const { updatedElement, handleInputChange, handleSubmit } = useUpdateElement(
        element,
        updateById
    );
    return (
        <EditModal
            //@ts-ignore
            updateById={updateById}
            hideModal={hideModal}
            handleSubmit={handleSubmit}
            text="Edit internal contact"
        >
            <EditComponent data={updatedElement} onchange={handleInputChange} />
        </EditModal>
    );
}



export default function InternalContact({data} ) {
    const { showModal, hideModal } = useModal();
    const { state, updateById, deleteById } = useArray<Idata>(data);

    return (
        <div>
            <ElementContext.Provider
                value={{ updateById, showModal, hideModal, deleteById }}
            >
                <div className="card">
                    <h3
                        style={{
                            paddingBottom: "5px",
                            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                            color: "rgb(18,3,56)",
                        }}
                    >
                        Internal contact
                    </h3>
                    <Table>
                        <Table.Tbody>
                            {state.map((element) => (
                                <TableRow key={element.id} element={element} />
                            ))}
                        </Table.Tbody>
                    </Table>
                    <div
                        style={{
                            paddingTop: "5px",
                            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                            color: "rgb(18,3,56)",
                        }}
                    >
                    </div>
                </div>
            </ElementContext.Provider>
        </div>
    );
}

interface EditModalProps {
    element: ReactNode;
    updateById: (id: string | number) => void;
    deleteById: (id: string | number) => void;
    hideModal: () => void;
}