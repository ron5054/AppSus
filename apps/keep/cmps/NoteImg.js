export default {
    props: ['info'],
    template: `
        <div class="note-img">
            <img :src="info.url" :alt="info.title" />
            <p>{{ info.title }}</p>
        </div>
    `
}
