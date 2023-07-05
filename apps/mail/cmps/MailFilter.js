export default {
    template: `
        <section class="mail-filter">
            <input
                v-model="filterBy.txt"
                @input="onSetFilterBy"
                type="text"
                placeholder="search">
            
                <input v-model="filterBy.isRead" value="false" @input="onSetFilterBy" type="radio" name="saleStatus">All
                <input v-model="filterBy.isRead" value="true" @input="onSetFilterBy" type="radio" name="saleStatus">Read
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                isRead: 'false'
            }
        }
    },
    methods: {
        onSetFilterBy() {
            this.$emit('filter', this.filterBy)
            console.log(this.filterBy);
        }
    }
}

