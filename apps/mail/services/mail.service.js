import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const PAGE_SIZE = 5
const MAIL_KEY = 'mail_db'

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
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {

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
        mails = generateMails(50)
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}
///////////////////////////////////////////////////////////////////////////////////////////

function generateMails(numMails) {
    const randomTxt = [
        'Hello, how are you?',
        'Just checking in',
        'Meeting reminder',
        'Important update',
        'Request for information',
        'Congratulations on your success!',
        'Follow-up on our previous conversation',
        'Invitation to the event',
        'Regarding the upcoming project',
        'Thank you for your support'
    ]

    const mails = []

    for (var i = 0; i < numMails; i++) {
        const mail = {
            id: utilService.makeId(),
            subject: randomTxt[Math.floor(Math.random() * randomTxt.length)],
            body: randomTxt[Math.floor(Math.random() * randomTxt.length)],
            isInbox: true,
            isRead: false,
            isStarred: false,
            isSent: false,
            sentAt: generateRandomTimestamp(),
            isTrash: false,
            from: generateRandomEmail(),
            to: 'ron5054@gmail.com'
        }

        mails.push(mail)
    }

    return mails
}


function generateRandomTimestamp() {
    var randomTimestamp = Math.floor(Math.random() * (Date.now() - 0 + 1)) + 0
    return randomTimestamp
}

function generateRandomEmail() {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'aol.com', 'hotmail.com']
    const commonUsernames = ['john', 'emma', 'david', 'sarah', 'michael', 'laura', 'alex', 'jessica', 'chris', 'olivia']
    const randomDomain = domains[Math.floor(Math.random() * domains.length)]
    const randomUsername = commonUsernames[Math.floor(Math.random() * commonUsernames.length)]
    const randomNumber = Math.floor(Math.random() * 100)
    const randomEmail = `${randomUsername}${randomNumber}@${randomDomain}`
    return randomEmail
}