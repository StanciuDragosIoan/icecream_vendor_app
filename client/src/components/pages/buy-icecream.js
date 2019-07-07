import React, { Component } from "react";
import axios from "axios";

export default class BuyIcecream extends Component {
    constructor(props) {
        super(props);


        this.onChangeFlavour = this.onChangeFlavour.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.OnUpdateQty = this.OnUpdateQty.bind(this);
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


    OnUpdateQty(e) {
        let newQty = e.target.value
        // console.log(typeof this.state.quantity);
        // console.log(newQty);
        if (parseInt(newQty) <= 9) {
            this.setState({
                quantity: this.state.quantity - parseInt(newQty)
            });

        } else {
            // console.log('please buy 0-9');
        }

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

        console.log('purchase made');


        window.location = "/";
    }



    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3 className="mt-5 mb-5 text-center">Make your purchase =)</h3>
                <div className="form-group">
                    <label className="text-center d-block"><i className="fa fa-heart-o fa-2x mr-2" aria-hidden="true"></i> Item (=^ェ^=) </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.flavour}
                        onChange={this.onChangeFlavour}
                        readOnly="readonly"
                    />
                    <label className="text-center d-block">Available quantity (⌐■_■)</label>
                    <input type="number"
                        required
                        className="form-control"
                        value={this.state.quantity}
                        onChange={this.onChangeQuantity}
                        // id="newQty"
                        readOnly="readonly"
                    />

                    <label className="text-center d-block">Desired quantity (⌐■_■)</label>
                    <input type="number"
                        required
                        className="form-control"
                        id="newQty"
                        onChange={this.OnUpdateQty}
                        min="1"
                        max="9"
                        inputMode="numeric"
                        pattern="[0-9]"
                    />
                    <small>Please purchase only between 1 and 9 items at once</small>
                    {/* <button className="btn btn-primary mt-2">Add quantity</button> */}
                </div>
                <div className="form-group">
                    <input type="submit" value="Buy Icecream" className="btn btn-primary" />
                </div>
            </form>
        )
    }
}