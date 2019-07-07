import React, { Component } from "react";
import axios from "axios";

export default class UpdateIcecream extends Component {
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

    componentDidMount(id) {
        axios.get("http://localhost:5000/api/icecream/get/" + this.props.match.params.id)
            .then(response => {
                this.setState({
                    flavour: response.data.flavour,
                    price: response.data.price,
                    description: response.data.description,
                    quantity: response.data.quantity
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

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



        axios.put("http://localhost:5000/api/icecream/update-icecream/" + this.props.match.params.id, icecream)
            .then(res => console.log(res.data))
            .catch((error) => {
                console.log(error);
            })

        console.log('update made');


        window.location = "/";
    }



    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3 className="mt-5 mb-5 text-center">Update Stock =)</h3>
                <div className="form-group">
                    <label className="text-center d-block">Item (=^ェ^=) </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.flavour}
                        onChange={this.onChangeFlavour}
                    />
                    <label className="text-center d-block">New quantity (⌐■_■)</label>
                    <input type="number"
                        required
                        className="form-control"
                        value={this.state.quantity}
                        onChange={this.onChangeQuantity}
                    />
                    <label className="text-center d-block">New price (⌐■_■)</label>
                    <input type="number"
                        required
                        className="form-control"
                        value={this.state.price}
                        onChange={this.onChangePrice}
                    />




                </div>
                <div className="form-group">
                    <input type="submit" value="Update Icecream Item" className="btn btn-primary" />
                </div>
            </form>
        )
    }
}