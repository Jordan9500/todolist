import React from 'react'

import './homepage.styles.scss'

const HomePage = () => (
    <div className="HomePage">
        <h3><u>Interview Test Overview</u></h3>
        <p>The basic idea for this is to allow a user to register for an account and allow them to make notes on their account.</p>
        <h4>Application Requirements:</h4>
        <ul>
            <li>Setup tables in the MySQL database for:</li>
            <ul>
                <li>Users</li>
                <li>Notes</li>
            </ul>
            <li>Develop a simple nodejs rest api to include:</li>
            <ul>
                <li>[POST] /register ß for registering user accounts</li>
                <li>[POST] /login ß user sign in with email/password that returns auth token</li>
                <li>[AUTH] [GET] /account ß retrieves user details</li>
                <li>[AUTH] [GET] /notes ß retrieves user notes</li>
                <li>[AUTH] [POST] /notes ß creates a new note</li>
            </ul>
            <li>Create a front end react web app that talks to the api to include:</li>
            <ul>
                <li>User Register</li>
                <li>User Login</li>
                <li>View Account with Create Note & View notes</li>
            </ul>
        </ul>
        <h4>Additional Notes</h4>
        <ul>
            <li>Design – If you want to go all out that is entirely up to you however the design of the front-end application will not impact any scoring, this is a development test to see how you code the application, not a design test.</li>
            <li>API framework – Hapi-Js was mentioned during the interview because it has been my preference for previous projects, but it is certainly not a requirement if you are unfamiliar with it. Use anything you are familiar with to complete the task.</li>
        </ul>
    </div>
)

export default HomePage