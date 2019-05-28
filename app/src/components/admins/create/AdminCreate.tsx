import React, { Component, FormEvent } from "react";
import { PostAdminBody, postAdmin } from "../../../controllers/AdminsController";

type AdminCreateState = {
    admin: PostAdminBody
}

class AdminCreate extends Component {

    state: AdminCreateState = {
        admin: {
            email: "",
            password: "",
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.formOnSubmit.bind(this)}>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" value={this.state.admin.email} onChange={e => this.setState({ user: { ...this.state.admin, name: e.target.value } })} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" value={this.state.admin.password} onChange={e => this.setState({ user: { ...this.state.admin, name2: e.target.value } })} />
                    </div>
                    <button className="btn btn-primary mb-2" type="submit">Submit</button>
                </form>
            </div>
        )
    }

    async formOnSubmit(event: FormEvent) {
        event.preventDefault();
        const { admin } = this.state;
        const result = await postAdmin(admin);
        if (!result) {
            console.log('formOnSubmit failed');
            return;
        }
        console.log('formOnSubmit ok');
        this.setState({
            admin: {
                admin: "",
                password: "",
            }
        })
    }
}

export default AdminCreate;
