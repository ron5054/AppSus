import NotePreview from './NotePreview.js'
import NoteEdit from '../pages/NoteEdit.js'

export default {
    props: ['notes'],
    emits: ['duplicate', 'remove', 'changeColor', 'edit'],
    template: `
    <section>
      <ul class="clean-list note-list">
        <li v-for="note in notes"
        :key="note.id" class="note-card"
        :class="{ pinned: note.isPinned }"
        :style="noteStyle(note)">

        <NotePreview v-if="editingNote !== note" :note="note"/>
        <NoteEdit
            v-if="editingNote === note"
            :note="editingNote"
            @save="saveEditedNote"
            @cancelEdit="cancelEdit"
            >
        </NoteEdit>

          <section class="note-preview-actions-bar">
            <span class="material-symbols-outlined" :class="note.isPinned ? 'fill' : ''" @click="OntogglePin(note)">push_pin</span>
            <span class="material-symbols-outlined" @click="onToggleColorPalette(note)">palette</span>
            <span class="material-symbols-outlined" @click="onDuplicateNote(note)">content_copy</span>
            <span class="material-symbols-outlined" @click="onEditNote(note)">edit</span>
            <span class="material-symbols-outlined" @click="onRemoveNote(note.id)">delete</span>
          </section>

            <div v-if="note.isColorPaletteVisible" class="color-palette">
                <span
                    v-for="color in colors" class="color-circle"
                    :key="color"
                    :style="{ backgroundColor: color }"
                    @click="onChangeColor(note, color)">
                </span>
            </div>

        </li>
      </ul>
    </section>
  `,
    data() {
        return {
            duplicatedNote: null,
            isColorPaletteVisible: false,
            colors: [
                '#f28b82', '#fbbc04', '#fff475', '#ccff90',
                '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb',
                '#fdcfe8', '#e6c9a8', 'white'
            ],
            editingNote: null,
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
        },
        onToggleColorPalette(note) {
            note.isColorPaletteVisible = !note.isColorPaletteVisible
        },
        onChangeColor(note, color) {
            this.isColorPaletteVisible = false

            this.$emit('changeColor', note, color)

            this.bgColor = color
        },
        OntogglePin(note) {
            note.isPinned = !note.isPinned
            this.$emit('pin', note)
        },
        onEditNote(note) {
            this.$emit('edit', note)
            this.editingNote = note
        },
        noteStyle(note) {
            if (note.style && note.style.backgroundColor) {
                return { backgroundColor: note.style.backgroundColor }
            }
            return {}
        },
        cancelEdit() {
            this.editingNote = null
        },
        saveEditedNote(editedNote) {
            const index = this.notes.findIndex(note => note.id === editedNote.id);
            if (index !== -1) {
                this.notes[index] = editedNote
            }
            this.editingNote = null;
        },
    },
    components: {
        NotePreview,
        NoteEdit
    },
    name: 'NoteList'
}