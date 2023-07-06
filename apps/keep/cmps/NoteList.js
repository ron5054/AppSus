


import NotePreview from './NotePreview.js'

export default {
    props: ['notes'],
    template: `
        <section>
            <ul class="clean-list note-list">
                <li v-for="note in notes" :key="note.id" class="note-card">
                    <NotePreview :note="note"/>
                    <section class="note-preview-actions-bar">
                            <span class="material-symbols-outlined">push_pin</span>
                            <span class="material-symbols-outlined" @click="onDuplicateNote(note)">content_copy</span>
                            <span class="material-symbols-outlined">palette</span>
                            <span class="material-symbols-outlined">image</span>
                            <span class="material-symbols-outlined" @click="onRemoveNote(note.id)">delete</span>
                    </section>
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
            this.$emit('duplicate', note)
        }
    },
    components: {
        NotePreview,
    },
    name: 'NoteList',
}