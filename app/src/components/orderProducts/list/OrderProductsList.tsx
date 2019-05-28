import React, { Component } from "react";
import { getAllOrderProducts, deleteOrderProduct } from "../../../controllers/OrderProductsController";
import OrderProduct from "../../../models/OrderProduct";

type OrderProductssListState = {
    orderProducts: OrderProduct[],
}

class OrderProductsList extends Component {

    state: OrderProductssListState = {
        orderProducts: [],
    }

    async componentDidMount() {
        const orderProducts = await getAllOrderProducts();
        this.setState({
            orderProducts,
        })
    }

    render() {
        const orderProductRows = this.state.orderProducts.map((orderProduct, idx) => {
            return (
                <tr key={idx}>
                    <th>{orderProduct.id}</th>
                    <td>{orderProduct.orderId}</td>
                    <td>{orderProduct.productId}</td>
                    <td>{orderProduct.amount}</td>
                    <td><button onClick={this.delete.bind(this, orderProduct.id)}>Delete</button></td>
                </tr>
            )
        })
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order</th>
                            <th>Product</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderProductRows}
                    </tbody>
                </table>
            </div>
        )
    }

    async delete(id: number) {
        deleteOrderProduct(id)
            .then(_ => {
                this.componentDidMount();
            })
            .catch(_ => {
                console.error("Failed to remove.");
            })
    }

}

export default OrderProductsList;
