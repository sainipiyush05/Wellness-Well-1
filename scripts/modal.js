function openModal() {
  const modal = document.getElementById("learnMoreModal");
  const modalContainer = modal.querySelector(".modal-container");

  modal.classList.add("active");
  setTimeout(() => {
    modalContainer.classList.add("active");
  }, 10);

  // Prevent body scrolling when modal is open
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("learnMoreModal");
  const modalContainer = modal.querySelector(".modal-container");

  modalContainer.classList.remove("active");
  setTimeout(() => {
    modal.classList.remove("active");
  }, 300);

  // Restore body scrolling
  document.body.style.overflow = "";
}

// Close modal when clicking outside
document.getElementById("learnMoreModal").addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    closeModal();
  }
});

// Close modal on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
