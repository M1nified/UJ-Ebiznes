import React, { Component } from 'react';

class LoginRoute extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h2>Zaloguj się</h2>
                    <div className="mb-3">
                        <a href="http://localhost:9000/authenticate/google" className="btn btn-primary">Google</a>
                    </div>
                    <div>
                        <a href="http://localhost:9000/authenticate/facebook" className="btn btn-primary">Facebook</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginRoute;
