import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../controllers/OrdersController";
import Order from "../../models/Order";

type OrdersListState = {
    orders: Order[]
}

class OrdersList extends Component {

    state: OrdersListState = {
        orders: []
    }

    async componentDidMount() {
        const orders = await getAllOrders();
        this.setState({
            orders
        })
    }

    render() {
        const orderRows = this.state.orders.map((order, idx) => (
            <tr key={idx}>
                <td>{order.id}</td>
                <td><Link to={`/order/${order.id}`} >Details</Link></td>
            </tr>
        ))
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Order ID</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {orderRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default OrdersList;
