export default {
    template: `
        <section class="note-filter">
            <input
                class="header-input"
                v-model="filterBy.title"
                type="text"
                placeholder="search">
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
            }
        }
    },
    watch: {
        filterBy: {
            handler() {
                this.$emit('filter', this.filterBy)
            },
            deep: true,
        }
    }
}

