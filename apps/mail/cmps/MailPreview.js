export default {
    name: 'MailPreview',
    props: ['mail'],
    template: `
        <RouterLink class="mail-preview" :to="'/mail/' + mail.id">
            <article>
                <span class="mail-sender"> {{ mail.from }} </span> <span> {{ mail.subject }} </span><span> {{ mail.body }} </span>
            </article>
        </RouterLink>
          
    `,
}
