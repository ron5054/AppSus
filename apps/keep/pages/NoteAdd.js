import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    template: `
        <form @submit.prevent="save" class="note-add-form">
            <section class=note-add-section>
                <input v-model="noteToAdd.title" type="text" placeholder="Title">
                <input v-model="noteToAdd.content" type="text" placeholder="Take a note...">
                <!-- <button :disabled="!isValid">Save</button> -->
                <button>Save</button>
            </section>
        </form>
    `,
    data() {
        return {
            noteToAdd: noteService.getEmptyNote()
        }
    },
    computed: {
        isValid() {
            return this.noteToAdd.title.length > 0
        },
    },
    created() {
        const { noteId } = this.$route.params
        if (!noteId) return
        noteService
            .get(noteId)
            .then((note) => {
                this.noteToEdit = note
            })
            .catch((err) => {
                showErrorMsg('Cannot load note for adding')
                this.$router.push('/note')
            })
    },

    methods: {
        save() {
            noteService.save(this.noteToAdd)
                .then(savedNote => {
                    console.log('Saved note', savedNote)
                    showSuccessMsg('Note saved')
                    this.$router.push('/note')
                    this.$emit('noteAdded', savedNote)

                })
                .catch(err => {
                    showErrorMsg('Cannot save note')
                })
        }
    }
}