export default {
    name: "MailFilter",
    template: `
        <section class="mail-filter">
            <input
                v-model="filterBy.txt"
                @input="onSetFilterBy"
                type="text"
                placeholder="🔍 Search mail">
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
            }
        }
    },
    methods: {
        onSetFilterBy() {
            this.$emit('filter', this.filterBy)
        }
    }
}

