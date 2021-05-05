'use strict'
import { utilService } from './util-service.js'
import { storageService } from './storage-service.js'
const KEY = 'mails';

export const mailService = {
    query,
    addMail,
    deleteMail,
    readMail,
    toggleMail,
    getMailById,
    getPrecentOfRead
}
var gMails = storageService.loadFromStorage(KEY) ? storageService.loadFromStorage(KEY) : [{
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594,
        isOpen: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'homeWork',
        body: 'Do all exercises from page 100 to 103! goodluck :)',
        isRead: true,
        sentAt: 1551133930594,
        isOpen: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'marketing',
        body: 'join coding academy now! and do magic!',
        isRead: true,
        sentAt: 1551133930594,
        isOpen: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594,
        isOpen: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594,
        isOpen: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594,
        isOpen: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594,
        isOpen: false,
        isSent: false
    },
];

function query(filterBy = {}) {
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
        isSent: true
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

function readMail(mail) {
    mail.isRead = true;
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