export default {
        name: 'SideBar',
        props: ['mails'],
        template: `
            <section class="sidebar-container">
            
                    <section class="inbox folder"><span class="material-symbols-outlined">inbox</span>Inbox <span>{{ unreadCount }}</span></section>
                    <section class="starred folder"><span class="material-symbols-outlined">star</span>Starred</section>
                    <section class="sent folder"><span class="material-symbols-outlined">send</span>Sent</section>
                    <section class="trash folder"><span class="material-symbols-outlined">delete</span>Trash</section>

            </section>    
    `,
        computed: {
                unreadCount() {
                        if (!this.mails) {
                                return 0
                        }
                        return this.mails.filter(mail => !mail.isRead).length
                }
        }
}

