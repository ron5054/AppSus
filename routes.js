import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

import NoteIndex from './views/NoteIndex.js'
// import NoteDetails from './views/NoteDetails.js'
// import NoteEdit from './views/NoteEdit.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/about',
			component: AboutUs,
		},
		{
            path: '/note',
            component: NoteIndex
        },
        // {
        //     path: '/note/:noteId',
        //     component: NoteDetails
        // },
        // {
        //     path: '/note/edit/:noteId?',
        //     component: NoteEdit
        // }
	],
}

export const router = createRouter(routerOptions)
