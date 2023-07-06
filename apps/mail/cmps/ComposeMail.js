export default {
    template: `
        <section class="new-mail">
            <section class="compose-mail-header">
                <h1>New Message</h1>
                <button class="close-btn material-symbols-outlined" @click="onClose">close</button>
            </section>
            <form @submit.prevent="onSendMail" class="compose-mail">
                <section>
                    <label for="to"></label>
                    <input v-model="address" type="email" id="to" placeholder="to" required/>
                </section>
                <section>
                <label for="subject"></label>
                <input v-model="subject" type="text" id="subject" placeholder="Subject" required/>
                </section>
                <section>
                <textarea class="mail-txt" v-model="body"  placeholder="  write here"></textarea>
                </section>
                <section class="send-btn">
                <button type="submit">Send</button>
                </section>
            </form>
        </section>
    `,
    data() {
        return {
            address: null,
            subject: null,
            body: null
        }
    },
    methods: {
        onSendMail() {
            this.$emit('send', { address: this.address, subject: this.subject, body: this.body })
        },
        onClose() {
            this.$emit('close')
        }

    }
}
