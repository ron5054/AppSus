import MailPreview from './MailPreview.js'

export default {
    name: 'MailList',
    props: ['mails'],
    template: `
        <section class="mail-list">
            <ul>
                <li v-for="mail in mails" :key="mail.id">
                    <MailPreview :mail="mail"/>
                    <section class="actions">
                        <button @click="onRemoveMail(mail.id)">x</button>
                        <button @click="onStarMail(mail.id)">⭐</button>
                    </section>
                </li>
            </ul>
        </section>
    `,
    methods: {
        onRemoveMail(mailId) {
            this.$emit('remove', mailId)
        },
        onStarMail(mailId) {
            console.log(mailId);
            this.$emit('star', mailId)
        },
    },
    components: {
        MailPreview,
    }
}