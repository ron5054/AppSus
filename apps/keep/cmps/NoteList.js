import NotePreview from './NotePreview.js'

export default {
    props: ['notes'],
    emits: ['duplicate', 'remove'],
    template: `
    <section>
      <ul class="clean-list note-list">
        <li v-for="note in notes" :key="note.id" class="note-card" :class="{ pinned: note.isPinned }" :style="{ backgroundColor: bgColor }">
          <NotePreview :note="note"  />
          <section class="note-preview-actions-bar">

            <span class="material-symbols-outlined" :class="note.isPinned ? 'fill' : ''" @click="OntogglePin(note)">push_pin</span>

            <span class="material-symbols-outlined">image</span>

            <span class="material-symbols-outlined" @click="onToggleColorPalette">palette</span>

            <span class="material-symbols-outlined" @click="onDuplicateNote(note)">content_copy</span>

            <span class="material-symbols-outlined" @click="onRemoveNote(note.id)">delete</span>
          </section>

            <div v-if="isColorPaletteVisible" class="color-palette">
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
            colors: ['#ff0000', '#00ff00', '#0000ff'],
            bgColor: 'white'
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
        onToggleColorPalette() {
            this.isColorPaletteVisible = !this.isColorPaletteVisible
            console.log(this.isColorPaletteVisible)
        },
        onChangeColor(note, color) {
            this.isColorPaletteVisible = false

            this.$emit('changeColor', note, color)

            this.bgColor = color
        },
        OntogglePin(note) {
            note.isPinned = !note.isPinned
        },
    },
    computed: {
    },
    components: {
        NotePreview
    },
    name: 'NoteList'
}