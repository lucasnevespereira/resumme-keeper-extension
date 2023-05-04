const cvFileInput = document.getElementById("cv-file");
const cvList = document.getElementById("cv-list");

// handle resume upload
document.getElementById("upload-cv-btn").addEventListener("click", () => {
  const cvFile = cvFileInput.files[0];

  if (!cvFile) {
    alert("Please select a resume file.");
    return;
  }

  // Send "add_cv" message to the service worker to add the resume file
  chrome.runtime.sendMessage({
    message: 'add_cv',
    payload: cvFile.name
  }, (response) => {
    if (response.message === 'success') {
      console.log("Resume added")
    } else {
      alert("Failed to add resume.");
    }
  });
});

// Load the list of resumes from storage and update the UI
function loadCvs() {
  chrome.storage.local.get("cvs", (result) => {
    const cvs = result.cvs || [];
    cvList.innerHTML = "";

    for (const cv of cvs) {
      const cvItem = document.createElement("li");
      cvItem.textContent = cv;
      cvList.appendChild(cvItem);
    }
  });
}

// Call the loadCvs function when the popup is opened
document.addEventListener("DOMContentLoaded", () => {
  loadCvs();
});

// Listen for changes to the list of resumes and update the UI accordingly
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.hasOwnProperty("cvs")) {
    loadCvs();
  }
});

