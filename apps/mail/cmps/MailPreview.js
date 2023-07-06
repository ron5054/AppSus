export default {
    name: 'MailPreview',
    props: ['mail'],
    template: `
            <article class="mail-preview-container">
                <section class="mail-sender">
                    <span> {{ mail.from }} </span>
                </section>
                <section class="mail-subject">
                    <span> {{ mail.subject }} </span>
                </section>
                <section class="mail-body"> {{ mail.body }} </section>
                    <section> {{ formattedDate }} </section>
            </article>   
    `,
    computed: {
        formattedDate() {
            const date = new Date(this.mail.sentAt)
            const day = date.getDate()
            const monthIndex = date.getMonth()
            const monthNames = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]
            const month = monthNames[monthIndex]

            return `${day} ${month}`
        }
    }
}
