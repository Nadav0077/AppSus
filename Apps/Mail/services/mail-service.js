'use strict'
import { utilService } from './util-service.js'
import { storageService } from './storage-service.js'
const KEY = 'mails';

export const mailService = {
    query,
    addMail,
    deleteMail,
    toggleReadMail,
    toggleMail,
    getMailById,
    getPrecentOfRead,
    toggleStar,
    sortBySubject,
    sortByDate
}
var gMails = storageService.loadFromStorage(KEY) ? storageService.loadFromStorage(KEY) : [{
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594,
        isOpen: false,
        isSent: false,
        isStared: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'homeWork',
        body: 'Do all exercises from page 100 to 103! goodluck :)',
        isRead: true,
        sentAt: 1551133930594,
        isOpen: false,
        isSent: false,
        isStared: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'marketing',
        body: 'join coding academy now! and do magic!',
        isRead: true,
        sentAt: 1551133930594,
        isOpen: false,
        isSent: false,
        isStared: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594,
        isOpen: false,
        isSent: false,
        isStared: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594,
        isOpen: false,
        isSent: false,
        isStared: true
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594,
        isOpen: false,
        isSent: false,
        isStared: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594,
        isOpen: false,
        isSent: false,
        isStared: false
    },
];

function query(filterBy = {}, sortBy) {
    if (sortBy === 'subject') sortBySubject(gMails);
    else if (sortBy === 'date') sortByDate(gMails)
    if (filterBy === 'byFavorites') {
        const favoriteMails = gMails.filter(mail => {
            return mail.isStared;
        })
        return Promise.resolve(favoriteMails);
    }
    if (filterBy === 'bySent') {
        const sentMails = gMails.filter(mail => {
            return mail.isSent;
        })
        return Promise.resolve(sentMails);

    }
    if (filterBy) {
        var { isRead, txt } = filterBy
        const filteredMails = gMails.filter(mail => {
            if (isRead === 'all') {
                return (mail.subject.includes(txt) || mail.body.includes(txt) || mail.user.includes(txt))
            } else if (isRead === 'readed') {
                return (mail.subject.includes(txt) || mail.body.includes(txt) || mail.user.includes(txt)) && mail.isRead
            }
            return (mail.subject.includes(txt) || mail.body.includes(txt) || mail.user.includes(txt)) && !mail.isRead
        })
        return Promise.resolve(filteredMails);
    }
    return Promise.resolve(gMails);
}

function _createMail(subject, body) {
    const newMail = {
        id: utilService.makeId(),
        user: 'some-user',
        subject: subject,
        body: body,
        isRead: false,
        sentAt: Date.now(),
        isOpen: false,
        isSent: true,
        isStared: false
    }
    return newMail;
}

function addMail(subject, body) {
    const newMail = _createMail(subject, body);
    gMails.push(newMail);
    storageService.saveToStorage(KEY, gMails)
}

function deleteMail(mailId) {
    const mailIdx = gMails.findIndex(mail => {
        return mailId === mail.id
    })
    gMails.splice(mailIdx, 1)
    storageService.saveToStorage(KEY, gMails)
}

function getMailById(mailId) {
    const mail = gMails.find(mail => {
        return mailId === mail.id
    })
    return Promise.resolve(mail)
}

function toggleReadMail(mail) {
    if (mail.isRead) mail.isRead = false
    else mail.isRead = true;
    storageService.saveToStorage(KEY, gMails)
}

function toggleMail(mail) {
    if (mail.isOpen) mail.isOpen = false;
    else mail.isOpen = true;
    storageService.saveToStorage(KEY, gMails)
}

function getPrecentOfRead() {
    let counter = 0;
    gMails.forEach(mail => {
        if (mail.isRead) counter++;
    });
    const precent = (counter / gMails.length) * 100
    return Math.round(precent);
}

function toggleStar(mail) {
    if (mail.isStared) mail.isStared = false
    else mail.isStared = true;
    storageService.saveToStorage(KEY, gMails)
}

function sortBySubject(mails) {
    mails.sort((mail1, mail2) => {
        var subjectA = mail1.subject.toLowerCase();
        var subjectB = mail2.subject.toLowerCase();
        if (subjectA < subjectB) return -1;
        if (subjectA > subjectB) return 1;
        return 0
    });
}

function sortByDate(mails) {
    mails.sort((mail1, mail2) => {
        return mail2.sentAt - mail1.sentAt;
    });
}