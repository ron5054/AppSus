import MailPreview from './MailPreview.js'

export default {
    name: 'MailList',
    props: ['mails'],
    template: `
       <section class="mail-list">
       <!-- <input type="checkbox" name="selectall" v-model="selectAll" />
       <span class="material-symbols-outlined delete">delete</span> -->
            <ul>
                <RouterLink @click="onIsRead(mail.id)" v-for="mail in mails" :key="mail.id" :to="'/mail/' + mail.id">
                    <li :class="{'mail': true, 'is-read': mail.isRead}">
                        <section class="flex">
                            <input @click.stop="onSelectMail(mail)" type="checkbox" v-model="mail.isSelected">
                            <span @click.prevent.stop="onStarMail(mail.id)" class="material-symbols-outlined"  :class="{'is-starred': mail.isStarred}">star</span>
                        </section>
                        <MailPreview :mail="mail"/>
                        <span @click.prevent="onRemoveMail(mail.id)" class="material-symbols-outlined delete">delete</span>
                        <section class="actions">
                        </section>
                    </li>
                </RouterLink>
            </ul>
        </section>
    `,
    data() {
        return {
            selectAll: null
        }
    },
    methods: {
        onRemoveMail(mailId) {
            this.$emit('remove', mailId)
        },
        onStarMail(mailId) {
            this.$emit('star', mailId)
        },
        onIsRead(mailId) {
            this.$emit('read', mailId)
        },
        onSelectMail(mail) {
            console.log(mail);
        },
        onSelectAll() {
            console.log(this.selectAll);
            //     this.mails.forEach(mail => {
            //         mail.isSelected = this.selectAll;
            // })
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