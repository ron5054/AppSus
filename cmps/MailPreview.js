export default {
    name: 'MailPreview',
    props: ['mail'],
    template: `
        <article class="mail-preview">
            <!-- <h2>{{ mail.title }}</h2>
            <h3>\${{ mail.listPrice.amount }}</h3>
            <RouterLink :to="'/mail/' + mail.id">Details</RouterLink> |
            <RouterLink :to="'/mail/edit/' + mail.id">Edit</RouterLink> -->
        </article>
    `,
}