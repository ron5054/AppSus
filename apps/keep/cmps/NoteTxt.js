export default {
    props: ['info'],
    template: `
        <div class="note-txt">
            <h2>{{ info.title }}</h2>
            <p>{{ info.txt }}</p>
        </div>
    `
}
