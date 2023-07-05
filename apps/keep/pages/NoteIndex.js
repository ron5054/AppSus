import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import NoteAdd from './NoteAdd.js'

// import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'

export default {
    name: 'NoteIndex',
    template: `


        <div class="container">
            <header class="main-header">
                <img class="icon" src="../../assets/img/keep-icon.png"/>
                <div class="logo">Keep</div>
                <input type="text" placeholder="Search" />
                <div >

                </div>
                <div></div>
            </header>

            <div class="navbar">
                <NoteAdd @noteAdded="saveNote"></NoteAdd>
            </div>
            <nav class="aside-navbar">
            <span class="material-symbols-outlined">lightbulb</span>
            </nav>
            <div class="main">
                <section class="note-index">

                    <NoteList
                        v-if="notes"
                        :notes="filteredNotes"
                        @remove="removeNote" />

                </section>
            </div>
        </div>


    `,
    data() {
        return {
            notes: [],
            filterBy: {},
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

        saveNote(noteToSave) {
            noteService.save(noteToSave)
                .then(savedNote => this.notes.push(savedNote))
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        filteredNotes() {
            let filteredNotes = this.notes
            const regex = new RegExp(this.filterBy.txt, 'i')
            filteredNotes = filteredNotes.filter(note => regex.test(note.title))

            return filteredNotes
        },
    },

    created() {
        noteService.query()
            .then(notes => (this.notes = notes))
    },
    components: {
        // NoteFilter,
        NoteList,
        NoteAdd,
    },
}
