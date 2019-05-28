import React, { Component } from "react";
import User from "../../../models/User";
import { getAllUsers } from "../../../controllers/UsersController";

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
            <td>{user.name}</td>
            <td>{user.name2}</td>
        </tr>))
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Lastname</td>
                        </tr>
                    </thead>
                    <tbody>
                        {userRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UsersList;
