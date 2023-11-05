import { Idata } from "../../types";

function Editcomponent({ data, onchange }: { data: Idata, onchange: (value: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="edit-component">
      <label>
        User:
        <br />
        <input
          type="text"
          name="name"
          placeholder="username"
          className="edit-input"
          value={data.name}
          onChange={onchange}
        />
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
