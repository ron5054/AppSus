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
                <mailFilter @filter="setFilterBy"/> <span>unread:</span><span>{{ unreadCount }}</span>
            </header>
            
            <section class="mail-main-container">
                <SideBar />
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
            console.log('hi');
            mailService.remove(mailId)
                .then(() => {
                    const idx = this.mails.findIndex(mail => mail.id === mailId)
                    this.mails.splice(idx, 1)
                    showSuccessMsg('mail removed')
                })
                .catch(err => {
                    showErrorMsg('Cannot remove mail')
                })

        },
        starMail(mailId) {
            console.log(mailId);
        },
        markAsRead(mailId) {
            this.selectedMail = this.mails.find(mail => mail.id === mailId)
            this.selectedMail.isRead = true
            console.log(this.selectedMail);
            mailService.save(this.selectedMail)
        },
        sendMail(mailToSave) {
            const mail = {
                id: '',
                subject: mailToSave.subject,
                body: mailToSave.body,
                isRead: false,
                isStarred: false,
                sentAt: Date.now(),
                removedAt: null,
                from: 'ron5054@gmail.com',
                to: mailToSave.address
            };
            mailService.save(mail)
                .then(savedmail => this.mails.push(savedmail))
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
                filteredmails = filteredmails.filter(mail => regex.test(mail.subject))
            }
            return filteredmails
        },
        unreadCount() {
            if (!this.mails) {
                return 0;
            }
            return this.mails.filter(mail => !mail.isRead).length
        }
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