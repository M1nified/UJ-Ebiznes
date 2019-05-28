import React, { Component, FormEvent } from "react";
import { PostUserBody, postUsers } from "../../../controllers/UsersController";

type UserCreateState = {
    user: PostUserBody
}

class UserCreate extends Component {

    state: UserCreateState = {
        user: {
            name: "",
            name2: "",
            password: "",
            email: "",
            country: "",
            street: "",
            city: "",
            address: "",
            postal: "",
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.formOnSubmit.bind(this)}>
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" value={this.state.user.name} onChange={e => this.setState({ user: { ...this.state.user, name: e.target.value } })} />
                    </div>
                    <div className="form-group">
                        <label>Name2</label>
                        <input className="form-control" value={this.state.user.name2} onChange={e => this.setState({ user: { ...this.state.user, name2: e.target.value } })} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" value={this.state.user.password} onChange={e => this.setState({ user: { ...this.state.user, password: e.target.value } })} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" value={this.state.user.email} onChange={e => this.setState({ user: { ...this.state.user, email: e.target.value } })} />
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <input className="form-control" value={this.state.user.country} onChange={e => this.setState({ user: { ...this.state.user, country: e.target.value } })} />
                    </div>
                    <div className="form-group">
                        <label>Street</label>
                        <input className="form-control" value={this.state.user.street} onChange={e => this.setState({ user: { ...this.state.user, street: e.target.value } })} />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input className="form-control" value={this.state.user.city} onChange={e => this.setState({ user: { ...this.state.user, city: e.target.value } })} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input className="form-control" value={this.state.user.address} onChange={e => this.setState({ user: { ...this.state.user, address: e.target.value } })} />
                    </div>
                    <div className="form-group">
                        <label>Postal</label>
                        <input className="form-control" value={this.state.user.postal} onChange={e => this.setState({ user: { ...this.state.user, postal: e.target.value } })} />
                    </div>
                    <button className="btn btn-primary mb-2" type="submit">Submit</button>
                </form>
            </div>
        )
    }

    async formOnSubmit(event: FormEvent) {
        event.preventDefault();
        const { user } = this.state;
        const result = await postUsers(user);
        if (!result) {
            console.log('formOnSubmit failed');
            return;
        }
        console.log('formOnSubmit ok');
        this.setState({
            user: {
                name: "",
                name2: "",
                password: "",
                email: "",
                country: "",
                street: "",
                city: "",
                address: "",
                postal: "",
            }
        })
    }
}

export default UserCreate;
