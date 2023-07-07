import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const PAGE_SIZE = 5
const NOTE_KEY = 'noteDB'

var gFilterBy
var gSortBy
var gPageIdx

const gNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { txt: 'What is love?' }
    },
    {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: `https://picsum.photos/200/300/`,
            title: 'Nechmaaaaad'
        },
        style: { backgroundColor: '#00d' }
    },
    {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'What is async?',
            todos: [
                { txt: 'Promise don\'t hurt me', doneAt: null },
                { txt: 'Don\'t hurt me', doneAt: null },
                { txt: 'No mo', doneAt: null }
            ]
        }
    },
    {
        id: 'n104',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { txt: 'Baby don\'t hurt me' }
    },
    {
        id: 'n105',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://picsum.photos/200/250',
            title: 'Magniiiiiiv'
        },
        style: { backgroundColor: '#00d' }
    },
    {
        id: 'n106',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'BOOOOOM lo oved',
            todos: [
                { txt: 'Chak', doneAt: 187111111 },
                { txt: 'Chak Chak', doneAt: null },
                { txt: 'Chak Chak Chak', doneAt: null }
            ]
        }
    },
    {
        id: 'n107',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { txt: 'What is love?' }
    },
    {
        id: 'n108',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://picsum.photos/200/400',
            title: 'Nechmaaaaad'
        },
        style: { backgroundColor: '#00d' }
    },
    {
        id: 'n109',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'What is love?',
            todos: [
                { txt: 'Baby don\'t hurt me', doneAt: null },
                { txt: 'Don\'t hurt me', doneAt: null },
                { txt: 'No more', doneAt: null }
            ]
        }
    },
    {
        id: 'n110',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { txt: 'Baby don\'t hurt me' }
    },
    {
        id: 'n111',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://picsum.photos/200/200',
            title: 'Magniiiiiiv'
        },
        style: { backgroundColor: '#00d' }
    },
    {
        id: 'n112',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'What is Vue?',
            todos: [
                { txt: 'Frameworks don\'t hurt me', doneAt: null },
                { txt: 'Don\'t hurt me', doneAt: null },
                { txt: 'No Mo', doneAt: null }
            ]
        },
        style: { backgroundColor: '#00d' }
    },
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

function getEmptyNote() {
    return {
        id: '',
        info: {},
        isPinned: false,
        style: {},
        type: 'NoteTxt'
    }
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
        // notes = []
        // notes.push(_createNote('Meet with Matt'))
        // notes.push(_createNote('Feed the cat'))
        // notes.push(_createNote('Buy a hat'))
        // notes.push(_createNote('Get a tat'))

        notes = gNotes
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote() {
    const note = getEmptyNote()
    note.id = utilService.makeId()
    note.info.txt = utilService.makeLorem()
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