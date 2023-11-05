//@ts-nocheck
import { useContext, createContext } from "react";
import useArray from "../../hooks/useArray";
import { useModal } from "../../provider/ModalProvider";
import Table from "../ui/table";
import EditComponent from "../editcompoent";
import { EditModalProps, ElemntContextType, TableRowProps } from "../../types";
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
                    element={element}
                    updateById={updateById}
                    deleteById={() => deleteById(element.id)}
                    hideModal={hideModal}
                    text="delete external contact"

                >
                    <h4 style={{ textAlign: "center", color: "red" }}>
                        Do you want to delete {element.name}
                    </h4>
                </DeleteModal>
            ),
    });

    return (
        <Table.Tr className={"pr-a"}>
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
                {element.email}
            </Table.Td>
            <Table.Td>
                <Table.Td>
                    <button className="actionBtn" onClick={handleEditClick}>
                        Edit
                    </button>
                </Table.Td>
                <Table.Td>
                    <button className="actionBtn" onClick={() => handelDelte(element)}>
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
            element={element}
            updateById={updateById}
            hideModal={hideModal}
            handleSubmit={handleSubmit}
            text="Edit extenal component"
        >
            <EditComponent data={updatedElement} onchange={handleInputChange} />
        </EditModal>
    );
}

export default function ExternalContact({data}) {
    const { showModal, hideModal } = useModal();
    const { state, updateById, deleteById } = useArray<Element>(data);

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
                        External contact
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
