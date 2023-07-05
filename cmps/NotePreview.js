export default {
    props: ['note'],
    template: `
        <article class="note-preview">
            <h2>{{ note.vendor }}</h2>
            <h3>{{ note.maxSpeed }}</h3>
            <RouterLink :to="'/note/' + note.id">Details</RouterLink> |
            <RouterLink :to="'/note/edit/' + note.id">Edit</RouterLink>
        </article>
    `,
    computed: {
    },
    created() {
    },
}