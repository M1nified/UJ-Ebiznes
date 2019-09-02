import React, { Component } from "react";
import { Link } from "react-router-dom";

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
            </div>
        )
    }
}

export default PanelsList;
