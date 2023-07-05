import { mailService } from "../services/mail.service.js"


export default {
    name: 'MailDetails',
    template: `
        <section class="mail-details" v-if="mail">
            <h2> {{ mail.subject }} </h2>
            <p> {{ mail.from }} </p>
            <p> {{ mail.body }} </p>
      
            <RouterLink :to="'/mail/' + mail.prevMailId">Prev mail</RouterLink> |
            <RouterLink :to="'/mail/' + mail.nextMailId">Next mail</RouterLink> |
            
            <RouterLink to="/mail">Back to List</RouterLink>
            
        </section>
    `,
    data() {
        return {
            mail: null,

        }
    },
    created() {
        this.loadMail()
    },
    methods: {
        loadMail() {
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
    },

    watch: {
        $route: {
            handler(newVal, OldVal) {
                this.loadMail()
            }
        },

    },

    computed: {
        mailId() {
            return this.$route.params.mailId
        },

    },

}

