
// hooks
import useArray from "../../hooks/useArray";
import TableProvider from "../../provider/TableProvider";

// components
import Table from "../ui/table";


//types
import { Idata} from "../../types";
import { TableRow, useAddNewRow } from "./TableRow";

 


export default function InternalContact({ data }) {
  const { state, updateById, deleteById, push } = useArray<Idata>(data);
   const { handlecick } =  useAddNewRow(updateById,push)
  return (
    <div>
      <TableProvider value={{ updateById, deleteById }}>
        <div className="card">
          <h3 className="card-title">Internal contact</h3>
          <Table>
            <Table.Tbody>
              {state.map((element) => (
                <TableRow key={element.id} element={element} />
              ))}
            </Table.Tbody>
          </Table>
          <div>
            <button onClick={handlecick} >Add new row</button>
          </div>
        </div>
      </TableProvider>
    </div>
  );
}

