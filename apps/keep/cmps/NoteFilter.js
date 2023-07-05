export default {
    template: `
        <section class="note-filter">
            <input
                v-model="filterBy.title"
                type="text"
                placeholder="search">
            <input
                v-model.number="filterBy.type"
                type="text"
                placeholder="type">
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                type: '',
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

