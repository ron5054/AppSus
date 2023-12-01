export default {
  name: 'SideBar',
  props: ['mails'],
  template: `
          <section class="sidebar-container">
            <section
              class="inbox folder"
              :class="{ active: currentTab === 'inbox' }"
              @click="onSetFilterBy('inbox')">
              <span class="material-symbols-outlined">inbox</span>
              <span class="inbox">Inbox</span>
              <span class="unread-count">{{ unreadCount }}</span>
            </section>
      
            <section
              class="starred folder"
              :class="{ active: currentTab === 'starred' }"
              @click="onSetFilterBy('starred')">
              <span class="material-symbols-outlined">star</span>
              <span>Starred</span>
            </section>

            <section
              class="important folder"
              :class="{ active: currentTab === 'important' }"
              @click="onSetFilterBy('important')">
              <span class="material-symbols-outlined">label_important</span>
              <span>Important</span>
            </section>
      
            <section
              class="sent folder"
              :class="{ active: currentTab === 'sent' }"
              @click="onSetFilterBy('sent')">
              <span class="material-symbols-outlined">send</span>
              <span>Sent</span>
            </section>
      
            <section
              class="trash folder"
              :class="{ active: currentTab === 'trash' }"
              @click="onSetFilterBy('trash')">
              <span class="material-symbols-outlined">delete</span>
              <span>Trash</span>
            </section>

            <section
              class="unread folder"
              :class="{ active: currentTab === 'unread' }"
              @click="onSetFilterBy('unread')">
              <span class="material-symbols-outlined">mark_email_unread</span>
              <span>Unread</span>
            </section>

            <section
              class="read folder"
              :class="{ active: currentTab === 'read' }"
              @click="onSetFilterBy('read')">
              <span class="material-symbols-outlined">notification_multiple</span>
              <span>Read</span>
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
      document.querySelector('.cb-sb').classList.toggle('into-view')
    },
  },
}

