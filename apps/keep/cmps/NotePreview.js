import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import NoteTodos from "./NoteTodos.js"


export default {
    props: ['note'],
    template: `
        <router-link :to="noteUrl">
            <h2>{{ note.title }}</h2>

            <article class="note-preview">
                        <component
                        :is="note.type"
                        :info="note.info"
                        />
            </article>
            <section class="note-preview-actions-bar">
                            <span class="material-symbols-outlined">push_pin</span>
                            <span class="material-symbols-outlined" @click="onDuplicateNote(note)">content_copy</span>
                            <span class="material-symbols-outlined">palette</span>
                            <span class="material-symbols-outlined">image</span>
                            <span class="material-symbols-outlined" @click="onRemoveNote(note.id)">delete</span>
            </section>


            <p>{{ note.content }}</p>

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