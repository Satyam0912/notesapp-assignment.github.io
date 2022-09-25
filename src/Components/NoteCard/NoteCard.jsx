import React, { useRef } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useNotes } from '../../Contests/NotesContextProvider';

const NoteCard = ({ title, note, isEditing, handleEdit, handleDelete, noteId }) => {

    const selectForm = useRef()
    // let localNotes = localStorage.length ? JSON.parse(localStorage.getItem('notesArr')) : []
    const { setChangeTitleNote } = useNotes()

    const handleChangeTitleNote = () => {
        const titleChanges = selectForm.current[0].value
        const noteChanges = selectForm.current[1].value
        setChangeTitleNote({ changeTitle: titleChanges, changeNote: noteChanges })
    }

    return (
        <Card style={{ width: '18rem', marginBottom: '20px' }} >
            <Card.Body>
                {
                    <Form ref={selectForm}>
                        <Form.Group className="mb-2" >
                            <Form.Control
                                className='note-card-title fs-4 fw-bold'
                                placeholder="Title"
                                readOnly={!isEditing}
                                defaultValue={title}
                                onChange={handleChangeTitleNote}
                            />
                        </Form.Group>
                        <Form.Group className="">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                className='note-textarea'
                                placeholder="Leave a note here"
                                readOnly={!isEditing}
                                defaultValue={note}
                                onChange={handleChangeTitleNote}
                            />
                        </Form.Group>
                        <div className="cardBtnSection d-flex">
                            <button type='button' onClick={() => handleEdit(noteId)}>{isEditing ? 'Save' : 'Edit'}</button>
                            <button type='button' onClick={() => handleDelete(noteId)}>delete</button>
                        </div>
                    </Form>
                }

            </Card.Body>
        </Card >
    )
}

export default NoteCard