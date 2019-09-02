import React, { Component, FormEvent } from "react";
import { Link, Route } from "react-router-dom";
import AdminsList from "../admins/list/AdminsList";
import AdminCreate from "../admins/create/AdminCreate";
import UsersList from "../users/list/UsersList";
import UserCreate from "../users/create/UserCreate";
import InventoriesList from "../inventories/list/InventoriesList";
import InventoryCreate from "../inventories/create/InventoryCreate";
import ProductsList from "../products/list/ProductsList";
import ProductCreate from "../products/create/ProductCreate";
import CategoriesList from "../categories/list/CategoriesList";
import CategoryCreate from "../categories/create/CategoryCreate";
import CategoryDetails from "../categories/details/CategoryDetails";
import OrdersList from "../orders/list/OrdersList";
import OrderDetails from "../orders/details/OrderDetails";
import OrderCreate from "../orders/create/OrderCreate";
import OrderProductsList from "../orderProducts/list/OrderProductsList";

class PanelsList extends Component {

    render() {
        return (
            <div>

                <div>
                    <Link to="/users">Users list</Link>
                    <Link to="/userAdd">User add</Link>
                </div>
                <div>
                    <Link to="/admins">Admins list</Link>
                    <Link to="/adminAdd">Admin add</Link>
                </div>
                <div>
                    <Link to="/products">Products list</Link>
                    <Link to="/productAdd">Add product</Link>
                </div>
                <div>
                    <Link to="/inventories">Inventories list</Link>
                    <Link to="/inventoryAdd">Add inventory</Link>
                </div>
                <div>
                    <Link to="/categories">Categories list</Link>
                    <Link to="/categoryAdd">Add category</Link>
                </div>
                <div>
                    <Link to="/orders">Orders list</Link>
                    <Link to="/orderAdd">Order add</Link>
                </div>
                <div>
                    <Link to="/orderProducts">OrderProducts list</Link>
                    <Link to="/orderProductAdd">OrderProduct add</Link>
                </div>
                {/* <Route path="/" component={} /> */}
                <Route path="/admins" component={AdminsList} />
                <Route path="/adminAdd" component={AdminCreate} />
                <Route path="/users" component={UsersList} />
                <Route path="/userAdd" component={UserCreate} />
                <Route path="/inventories" component={InventoriesList} />
                <Route path="/inventoryAdd" component={InventoryCreate} />
                <Route path="/products" component={ProductsList} />
                <Route path="/productAdd" component={ProductCreate} />
                <Route path="/categories" component={CategoriesList} />
                <Route path="/categoryAdd" component={CategoryCreate} />
                <Route path="/category/:categoryId" component={CategoryDetails} />
                <Route path="/orders" component={OrdersList} />
                <Route path="/order/:orderId" component={OrderDetails} />
                <Route path="/orderAdd" component={OrderCreate} />
                <Route path="/orderProducts" component={OrderProductsList} />
                <Route path="/orderProductAdd" component={PanelsList} />
            </div>
        )
    }
}

export default PanelsList;
