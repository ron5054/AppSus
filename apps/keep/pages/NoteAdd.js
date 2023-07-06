import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    template: `
        <section class="note-add-section">
            <form @submit.prevent="save" class="note-add-form">
                    <input v-model="noteToAdd.info.title" type="text" placeholder="Title">
                    <input v-model="noteToAdd.info.txt" type="text" placeholder="Take a note...">

                    <section class="note-add-actions-bar">
                            <span class="material-symbols-outlined">push_pin</span>

                            <span class="material-symbols-outlined">palette</span>

                            <!-- <input type="file" ref="fileInput" style="display: none" @change="ImgUpload"> -->
                            <span class="material-symbols-outlined" @click="">image</span>

                            <div @click="save()">
                                <span class="material-symbols-outlined">save</span>
                            </div>
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
        }
    }
}