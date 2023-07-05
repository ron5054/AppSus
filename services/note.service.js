import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const PAGE_SIZE = 5
const NOTE_KEY = 'noteDB'

var gFilterBy
var gSortBy
var gPageIdx

_createNotes()
console.log('notes', notes)

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getNextNoteId,
    // getFilterBy,
    // setFilterBy,
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => _setNextPrevNoteId(note))
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(vendor = '', maxSpeed = 0) {
    return { id: '', vendor, maxSpeed }
}

function getNextNoteId(noteId) {
    return storageService.query(NOTE_KEY).then(notes => {
        var idx = notes.findIndex(note => note.id === noteId)
        if (idx === notes.length - 1) idx = -1
        return notes[idx + 1].id
    })
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        notes.push(_createNote('Meet with Matt'))
        notes.push(_createNote('Feed the cat'))
        notes.push(_createNote('Buy a hat'))
        notes.push(_createNote('Get a tat'))
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(title) {
    const note = getEmptyNote(title)
    note.id = utilService.makeId()
    note.content = utilService.makeLorem()
    return note
}
