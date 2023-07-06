import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import MailFilter from '../cmps/MailFilter.js'
import MailList from '../cmps/MailList.js'
import ComposeMail from '../cmps/ComposeMail.js'
import SideBar from '../cmps/SideBar.js'


export default {
    name: 'MailIndex',
    template: `
        <section class="mail-index">
            <header class="mail-header-container">
                <button @click="toggleCompose" class="compose-btn"><span class="material-symbols-outlined">edit</span>Compose</button>
                <mailFilter @filter="setFilterBy"/>
            </header>
            
            <section class="mail-main-container">
                <SideBar @filter="setFilterBy" :mails="mails" />
                <mailList
                     v-if="mails"
                     :mails="filteredmails"
                     @star="starMail"
                     @remove="removeMail"
                     @read="markAsRead"
                 />
            </section>
        </section>
        <ComposeMail @send="sendMail" v-if="showCompose"/>
    `,
    data() {
        return {
            mails: null,
            filterBy: {},
            showCompose: false,
            selectedMail: null
        }
    },

    methods: {
        toggleCompose() {
            this.showCompose = !this.showCompose
        },
        removeMail(mailId) {
            mailService.remove(mailId)
                .then(() => {
                    const idx = this.mails.findIndex(mail => mail.id === mailId)
                    console.log(this.mails);
                    this.mails.splice(idx, 1)
                    console.log(this.mails);
                    showSuccessMsg('mail removed')
                })
                .catch(err => showErrorMsg('Cannot remove mail'))

        },
        // trashMail(mailId) {
        //     this.selectedMail = this.mails.find(mail => mail.id === mailId)
        //     if (this.selectedMail.isTrash) {
        //         this.removeMail(mailId)
        //     } else {
        //         this.selectedMail.isTrash = true
        //         this.selectedMail.isInbox = false
        //         mailService.save(this.selectedMail)
        //             .then(showSuccessMsg('mail moved to trash'))
        //             .catch(err => showErrorMsg('Cannot move to trash'))
        //     }
        // },
        starMail(mailId) {
            this.selectedMail = this.mails.find(mail => mail.id === mailId)
            this.selectedMail.isStarred = !this.selectedMail.isStarred
            mailService.save(this.selectedMail)
        },
        markAsRead(mailId) {
            this.selectedMail = this.mails.find(mail => mail.id === mailId)
            this.selectedMail.isRead = true
            mailService.save(this.selectedMail)
        },
        sendMail(mailToSend) {
            const mail = {
                id: '',
                subject: mailToSend.subject,
                body: mailToSend.body,
                isInbox: false,
                isRead: false,
                isStarred: false,
                isSent: true,
                sentAt: Date.now(),
                isTrash: false,
                from: 'ron5054@gmail.com',
                to: mailToSend.address
            };
            mailService.save(mail)
                .then(savedmail => this.mails.push(savedmail))
                .catch(err => alert('Message not sent'))
            this.showCompose = false
            showSuccessMsg('mail sent')
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        filteredmails() {
            let filteredmails = this.mails
            if (this.filterBy.txt) {
                const regex = new RegExp(this.filterBy.txt, 'i')
                filteredmails = filteredmails.filter(mail => {
                    return regex.test(mail.subject) || regex.test(mail.body)
                })
            }
            if (this.filterBy.tab === 'inbox')
                filteredmails = filteredmails.filter(mail => mail.isInbox)
            if (this.filterBy.tab === 'starred')
                filteredmails = filteredmails.filter(mail => mail.isStarred)
            if (this.filterBy.tab === 'sent')
                filteredmails = filteredmails.filter(mail => mail.isSent)
            if (this.filterBy.tab === 'trash')
                filteredmails = filteredmails.filter(mail => mail.isTrash)
            return filteredmails
        },
    },
    watch: {
        $route: {
            deep: true,
            immediate: true,
            handler: function (val, oldVal) {
                const { tab } = val.query
                if (tab) this.filterBy.tab = tab
            }
        },
    },


    created() {
        mailService.query()
            .then(mails => this.mails = mails)
    },
    components: {
        MailFilter,
        MailList,
        ComposeMail,
        SideBar
    }
}