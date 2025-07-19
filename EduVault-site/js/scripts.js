document.addEventListener("DOMContentLoaded", () => {
  const pastPapersBtn = document.getElementById("pastPapersBtn");
  const paperGrid = document.getElementById("paperGrid");
  const gameViewer = document.getElementById("gameViewer");
  const gameFrame = document.getElementById("gameFrame");
  const loader = document.getElementById("loader");
  const resourcesBtn = document.getElementById("resourcesBtn");
  const resourcesList = document.getElementById("resourcesList");
  const markschemesBtn = document.getElementById("markschemesBtn");
  const dropdown = document.getElementById("markschemesDropdown");
  const dropdownParent = document.querySelector(".dropdown-parent");
  const homeBtn = document.getElementById("homeBtn");
  const loginToggle = document.getElementById("loginToggle");
  const loginScreen = document.getElementById("loginScreen");
  const loginBtn = document.getElementById("loginBtn");
  const backHomeBtn = document.getElementById("backHomeBtn");
  const homeSection = document.getElementById("homeSection");
  const startBtn = document.getElementById("startBtn");

  // Show/hide dropdown when hovering over either the button or dropdown container
  dropdownParent.addEventListener("mouseenter", () => {
    dropdown.classList.remove("hidden");
  });

  dropdownParent.addEventListener("mouseleave", () => {
    dropdown.classList.add("hidden");
  });

  // Show past papers with code prompt
  pastPapersBtn.addEventListener("click", () => {
    const code = prompt("Enter 5-digit access code:");
    if (code === "58008") {
      showSection("paperGrid");
    } else if (code !== null) {
      alert("Access denied.");
    }
  });

  // Show resources
  resourcesBtn.addEventListener("click", () => {
    showSection("resourcesList");
  });

  // Home button resets to home section
  homeBtn.addEventListener("click", () => {
    showSection("homeSection");
  });

  // Login toggle button shows login screen
  loginToggle.addEventListener("click", () => {
    showSection("loginScreen");
  });

  // Back to home from login screen
  backHomeBtn.addEventListener("click", () => {
    showSection("homeSection");
    clearLoginFields();
  });

  // Fake login validation
  loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const loginError = document.getElementById("loginError");
    if (username === "student" && password === "gcse2025") {
      alert("Login successful! Welcome, " + username + ".");
      showSection("homeSection");
      clearLoginFields();
    } else {
      loginError.textContent = "Incorrect username or password.";
    }
  });

  // Start revising button on homepage triggers past papers prompt
  startBtn.addEventListener("click", () => {
    pastPapersBtn.click();
  });

  // Helper to show only one main section at a time
  function showSection(sectionId) {
    const sections = [
      "homeSection",
      "paperGrid",
      "resourcesList",
      "gameViewer",
      "loginScreen"
    ];
    sections.forEach(id => {
      document.getElementById(id).classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
    // Also hide dropdown if visible and not showing markschemes
    if (sectionId !== "markschemesDropdown") {
      dropdown.classList.add("hidden");
    }
  }

  function clearLoginFields() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("loginError").textContent = "";
  }
});

// Load a game in iframe with fake loader
function loadGame(url) {
  const gameViewer = document.getElementById("gameViewer");
  const gameFrame = document.getElementById("gameFrame");
  const loader = document.getElementById("loader");

  // Show loading text and hide iframe initially
  loader.style.display = "block";
  gameFrame.style.display = "none";

  // Show game viewer and hide other sections
  const sectionsToHide = ["homeSection", "paperGrid", "resourcesList", "loginScreen"];
  sectionsToHide.forEach(id => document.getElementById(id).classList.add("hidden"));
  gameViewer.classList.remove("hidden");

  // Set iframe src after slight delay to simulate loading
  setTimeout(() => {
    gameFrame.src = url;
  }, 1000);

  // When iframe loads, hide loader and show iframe
  gameFrame.onload = () => {
    loader.style.display = "none";
    gameFrame.style.display = "block";
  };
}

// Back button from game viewer to past papers list
function goBack() {
  document.getElementById("gameViewer").classList.add("hidden");
  document.getElementById("gameFrame").src = "";
  document.getElementById("paperGrid").classList.remove("hidden");
}
