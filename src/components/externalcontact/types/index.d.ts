export interface UpdateModalProps {
    element: Idata;
    updateById?: (id: number | undefined, newData: Idata) => void;
    deleteById?: (id: number | undefined) => void;
    hideModal?: (id: number | null) => void

}