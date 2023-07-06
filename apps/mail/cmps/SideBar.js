export default {
        name: 'SideBar',
        props: ['mails'],
        template: `
            <section class="sidebar-container">
                    <section class="inbox">Inbox <span>{{ unreadCount }}</span></section>
                    <section class="starred">Starred</section>
                    <section class="read">Read</section>
                    <section class="trash">Trash</section>

            </section>    
    `,
        computed: {
                unreadCount() {
                        console.log(this.mails);
                        if (!this.mails) {
                                return 0
                        }
                        return this.mails.filter(mail => !mail.isRead).length
                }
        }
}