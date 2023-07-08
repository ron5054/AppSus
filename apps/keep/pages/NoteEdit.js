import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    props: ['note'],

    template: `
        <form @submit.prevent="save" class="edit-note">

            <input v-model="noteToEdit.info.title" type="text" placeholder="Title">

            <input v-if="noteToEdit.type === 'NoteTxt'" v-model="noteToEdit.info.txt" type="text" placeholder="Edit Here">



            <input v-if="noteToEdit.type === 'NoteTodos'" v-model="noteToEdit.info.todos.txt" type="text" placeholder="Edit Here">
            <input v-if="noteToEdit.type === 'NoteTodos'" v-model="noteToEdit.info.todos.txt" type="text" placeholder="Edit Here">
            <input v-if="noteToEdit.type === 'NoteTodos'" v-model="noteToEdit.info.todos.txt" type="text" placeholder="Edit Here">


            <button>Save</button>
            <button @click="onCancel">Cancel</button>
        </form>

    `,
    data() {
        return {
            noteToEdit: noteService.getEmptyNote(),
        }
    },
    created() {
        this.noteToEdit = { ...this.note };
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

// import { noteService } from "../services/note.service.js"
// import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

// import NotePreview from '../cmps/NotePreview.js'


// export default {
//     props: ['note'],
//     template: `

//     `,
//     data() {
//         return {
//             noteToEdit: noteService.getEmptyNote(),
//         }
//     },
//     created() {
//         const { noteId } = this.$route.params
//         if (!noteId) return
//         noteService.get(noteId)
//             .then(note => {
//                 this.noteToEdit = note
//             })
//             .catch(err => {
//                 showErrorMsg('Cannot load note for edit')
//                 this.$router.push('/note')
//             })
//     },
//     methods: {
//         save() {
//             noteService.save(this.noteToEdit)
//                 .then(savedNote => {
//                     showSuccessMsg('Note saved')
//                     this.$router.push('/note')
//                 })
//                 .catch(err => {
//                     showErrorMsg('Cannot save note')
//                 })
//         }
//     },
//     components: {
//         NotePreview
//     }
// }