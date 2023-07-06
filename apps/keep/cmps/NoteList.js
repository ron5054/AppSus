import NotePreview from './NotePreview.js'

export default {
    props: ['notes'],
    emits: ['duplicate', 'remove'],
    template: `
        <section>
            <ul class="clean-list note-list">
                <li v-for="note in notes" :key="note.id" class="note-card">
                    <NotePreview :note="note"/>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            duplicatedNote: null
        }
    },
    methods: {
        onRemoveNote(noteId) {
            this.$emit('remove', noteId)
        },
        onDuplicateNote(note) {
            let noteCopy = JSON.parse(JSON.stringify(note))
            delete noteCopy.id
            this.$emit('duplicate', noteCopy)
        }
    },
    components: {
        NotePreview,
    },
    name: 'NoteList',
}