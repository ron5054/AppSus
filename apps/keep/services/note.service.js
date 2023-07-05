import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const PAGE_SIZE = 5
const NOTE_KEY = 'noteDB'

var gFilterBy
var gSortBy
var gPageIdx

const notes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { txt: 'Fullstack Me Baby!' }
    },
    {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
            title: 'Bobi and Me'
        },
        style: { backgroundColor: '#00d' }
    },
    {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    }
]


_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getNextNoteId,
    setFilterBy,
    getFilterBy,
}

function query() {
    return storageService.query(NOTE_KEY)
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

function getEmptyNote(title) {
    return { id: '', title: title, content: '' }
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

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    if (filterBy.type !== undefined) gFilterBy.type = filterBy.type
    return gFilterBy
}