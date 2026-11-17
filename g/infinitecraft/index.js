const mergeRules = {};

// Get the sidebar and canvas elements
const sidebar = document.getElementById("sidebar");
const canvas = document.getElementById("canvas");

// Function to create a draggable clone of an element
function createDraggableClone(element, event) {
  // Clone the element
  const clone = element.cloneNode(true);
  clone.classList.add("element");
  clone.style.position = "absolute";
  canvas.appendChild(clone);

  // Calculate the initial offset using clientX/clientY (works for mouse and touch)
  const offsetX = event.clientX - element.getBoundingClientRect().left;
  const offsetY = event.clientY - element.getBoundingClientRect().top;

  // Move the cloned element with the pointer
  function moveElement(event) {
    const x = event.clientX - offsetX;
    const y = event.clientY - offsetY;
    clone.style.left = `${x}px`;
    clone.style.top = `${y}px`;
  }

  // End the drag operation
  function endDrag(event) {
    document.removeEventListener("pointermove", moveElement);
    document.removeEventListener("pointerup", endDrag);

    // Make the clone draggable again using pointerdown
    clone.addEventListener("pointerdown", startDrag);
  }

  // Initialize the dragging effect
  moveElement(event);
  document.addEventListener("pointermove", moveElement);
  document.addEventListener("pointerup", endDrag);
}

// Function to start dragging an element within the canvas
function startDrag(event) {
  const element = event.target;
  const offsetX = event.clientX - element.getBoundingClientRect().left;
  const offsetY = event.clientY - element.getBoundingClientRect().top;

  function moveElement(event) {
    const x = event.clientX - offsetX;
    const y = event.clientY - offsetY;
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  }

  function endDrag(event) {
    document.removeEventListener("pointermove", moveElement);
    document.removeEventListener("pointerup", endDrag);
  }

  moveElement(event);
  document.addEventListener("pointermove", moveElement);
  document.addEventListener("pointerup", endDrag);
}

// Add event listeners to all elements in the sidebar
const elements = document.querySelectorAll(".element");
elements.forEach((element) => {
  element.addEventListener("pointerdown", function (event) {
    createDraggableClone(element, event);
  });
});

// Add event listener to allow dragging of elements within the canvas
canvas.addEventListener("pointerdown", function (event) {
  const element = event.target;
  if (element.classList.contains("element")) {
    startDrag(event);
  }
});

document.getElementById("clean-button").addEventListener("click", function () {
  document.getElementById("canvas").innerHTML = "";
});
