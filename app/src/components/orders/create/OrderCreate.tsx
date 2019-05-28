import React, { Component, FormEvent } from "react";
import { postOrder, PostOrderBody } from "../../../controllers/OrdersController";

type OrderCreateState = {
    order: PostOrderBody,
}

class OrderCreate extends Component {

    state: OrderCreateState = {
        order: {
            createdAt: new Date(),
            userId: -1,
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.formOnSubmit.bind(this)}>
                    <div className="form-group">
                        <label>User</label>
                        <input className="form-control" value={this.state.order.userId} onChange={e => this.setState({ order: { ...this.state.order, userId: e.target.value } })} />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input className="form-control" value={this.state.order.createdAt.toString()} onChange={e => this.setState({ order: { ...this.state.order, createdAt: e.target.value } })} type="date"/>
                    </div>
                    <button className="btn btn-primary mb-2" type="submit">Submit</button>
                </form>
            </div>
        )
    }

    async formOnSubmit(event: FormEvent) {
        event.preventDefault();
        const { order } = this.state;
        const result = await postOrder(order);
        if (!result) {
            console.log('formOnSubmit failed');
            return;
        }
        console.log('formOnSubmit ok');
        this.setState({
            order: {
                createdAt: new Date(),
                userId: -1,
            }
        })
    }
}

export default OrderCreate;
