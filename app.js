// Selecting elements
const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

//display notes from localStorage
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
    notes = document.querySelectorAll(".input-box"); // Re-select after setting innerHTML
    attachDeleteEvent(); // Attach delete event to any existing notes
}
showNotes();

// update localStorage with current notes
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

//create a new note
function createNote() {
    const inputBox = document.createElement("p");
    const img = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "/assests/delete.jpg"; 
    img.alt = "Delete Note";

    // Add event listener for content changes to update storage
    inputBox.addEventListener("keyup", updateStorage);

    // Add delete functionality
    img.addEventListener("click", () => {
        inputBox.remove();
        updateStorage();
    });

   
    notesContainer.appendChild(inputBox).appendChild(img);
     //animate creation
    animateCreation(inputBox);
}

// Event listener for creating a new note
createBtn.addEventListener("click", createNote);

// Function to attach delete event to existing notes (useful on page load)
function attachDeleteEvent() {
    notes.forEach(note => {
        note.querySelector("img").addEventListener("click", () => {
            note.remove();
            updateStorage();
        });
    });
}

// animate note creation
function animateCreation(element) {
    element.style.opacity = "0";
    element.style.transform = "scale(0.9)";
    setTimeout(() => {
        element.style.transition = "all 0.3s ease";
        element.style.opacity = "1";
        element.style.transform = "scale(1)";
    }, 10);
}

// Prevent default Enter key behavior in contenteditable elements
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
ss