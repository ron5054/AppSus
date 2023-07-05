import MailPreview from './MailPreview.js'

export default {
    name: 'MailList',
    props: ['mails'],
    template: `
       <section class="mail-list">
            <ul>
                <RouterLink @click="onIsRead(mail.id)" v-for="mail in mails" :key="mail.id" :to="'/mail/' + mail.id">
                    <li :class="{'mail': true, 'is-read': mail.isRead}">
                        <button @click.prevent="onStarMail(mail.id)">⭐</button>
                        <MailPreview :mail="mail"/>
                        <section class="actions">
                            <button @click.prevent="onRemoveMail(mail.id)">x</button>
                        </section>
                    </li>
                </RouterLink>
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
        onIsRead(mailId) {
            this.$emit('read', mailId)
        }
    },
    components: {
        MailPreview,
    }
}