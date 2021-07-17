import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import './account.styles.scss';

class AccountPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            accountData: [],
            authed: false
        }
        this.logout = this.logout.bind(this);

    }

    componentDidMount() {
        const token = window.localStorage.getItem('token');
        console.log(token)
        if (token !== null) {
            this.setState({authed: true})
            const request = {
                method: 'GET',
                headers: { Authorization: token },
              };
            fetch('/account', request).then((response) => {
                response.json().then((data) => {
                    this.setState({ accountData: data })
                });
            });
        } else {
            this.setState({authed: false})
            this.props.history.push('/');
        }
        
    }

    logout() {
        window.localStorage.removeItem('token');
        window.location.reload();
    }

    render() {
        const {accountData, authed} = this.state;
        console.log(accountData)
        return (
            <div className='accounts-page'>
                {
                    authed ?
                        <Card>
                            <Card.Body>
                                <Card.Title>Account Details</Card.Title>
                                <Card.Text>First Name: { accountData.first_name }</Card.Text>
                                <Card.Text>Last Name: { accountData.last_name }</Card.Text>
                                <Card.Text>Email: { accountData.email }</Card.Text>
                            </Card.Body>
                            <Card.Footer> 
                                <Button variant="primary" onClick={this.logout}>Log out</Button>
                            </Card.Footer>
                        </Card> 
                    :
                        <div>
                            <p>You need to log in to access this page</p>
                            <Link className='register-link' to='/signin'>
                                Sign In
                            </Link>
                        </div>
                }
            </div>
        );
    }
}

export default AccountPage;