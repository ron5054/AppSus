import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import NoteTodos from "./NoteTodos.js"


export default {
    props: ['note'],
    template: `
        <router-link :to="noteUrl">
            <!-- <h2>{{ note.title }}</h2> -->

            <article class="note-preview">
                <component
                :is="note.type"
                :info="note.info"
                />
            </article>

            <!-- <p>{{ note.content }}</p> -->

        </router-link>
    `,
    data() {
        return {
            noteUrl: `/note/${this.note.id}`,
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