// Disease form configurations
const diseaseConfigs = {
  cancer: {
    title: "Cancer Risk Analysis",
    fields: [
      { id: "meanRadius", label: "Mean Radius", type: "number", step: "0.01" },
      {
        id: "meanTexture",
        label: "Mean Texture",
        type: "number",
        step: "0.01",
      },
      {
        id: "meanPerimeter",
        label: "Mean Perimeter",
        type: "number",
        step: "0.01",
      },
      { id: "meanArea", label: "Mean Area", type: "number", step: "0.01" },
      {
        id: "meanSmoothness",
        label: "Mean Smoothness",
        type: "number",
        step: "0.001",
      },
    ],
  },
  heart: {
    title: "Heart Disease Risk Analysis",
    fields: [
      { id: "age", label: "Age", type: "number" },
      {
        id: "sex",
        label: "Sex (0: Female, 1: Male)",
        type: "number",
        min: "0",
        max: "1",
      },
      {
        id: "chestPain",
        label: "Chest Pain Type (0-3)",
        type: "number",
        min: "0",
        max: "3",
      },
      { id: "cholesterol", label: "Cholesterol Level", type: "number" },
    ],
  },
  // ... similar configs for other diseases
};

function showForm(diseaseType) {
  const config = diseaseConfigs[diseaseType];
  const overlay = document.getElementById("formOverlay");

  const formHTML = `
        <div class="form-container">
            <div class="form-header">
                <h2>${config.title}</h2>
            </div>
            <form id="diseaseForm" onsubmit="handleSubmit(event, '${diseaseType}')">
                ${config.fields
                  .map(
                    (field) => `
                    <div class="form-group">
                        <label class="form-label" for="${field.id}">${
                      field.label
                    }</label>
                        <input 
                            class="form-input" 
                            id="${field.id}" 
                            type="${field.type}"
                            ${field.step ? `step="${field.step}"` : ""}
                            ${field.min ? `min="${field.min}"` : ""}
                            ${field.max ? `max="${field.max}"` : ""}
                            required
                        >
                    </div>
                `
                  )
                  .join("")}
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Analyze</button>
                    <button type="button" class="btn btn-secondary" onclick="closeForm()">Cancel</button>
                </div>
            </form>
        </div>
    `;

  overlay.innerHTML = formHTML;
  overlay.style.display = "flex";
}

function closeForm() {
  document.getElementById("formOverlay").style.display = "none";
}

async function handleSubmit(event, diseaseType) {
  event.preventDefault();

  // Collect form data
  const formData = {};
  diseaseConfigs[diseaseType].fields.forEach((field) => {
    formData[field.id] = document.getElementById(field.id).value;
  });

  // Show loading state
  showLoadingState();

  try {
    // Here you would normally make an API call to your backend
    // For demo, we'll simulate an API call
    const result = await simulatePrediction(diseaseType, formData);
    showResult(result);
  } catch (error) {
    showError(error);
  }
}

function showLoadingState() {
  const overlay = document.getElementById("formOverlay");
  overlay.innerHTML = `
        <div class="result-modal">
            <div class="loading-spinner"></div>
            <h2>Analyzing Data...</h2>
        </div>
    `;
}

function showResult(result) {
  const overlay = document.getElementById("formOverlay");
  overlay.innerHTML = `
        <div class="result-modal">
            <div class="result-icon">${
              result.risk === "High" ? "⚠️" : "✅"
            }</div>
            <h2 class="result-title">Analysis Complete</h2>
            <p class="result-description">
                Risk Level: <strong>${result.risk}</strong><br>
                ${result.message}
            </p>
            <button class="btn btn-primary" onclick="closeForm()">Close</button>
        </div>
    `;
}

function showError(error) {
  const overlay = document.getElementById("formOverlay");
  overlay.innerHTML = `
        <div class="result-modal">
            <div class="result-icon">❌</div>
            <h2 class="result-title">Error</h2>
            <p class="result-description">${error.message}</p>
            <button class="btn btn-primary" onclick="closeForm()">Close</button>
        </div>
    `;
}

// Simulate API call
function simulatePrediction(diseaseType, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const risk = Math.random() > 0.5 ? "High" : "Low";
      resolve({
        risk,
        message:
          risk === "High"
            ? "We recommend consulting a healthcare professional for further evaluation."
            : "Your indicators suggest a lower risk. Continue maintaining a healthy lifestyle.",
      });
    }, 2000);
  });
}

// Close overlay when clicking outside the form
document.getElementById("formOverlay").addEventListener("click", (e) => {
  if (e.target.id === "formOverlay") {
    closeForm();
  }
});

// Close on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeForm();
  }
});
