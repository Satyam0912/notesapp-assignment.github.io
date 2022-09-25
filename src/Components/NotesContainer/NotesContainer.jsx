import React, { useEffect, useState, useRef } from 'react';
import uniqid from 'uniqid';
import { Container, Button, Form } from 'react-bootstrap'
import { useNotes } from '../../Contests/NotesContextProvider'
import NoteCard from '../NoteCard/NoteCard'

const NotesContainer = () => {

    const selectSearchForm = useRef() // to get form value for searching

    //contexts values
    const {
        notes,
        setNotes,
        changeTitleNote,
        setChangeTitleNote,
        dispSearchNotes,
        setDispSearchNotes
    } = useNotes()

    const [edit, setEdit] = useState(false)
    const [isSearch, setIsSearch] = useState(false)

    const changeSearchStatus = () => {
        setIsSearch(false)
        setDispSearchNotes([])
        window.location.reload()
    }

    useEffect(() => {
        localStorage.setItem("localNotesArr", JSON.stringify(notes))
        localStorage.setItem("localdispSearchNotes", JSON.stringify(dispSearchNotes))
        document.getElementById('searchbar').addEventListener('blur', () => changeSearchStatus())
    }, [notes, edit, changeTitleNote, dispSearchNotes, isSearch])

    const handleAddNote = () => {
        let note = {
            id: uniqid(),
            title: "Title",
            note: "Note",
            isEditing: false
        }
        setNotes([...notes, note])
    }

    const handleEdit = async (noteId) => {

        const { changeTitle, changeNote } = await changeTitleNote;

        if (edit) {
            let note = {
                id: noteId,
                title: changeTitle,
                note: changeNote,
                isEditing: false
            }
            const filteredNotes = notes.filter(element => {
                return element.id !== noteId
            })

            filteredNotes.push(note)

            setNotes([...filteredNotes])
            setEdit(false)
            setChangeTitleNote({ changeTitle: "", changeNote: "" })
            window.location.reload()

        }
        else {
            setEdit(true)
            let editNote = notes.filter(element => noteId === element.id)
            editNote.map(element => {
                element.isEditing = true
                return element
            })
            let prevNotes = [...notes]

            prevNotes.map(element => {
                if (editNote.forEach(editNoteElement => editNoteElement.id === element.id)) {
                    element = editNote.filter(editNoteElement => editNoteElement.id === element.id)[0]
                }
                return element
            })
            setNotes([...prevNotes])
        }
    }

    const handleDelete = (noteId) => {
        const filteredNotes = notes.filter(element => {
            return element.id !== noteId
        })
        setNotes([...filteredNotes])
        window.location.reload()
    }

    const searchNotes = () => {
        setIsSearch(true)
        let toSearch = selectSearchForm.current[0].value
        const searchedNotes = notes.filter(element => element.title.match(toSearch))
        setDispSearchNotes(searchedNotes)
    }

    return (
        <Container className=''>
            <Form ref={selectSearchForm} className='notes-top' style={{ width: '18rem', margin: 'auto' }}>
                <Form.Group className="mb-3 search-bar" >
                    <Form.Control
                        placeholder="Search notes here"
                        id='searchbar'
                        onChange={searchNotes}
                    />
                </Form.Group>
            </Form>
            <div className={`notes ${isSearch ? 'd-none' : ''}`} >
                {
                    notes.length ? notes.map((element, index) => {
                        return <NoteCard
                            key={index}
                            noteId={element.id}
                            title={element.title}
                            note={element.note}
                            cardId={element.id}
                            isEditing={element.isEditing}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    }) :
                        <h2>No notes</h2>
                }
            </div>
            <div className={`notes ${isSearch ? '' : 'd-none'}`}>
                {
                    dispSearchNotes.length ? dispSearchNotes.map((element, index) => {
                        return <NoteCard
                            key={index}
                            noteId={element.id}
                            title={element.title}
                            note={element.note}
                            cardId={element.id}
                            isEditing={element.isEditing}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    }) :
                        <h2>no notes found</h2>
                }
            </div>
            <div className=''>
                <Button variant="primary" className='addNoteBtn' onClick={handleAddNote}>+</Button>
            </div>

        </Container>
    )
}

export default NotesContainer