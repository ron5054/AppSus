import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'



export default {
    template: `

    `,
    data() {
        return {
            noteToEdit: noteService.getEmptyNote(),
        }
    },
    computed: {
        isValid() {
        }
    },
    created() {
        const { noteId } = this.$route.params
        if (!noteId) return
        noteService.get(noteId)
            .then(note => {
                this.noteToEdit = note
            })
            .catch(err => {
                showErrorMsg('Cannot load note for edit')
                this.$router.push('/note')
            })
    },

    methods: {
        save() {
            noteService.save(this.noteToEdit)
                .then(savedNote => {
                    console.log('Saved Note', savedNote)
                    showSuccessMsg('Note saved')
                    this.$router.push('/note')
                })
                .catch(err => {
                    showErrorMsg('Cannot save note')
                })
        }
    }
}