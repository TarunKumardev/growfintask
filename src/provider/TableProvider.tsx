import { ReactNode, createContext, useContext } from 'react'
import { ElemntContextType } from '../types';


const  TableContext = createContext<ElemntContextType | undefined>(undefined);

function TableProvider({children , value}: ITableProvider ) {
  return (
    <TableContext.Provider value={value} >
        {children}
    </TableContext.Provider>
  )
}

export default TableProvider

interface ITableProvider{
    children : ReactNode;
    value :ElemntContextType;
}

export function useTable(): ElemntContextType {
    const context = useContext(TableContext);
    if (!context)
        throw new Error("useElement must be used within a ElementContext");
    return context;
}