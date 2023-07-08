import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    template: `
        <section class="note-add-section">
            <form @submit.prevent="save" class="note-add-form">
                    <input v-model="noteToAdd.info.title" type="text" placeholder="Title">
                    <input v-model="noteToAdd.info.txt" type="text" placeholder="Take a note...">

                    <section class="note-add-actions-bar">
                            <div @click="save()">
                                <span class="material-symbols-outlined">save</span>
                            </div>

                            <span class="file-type-btn" @click="premiumOnly">Change Note Type</span>
                    </section>
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

    methods: {
        save() {
            this.$emit('noteAdded', { ...this.noteToAdd })
            this.noteToAdd = noteService.getEmptyNote()
        },
        premiumOnly() {
            alert("Sorry, premium users only.")
        }
    }
}