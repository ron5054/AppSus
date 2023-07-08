export default {
    name: "MailFilter",
    template: `
        <section class="mail-filter">
            <label for="search" class="mail-search">
                <span class="material-symbols-outlined">search</span>
                <input
                    id="search"
                    v-model="filterBy.txt"
                    @input="onSetFilterBy"
                    type="text"
                    placeholder="Search mail">
                <span class="material-symbols-outlined search-clear" @click="onClearFilter"> close </span>
            </label>
            <a class="home-btn material-symbols-outlined" href="/">home</a>
            <button class="user-btn" title="Google Account\nyaron levy\nron5054@gmail.com">y</button>
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

