import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

import NoteIndex from './apps/keep/pages/NoteIndex.js'

import MailIndex from './apps/mail/pages/MailIndex.js'
import MailDetails from './apps/mail/cmps/MailDetails.js'
import ComposeMail from './apps/mail/cmps/ComposeMail.js'


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
			path: '/mail/',
			component: MailIndex,
			children: [
				{
					path: '/mail/:mailId',
					component: MailDetails
				},
				{
					path: '/mail/newmail',
					component: ComposeMail
				}
			]
		},
		{
			path: '/note',
			component: NoteIndex
		},
	],
}

export const router = createRouter(routerOptions)
