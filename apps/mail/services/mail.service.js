import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mail_db'

_createmails()

export const mailService = {
    query,
    get,
    remove,
    save,
    saveMails,
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

function saveMails(mails) {
    return storageService._save(MAIL_KEY, mails)
}

function _createmails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = generateMails(50)
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}
///////////////////////////////////////////////////////////////////////////////////////////

function getRandomMail() {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'aol.com', 'misterbit.co.il']
    const commonUsernames = ['Tal Amit', 'Tal Liber', 'Adam Bercovich', 'Guy Kadosh', 'Eran Peled', 'Dvir Cohen', 'Dima Polonchuk', 'Shahar ron Zohar', 'Yaron Biton', 'Stav Yaar', 'Sharon Frenkel', 'Denis Lit']
    const randomDomain = domains[Math.floor(Math.random() * domains.length)]
    const randomUsername = commonUsernames[Math.floor(Math.random() * commonUsernames.length)]
    const randomEmail = `${randomUsername}`
    return randomEmail
}

function getRandomPic() {
    const randomNum = Math.floor(Math.random() * 10)
    return `https://randomuser.me/api/portraits/men/${randomNum}.jpg`
}

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
    ];

    const mails = []

    for (var i = 0; i < numMails; i++) {
        const sentence1 = randomTxt[Math.floor(Math.random() * randomTxt.length)];
        const sentence2 = randomTxt[Math.floor(Math.random() * randomTxt.length)];
        const sentence3 = randomTxt[Math.floor(Math.random() * randomTxt.length)];
        const sentence4 = randomTxt[Math.floor(Math.random() * randomTxt.length)];
        const sentence5 = randomTxt[Math.floor(Math.random() * randomTxt.length)];

        const mail = {
            id: utilService.makeId(),
            subject: randomTxt[Math.floor(Math.random() * randomTxt.length)],
            body: sentence1 + ' ' + sentence2 + ' ' + sentence3 + ' ' + sentence4 + ' ' + sentence5,
            isInbox: true,
            isRead: false,
            isStarred: false,
            isSent: false,
            sentAt: utilService.getRandomInt((Date.now() - 100000000), Date.now()),
            isTrash: false,
            from: getRandomMail(),
            senderImg: getRandomPic(),
            to: 'ron5054@gmail.com'
        };

        mails.push(mail)
    }

    return mails
}
