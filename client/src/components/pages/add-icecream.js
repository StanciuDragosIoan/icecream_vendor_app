import React, { Component } from "react";

export default class AddIcecream extends Component {
    constructor(props) {
        super(props);


        this.onChangeFlavour = this.onChangeFlavour.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.bind(this);


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
            quantity: this.state.description
        }

        console.log(icecream);

        window.location = "/";
    }

    render() {
        return (
            <div>
                <p>You are on the Add Icecream Item component</p>
            </div>
        )
    }
}