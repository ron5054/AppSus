export default {
    name: 'MailPreview',
    props: ['mail'],
    template: `
        <article class="mail-preview">
            <h1> {{ mail.from }} </h1> <h2> {{ mail.subject }} </h2>
            
            <RouterLink :to="'/mail/' + mail.id">Details</RouterLink> |
            <!-- <RouterLink :to="'/mail/edit/' + mail.id">Edit</RouterLink> -->
        </article>
    `,

    created() {
        // console.log(this.mail);
    },
};
