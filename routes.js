import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

import NoteIndex from './apps/keep/pages/NoteIndex.js'
import NoteDetails from './apps/keep/pages/NoteDetails.js'
// import NoteEdit from './apps/keep/pages/NoteEdit.js'
// import NoteAdd from './apps/keep/pages/NoteAdd.js'

import MailIndex from './apps/mail/pages/MailIndex.js'
import MailDetails from './apps/mail/cmps/MailDetails.js'


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
			path: '/mail',
			component: MailIndex
		},
		{
			path: '/mail/:mailId',
			component: MailDetails
		},
		{
			path: '/note',
			component: NoteIndex,
			children: [
				{
					path: ':noteId',
					component: NoteDetails,
				}
			]
		},
		// {
		// 	path: '/note/:noteId',
		// 	component: NoteDetails
		// },
		// {
		// 	path: '/note/edit/:noteId?',
		// 	component: NoteEdit
		// }
	],
}

export const router = createRouter(routerOptions)
