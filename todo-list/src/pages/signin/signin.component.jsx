import React from 'react';

import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'


import './signin.styles.scss';



class SigninPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            authed: false
        }
    }
    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }
    
    onSubmit = () => {
        const { email, password } = this.state;
        const payload = {
            email,
            password
        };
        const request = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        };
        fetch('/signin', request)
            .then((res) => {
            const code = res.status;
            console.log(res);
            res.json().then((reply) => {
                console.log(reply)
                if (code !== 200) {
                    window.alert(reply.message);
                } else {
                    console.log(reply)
                    window.localStorage.setItem('token', reply.token);
                }
            });
        });
    }

    componentDidMount() {
        const token = window.localStorage.getItem('token');
        if (token !== null) {
            this.setState({authed: true})
            this.props.history.push('/');
        } else {
            this.setState({authed: false})
        }
    }
    
    render() {
        const { email, password, authed } = this.state;
        const { onChange, onSubmit } = this;
        if (!authed) {
            return (
                <div className='signin-page'>
                    <div className='signin'>
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    name="email"
                                    value={email}
                                    type="email"
                                    onChange={onChange} 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    name="password"
                                    value={password}
                                    type="password"
                                    onChange={onChange} 
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                    <div className='register'>                  
                        <Button variant="primary">
                            <Link className='register-link' to='/register'>
                                Register
                            </Link>
                        </Button>
                    </div>
                </div>
            );
        }
        return (
            <div className="login">
                <div className="login-border">
                    You are already logged in!! <div className="login-goBack" onClick={() => { this.props.history.push('/'); }}>Go back</div>
                </div>
            </div>
        );
    }
}

export default SigninPage;