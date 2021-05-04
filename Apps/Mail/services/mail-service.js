'use strict'
import { utilService } from './util-service.js'
import { storageService } from './storage-service.js'
const KEY = 'mails';

export const mailService = {
    query,
    addMail,
    deleteMail,
    readMail,
    toggleMail
}
var gMails = storageService.loadFromStorage(KEY) ? storageService.loadFromStorage(KEY) : [{
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594,
        isOpen: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'homeWork',
        body: 'Do all exercises from page 100 to 103! goodluck :)',
        isRead: true,
        sentAt: 1551133930594,
        isOpen: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'marketing',
        body: 'join coding academy now! and do magic!',
        isRead: true,
        sentAt: 1551133930594,
        isOpen: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594,
        isOpen: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594,
        isOpen: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594,
        isOpen: false
    },
    {
        id: utilService.makeId(),
        user: 'some-user',
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594,
        isOpen: false
    },
];

function query() {
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
        isOpen: false
    }
    return newMail;
}

function addMail(subject, body) {
    const newMail = _createMail(subject, body);
    gMails.push(newMail);
    storageService.saveToStorage(KEY, gMails)
}

function deleteMail(mailId) {
    const mailIdx = gMails.findIndex(function(mail) {
        return mailId === mail.id
    })
    gMails.splice(mailIdx, 1)
    storageService.saveToStorage(KEY, gMails)
}

function getMailById(mailId) {
    const mail = gMails.find(function(mail) {
        return mailId === mail.id
    })
    return Promise.resolve(mail)
}

function readMail(mail) {
    mail.isRead = true;
}

function toggleMail(mail) {
    if (mail.isOpen) mail.isOpen = false;
    else mail.isOpen = true;
}