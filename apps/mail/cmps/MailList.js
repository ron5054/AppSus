import MailPreview from './MailPreview.js'

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
            <ul>
                <li v-for="mail in mails" :key="mail.id">
                    <MailPreview :mail="mail"/>
                    <section class="actions">
                        <button @click="onRemoveMail(mail.id)">x</button>
                    </section>
                </li>
            </ul>
        </section>
    `,
    methods: {
        onRemoveMail(mailId) {
            this.$emit('remove', mailId)
        },
        onShowDetails(mailId) {
            this.$emit('select', mailId)
        },
    },
    components: {
        MailPreview,
    }
}