const { createApp } = Vue

import { router } from './routes.js'

import UserMsg from './cmps/UserMsg.js'

const options = {
    template: `
        <section>
            <RouterView />
            <UserMsg />
        </section>
    `,
    components: {
        UserMsg,
    },
}

const app = createApp(options)
app.use(router)
app.mount('#app')
