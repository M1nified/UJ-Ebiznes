import React, { Component, FormEvent } from "react";
import { postInventory, PostInventoryBody } from "../../../controllers/InventoryController";

type InventoryCreateState = {
    inventory: PostInventoryBody,
}

class InventoryCreate extends Component {

    state: InventoryCreateState = {
        inventory: {
            inventoryCount: 0,
            productId: -1,
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.formOnSubmit.bind(this)}>
                    <div className="form-group">
                        <label>Product</label>
                        <input className="form-control" value={this.state.inventory.productId} onChange={e => this.setState({ inventory: { ...this.state.inventory, productId: e.target.value } })} />
                    </div>
                    <div className="form-group">
                        <label>Count</label>
                        <input className="form-control" value={this.state.inventory.inventoryCount} onChange={e => this.setState({ inventory: { ...this.state.inventory, inventoryCount: e.target.value } })} />
                    </div>
                    <button className="btn btn-primary mb-2" type="submit">Submit</button>
                </form>
            </div>
        )
    }

    async formOnSubmit(event: FormEvent) {
        event.preventDefault();
        const { inventory } = this.state;
        const result = await postInventory(inventory);
        if (!result) {
            console.log('formOnSubmit failed');
            return;
        }
        console.log('formOnSubmit ok');
        this.setState({
            inventory: {
                inventoryCount: 0,
                productId: -1,
            }
        })
    }
}

export default InventoryCreate;
