import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'


export default {
    props: ['note'],
    template: `
            <!-- <h2>{{ note.title }}</h2>
            <p>{{ note.content }}</p>
            <section class=note-preview-actions-bar>

            </section> -->
    `,
    data() {
        return {
            noteToEdit: noteService.getEmptyNote(),
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