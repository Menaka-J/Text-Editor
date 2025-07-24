const optionsButtons = document.querySelectorAll(".option-button");
const advancedOptionButton = document.querySelectorAll(".adv-option-button");
const fontName = document.getElementById("fontName");
const fontSizeRef = document.getElementById("fontSize");
const writingArea = document.getElementById("text-input");
const linkButton = document.getElementById("createLink");
const alignButtons = document.querySelectorAll(".align");
const spacingButtons = document.querySelectorAll(".spacing");
const formatButtons = document.querySelectorAll(".format");
const scriptButtons = document.querySelectorAll(".script");
const downloadBtn = document.getElementById("downloadBtn");
const darkModeToggle = document.getElementById("darkModeToggle");

// Font list
const fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

// Init
const initializer = () => {
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  fontList.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  fontSizeRef.value = 3;
};

// Modify text
const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

// Click events
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

// Create link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

// Highlighter
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = button.classList.contains("active");
        highlighterRemover(className);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};
const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

// Download as HTML
downloadBtn.addEventListener("click", () => {
  const content = writingArea.innerHTML;
  const blob = new Blob([content], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "text-editor-content.html";
  a.click();
});

// Toggle dark mode
darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", darkModeToggle.checked);
});

const pdfBtn = document.getElementById("pdfBtn");

pdfBtn.addEventListener("click", () => {
  const element = document.createElement("div");
  element.innerHTML = writingArea.innerHTML;
  const opt = {
    margin: 0.5,
    filename: 'text-editor-content.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
});
const counter = document.getElementById("counter");

writingArea.addEventListener("input", () => {
  const text = writingArea.innerText.trim();
  const words = text.split(/\s+/).filter(w => w.length > 0);
  counter.textContent = `Words: ${words.length} | Characters: ${text.length}`;
});



document.addEventListener("DOMContentLoaded", initializer);
