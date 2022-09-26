const notesContainer = document.getElementById("app");

const addNoteButton = notesContainer.querySelector(".add-note");


getNotes().forEach(note => {

    const noteElement = createNoteElement(note.id, note.content);

    notesContainer.insertBefore(noteElement, addNoteButton);

});


addNoteButton.addEventListener("click", () => addNote());





function getNotes() {


    return JSON.parse(localStorage.getItem("notify") || "[]");

}



function saveNotes(notes) {
    localStorage.setItem("notify", JSON.stringify(notes));


}


function createNoteElement(id, content) {

    const element = document.createElement("div");

    element.classList.add("note");
    element.value = content;

    element.placeholder = "Write Something";



    element.addEventListener("change", () => {

        updateNote(id, element.value);


    });


    element.addEventListener("dblclick", () => {

        const doDelete = confirm("Confirm to delete this notes");

        if (doDelete) {

            deleteNote(id, element);
        }

    });

    return element;


}


// Adding New notes ;

function addNote() {


    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 10000),
        content: ""

    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);





}

function updateNote(id, newContent) {


    const notes = getNotes();

    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);

    console.log("Updating Notes........");
    console.log(id, newContent);



}


function deleteNote(id, element) {
    console.log("Deleting note....");
    console.log(id);

    const notes = getNotes().filter(notes => notes.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);


}