import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";


//icecream component
const Icecream = props => (
    <tr>
        <td>
            {props.icecream.flavour}
        </td>
        <td>
            {props.icecream.price}
        </td>
        <td>
            {props.icecream.description}
        </td>
        <td>
            {props.icecream.quantity}
        </td>
        <td>
            {/* <Link to={"/buy/" + props.icecream._id}>Buy Item</Link> | <a href="#" onClick={() => { props.deleteIcecream(props.icecream._id) }}>Delete Item</a> */}
            <Link to={"/buy/" + props.icecream._id}>Buy Item</Link>
        </td>
    </tr>

    // <div className="dg-danger">
    //     <div className="bg-info" style={{ width: '25vw' }}>
    //         {props.icecream.flavour}
    //     </div>
    //     <div className="bg-warning"  >
    //         {props.icecream.price}
    //     </div>
    //     <div className="bg-info"  >
    //         {props.icecream.description}
    //     </div>
    //     <div className="bg-warning"  >
    //         {props.icecream.quantity}
    //     </div>

    //     <div className="col-sm-12">
    //         <Link to={"/buy/" + props.icecream._id}>Buy Item</Link> | <a href="#" onClick={() => { props.deleteIcecream(props.icecream._id) }}>Delete Item</a>
    //         <Link to={"/buy/" + props.icecream._id}>Buy Item</Link>
    //     </div>
    // </div>



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

            // <div className="row">

            // <div className="col-sm-3">
            //     <h3>Flavour:</h3>
            // </div>
            // <div className="col-sm-3">
            //     <h3>Price:</h3>
            // </div>
            // <div className="col-sm-3">
            //     <h3>Description:</h3>
            // </div>
            // <div className="col-sm-3">
            //     <h3>Quantity:</h3>
            // </div>
            // <div>
            //     {this.iceCreamList()}
            // </div>
            // </div>
        )
    }
}