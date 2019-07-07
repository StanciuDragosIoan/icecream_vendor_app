import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";


//icecream component
const Icecream = props => (
    <tr>
        <td>
            {props.icecream.flavour}
        </td>
        <td className="text-center">
            {props.icecream.price}
        </td>
        <td>
            {props.icecream.description}
        </td>
        <td className="text-center">
            {props.icecream.quantity}
        </td>
        <td>

            <Link className="d-block" to={"/buy/" + props.icecream._id}>Buy Item <i className="fa fa-shopping-cart fa-2x text-primary ml-3" aria-hidden="true"></i></Link>
            <Link to={"/updateStock/" + props.icecream._id}>Update Item <i className="fa fa-pencil  text-secondary ml-3" aria-hidden="true"></i></Link>
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
        axios.get("http://localhost:5000/api/icecream/get/all/")
            .then(res => {
                this.setState({ icecreamItems: res.data })
            })
            .catch((err) => {
                console.log(err);
            })
    }


    // deleteIcecream(id) {
    //     axios.delete("http://localhost:5000/api/icecream/delete/" + id)
    //         .then(res => console.log(res.data));

    //     this.setState({
    //         icecreamItems: this.state.icecreamItems.filter(el => el._id !== id)
    //     })
    // }

    iceCreamList() {
        return this.state.icecreamItems.map(currentitem => {
            return <Icecream icecream={currentitem}
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
                            <th>Flavour <i className="fa fa-heart-o fa-2x d-block ml-2" aria-hidden="true"></i></th>
                            <th>Price per piece <i className="fa fa-money fa-2x d-block ml-2" aria-hidden="true"></i></th>
                            <th>Description <i className="fa fa-comments-o fa-2x d-block ml-2" aria-hidden="true"></i></th>
                            <th>Quantity available<i className="fa fa-star-o fa-2x d-block ml-2" aria-hidden="true"></i></th>
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