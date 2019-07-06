import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";


//icecream component
const Icecream = props => (
    <tr>
        <td className="col-sm-12 col-md-2">
            {props.icecream.flavour}
        </td>
        <td className="col-sm-12 col-md-2">
            {props.icecream.price}
        </td>
        <td className="col-sm-12 col-md-2">
            {props.icecream.description}
        </td>
        <td className="col-sm-12 col-md-2">
            {props.icecream.quantity}
        </td>
        <td className="col-sm-12 col-md-4">
            <Link to={"/buy/" + props.icecream._id}>Buy Item</Link> | <a href="#" onClick={() => { props.deleteIcecream(props.icecream._id) }}>Delete Item</a>
        </td>
    </tr>



)


export default class IcecreamStore extends Component {
    constructor(props) {
        super(props);

        // this.deleteIcecream = this.deleteIcecream.bind.this();

        this.state = { icecreamItems: [] }
    }

    //get icecream items from db
    componentDidMount() {
        axios.get("http://localhost:5000/api/icecream/get/all")
            .then(res => {
                this.setState({ icecreamItems: res.data })
            })
            .catch((err) => {
                console.log(err);
            })
    }


    // deleteIcecream(id) {
    //     axios.delete("http://localhost:5000/api/icecream/delete/" + id)
    //         .then(res => console.log(res.data))
    //     this.setState({
    //         icecreamItems: this.state.icecreamItems.filter(el => el._id !== id)
    //     })
    // }

    iceCreamList() {
        return this.state.icecreamItems.map(currentitem => {
            return <Icecream icecream={currentitem} deleteIcecream={this.deleteIcecream}
                key={currentitem._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>IceCream Store</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Flavour</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.iceCreamList()}
                    </tbody>
                </table>
            </div>
        )
    }
}