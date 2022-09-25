import React, { createContext, useContext, useState } from 'react';

const NoteContext = createContext();

export const NotesContextProvider = ({ children }) => {

    let localNotes = localStorage.length ? JSON.parse(localStorage.getItem('localNotesArr')) : []
    let localdispNotes = localStorage.length ? JSON.parse(localStorage.getItem('localdispSearchNotes')) : []

    const [notes, setNotes] = useState(localNotes)
    const [dispSearchNotes, setDispSearchNotes] = useState(localdispNotes)
    const [changeTitleNote, setChangeTitleNote] = useState({ changeTitle: "", changeNote: "" })

    const values = {
        notes,
        setNotes,
        changeTitleNote,
        setChangeTitleNote,
        dispSearchNotes,
        setDispSearchNotes
    }

    return (< NoteContext.Provider value={values} >{children}</NoteContext.Provider>)
}

export const useNotes = () => useContext(NoteContext);