import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import Note from '../../components/note/note.component';
import './notes.styles.scss';

class NotesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newNote: false,
            notes: [],
            authed: false,
            note: '',
            noteTitle: '',
        }

        this.toggleClass = this.toggleClass.bind(this);
        this.output = this.output.bind(this);

    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };

    componentDidMount() {
        const token = window.localStorage.getItem('token');
        if (token !== null) {
            this.setState({authed: true})
            const request = {
                method: 'GET',
                headers: { Authorization: token },
              };
            fetch('/notes', request).then((response) => {
                response.json().then((data) => {
                    this.setState({ notes: data[0] })
                });
            });
        } else {
            this.setState({authed: false})
        }
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }
    
    onSubmit = () => {
        const token = window.localStorage.getItem('token');
        const { note, noteTitle } = this.state;
        const payload = {
            note,
            noteTitle,
        };
        const request = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { Authorization: token, 'Content-Type': 'application/json' },
        };
        fetch('/newnote', request)
            .then((res) => {
            const code = res.status;
            res.json().then((reply) => {
                if (code !== 200) {
                    window.alert(reply.message);
                }
            });
        });
    }

    output() {
        const notes = this.state.notes;
        console.log(notes);
    }

    render() {
        const { notes, authed, note, noteTitle } = this.state;
        const { onChange, onSubmit } = this;
        return (
            <div className='notes-page'>
                <Modal show={this.state.active}>
                    <Modal.Header>
                        <Modal.Title>CREATE NOTE</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={onSubmit}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Note Title</Form.Label>
                                <Form.Control 
                                    name="noteTitle" 
                                    type="text"
                                    value={noteTitle}
                                    onChange={onChange}
                                    placeholder="Enter note title" 
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Note</Form.Label>
                                <Form.Control 
                                    name="note" 
                                    as="textarea" 
                                    rows={3} 
                                    value={note}
                                    onChange={onChange}
                                    required
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.toggleClass}>
                                Close
                            </Button>
                            <Button variant="primary" type='submit' onClick={this.toggleClass}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                <Button onClick={this.toggleClass} variant='outline-dark'>
                    Create new note
                </Button>
                <Button onClick={this.output} variant='outline-dark'>
                    Create new note
                </Button>
                <div className='notes'>
                    {
                        authed && notes.length !== 0 ?
                            notes.map(({ notes_id, ...otherNotesProps }) => (
                                <Note key={notes_id} {...otherNotesProps}/>
                            ))
                        : notes.length === 0 ?
                            <Note key="0" noteTitle="No Notes" note="Create a new note" />
                        :
                            <Note key="0" noteTitle="Sign in" note="Register to create notes" />
                    }
                </div>
            </div>
        );
    }
}

export default NotesPage;