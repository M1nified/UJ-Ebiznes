import React, { Component, FormEvent } from "react";
import { postOrderProduct, PostOrderProductBody } from "../../../controllers/OrderProductsController";

type OrderProductCreateState = {
    orderProduct: PostOrderProductBody,
}

class OrderProductCreate extends Component {

    state: OrderProductCreateState = {
        orderProduct: {
            orderId: -1,
            productId: -1,
            amount: -1
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.formOnSubmit.bind(this)}>
                    <div className="form-group">
                        <label>User</label>
                        <input className="form-control" value={this.state.orderProduct.orderId} onChange={e => this.setState({ order: { ...this.state.orderProduct, orderId: e.target.value } })} />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input className="form-control" value={this.state.orderProduct.productId} onChange={e => this.setState({ order: { ...this.state.orderProduct, productId: e.target.value } })} />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input className="form-control" value={this.state.orderProduct.amount} onChange={e => this.setState({ order: { ...this.state.orderProduct, amount: e.target.value } })} />
                    </div>
                    <button className="btn btn-primary mb-2" type="submit">Submit</button>
                </form>
            </div>
        )
    }

    async formOnSubmit(event: FormEvent) {
        event.preventDefault();
        const { orderProduct } = this.state;
        const result = await postOrderProduct(orderProduct);
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

export default OrderProductCreate;
