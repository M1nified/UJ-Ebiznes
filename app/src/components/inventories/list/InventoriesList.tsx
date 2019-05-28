import React, { Component } from "react";
import { deleteInventory, getAllInventories } from "../../../controllers/InventoryController";
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
            <td><button onClick={this.delete.bind(this, inventory.id)}>Delete</button></td>
        </tr>))
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product</th>
                            <th>Count</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryRows}
                    </tbody>
                </table>
            </div>
        )
    }

    async delete(id: number) {
        deleteInventory(id)
            .then(_ => {
                this.componentDidMount();
            })
            .catch(_ => {
                console.error("Failed to remove.");
            })
    }
}

export default InventoriesList;
