export default {
    props: ['info'],
    template: `
        <div class="note-todos">
            <h3>{{ info.title }}</h3>
            <ul>
                <li v-for="todo in info.todos" :key="todo.txt">
                    <span>{{ todo.txt }}</span>
                    <span v-if="todo.doneAt"> - Done</span>
                </li>
            </ul>
        </div>
    `
}