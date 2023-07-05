export default {
    template: `
        <form @submit.prevent="onSendMail" class="compose-mail">
            <h1>New Message</h1>
            <label for="to"></label>
            <input v-model="address" type="email" id="to" placeholder="to" required/>
            <label for="subject"></label>
            <input v-model="subject" type="text" id="subject" placeholder="Subject" required/>
            <textarea v-model="body" cols="40" rows="5" placeholder="write here"></textarea>
            <button type="submit">Send</button>
        </form>
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
        }
    }
}


