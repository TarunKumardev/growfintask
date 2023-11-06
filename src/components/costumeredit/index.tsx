//types
import { IEditCostumercontactprops } from "./types"
//styles
import "./styles/index.css"

function EditCostumercontact({ data, onchange }: IEditCostumercontactprops) {
    return (
        <>
            <div className="" style={{ padding: "10px" }} >
                <label>
                    <h5>Name of Contact</h5>
                    <br />
                    <input
                        type="text"
                        name="name"
                        placeholder="username"
                        className="edit-input"
                        value={data.name ?? ""}
                        onChange={onchange}
                    />
                </label>
                <label>
                    <h5>Email Address</h5>
                    <br />
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        className="edit-input"
                        value={data.email ?? "" }
                        onChange={onchange}
                    />
                </label>
                <hr style={{ marginTop: "10px" }} />
                <h6 className='text-optional' >optional</h6>
                <label>
                <h5>Job Title</h5>
                    <br />
                    <input
                        type="text"
                        name="role"
                        placeholder="username"
                        className="edit-input"
                        value={data.role ?? ""}
                        onChange={onchange}
                    />
                </label>
                <div className="" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }} >
                    <label>
                             <h5>Phone Number</h5>
                        <br />
                        <input
                            type="text"
                            name="phonenumber"
                            placeholder="username"
                            className="edit-input"
                            value={data.phonenumber ?? ""}
                            onChange={onchange}
                        />
                    </label>
                    <label>
                             <h5>Mobile Number</h5>
                        <br />
                        <input
                            type="text"
                            name="mobilenumber"
                            placeholder="username"
                            className="edit-input"
                            value={data.mobilenumber ?? ""}
                            onChange={onchange}
                        />
                    </label>
                </div>
            </div>
        </>
    )
}

export default EditCostumercontact