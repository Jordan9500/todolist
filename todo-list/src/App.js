import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component'
import HomePage from './pages/homepage/homepage.component'
import NotesPage from './pages/notes/notes.component'
import SigninPage from './pages/signin/signin.component'
import RegisterPage from './pages/register/register.component';
import AccountPage from './pages/account/account.component';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/notes' component={NotesPage} />
                    <Route exact path='/signin' component={SigninPage} />
                    <Route exact path='/register' component={RegisterPage} />
                    <Route exact path='/account' component={AccountPage} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;
