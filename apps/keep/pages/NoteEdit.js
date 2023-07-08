import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    props: ['note'],

    template: `
        <form @submit.prevent="save" class="edit-note">

            <input class="note-edit-input" v-model="noteToEdit.info.title" type="text" placeholder="Title">

            <input class="note-edit-input" v-if="noteToEdit.type === 'NoteTxt'" v-model="noteToEdit.info.txt" type="text" placeholder="Edit Here">

            <div v-for="todo in noteToEdit.info.todos">
                <input
                    class="note-edit-input"
                    v-model="todo.txt"
                    type="text"
                    placeholder="Edit Here"
                >
            </div>

            <button>Save</button>
            <button class="close-btn" @click="onCancel">Cancel</button>
        </form>

    `,
    data() {
        return {
            noteToEdit: noteService.getEmptyNote(),
        }
    },
    created() {
        this.noteToEdit = { ...this.note }
    },
    methods: {
        save() {
            noteService.save(this.noteToEdit)
                .then(savedNote => {
                    showSuccessMsg('Note saved');
                    this.$emit('save', savedNote);
                })
                .catch(err => {
                    showErrorMsg('Cannot save note');
                })
        },
        onCancel() {
            this.$emit('cancelEdit')
        }
    },
}