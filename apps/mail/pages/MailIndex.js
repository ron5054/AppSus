import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import MailFilter from '../cmps/MailFilter.js'
import MailList from '../cmps/MailList.js'
import ComposeMail from '../cmps/ComposeMail.js'


export default {
    name: 'MailIndex',
    template: `
        <section class="mail-index">
            <RouterLink to="/mail/edit">Compose</RouterLink> 
            <mailFilter @filter="setFilterBy"/>
            <mailList
                v-if="mails"
                :mails="filteredmails"
                @star="starMail"
                @remove="removeMail"
                 />
        </section>
        <ComposeMail />
    `,
    data() {
        return {
            mails: null,
            filterBy: {},
        }
    },
    methods: {
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
        savemail(mailToSave) {
            mailService.save(mailToSave)
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
        }
    },
    created() {
        mailService.query()
            .then(mails => this.mails = mails)
    },
    components: {
        MailFilter,
        MailList,
        ComposeMail
    }
}