import { mailService } from "../services/mail.service.js"


export default {
    name: 'MailDetails',
    template: `
        <section class="mail-details" v-if="mail">
            <h2> {{ mail.subject }} </h2>
            <section class="wrapper">
                <img class="sender-img" v-bind:src="mail.senderImg" alt="mail logo">
                <div class="sender-info">
                    <h3> {{ mail.from }} </h3>
                    <h5> {{ mail.body }} </h5>
                    <RouterLink to="/mail" class="close-btn">Back to list</RouterLink>
                </div>
            </section>
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
            if (!mailId) return
            mailService.get(mailId)
                .then(mail => {
                    this.mail = mail
                    this.markAsRead(this.mail)
                })
                .catch(err => {
                    console.log(err);
                    alert('Cannot load mail')
                    this.$router.push('/mail')
                })
        },
        markAsRead(mail) {
            mail.isRead = true
            mailService.save(mail)
        }
    },
}
