import React, { Component } from "react";
import { getAllInventories } from "../../../controllers/InventoryController";
import Inventory from "../../../models/Inventory";

type InventoriesListState = {
    inventories: Inventory[]
}

class InventoriesList extends Component {

    state: InventoriesListState = {
        inventories: []
    }

    async componentDidMount() {
        const inventories = await getAllInventories();
        this.setState({
            inventories
        })
    }

    render() {
        const inventoryRows = this.state.inventories.map((inventory, idx) => (<tr key={idx}>
            <th>{inventory.id}</th>
            <td>{inventory.productId}</td>
            <td>{inventory.inventoryCount}</td>
        </tr>))
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default InventoriesList;
