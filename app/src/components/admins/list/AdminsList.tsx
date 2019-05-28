import React, { Component } from "react";
import Admin from "../../../models/Admin";
import { getAllAdmins, deleteAdmin } from "../../../controllers/AdminsController";

type AdminsListState = {
    admins: Admin[]
}

class AdminsList extends Component {

    state: AdminsListState = {
        admins: []
    }

    async componentDidMount() {
        const users = await getAllAdmins();
        this.setState({
            users
        })
    }

    render() {
        const adminRows = this.state.admins.map((admin, idx) => (<tr key={idx}>
            <th>{admin.id}</th>
            <td>{admin.email}</td>
            {/* <td>{user.password}</td> */}
            <td><button onClick={this.delete.bind(this, admin.id)}>Delete</button></td>
        </tr>))
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            {/* <th>Password</th> */}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminRows}
                    </tbody>
                </table>
            </div>
        )
    }

    async delete(id: number) {
        deleteAdmin(id)
            .then(_ => {
                this.componentDidMount();
            })
            .catch(_ => {
                console.error("Failed to remove.");
            })
    }
}

export default AdminsList;
