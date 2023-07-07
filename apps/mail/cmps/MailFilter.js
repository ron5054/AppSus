export default {
    name: "MailFilter",
    template: `
        <section class="mail-filter">
            <label for="search">
                <span class="material-symbols-outlined">search</span>
                <input
                    id="search"
                    v-model="filterBy.txt"
                    @input="onSetFilterBy"
                    type="text"
                    placeholder="Search mail">
                <span class="material-symbols-outlined search-clear" @click="onClearFilter"> close </span>
            </label>
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
        },
        onClearFilter() {
            this.filterBy.txt = ''
        }
    }

}

