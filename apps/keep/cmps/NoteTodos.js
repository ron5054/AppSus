import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['note', 'info'],
    template: `
        <div class="note-todos">
            <h3>{{ info.title }}</h3>
            <ul>
                <li v-for="(todo, index) in info.todos" :key="todo.txt">
                    <input
                        type="checkbox"
                        @change="onCheckBox(note, index, $event)"
                        :checked="todo.doneAt ? true : false">
                    <span :style="{ 'text-decoration': todo.doneAt ? 'line-through' : 'none' }">{{ todo.txt }}</span>
                </li>
            </ul>
        </div>
    `,
    created() {
    },
    methods: {
        onCheckBox(note, todoIndex, event) {
            eventBus.emit('todoDone', note, todoIndex, event.currentTarget.checked)
        }

    }
}