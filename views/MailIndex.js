import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

// import mailFilter from '../cmps/mailFilter.js'
// import mailList from '../cmps/mailList.js'


export default {
    template: `
        <section class="mail-index">
            <RouterLink to="/mail/edit">Add mail</RouterLink> 
            <!-- <mailFilter @filter="setFilterBy"/> -->
            <mailList
                v-if="mails"
                :mails="filteredmails"
                @remove="removemail" />
        </section>
    `,
    data() {
        return {
            mails: null,
            selectedmail: null,
            filterBy: {},
        }
    },
    methods: {
        removemail(mailId) {
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
        selectmail(mailId) {
            this.selectedmail = this.mails.find(mail => mail.id === mailId)
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
                filteredmails = filteredmails.filter(mail => regex.test(mail.title))
            }
            return filteredmails
        }
    },
    created() {
        mailService.query()
            .then(mails => this.mails = mails)
    },
    components: {
        // mailFilter,
        // mailList,
    }
}