import React, { Component } from 'react';
import { CartModel } from '../../../localStorage/cart/CartModel';
import { getEmptyCart, getCart, clearCart } from '../../../localStorage/cart/CartStorage';
import Me from '../../../models/Me';
import { getMe } from '../../../controllers/MeController';
import { Link } from 'react-router-dom';
import { postOrder } from '../../../controllers/OrdersController';
import { postOrderProduct } from '../../../controllers/OrderProductsController';

type OrderFormData = {
    name1: string,
    name2: string,
    email: string,
    country: string,
    city: string,
    address: string,
    postal: string,
}

type OrderRouteState = {
    cart: CartModel,
    me: Me | null,
    form: OrderFormData,
    completed: boolean,
}

class OrderRoute extends Component {

    state: OrderRouteState = {
        cart: getEmptyCart(),
        me: null,
        form: {
            name1: "",
            name2: "",
            email: "",
            country: "",
            city: "",
            address: "",
            postal: "",
        },
        completed: false,
    }

    constructor(props: any) {
        super(props);

        this.finalizeClick = this.finalizeClick.bind(this);
    }

    async componentDidMount() {
        const cart = getCart();
        const me = await getMe();
        const form = me
            ? {
                ...this.state.form,
                name1: me.name,
                name2: me.lastName,
                email: me.email
            }
            : this.state.form;
        this.setState({
            cart,
            me,
            form,
        })
    }

    render() {

        const {
            name1,
            name2,
            email,
            country,
            city,
            address,
            postal,
        } = this.state.form;

        if (this.state.completed) {
            return (
                <div>
                    Ordered successfully :)
                </div>
            )
        }

        return (
            <div>
                <div className="form-group">
                    <label htmlFor="firstname">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        value={name1}
                        onChange={(e) => {
                            this.setState({ form: { ...this.state.form, name1: e.target.value } });
                        }}
                        placeholder="Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Last name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        value={name2}
                        onChange={(e) => {
                            this.setState({ form: { ...this.state.form, name2: e.target.value } });
                        }}
                        placeholder="Last name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => {
                            this.setState({ form: { ...this.state.form, email: e.target.value } });
                        }}
                        placeholder="Email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        className="form-control"
                        id="country"
                        value={country}
                        onChange={(e) => {
                            this.setState({ form: { ...this.state.form, country: e.target.value } });
                        }}
                        placeholder="Country"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        value={city}
                        onChange={(e) => {
                            this.setState({ form: { ...this.state.form, city: e.target.value } });
                        }}
                        placeholder="City"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={address}
                        onChange={(e) => {
                            this.setState({ form: { ...this.state.form, address: e.target.value } });
                        }}
                        placeholder="Address"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="postal">Postal</label>
                    <input
                        type="text"
                        className="form-control"
                        id="postal"
                        value={postal}
                        onChange={(e) => {
                            this.setState({ form: { ...this.state.form, postal: e.target.value } });
                        }}
                        placeholder="Postal"
                    />
                </div>
                <button onClick={this.finalizeClick}>
                    Finalize
                </button>
            </div>
        );
    }

    async finalizeClick() {
        if (Object.values(this.state.form).some(x => !x || x == "") || !this.state.me)
            return;
        const postOrderRes = await postOrder({
            userId: this.state.me.userId,
            createdAt: new Date(),
            country: this.state.form.country,
            city: this.state.form.city,
            address: this.state.form.address,
            postal: this.state.form.postal,
            name1: this.state.form.name1,
            name2: this.state.form.name2,
        })
        console.log(postOrderRes);
        if (!postOrderRes)
            return;
        const { id: orderId } = postOrderRes;
        const cart = getCart();
        const postOrderProductPromises = cart.contains.map((elem) => {
            const { productId, amount } = elem;
            postOrderProduct({
                orderId,
                productId,
                amount,
            })
        })
        await Promise.all(postOrderProductPromises);
        clearCart();
        this.setState({
            completed: true,
        })
    }

}

export default OrderRoute;
