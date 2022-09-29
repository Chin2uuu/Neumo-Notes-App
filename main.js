const addBtn = document.getElementById('add')


const notes = JSON.parse(localStorage.getItem('notes'))

if (notes) {
    notes.forEach(note => addNewNote(note))
}


addBtn.addEventListener('click', () => addNewNote())







function addNewNote(text = '  ') {

    const note = document.createElement('div')
    note.classList.add('note')
    note.innerHTML = `  <div class="tools">

    <button onclick="boldTextArea()" type="button" id="deco"  class="boldText"><i class='fa fa-bold'></i></button>
    <button type="button" id="deco"  class="italicText"><i class='fa fa-italic'></i></button>
    <button type="button" id="deco"  class="underlineText"><i class='fa fa-underline'></i></button>
    <!-- These buttons are enabled on while we are making notes and after tapping on edit button  -->

    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
    <button onclick="copyEvent('copy')" type="button" data-cmd="copy" class="copy"><i class="fas fa-copy"></i></button>
</div>
<div class="main${text ? "" : "hidden"}"></div>
<textarea id="id" class="${text ? "hidden" : ""}"></textarea>
    

`
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')
    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const copyBtn = note.querySelector('.copy')
    const boldBtn = note.querySelector('.boldText')
    const italicBtn = note.querySelector('.italicText')
    const underlineBtn = note.querySelector('.underlineText')



    textArea.value = text
    main.innerHTML = text

    deleteBtn.addEventListener('click', () => {
        const doDelete = confirm("Are you sure ?");
        if (doDelete) {
            note.remove()
            updateLS()
        }
    })

    boldBtn.addEventListener('click', () => {

        main.innerHTML = "<b>" + text + "</b>";
        window.location.reload();


    })

    italicBtn.addEventListener('click', () => {

        main.innerHTML = "<i>" + text + "</i>";
        window.location.reload();


    })


    underlineBtn.addEventListener('click', () => {

        main.innerHTML = "<u>" + text + "</u>";



    })









    copyBtn.addEventListener('click', () => {
        alert('copying')
        const editBoxRange = document.createRange();
        editBoxRange.selectNodeContents(main);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(editBoxRange);
        document.execCommand("copy");

    })

    editBtn.addEventListener('click', () => {

        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')


    })

    note.addEventListener('change', () => {

        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')


    })
    note.addEventListener('dblclick', () => {

        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')


    })
    textArea.addEventListener('input', (e) => {
        const { value } = e.target
        main.innerHTML = value

        updateLS()
    })

    document.body.appendChild(note)
}


function updateLS() {
    const notesText = document.querySelectorAll('textarea')
    const notes = []

    notesText.forEach(note => notes.push(note.value))


    localStorage.setItem('notes', JSON.stringify(notes))

}

