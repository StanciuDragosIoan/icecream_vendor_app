import React, { Component } from "react";

export default class AddIcecream extends Component {
    constructor(props) {
        super(props);

        // set initial state
        this.state = {
            flavour: "",
            price: "",
            description: "",
            quantity: ""
        }
    }

    render() {
        return (
            <div>
                <p>You are on the Add Icecream Item component</p>
            </div>
        )
    }
}