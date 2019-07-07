import React, { Component } from "react";
import axios from "axios";

export default class AddIcecream extends Component {
    constructor(props) {
        super(props);


        this.onChangeFlavour = this.onChangeFlavour.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        // set initial state
        this.state = {
            flavour: "",
            price: "",
            description: "",
            quantity: ""
        }
    }

    // componentDidMount(){

    // }

    onChangeFlavour(e) {
        this.setState({
            flavour: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const icecream = {
            flavour: this.state.flavour,
            price: this.state.price,
            description: this.state.description,
            quantity: this.state.quantity
        }


        axios.post("http://localhost:5000/api/icecream/add", icecream)
            .then(res => console.log(res.data))
            .catch((error) => {
                console.log(error);
            })


        window.location = "/";
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3 className="mt-5 mb-5">Not satisfied by our offer? Add your own flavour to the shop</h3>

                <div className="form-group">
                    <label className="text-center d-block"><i className="fa fa-heart-o fa-2x mr-2" aria-hidden="true"></i> Which Flavour will it be? (=^ェ^=) </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.flavour}
                        onChange={this.onChangeFlavour}
                        placeholder="add flavour <333"
                    />
                    <label className="text-center d-block"><i className="fa fa-money fa-2x mr-2" aria-hidden="true"></i> How much will it cost? (¬_¬)</label>
                    <input type="number"
                        required
                        className="form-control"
                        value={this.state.price}
                        onChange={this.onChangePrice}
                        placeholder="price"
                    />
                    <label className="text-center d-block"><i className="fa fa-comments-o fa-2x  mr-2" aria-hidden="true"></i>Is it yummy? What do the kids say? (｡◕‿◕｡)</label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        placeholder="description"
                    />
                    <label className="text-center d-block">How many you've got? (⌐■_■)</label>
                    <input type="number"
                        required
                        className="form-control"
                        value={this.state.quantity}
                        onChange={this.onChangeQuantity}
                        placeholder="quantity"
                    />
                </div>

                <div className="form-group">
                    <input type="submit" value="Add Icecream" className="btn btn-primary" />
                </div>
            </form>
        )
    }
}