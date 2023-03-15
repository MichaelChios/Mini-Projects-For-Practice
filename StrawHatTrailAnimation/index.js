const bodyEl = document.querySelector('body');  // body element

bodyEl.addEventListener('mousemove', (event) => {   // mousemove event
    const xPos = event.offsetX;
    const yPos = event.offsetY;
    const spanEl = document.createElement('span');  // span element
    spanEl.style.left = xPos + 'px';
    spanEl.style.top = yPos + 'px';
    bodyEl.appendChild(spanEl); // append span element to body element
    const size = Math.random() * 100;   // random size
    spanEl.style.width = size + 'px';   // set width and height
    spanEl.style.height = size + 'px';
    setTimeout(() => {  // remove span element after 3 seconds
        spanEl.remove();
    }, 3000);
});