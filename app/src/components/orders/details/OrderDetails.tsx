import React, { Component } from "react";
import { getAllUsers, getUser } from "../../../controllers/UsersController";
import Order from "../../../models/Order";
import OrderProduct from "../../../models/OrderProduct";
import Product from "../../../models/Product";
import { RouteComponentProps } from "react-router";
import { getOrder } from "../../../controllers/OrdersController";
import { getOrderProductsForOrder } from "../../../controllers/OrderProductsController";
import User from "../../../models/User";
import { getAllProducts } from "../../../controllers/ProductsController";

type OrderDetailsState = {
    products: Product[],
    order: Order | null,
    orderProducts: OrderProduct[],
    user: User | null,
}

type OrderDetailsMatchParams = {
    orderId: string,
}

class OrderDetails extends Component {

    state: OrderDetailsState = {
        products: [],
        order: null,
        orderProducts: [],
        user: null,
    }

    async componentDidMount() {
        const { match: { params: { orderId } } } = this.props as RouteComponentProps<OrderDetailsMatchParams>;
        const order = await getOrder(orderId);
        if (!order) {
            return;
        }
        const user = await getUser(order.userId);
        const orderProducts = await getOrderProductsForOrder(orderId);
        const products = await getAllProducts();
        this.setState({
            order,
            user,
            orderProducts,
            products,
        })
    }

    render() {
        const orderProductRows = this.state.orderProducts.map((orderProduct, idx) => {
            const product = this.state.products.find(x => x.id === orderProduct.productId);
            if (!product) {
                return (<tr key={idx}></tr>)
            }
            return (
                <tr key={idx}>
                    <td>{product.name}</td>
                    <td>{(product.price / 100).toFixed(2)} zl</td>
                    <td>{orderProduct.amount}</td>
                </tr>
            )
        })
        const { user } = this.state;
        if (!user) {
            return (<div></div>)
        }
        return (
            <div>
                {user.name} {user.name2}
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
