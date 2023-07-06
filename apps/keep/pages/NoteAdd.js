import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    template: `
        <section class="note-add-section">
            <form @submit.prevent="save" class="note-add-form">
                    <input v-model="noteToAdd.title" type="text" placeholder="Title">
                    <input v-model="noteToAdd.content" type="text" placeholder="Take a note...">

                    <section class="note-add-actions-bar">
                            <span class="material-symbols-outlined">push_pin</span>
                            <span class="material-symbols-outlined">palette</span>
                            <span class="material-symbols-outlined">image</span>
                            <!-- <span class="material-symbols-outlined" @click="onRemoveNote(note.id)">delete</span> -->
                            <div @click="save()">
                                <span class="material-symbols-outlined">save</span>
                            </div>
                    </section>

                    <!-- <button :disabled="!isValid">Save</button> -->
            </form>
        </section>
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