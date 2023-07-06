import MailPreview from './MailPreview.js'

export default {
    name: 'MailList',
    props: ['mails'],
    template: `
       <section class="mail-list">
            <ul>
                <RouterLink @click="onIsRead(mail.id)" v-for="mail in mails" :key="mail.id" :to="'/mail/' + mail.id">
                    <li :class="{'mail': true, 'is-read': mail.isRead}">
                        <section>
                            <input @click.stop type="checkbox" :value="mail.id">
                            <span @click.prevent.stop="onStarMail(mail.id)" class="material-symbols-outlined"  :class="{'is-starred': mail.isStarred}">star</span>
                        </section>
                        <MailPreview :mail="mail"/>
                        <button @click.prevent="onRemoveMail(mail.id)">x</button>
                        <section class="actions">
                        </section>
                    </li>
                </RouterLink>
            </ul>
        </section>
    `,
    data() {
        return {
            isSelected: false
        }
    },
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
        },
        onSelectMail(mailId) {
            console.log(mailId);
        }

    },
    computed: {
        showSentTime() {
            console.log(mail);
        }
    },
    components: {
        MailPreview,
    }
}