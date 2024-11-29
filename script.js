const photoContainer = document.getElementById("photo-container");
const savedPositions = JSON.parse(localStorage.getItem("photoPositions")) || [];

for (let i = 1; i <= 32; i++) {
  const img = document.createElement("img");
  img.src = `images/photo${i}.jpg`;
  img.classList.add("photo");
  img.alt = `Photo ${i}`;
  img.setAttribute("draggable", "false");

  // Apply saved positions if available
  const savedPosition = savedPositions[i - 1];
  if (savedPosition) {
    img.style.left = `${savedPosition.left}px`;
    img.style.top = `${savedPosition.top}px`;
  }

  // Make the images draggable
  img.addEventListener("mousedown", (e) => {
    const offsetX = e.clientX - img.getBoundingClientRect().left;
    const offsetY = e.clientY - img.getBoundingClientRect().top;

    const moveImage = (moveEvent) => {
      img.style.left = `${moveEvent.clientX - offsetX}px`;
      img.style.top = `${moveEvent.clientY - offsetY}px`;
    };

    const stopDrag = () => {
      window.removeEventListener("mousemove", moveImage);
      window.removeEventListener("mouseup", stopDrag);

      // Save the final position
      const rect = img.getBoundingClientRect();
      savedPositions[i - 1] = { left: rect.left, top: rect.top };
      localStorage.setItem("photoPositions", JSON.stringify(savedPositions));
    };

    window.addEventListener("mousemove", moveImage);
    window.addEventListener("mouseup", stopDrag);
  });

  // Append the image to the photo container
  photoContainer.appendChild(img);
}
