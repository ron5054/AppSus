import MailPreview from './MailPreview.js'

export default {
    name: 'MailList',
    props: ['mails'],
    template: `
    
       <section class="mail-list">
            <section class="remove-all">
                <input class="select-box" @click="onSelectAll" title="Select All" type="checkbox"/>
                <span @click="onRemoveSelected" title="remove selected" class="material-symbols-outlined delete">delete</span>
            </section>
            <ul>
                <section @click="navigateTo(mail.id)" v-for="mail in mails" :key="mail.id" :to="'/mail/' + mail.id">
                    <li 
                    :class="{'mail': true, 'is-read': mail.isRead, 'is-selected': mail.isSelected}"
                    @mouseover="mail.isHovered = true" 
                    @mouseleave="mail.isHovered = false">
                    <!-- <pre>{{mail}}</pre> -->
                        <section class="mail-controls">
                            <input class="select-box" @click.stop="onSelectMail(mail)" type="checkbox" v-model="mail.isSelected">
                            <span @click.stop="onStarMail(mail.id)" class="material-symbols-outlined star-alined" :class="{'is-starred': mail.isStarred}">star</span>
                            <span @click.stop="onImportantMail(mail.id)" class="material-symbols-outlined" :class="{'is-important': mail.isImportant}">label</span>
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
            console.log(mail);
            if (!this.checkedMails) this.checkedMails = [];

            if (mail.isSelected) {
                this.checkedMails.push(mail.id);
            } else {
                const index = this.checkedMails.indexOf(mail.id);
                if (index !== -1) {
                    this.checkedMails.splice(index, 1);
                }
            }
            console.log(this.checkedMails);
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
            console.log(this.checkedMails);
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



// <span @click.stop="onToggleRead(mail.id)" class="material-symbols-outlined" v-show="!mail.isRead && mail.isHovered" :class="{'is-starred': mail.isStarred}">mail</span>
// <span @click.stop="onToggleRead(mail.id)" class="material-symbols-outlined" v-show="mail.isRead && mail.isHovered" :class="{'is-starred': mail.isStarred}">drafts</span>
// <span @click.stop="onRemoveMail(mail.id)" v-show="mail.isHovered" title="Delete" class="material-symbols-outlined delete">delete</span>