import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Me from '../../../models/Me';
import { getMe } from '../../../controllers/MeController';

type HeaderState = {
    me?: Me,
}

class Header extends Component {

    state: HeaderState = {

    }

    async componentDidMount() {
        const me = await getMe();
        this.setState({
            me,
        })
    }

    render() {

        const userField = (() => {
            if (!this.state.me) {
                return <Link to="/login">Login</Link>;
            }
            const { me } = this.state;
            return <div>
                {me.name} {me.lastName} <a href="http://localhost:9000/signOut">Logout</a>
            </div>
        })()

        return (
            <div>
                <nav className="navbar navbar-light bg-light">
                    <div className="nav navbar-nav">
                        <Link className="" to="/">Shop</Link>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">Cart</Link>
                        </li>
                    </ul>
                    <div className="nav navbar-nav navbar-right">
                        {userField}
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;
