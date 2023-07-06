export default {
    template: `

        <div class="color-picker">
             <div v-for="color in colors" :key="color" :style="{ backgroundColor: color }" @click="selectColor(color)"></div>
        </div>
    `
    ,
    data() {
        return {
            colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'],
        }
    },
    methods: {
        selectColor(color) {
            this.$emit('color-selected', color)
        },
    },
}
