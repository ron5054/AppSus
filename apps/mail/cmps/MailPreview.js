export default {
    name: 'MailPreview',
    props: ['mail'],
    template: `
            <article>
                <span class="mail-sender"> {{ mail.from }} </span>
                <span> {{ mail.subject }} </span>
                <span> {{ mail.body }} </span>
                <span> {{ formattedDate }}</span>
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
