import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import NoteTodos from "./NoteTodos.js"


export default {
    props: ['note'],
    template: `
        <article class="note-preview" :class="{ pinned: note.isPinned }">
            <component
            :is="note.type"
            :info="note.info"
            :note="note"
            />
        </article>
    `,
    data() {
        return {
            noteStyle: ''
        }
    },
    components: {
        NoteTxt,
        NoteImg,
        NoteTodos,
    },
    created() {
    },
    computed: {
    },
}