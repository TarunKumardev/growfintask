import { Idata } from "../../types";
import staticjsondata from "../../data/index.json"

function Editcomponent({ data, onchange }: { data: Idata, onchange: (value: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="edit-component">
      <label>
        User:
        <br />
        <select
          className="edit-input"
          value={data.name}
          name="name"
          onInput={onchange}
        >
          {staticjsondata.map((data) => {
            return (
              <option key={data.id} value={data.name} >{data.name}</option>
            )
          })}
        </select>
      </label>
      <label>
        User Email:
        <br />
        <input
          type="text"
          name="email"
          placeholder="email"
          className="edit-input"
          value={data.email}
          onChange={onchange}
        />
      </label>
    </div>
  );
}

export default Editcomponent;
