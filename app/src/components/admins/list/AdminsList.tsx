import React, { Component } from "react";
import Admin from "../../../models/Admin";
import { getAllAdmins } from "../../../controllers/AdminsController";

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
        </tr>))
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            {/* <th>Password</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {adminRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AdminsList;
