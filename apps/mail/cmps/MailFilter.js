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
            <button @click="openSideBar" class="user-btn" title="Google Account\nyaron levy\nron5054@gmail.com">y</button>
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
        },
        openSideBar() {
            document.querySelector('.cb-sb').classList.toggle('into-view')
        }
    }

}

