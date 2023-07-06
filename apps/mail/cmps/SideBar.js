export default {
        name: 'SideBar',
        props: ['mails'],
        template: `
                <section class="sidebar-container">
            
                        <section class="inbox folder" @click="onSetFilterBy('inbox')"><span class="material-symbols-outlined">inbox</span>Inbox <span>{{ unreadCount }}</span></section>
                        <section class="starred folder" @click="onSetFilterBy('starred')"><span class="material-symbols-outlined">star</span>Starred</section>
                        <section class="sent folder" @click="onSetFilterBy('sent')"><span class="material-symbols-outlined">send</span>Sent</section>
                        <section class="trash folder" @click="onSetFilterBy('trash')"><span class="material-symbols-outlined">delete</span>Trash</section>

                 </section>
                 `,
        data() {
                return {
                        filterBy: {
                                isStarred: true,
                        }
                }
        },
        computed: {
                unreadCount() {
                        if (!this.mails) {
                                return 0
                        }
                        return this.mails.filter(mail => !mail.isRead).length
                }
        },
        methods: {
                onSetFilterBy(tab) {
                        // this.$emit('filter', { ...this.filterBy })
                        this.$router.push({ path: '/mail', query: { tab } })
                }
        }
}

