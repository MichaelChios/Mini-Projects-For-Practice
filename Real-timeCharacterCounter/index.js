const textareaEl = document.getElementById('text'); // Get the textarea element
const totalCounter = document.getElementById('total-counter');  // Get the total counter element
const remainingCounter = document.getElementById('remaining-counter');  // Get the remaining counter element

textareaEl.addEventListener('keyup', (event) => {   // Listen for keyup event on textarea element
  updateCounter();  // Call the function to update the counter on keyup
});

updateCounter();    // Call the function to update the counter on page load

function updateCounter() {  // Function to update the counter
    totalCounter.innerText = textareaEl.value.length;   // Set the total counter to the length of the textarea value
    remainingCounter.innerText = textareaEl.getAttribute('maxlength') - textareaEl.value.length;    // Set the remaining counter to the maxlength of the textarea minus the length of the textarea value
}