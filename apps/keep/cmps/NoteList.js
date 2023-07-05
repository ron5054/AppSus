import NotePreview from './NotePreview.js'

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <ul>
                <li v-for="note in notes" :key="note.id">
                    <NotePreview :note="note"/>
                    <section class="actions">
                        <button @click="onRemoveNote(note.id)">x</button>
                    </section>
                </li>
            </ul>
        </section>
    `,
    methods: {
        onRemoveNote(noteId) {
            this.$emit('remove', noteId)
        }
    },
    components: {
        NotePreview,
    },
    name: 'NoteList',
}