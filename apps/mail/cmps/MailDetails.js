import { mailService } from "../services/mail.service.js"


export default {
    name: 'MailDetails',
    template: `
        <section class="mail-details" v-if="mail">
            <h2>{{ mail.subject }}</h2>
            <p> {{ mail.from }} </p>
            <p> {{ mail.body }} </p>
      
            <RouterLink :to="'/mail/' + mail.prevmailId">Prev mail</RouterLink> |
            <RouterLink :to="'/mail/' + mail.nextmailId">Next mail</RouterLink> |
            
            <RouterLink to="/mail">Back to List</RouterLink>
            
        </section>
    `,
    data() {
        return {
            mail: null,

        }
    },
    created() {
        this.loadmail()
    },
    methods: {

    },
    loadmail() {
        const { mailId } = this.$route.params
        mailService.get(mailId)
            .then(mail => {
                this.mail = mail
            })
            .catch(err => {
                alert('Cannot load mail')
                this.$router.push('/mail')
            })
    },
    watch: {
        mailId() {
            this.loadmail()
        },
    },

    computed: {
        mailId() {
            return this.$route.params.mailId
        },

    },
    components: {

    }
}

