import { ReactNode } from "react";

export type ElemntContextType = {
    updateById: (id: number, newElement: Element) => void;
    showModal: () => void;
    hideModal: (id: number | undefined) => void;
    deleteById : (id: number) => void
};


export type ElemntContextType = {
    updateById: (id: number, newElement: Element) => void;
    showModal: () => void;
    hideModal: (id: number | undefined) => void;
    deleteById : (id: number) => void
};




export type TableRowProps = {
    element: InternalData ;
}

export interface Idata {
    id:           number;
    image:        string;
    name:         string;
    symbol ?:    ReactNode
    role?:        string;
    designation?: string[];
    icon:         string;
    email:        string;
}


export type EditModalProps = {
    element: Element;
    updateById: (id: number, newElement: Element) => void;
    hideModal: () => void;
}