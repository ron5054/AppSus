import { eventBus } from "../../../services/event-bus.service.js"

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

                <span class="Home-btn material-symbols-outlined" @click="goToHomePage">home</span>

                <div>
                    <img class="header-icon" src="assets/img/keep-icon.png"/>
                </div>

                <div class="header-logo">Keep</div>

                <NoteFilter @filter="setFilterBy"></NoteFilter>

                <div class="header-actions-bar"></div>

            </header>

            <section class="keep-addnote-section">
                <NoteAdd @noteAdded="save"></NoteAdd>
            </section>

            <div class="keep-main">
                <NoteList
                    v-if="notes"
                    :notes="filteredNotes"
                    @remove="removeNote"
                    @duplicate="save"
                    @changeColor="changeNoteColor"
                    @pin="pinNote"
                />
            </div>


        </div>

    `,
    data() {
        return {
            notes: [],
            filterBy: {},
            selectedColor: '',
        }
    },
    methods: {
        saveEditedNote(editedNote) {
            const index = this.notes.findIndex(note => note.id === editedNote.id);
            if (index !== -1) {
                this.notes[index] = editedNote
                noteService.save(editedNote)
                    .then(() => {
                        showSuccessMsg('Note updated');
                    })
                    .catch(err => {
                        showErrorMsg('Failed to update note');
                    });
            }
            this.editingNote = null;
        },
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
        pinNote(note) {
            noteService.save(note)
        },
        goToHomePage() {
            this.$router.push('/')
        },
        save(noteToAdd) {
            noteService.save(noteToAdd)
                .then(savedNote => {
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
        sortedNotes() {
            return this.notes.slice().sort((a, b) => {
                if (a.isPinned && !b.isPinned) return -1
                if (!a.isPinned && b.isPinned) return 1
                return 0
            })
        },
        filteredNotes() {
            let filteredNotes = this.sortedNotes
            const regex = new RegExp(this.filterBy.title, 'i')
            if (this.filterBy.title) {
                filteredNotes = filteredNotes.filter(note => 'title' in note.info && regex.test(note.info.title))
            }
            if (this.filterBy.type) {
                filteredNotes = filteredNotes.filter(note => 'type' in note && (note.type === this.filterBy.type))
            }
            return filteredNotes
        },

    },
    created() {
        eventBus.on('todoDone', (note, todoIndex, isChecked) => {
            note.info.todos[todoIndex].doneAt = isChecked ? Date.now() : null
            noteService.save(note)
        })

        noteService.query()
            .then(notes => (this.notes = notes))
    },
    components: {
        NoteFilter,
        NoteList,
        NoteAdd,
    },
}
