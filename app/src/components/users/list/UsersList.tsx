import React, { Component } from "react";
import { deleteUser, getAllUsers } from "../../../controllers/UsersController";
import User from "../../../models/User";

type UsersListState = {
    users: User[]
}

class UsersList extends Component {

    state: UsersListState = {
        users: []
    }

    async componentDidMount() {
        const users = await getAllUsers();
        this.setState({
            users
        })
    }

    render() {
        const userRows = this.state.users.map((user, idx) => (<tr key={idx}>
            <th>{user.id}</th>
            <td>{user.name}</td>
            <td>{user.name2}</td>
            <td>{user.password}</td>
            <td>{user.email}</td>
            <td>{user.country}</td>
            <td>{user.street}</td>
            <td>{user.city}</td>
            <td>{user.address}</td>
            <td>{user.postal}</td>
            <td><button onClick={this.delete.bind(this, user.id)}>Delete</button></td>
        </tr>))
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Password</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>Street</th>
                            <th>City</th>
                            <th>Address</th>
                            <th>Postal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userRows}
                    </tbody>
                </table>
            </div>
        )
    }

    async delete(id: number) {
        deleteUser(id)
            .then(_ => {
                this.componentDidMount();
            })
            .catch(_ => {
                console.error("Failed to remove.");
            })
    }
}

export default UsersList;
