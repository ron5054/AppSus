import NotePreview from './NotePreview.js'

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <TransitionGroup name="list" tag="ul">
                <li v-for="note in notes" :key="note.id">
                    <NotePreview :note="note"/>
                    <section class="actions">
                        <button @click="onRemoveNote(note.id)">x</button>
                    </section>
                </li>
            </TransitionGroup>
        </section>
    `,
    methods: {
        onRemoveCar(noteId) {
            this.$emit('remove', noteId)
        }
    },
    components: {
        NotePreview,
    },
    name: 'NoteList',
}