import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import NoteTodos from "./NoteTodos.js"


export default {
    props: ['note'],
    template: `
        <router-link :to="noteUrl">

            <article class="note-preview" :class="{ pinned: note.isPinned }">
                <component
                :is="note.type"
                :info="note.info"
                />
            </article>

        </router-link>
    `,
    data() {
        return {
            noteUrl: `/note/${this.note.id}`,
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