import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const PAGE_SIZE = 5
const MAIL_KEY = 'mailDB'

var gPageIdx

_createmails()


export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptymail,
    getNextmailId,
    getFilterBy,
    // setFilterBy,
}
window.mailService = mailService



function query() {
    return storageService.query(MAIL_KEY)
    return mails
}


function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevmailId(mail))
}


function _setNextPrevmailId(mail) {
    return storageService.query(mail_KEY)
        .then(mails => {
            const mailIdx = mails.findIndex(currmail => currmail.id === mail.id)
            mail.nextmailId = mails[mailIdx + 1] ? mails[mailIdx + 1].id : mails[0].id
            mail.prevmailId = mails[mailIdx - 1]
                ? mails[mailIdx - 1].id
                : mails[mails.length - 1].id
            return mail
        })
}

function remove(mailId) {
    return storageService.remove(mail_KEY, mailId)
}

function save(mail) {
    console.log(mail.id);
    if (mail.id) {
        return storageService.put(mail_KEY, mail)
    } else {
        return storageService.post(mail_KEY, mail)
    }
}

function getEmptymail(title = '', price) {
    return {
        id: '',
        title,
        description: 'placerat nisi sodales suscipit tellus',
        thumbnail: 'https://picsum.photos/70/105',
        reviews: [],
        listPrice: {
            amount: price,
            currencyCode: "EUR",
            isOnSale: false
        }
    }
}

function getFilterBy() {
    return { ...gFilterBy }
}



function getNextmailId(mailId) {
    return storageService.query(mail_KEY)
        .then(mails => {
            var idx = mails.findIndex(mail => mail.id === mailId)
            if (idx === mails.length - 1) idx = -1
            return mails[idx + 1].id
        })
}


function _createmails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [{
            id: 'fghfghfgh',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: 'gfhfghgf',
            subject: 'Miss you!2',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930598,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: 'fghgfh',
            subject: 'Miss you!3',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930592,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: 'cvbcvb',
            subject: 'Miss you!4',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930599,
            removedAt: null,
            from: 'ron5054@momo.com',
            to: 'user@appsus.com'
        }]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

