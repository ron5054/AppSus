import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

// import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'

export default {
    template: `
        <section class="note-index">
            <RouterLink to="/note/edit" class="add-note">Add Note</RouterLink>

            <!-- <NoteFilter @filter="setFilterBy"/> -->

            <NoteList
                v-if="notes"
                :books="filteredNotes"
                @remove="removeNote" />
        </section>

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

            if (this.filterBy.price) {
                filteredNotes = filteredNotes.filter(
                    note => note.listPrice.amount <= this.filterBy.price
                )
            }

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
    },
}
