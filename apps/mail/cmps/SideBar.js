export default {
        name: 'SideBar',
        props: ['mails'],
        template: `
          <section class="sidebar-container">
            <section
              class="inbox folder"
              :class="{ active: currentTab === 'inbox' }"
              @click="onSetFilterBy('inbox')"
            >
              <span class="material-symbols-outlined">inbox</span>
              <span>Inbox</span>
              <span class="unread-count">{{ unreadCount }}</span>
            </section>
      
            <section
              class="starred folder"
              :class="{ active: currentTab === 'starred' }"
              @click="onSetFilterBy('starred')"
            >
              <span class="material-symbols-outlined">star</span>
              <span>Starred</span>
              <span></span>
            </section>
      
            <section
              class="sent folder"
              :class="{ active: currentTab === 'sent' }"
              @click="onSetFilterBy('sent')"
            >
              <span class="material-symbols-outlined">send</span>
              <span>Sent</span>
              <span></span>
            </section>
      
            <section
              class="trash folder"
              :class="{ active: currentTab === 'trash' }"
              @click="onSetFilterBy('trash')"
            >
              <span class="material-symbols-outlined">delete</span>
              <span>Trash</span>
              <span></span>
            </section>
          </section>
        `,
        data() {
                return {
                        currentTab: ''
                }
        },
        computed: {
                unreadCount() {
                        if (!this.mails) {
                                return 0
                        }
                        return this.mails.filter(mail => !mail.isRead).length
                },
        },
        methods: {
                onSetFilterBy(tab) {
                        this.currentTab = tab
                        this.$router.push({ path: '/mail', query: { tab } })
                },
        },
};
