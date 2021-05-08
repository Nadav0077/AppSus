import { utilService } from './util-service.js'
import { storageService } from './storage-service.js'

const KEY = 'notesDB'

export const keepService = {
    query,
    addNote,
    saveNote,
    delNote,
    createEmbededLink,
    getNoteById
}



var gNotes = _createNotes()

function getNoteById(id) {
    return Promise.resolve(gNotes.find(note => note.id === id))
}

function query(filterBy, searchBy) {
    console.log(filterBy, searchBy)
    var notes = gNotes.slice();
    if (filterBy && filterBy !== 'All') notes = notes.filter(note => note.type === filterBy)
    if (searchBy) notes = notes.filter(note => {
        if (note.type === 'NoteTodos') return note.info.todos.some(todo => todo.txt.includes(searchBy))
        else if (note.type === 'NoteText') return note.info.txt.includes(searchBy)
    })
    console.log(notes)
    return Promise.resolve(notes);
}

function createEmbededLink(link) {
    link = link.replace('watch?v=', 'embed/');
    console.log('link after replace', link)
    if (link.split('').findIndex(char => char === '&') === -1) {
        console.log(link);
        return link;
    } else {
        link = link.slice(0, link.split('').findIndex(char => char === '&'));
        console.log(link);
        return link;
    }
}



function delNote(note) {
    gNotes.splice(findIdxById(note.id), 1)
    storageService.saveToStorage(KEY, gNotes)
}

function findIdxById(id) {
    const idx = gNotes.findIndex(note => note.id === id)
    return idx
}

function saveNote(note) {
    gNotes[findIdxById(note.id)] = note
    storageService.saveToStorage(KEY, gNotes)
}

function _createNotes() {
    return (storageService.loadFromStorage(KEY)) ? storageService.loadFromStorage(KEY) : [{
            id: utilService.makeId(),
            type: "NoteText",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!",
                style: {
                    backgroundColor: "#B247FF"
                }
            }

        },
        {
            id: utilService.makeId(),
            isPinned: false,
            type: "NoteImg",
            info: {
                url: "https://ilion.digital/wp-content/uploads/2019/10/unnamed-1.png",
                title: "Me playing Mi",
                style: {
                    backgroundColor: "#B247FF"
                }
            },

        },
        {
            id: utilService.makeId(),
            isPinned: false,
            type: "NoteTodos",
            info: {
                label: "How was it:",
                todos: [
                    { txt: "Do that", doneAt: null },
                    { txt: "Do this", doneAt: 187111111 }
                ],
                style: {
                    backgroundColor: "#B247FF"
                }
            }
        },
        {
            id: utilService.makeId(),
            isPinned: false,
            type: "NoteTodos",
            info: {
                label: "How was it:",
                todos: [
                    { txt: "Do that", doneAt: null },
                    { txt: "Do this", doneAt: 187111111 }
                ],
                style: {
                    backgroundColor: "#FF99FF"
                }
            }
        },
        {
            id: utilService.makeId(),
            isPinned: false,
            type: "NoteTodos",
            info: {
                label: "How was it:",
                todos: [
                    { txt: "Do that", doneAt: null },
                    { txt: "Do this", doneAt: 187111111 }
                ],
                style: {
                    backgroundColor: "#4782ff"
                }
            }
        },
        {
            id: utilService.makeId(),
            isPinned: false,
            type: "NoteTodos",
            info: {
                label: "How was it:",
                todos: [
                    { txt: "Do that", doneAt: null },
                    { txt: "Do this", doneAt: 187111111 },
                    { txt: "Do that", doneAt: null },
                    { txt: "Do that", doneAt: null },
                ],
                style: {
                    backgroundColor: "#475dff"
                }
            }
        }, {
            id: utilService.makeId(),
            isPinned: false,
            type: "NoteImg",
            info: {
                url: "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
                title: "Me playing Mi",
                style: {
                    backgroundColor: "#8F00F5"
                }
            },

        }
    ]

}

function addNote(type, info) {
    gNotes.push({
        id: utilService.makeId(),
        isPinned: false,
        type,
        info
    })
    if (type !== 'NoteAudio') storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}