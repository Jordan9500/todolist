import React from 'react'
import { Link } from 'react-router-dom'

import './header.styles.scss'

const Header = () => (
    <div className='header'>
        <div className='top'>
            <Link className='option' to='/'>
                Home
            </Link>
            <div className='options'>
                <Link className='option' to='/notes'>
                    Notes
                </Link>
                { 
                    window.localStorage.getItem('token') !== null ? 
                        <Link className='option' to='/account'>
                            Account
                        </Link>
                    : 
                        <Link className='option' to='/signin'>
                            Sign In
                        </Link> 
                }        
            </div>
        </div>
    </div>
)

export default Header