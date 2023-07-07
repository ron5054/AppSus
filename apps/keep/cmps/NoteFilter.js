export default {
    template: `

        <section class="header-searchbar">

            <select class="header-filter" v-model="filterBy.type">
                <option value="">ALL</option>
                <option value="NoteTxt">Text</option>
                <option value="NoteImg">Images</option>
                <option value="NoteTodos">To Dos</option>
            </select>

            <input
                class="header-input"
                v-model="filterBy.title"
                type="text"
                placeholder="search"
            >

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

