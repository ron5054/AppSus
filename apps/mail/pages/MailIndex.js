import { mailService } from '../services/mail.service.js'
import { eventBus, showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

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
                    <section class="logo-container">
                        <button @click="goHome" class="material-symbols-outlined">menu</button>
                        <img class="logo" src="assets/img/gmail-logo.png" alt="" />
                    </section>
                    <button @click="toggleCompose" class="compose-btn"><span class="material-symbols-outlined">edit</span>Compose</button>
                    <SideBar @filter="setFilterBy" :mails="mails" />
                </section>
                <mailFilter @filter="setFilterBy"/>
                <mailList
                     v-if="mails"
                     :mails="filteredmails"
                     @star="starMail"
                     @important="importantMail"
                     @remove="trashMail"
                     @toggleRead="toggleRead"
                     @removeSelected="removeSelected"
                     />
                <router-view></router-view>
                <ComposeMail @send="sendMail" @close="showCompose = false" v-if="showCompose"/>
                </section>
                <button v-if="this.$route.path !== '/mail/newmail'" class="compose-btn-mobile" @click="this.$router.push('/mail/newmail')"><span class="material-symbols-outlined">edit</span></button>
        </section>
    `,
    data() {
        return {
            mails: null,
            filterBy: {},
            showCompose: false,
        }
    },

    methods: {
        goHome() {
            this.$router.push('/')
        },
        toggleCompose() {
            this.showCompose = !this.showCompose
        },
        removeSelected(mailIdArray) {
            if (!mailIdArray || !mailIdArray.length) return
            mailIdArray.forEach(mailId => {
                const mail = this.mails.find(mail => mail.id === mailId)
                if (mail.isTrash) {
                    const idx = this.mails.findIndex(mail => mail.id === mailId)
                    this.mails.splice(idx, 1)
                } else {
                    mail.isTrash = true
                    mail.isRead = true
                    mail.isInbox = false
                    mail.isSent = false
                    mail.isSelected = false
                }
            })

            document.querySelector('.select-box').checked = false
            mailService.saveMails(this.mails)
        },
        removeMail(mailId) {
            mailService.remove(mailId)
                .then((res) => {
                    const idx = this.mails.findIndex(mail => mail.id === mailId)
                    this.mails.splice(idx, 1)
                    showSuccessMsg('Mail deleted')
                })
                .catch(err => showErrorMsg('Cannot remove mail'))

        },
        trashMail(mailId) {
            const mail = this.mails.find(mail => mail.id === mailId)
            if (mail.isTrash) {
                if (confirm('Are you sure you want to remove this mail?'))
                    this.removeMail(mailId)

            } else {
                mail.isTrash = true
                mail.isRead = true
                mail.isInbox = false
                mail.isSent = false
                mailService.save({ ...mail })
                    .then(showSuccessMsg('Mail moved to trash'))
                    .catch(err => showErrorMsg('Cannot move to trash'))
            }
        },
        starMail(mailId) {
            const mail = this.mails.find(mail => mail.id === mailId)
            mail.isStarred = !mail.isStarred
            mailService.save({ ...mail })
                .catch(err => console.log(err))
        },
        toggleRead(mailId) {
            const mail = this.mails.find(mail => mail.id === mailId)
            mail.isRead = !mail.isRead
            mailService.save({ ...mail })
                .catch(err => console.log(err))
        },
        importantMail(mailId) {
            const mail = this.mails.find(mail => mail.id === mailId)
            mail.isImportant = !mail.isImportant
            mailService.save({ ...mail })
                .catch(err => console.log(err))
        },
        sendMail(mailToSend) {
            const mail = {
                id: '',
                subject: mailToSend.subject,
                body: mailToSend.body,
                isInbox: false,
                isRead: true,
                isStarred: false,
                isImportant: false,
                isSent: true,
                sentAt: Date.now(),
                isTrash: false,
                from: 'ron5054@gmail.com',
                to: mailToSend.address,
                senderImg: 'https://randomuser.me/api/portraits/men/22.jpg'
            }
            mailService.save(mail)
                .then(savedmail => this.mails.push(savedmail))
                .catch(err => alert('Message not sent'))
            this.showCompose = false
            showSuccessMsg('Mail sent')
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        filteredmails() {
            let filteredmails = this.mails
            filteredmails.sort((a, b) => b.sentAt - a.sentAt)
            if (this.filterBy.txt) {
                const regex = new RegExp(this.filterBy.txt, 'i')
                filteredmails = filteredmails.filter(mail => {
                    return regex.test(mail.subject) || regex.test(mail.body) || regex.test(mail.from)
                })
            }
            if (this.filterBy.tab === 'inbox')
                filteredmails = filteredmails.filter(mail => mail.isInbox)
            if (this.filterBy.tab === 'starred')
                filteredmails = filteredmails.filter(mail => mail.isStarred)
            if (this.filterBy.tab === 'important')
                filteredmails = filteredmails.filter(mail => mail.isImportant)
            if (this.filterBy.tab === 'sent')
                filteredmails = filteredmails.filter(mail => mail.isSent)
            if (this.filterBy.tab === 'trash')
                filteredmails = filteredmails.filter(mail => mail.isTrash)
            if (this.filterBy.tab === 'read')
                filteredmails = filteredmails.filter(mail => mail.isRead)
            if (this.filterBy.tab === 'unread')
                filteredmails = filteredmails.filter(mail => !mail.isRead)
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
        eventBus.on('sendMail', this.sendMail)
        const favicon = document.getElementById('favicon')
        favicon.href = 'assets/img/gmail.svg'
        document.title = 'Gmail'

        mailService.query()
            .then(mails => this.mails = mails)
            .catch(err => console.log(err))

    },
    components: {
        MailFilter,
        MailList,
        ComposeMail,
        SideBar
    }
}