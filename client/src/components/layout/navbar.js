import React, { Component } from 'react';
import { Link } from 'react-router-dom';



export default class Navbar extends Component {

    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <h1>
                    <Link className="navbar-brand text-light" to="/">
                        IceCream Vending Machine<i className="fa fa-star-o d-block" />
                        (づ｡◕‿‿◕｡)づ
                    </Link>
                </h1>
                <button
                    className="navbar-toggler  text-light"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/" className="nav-item nav-link text-light" >
                            IceCream Store
                        </Link>
                        <Link to="/addIcecream" className="nav-item nav-link text-light" >
                            Add IceCream Item
                        </Link>
                    </div>
                </div>
            </nav>

        )
    }
}
