import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import NoteTodos from "./NoteTodos.js"


export default {
    props: ['note'],
    template: `
        <router-link :to="noteUrl">
            <!-- <h2>{{ note.title }}</h2> -->

            <article class="note-preview" :style="noteStyle">
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