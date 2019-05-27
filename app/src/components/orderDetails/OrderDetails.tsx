import React, { Component } from "react";
import { getAllUsers } from "../../controllers/UsersController";
import Order from "../../models/Order";
import OrderProduct from "../../models/OrderProduct";
import Product from "../../models/Product";

type OrderDetailsState = {
    productsMap: { [id: number]: Product },
    order: Order | null,
    orderProducts: OrderProduct[],
}

class OrderDetails extends Component {

    state: OrderDetailsState = {
        productsMap: {},
        order: null,
        orderProducts: []
    }

    async componentDidMount() {
        const users = await getAllUsers();
        this.setState({
            users
        })
    }

    render() {
        const orderProductRows = this.state.orderProducts.map((orderProduct, idx) => {
            const product = this.state.productsMap[orderProduct.productId as number];
            return (<tr key={idx}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{orderProduct.amount}</td>
            </tr>)
        })
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        {orderProductRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default OrderDetails;
