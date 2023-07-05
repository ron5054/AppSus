export default {
    props: ['note'],
    template: `
        <article class="note-preview">
            <h2>{{ note.title }}</h2>
            <p>{{ note.content }}</p>
            <!-- <RouterLink :to="'/note/' + note.id">Details</RouterLink> | -->
            <RouterLink :to="'/note/edit/' + note.id">Edit</RouterLink>
            <section class=keep-note-add-actions-bar>
                    <span class="material-symbols-outlined">palette</span>
                    <span class="material-symbols-outlined">image</span>
            </section>
        </article>
    `,
    computed: {
    },
    created() {
    },
}