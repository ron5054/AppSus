import MailPreview from './MailPreview.js'

export default {
    name: 'MailList',
    props: ['mails'],
    template: `
    
       <section class="mail-list">
            <section class="remove-all">
                <input @click="onSelectAll" title="Select All" class="select-box" type="checkbox"/>
                <span @click="onRemoveSelected" title="Delete selected" class="material-symbols-outlined delete">delete</span>
            </section>
            <ul>
                <section @click="navigateTo(mail.id)" v-for="mail in mails" :key="mail.id" :to="'/mail/' + mail.id">
                    <li 
                    :class="{'mail': true, 'is-read': mail.isRead, 'is-selected': mail.isSelected}"
                    @mouseover="mail.isHovered = true" 
                    @mouseleave="mail.isHovered = false">
                        <section class="mail-controls">
                            <input @click.stop="onSelectMail(mail)" title="Select" class="select-box"  type="checkbox" v-model="mail.isSelected">
                            <span @click.stop="onStarMail(mail.id)" title="Star" class="material-symbols-outlined star-alined" :class="{'is-starred': mail.isStarred}">star</span>
                            <span @click.stop="onImportantMail(mail.id)" title="Important" class="material-symbols-outlined" :class="{'is-important': mail.isImportant}">label_important</span>
                        </section>
                        <section class="mp-rm">
                            <MailPreview :mail="mail"/>
                            <section>
                                <span @click.stop="onToggleRead(mail.id)" title="Mark as unread" class="material-symbols-outlined" v-show="!mail.isRead && mail.isHovered">mail</span>
                                <span @click.stop="onToggleRead(mail.id)" title="Mark as read" class="material-symbols-outlined" v-show="mail.isRead && mail.isHovered">drafts</span>
                                <span @click.stop="onRemoveMail(mail.id)" title="Delete" class="material-symbols-outlined delete" v-show="mail.isHovered">delete</span>
                            </section>
                        </section>
                    </li>
                </section>
            </ul>
        </section>
    `,

    data() {
        return {
            checkedMails: null
        }
    },
    methods: {
        onRemoveMail(mailId) {
            this.$emit('remove', mailId)
        },
        onStarMail(mailId) {
            this.$emit('star', mailId)
        },
        onToggleRead(mailId) {
            this.$emit('toggleRead', mailId)
        },
        onImportantMail(mailId) {
            this.$emit('important', mailId)
        },
        onSelectMail(mail) {
            if (!this.checkedMails) {
                this.checkedMails = []
            }

            if (!mail.isSelected && !this.checkedMails.includes(mail.id)) {
                this.checkedMails.push(mail.id)
            } else if (mail.isSelected && this.checkedMails.includes(mail.id)) {
                const index = this.checkedMails.indexOf(mail.id)
                this.checkedMails.splice(index, 1)
            }
        },


        onSelectAll() {
            this.mails.forEach(mail => mail.isSelected = !mail.isSelected)

            const checkedMailIds = []
            this.mails.forEach(mail => {
                if (mail.isSelected) {
                    checkedMailIds.push(mail.id)
                }
            })
            this.checkedMails = checkedMailIds
        },
        navigateTo(mailId) {
            this.$router.push('/mail/' + mailId)
        },
        onRemoveSelected() {
            this.$emit('removeSelected', this.checkedMails)
        }

    },
    components: {
        MailPreview,
    }
}


