export default {
    name: 'MailPreview',
    props: ['mail'],
    template: `
        <article class="mail-preview-container">
            <section class="mail-icon">
                <img :src="mail.senderImg" :alt="mail.from" />
            </section>
            <section class="mail-attr">
                <section class="mail-sender">
                    <span> {{ mail.from }} </span>
                </section>
                <section class="mail-subject">
                    <span> {{ mail.subject }} </span>
                    <span class="mail-hyphen"> - </span>
                    <span class="mail-body"> {{ mail.body }} </span>
                </section>
            </section>

            <section>
                    <section class="date" v-if="!mail.isHovered"> {{ formattedDate }} </section>
            </section>        
        </article>   
    `,
    computed: {
        formattedDate() {
            const timestamp = this.mail.sentAt
            const now = new Date()
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            const messageDate = new Date(timestamp)
            const isToday = messageDate.toDateString() === today.toDateString()

            if (isToday) {
                const options = { hour: 'numeric', minute: 'numeric', hour12: true }
                return messageDate.toLocaleString('en-US', options)
            } else {
                const options = { month: 'short', day: 'numeric' }
                return messageDate.toLocaleString('en-US', options)
            }
        },
        mailSenderImg() {
            return this.mail.senderImg
        }
    }
}  