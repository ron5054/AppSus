import MailPreview from './MailPreview.js'

export default {
    name: 'MailList',
    props: ['mails'],
    template: `
    
       <section class="mail-list">
       <input @click="onSelectAll" title="Select All" type="checkbox"/>
       <span title="remove selected" class="material-symbols-outlined delete">delete</span>
            <ul>
                <section @click="navigateTo(mail.id)" v-for="mail in mails" :key="mail.id" :to="'/mail/' + mail.id">
                    <li :class="{'mail': true, 'is-read': mail.isRead}">
                        
                            <input @click.stop="onSelectMail(mail)" type="checkbox" v-model="mail.isSelected">
                            <span @click.stop="onStarMail(mail.id)" class="material-symbols-outlined"  :class="{'is-starred': mail.isStarred}">star</span>
                    
                        <section class="mp-rm">
                            <MailPreview :mail="mail"/>
                            <span @click.stop="onRemoveMail(mail.id)" class="material-symbols-outlined delete">delete</span>
                        </section>
                    </li>
                </section>
            </ul>
        </section>
    `,

    data() {
        return {
            checkMails: null
        }
    },
    methods: {
        onRemoveMail(mailId) {
            this.$emit('remove', mailId)
        },
        onStarMail(mailId) {
            this.$emit('star', mailId)
        },
        onSelectMail(mail) {
            console.log(mail);
            if (!this.checkMails) this.checkMails = [];

            if (mail.isSelected) {
                this.checkMails.push(mail.id);
            } else {
                const index = this.checkMails.indexOf(mail.id);
                if (index !== -1) {
                    this.checkMails.splice(index, 1);
                }
            }
            console.log(this.checkMails);
        },
        onSelectAll() {
            this.mails.forEach(mail => mail.isSelected = !mail.isSelected)

            const checkedMailIds = []
            this.mails.forEach(mail => {
                if (mail.isSelected) {
                    checkedMailIds.push(mail.id)
                }
            })

            console.log(checkedMailIds)
        },
        navigateTo(mailId) {
            this.$router.push('/mail/' + mailId)
        }
    },
    components: {
        MailPreview,
    }
}