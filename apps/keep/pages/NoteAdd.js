import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    template: `
        <div>
            <form @submit.prevent="save" class="note-add-form">
                <section class=note-add-section>
                    <input v-model="noteToAdd.title" type="text" placeholder="Title">
                    <input v-model="noteToAdd.content" type="text" placeholder="Take a note...">
                    <!-- <button :disabled="!isValid">Save</button> -->
                    <button>Save</button>
                </section>
            </form>
        </div>
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
            this.$emit('noteAdded', { ...this.noteToAdd })
            this.noteToAdd = {}
        }
    }
}