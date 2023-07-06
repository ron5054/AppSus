import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const PAGE_SIZE = 5
const MAIL_KEY = 'mailDB'

var gPageIdx

_createmails()

export const mailService = {
    query,
    get,
    remove,
    save,
}
window.mailService = mailService


function query() {
    return storageService.query(MAIL_KEY)
    return mails
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    console.log(mailId);
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function _createmails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [{
            id: 'fghfghfgh',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isInbox: true,
            isRead: false,
            isStarred: false,
            isSent: false,
            sentAt: 1688594419,
            isTrash: false,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: 'gfhfghgf',
            subject: 'Miss you!2',
            body: 'Would love to catch up sometimes',
            isInbox: true,
            isRead: false,
            isStarred: false,
            isSent: false,
            sentAt: 1688594423,
            isTrash: false,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: 'fghgfh',
            subject: 'Miss you!3',
            body: 'Would love to catch up sometimes',
            isInbox: true,
            isRead: false,
            isStarred: false,
            isSent: false,
            sentAt: 1551133930592,
            isTrash: false,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: 'cvbcvb',
            subject: 'Miss you!4',
            body: 'Would love to catch up sometimes',
            isInbox: true,
            isRead: false,
            isStarred: false,
            isSent: false,
            sentAt: 1551133910599,
            isTrash: false,
            from: 'ron5054@momo.com',
            to: 'user@appsus.com'
        }]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

