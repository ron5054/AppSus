import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'

import NoteAdd from './NoteAdd.js'

import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'

export default {
    name: 'NoteIndex',
    template: `


        <div class="keep-container">
            <header class="keep-main-header">
                <div>
                    <img class="header-icon" src="../../assets/img/keep-icon.png"/>
                </div>

                <div class="header-logo">Keep</div>

                <NoteFilter @filter="setFilterBy" />

                <div class="header-actions-bar"></div>

            </header>

            <section class="keep-addnote-section">
                <NoteAdd @noteAdded="save"></NoteAdd>
            </section>

            <nav class="keep-aside-navbar">
                <span class="material-symbols-outlined">emoji_objects</span>
                <span class="material-symbols-outlined">notifications</span>
                <span class="material-symbols-outlined">delete</span>
            </nav>
            <div class="keep-main">
                <section class="note-index">

                    <NoteList
                        v-if="notes"
                        :notes="filteredNotes"
                        @remove="removeNote"
                        @duplicate="duplicateNote"
                         />

                </section>
            </div>
        </div>

        <RouterView />

    `,
    data() {
        return {
            notes: [],
            filterBy: {},
            // duplicatedNote: {}
        }
    },
    methods: {
        removeNote(noteId) {
            noteService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)

                    showSuccessMsg('Note removed')
                })
                .catch(err => {
                    showErrorMsg('Cannot remove note')
                })
        },
        save(noteToAdd) {
            console.log(noteToAdd)
            noteService.save(noteToAdd)
                .then(savedNote => {
                    console.log('Saved note', savedNote)
                    showSuccessMsg('Note saved')
                    this.notes.push(savedNote)
                })
                .catch(err => {
                    showErrorMsg('Cannot save note')
                })
        },
        duplicateNote(note) {
            let duplicatedNote = JSON.parse(JSON.stringify(note))
            duplicatedNote.id = utilService.makeId()

            this.notes.push(duplicatedNote)
            console.log('notes', this.notes)

            noteService.save(duplicatedNote)
                .then(() => {
                    showSuccessMsg('Note duplicated')
                })
                .catch(() => {
                    showErrorMsg('Failed to duplicate note')
                })
            // duplicatedNote = {}
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        filteredNotes() {
            let filteredNotes = this.notes
            const regex = new RegExp(this.filterBy.title, 'i')
            filteredNotes = filteredNotes.filter(note => regex.test(note.title))

            return filteredNotes
        },
    },

    created() {
        noteService.query()
            .then(notes => (this.notes = notes))
    },
    components: {
        NoteFilter,
        NoteList,
        NoteAdd,
    },
}
