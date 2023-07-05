import { noteService } from '../services/note.service.js'

export default {
    template: `
    <section v-if="note" class="note-details">
        <h2>{{ note.header }}</h2>
    </section>
    `,

    data() {
        return {
            note: null,
            txt: '',
        }
    },
    created() {
        const { noteId } = this.$route.params
        noteService
            .get(noteId)
            .then(note => {
                this.note = note
            })
            .catch(err => {
                alert('Cannot load note')
                this.$router.push('/note')
            })
    },
    methods: {
    },
    computed: {
    },
    components: {
    },
}