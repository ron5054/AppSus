import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import NoteAdd from './NoteAdd.js'

import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'

export default {
    name: 'NoteIndex',
    template: `


        <div class="keep-container">
            <header class="keep-main-header">

                <!-- <div class="Home-btn" @click="goToHomePage">Home</div> -->
                <span class="Home-btn material-symbols-outlined" @click="goToHomePage">home</span>
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
                <NoteList
                    v-if="notes"
                    :notes="filteredNotes"
                    @remove="removeNote"
                    @duplicate="save"
                    @changeColor="changeNoteColor"
                />
            </div>


        </div>

        <RouterView />

    `,
    data() {
        return {
            notes: [],
            filterBy: {},
            selectedColor: '',
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
        changeNoteColor(note, color) {
            console.log('note', note)
            console.log('color', color)
            console.log('note.style', note.style)
            note.style.backgroundColor = color

            noteService.save(note)
                .then(() => {
                    showSuccessMsg('Note color changed')
                })
                .catch(err => {
                    showErrorMsg('Failed to change note color')
                })
        },
        duplicateNote(note) {
            delete note.id
            this.save(note)
        },
        goToHomePage() {
            this.$router.push('/')
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
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        filteredNotes() {
            let filteredNotes = this.notes
            const regex = new RegExp(this.filterBy.title, 'i')
            if (this.filterBy.title) {
                filteredNotes = filteredNotes.filter(note => 'title' in note.info && regex.test(note.info.title))
            }
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