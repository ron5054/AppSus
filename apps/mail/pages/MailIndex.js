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
            <section class="mail-main-container">
                <section class="cb-sb">
                    <img class="logo" src="../../assets/img/gmail-logo.png" alt="" />
                    <button @click="toggleCompose" class="compose-btn"><span class="material-symbols-outlined">edit</span>Compose</button>
                    <SideBar @filter="setFilterBy" :mails="mails" />
                </section>

                <section>
                    <mailFilter @filter="setFilterBy"/>
                    <a class="home-btn material-symbols-outlined" href="/">home</a>
                    <mailList
                     v-if="mails"
                     :mails="filteredmails"
                     @star="starMail"
                     @remove="trashMail"
                     />
                </section>

            </section>
        </section>
        <ComposeMail @send="sendMail" @close="showCompose = false" v-if="showCompose"/>
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
                .then((res) => {
                    console.log(res);
                    const idx = this.mails.findIndex(mail => mail.id === mailId)
                    console.log(this.mails);
                    this.mails.splice(idx, 1)
                    console.log(this.mails);
                    showSuccessMsg('mail removed')
                })
                .catch(err => showErrorMsg('Cannot remove mail'))

        },
        trashMail(mailId) {
            const mail = this.mails.find(mail => mail.id === mailId)
            if (mail.isTrash) {
                this.removeMail(mailId)
            } else {
                mail.isTrash = true
                mail.isInbox = false
                mailService.save({ ...mail })
                    .then(showSuccessMsg('mail moved to trash'))
                    .catch(err => showErrorMsg('Cannot move to trash'))
            }
        },
        starMail(mailId) {
            const mail = this.mails.find(mail => mail.id === mailId)
            mail.isStarred = !mail.isStarred
            mailService.save({ ...mail })
        },
        sendMail(mailToSend) {
            const mail = {
                id: '',
                subject: mailToSend.subject,
                body: mailToSend.body,
                isInbox: false,
                isRead: true,
                isStarred: false,
                isSent: true,
                sentAt: Date.now(),
                isTrash: false,
                from: 'ron5054@gmail.com',
                to: mailToSend.address
            }
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