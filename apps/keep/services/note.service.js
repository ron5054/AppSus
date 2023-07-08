import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'

var gFilterBy

const gNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        isColorPaletteVisible: false,
        style: { backgroundColor: '#F44336' },
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
        style: { backgroundColor: '#2196F3' }
    },
    {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        isColorPaletteVisible: false,
        style: { backgroundColor: '#4CAF50' },
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
        isColorPaletteVisible: false,
        style: { backgroundColor: '#FFFF00' },
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
        style: { backgroundColor: '#E91E63' }
    },
    {
        id: 'n106',
        type: 'NoteTodos',
        isPinned: false,
        isColorPaletteVisible: false,
        style: { backgroundColor: '#FF9800' },
        info: {
            title: 'Never Gonna',
            todos: [
                { txt: 'Make you cry', doneAt: null },
                { txt: 'Say goodbye', doneAt: null },
                { txt: 'Tell a lie', doneAt: null },
                { txt: 'Hurt you', doneAt: null }
            ]
        }
    },
    {
        id: 'n107',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        isColorPaletteVisible: false,
        style: { backgroundColor: '#2196F3' },
        info: { txt: 'Don\'t hurt me' }
    },
    {
        id: 'n108',
        type: 'NoteImg',
        isPinned: false,
        isColorPaletteVisible: false,
        info: {
            url: 'https://picsum.photos/200/400',
            title: 'Nechmaaaaad'
        },
        style: { backgroundColor: '#FFFF00' }
    },
    {
        id: 'n109',
        type: 'NoteTodos',
        isPinned: false,
        isColorPaletteVisible: false,
        info: {
            title: 'Never Gonna',
            todos: [
                { txt: 'Give you up', doneAt: null },
                { txt: 'Let you down', doneAt: null },
                { txt: 'Run Around', doneAt: null },
                { txt: 'Desert you', doneAt: null }
            ]
        },
        style: { backgroundColor: '#E91E63' }
    },
    {
        id: 'n110',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        isColorPaletteVisible: false,
        style: { backgroundColor: '#4CAF50' },
        info: { txt: 'No mo' }
    },
    {
        id: 'n111',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://picsum.photos/200/200',
            title: 'Magniiiiiiv'
        },
        style: { backgroundColor: '#4CAF50' }
    },
    {
        id: 'n112',
        type: 'NoteTodos',
        isPinned: false,
        isColorPaletteVisible: false,
        info: {
            title: 'What is Vue?',
            todos: [
                { txt: 'Frameworks don\'t hurt me', doneAt: null },
                { txt: 'Don\'t hurt me', doneAt: null },
                { txt: 'No Mo', doneAt: null }
            ]
        },
        style: { backgroundColor: '#F44336' }
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