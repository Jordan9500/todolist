import React from 'react'
import { Card } from 'react-bootstrap';

import './note.styles.scss'

const Note = ( { noteTitle, note, updatedAt} ) => (
    <Card>
        <Card.Body>
            <Card.Title>{ noteTitle }</Card.Title>
            <Card.Text>
                { note }
            </Card.Text>
        </Card.Body>
        <Card.Footer>
            <small className="text-muted">Last updated {new Date(updatedAt).getHours()}:{new Date(updatedAt).getMinutes()}:{new Date(updatedAt).getSeconds()}</small>
        </Card.Footer>
    </Card>
)

export default Note