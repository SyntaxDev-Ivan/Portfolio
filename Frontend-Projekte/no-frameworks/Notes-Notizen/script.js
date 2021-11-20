window.onload = () => load()

function load() { /*DATENSTRUKTUR*/

    let notesList = []

    /*DATENSTRUKTUR*/

    addAllEventListener()
    listNotes()

    function addAllEventListener() {
        document.querySelectorAll(".edit").forEach(elm => {
            elm.addEventListener("click", editNote)
        })

        document.querySelectorAll(".delete").forEach(elm => {
            elm.addEventListener("click", deleteNote)
        })

        document.querySelector("#add").addEventListener("click", addNote)

        document.querySelector(".cancel").addEventListener("click", cancel)

        document.querySelector(".finished").addEventListener("click", finishedAddingNote)

        document.querySelectorAll(".finishEdit").forEach(elm => {
            elm.addEventListener("click", saveEdit)
        })
    }

    function saveEdit(ev) {
        let editClass = ev.path[0].classList[0]
        let value = document.querySelector(`.a${
      editClass[editClass.length - 1]
    }`).value
        let el = document.querySelector(`.${editClass}`)
        updateNoteList(editClass[editClass.length - 1], value)
    }

    function updateNoteList(id, val) {
        var index = id - 1
        notesList[index].value = val
    }

    function editNote(ev) {
        let id = ev.path[3].id
        let el = document.getElementById(id)
        if (!ev.path[0].classList.contains("finishEdit")) {
            changeEditIcon(id)
            enableTextArea(id)
        } else {
            changeCheckIcon(id)
            disbleTextArea(id)
        }

    }

    function disbleTextArea(id) {
        let textArea = document.querySelector(`.a${id}`)
        textArea.disabled = true
    }

    function enableTextArea(id) {
        let textArea = document.querySelector(`.a${id}`)
        textArea.disabled = false
    }

    function changeEditIcon(id) {
        var img = document.querySelector(`.edit-${id}`)
        img.src = "https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-check-banking-and-finance-kiranshastry-gradient-kiranshastry.png"
        img.classList.add("finishEdit")
        addAllEventListener()
    }

    function changeCheckIcon(id) {
        var img = document.querySelector(`.edit-${id}`)
        img.src = "https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-edit-interface-kiranshastry-gradient-kiranshastry.png"
        img.classList.remove("finishEdit")
        addAllEventListener()
    }

    function deleteNote(ev) {
        let index = ev.path[3].id
        const firstArr = notesList.slice(0, index - 1);
        const secondArr = notesList.slice(index);
        notesList = updateIds([
            ...firstArr,
            ...secondArr
        ])
        listNotes()
        addAllEventListener()
    }

    function updateIds(arr) {

        for (var i = 0; i < arr.length; i++) {
            arr[i].id = i + 1
        }
        return arr

    }

    function addNote(ev) {
        document.querySelector(".add-overlay").style.display = "flex"
    }

    function cancel(ev) {
        document.querySelectorAll(".overlay").forEach(elm => {
            elm.style.display = "none"
        })

        document.querySelectorAll(".overlay textarea").forEach(elm => {
            elm.value = ""
        })
    }

    function finishedAddingNote(ev) {
        let noteValue = document.querySelector(".add-overlay textarea").value
        if (noteValue.length < 1) return cancel()

        addingNoteToArray(noteValue)
        listNotes()
        cancel()
        addAllEventListener()
    }

    function addingNoteToArray(val) {
        let id = (notesList.length > 0) ? notesList[notesList.length - 1].id + 1 : 1
        let value = val

        notesList.push({ id: id, value: value })
    }


    function listNotes() {
        let notes = document.querySelector(".notes")
        notes.innerHTML = ""
        for (let i = 0; i < notesList.length; i++) {
            notes.innerHTML += `
      <div class="note" id=${
        notesList[i].id
      }>
      <div class="note-header">
        <div class="edit"><img
            class="edit-${
        notesList[i].id
      }"
            src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-edit-interface-kiranshastry-gradient-kiranshastry.png" />
        </div>
        <div class="delete"><img
            src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-delete-miscellaneous-kiranshastry-gradient-kiranshastry.png" />
        </div>
      </div>
      <div class="note-body">
        <textarea class="a${
        notesList[i].id
      }" disabled="true">${
        notesList[i].value
      }</textarea>
      </div>
    </div>
      `
        }
    }
}