export default {
    props: ['note'],
    template: `
        <router-link :to="noteUrl">
            <article class="note-preview">
                <ul class="clean-list note-list">
                    <li v-for="note in notes" :key="note.id" class="note-card">
                        <component :is="cmp.type" :info="cmp.info" @changeInfo="updateNote" />
                    </li>
                </ul>

                <h2>{{ note.title }}</h2>
                <p>{{ note.content }}</p>
                <section class=note-preview-actions-bar>

                </section>
            </article>
        </router-link>
    `,
    data() {
        return {
            noteUrl: `/note/${this.note.id}`,
        }
    },
    created() {
    },
    computed: {
    },
}

/*
<NoteTxt>
<NoteImg>
<NoteVideo>
<NoteTodos>
*/