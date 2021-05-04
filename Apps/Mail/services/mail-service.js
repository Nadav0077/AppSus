const KEY = 'mails';

export const mailService = {
    query
}
var gMails = [
    { subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { subject: 'homeWork', body: 'Do all exercises from page 100 to 103! goodluck :)', isRead: true, sentAt: 1551133930594 },
    { subject: 'marketing', body: 'join coding academy now! and do magic!', isRead: true, sentAt: 1551133930594 },
    { subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
];

function query() {
    return Promise.resolve(gMails);
}