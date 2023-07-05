import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    template: `
        <form @submit.prevent="save" class="note-add-form">
            <section class=note-add-section>
                <input v-model="noteToAdd.title" type="text" placeholder="Title">
                <input v-model="noteToAdd.content" type="text" placeholder="Take a note...">
                <button>Save</button>
            </section>
            <hr />
        </form>
    `,
    data() {
        return {
            noteToAdd: noteService.getEmptyNote(),
            note: null,
        }
    },
    computed: {
        isValid() {
            return this.bookToEdit.title.length > 0
          },
    },
    created() {

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