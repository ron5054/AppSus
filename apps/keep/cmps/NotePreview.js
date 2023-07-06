export default {
    props: ['note'],
    template: `
        <router-link :to="noteUrl">
            <article class="note-preview">
                <h2>{{ note.title }}</h2>
                <p>{{ note.content }}</p>
                <section class=note-preview-actions-bar>

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