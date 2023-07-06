import NotePreview from './NotePreview.js'

export default {
    props: ['notes'],
    template: `
        <section>
            <ul class="clean-list note-list">
                <li v-for="note in notes" :key="note.id" class="note-card">
                    <NotePreview :note="note"/>
                    <section class="actions">
                        <button @click="onRemoveNote(note.id)">
                            <span class="material-symbols-outlined">close</span>
                        </button>
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