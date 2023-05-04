const cvFileInput = document.getElementById("cv-file");
const cvList = document.getElementById("cv-list");

// loads resumes from storage
chrome.storage.local.get("cvs", (result) => {
  const cvs = result.cvs || [];

  for (const cv of cvs) {
    const cvItem = document.createElement("li");
    cvItem.textContent = cv.name;
    cvList.appendChild(cvItem);
  }
});

// handle resume upload
document.getElementById("upload-cv-btn").addEventListener("click", () => {
  const cvFile = cvFileInput.files[0];

  if (!cvFile) {
    alert("Please select a resume file.");
    return;
  }

  // Adds the Resume to the list of resumes stored in the extension
  chrome.storage.local.get("cvs", (result) => {
    const cvs = result.cvs || [];
    cvs.push(cvFile);

    chrome.storage.local.set({ cvs }, () => {
      // Adds resume list to ui
      const cvItem = document.createElement("li");
      cvItem.textContent = cvFile.name;
      cvList.appendChild(cvItem);
    });
  });
});
