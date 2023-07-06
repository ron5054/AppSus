export default {
    props: ['note'],
    template: `
        <router-link :to="noteUrl">
            <article class="note-preview">
                <h2>{{ note.title }}</h2>
                <p>{{ note.content }}</p>
                <section class=keep-note-add-actions-bar>
                        <span class="material-symbols-outlined">palette</span>
                        <span class="material-symbols-outlined">image</span>
                </section>
            </article>
        </router-link>
    `,
    data() {
        return {
            noteUrl: `/note/${this.note.id}`
        }
    },
    created() {
    },
    computed: {
    },
}