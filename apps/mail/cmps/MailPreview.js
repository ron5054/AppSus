export default {
    name: 'MailPreview',
    props: ['mail'],
    template: `
        <article class="mail-preview-container">
            <section class="mail-attr">
                <section class="mail-sender">
                    <span> {{ mail.from }} </span>
                </section>
                <section class="mail-subject">
                    <span> {{ mail.subject }} </span>
                    <span> - </span>
                </section>
                    <section class="mail-body"> {{ mail.body }} </section>
            </section>

            <section>
                    <section class="date"> {{ formattedDate }} </section>
            </section>        
        </article>   
    `,
    computed: {
        formattedDate() {
            const sentAt = new Date(this.mail.sentAt);
            const now = new Date();

            const timeDiff = now.getTime() - sentAt.getTime();
            const oneDayInMillis = 24 * 60 * 60 * 1000;

            if (timeDiff < oneDayInMillis) {
                const options = { hour: 'numeric', minute: 'numeric', hour12: true }
                return sentAt.toLocaleString('en-US', options)
            } else if (sentAt.getFullYear() < now.getFullYear()) {
                const options = { year: 'numeric', month: 'short', day: 'numeric' }
                return sentAt.toLocaleDateString('en-US', options)
            } else {
                const monthNames = [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ]
                const month = monthNames[sentAt.getMonth()]
                const day = sentAt.getDate()
                return `${month} ${day}`
            }
        }
    }

}

