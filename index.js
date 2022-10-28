// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  initializeToolTips();
  initializeEditor();
  updatePresentation();
  setPresentationTheme();
  renderPresentationOptions();
});

document
  .querySelector("#editorThemeForm")
  .addEventListener("submit", changeEditorTheme);

document
  .querySelector("#editorFontSizeForm")
  .addEventListener("submit", changeEditorFontSize);

document
  .querySelector("#presentationThemeForm")
  .addEventListener("submit", changePresentationTheme);

document
  .querySelector("#presentationTransitionForm")
  .addEventListener("submit", changePresentationTransition);

document
  .querySelector("#presentationOptionsForm")
  .addEventListener("submit", changePresentationOptions);

document
  .querySelector("#exportPresentationButton")
  .addEventListener("click", exportPresentation);

document
  .querySelector("#presentationImportForm")
  .addEventListener("submit", importPresentation);

// Global scope variables
var initialPresentation = `# MDSlides
Simple markdown presentation tool

<sup><sub>Made with [Reveal.js](https://revealjs.com/),
[Ace](https://ace.c9.io/) and
[Docusaurus](https://docusaurus.io/)<sub/></sup>

---

## Documentation

Check out the [documentation](link) for further details.

<img data-src="https://media2.giphy.com/media/JGSCwTt87agIU/giphy.gif?cid=ecf05e47yx9lhf5x28blnmheg4rtxuzuppqwuxqy41ftcft3&rid=giphy.gif&ct=g" />
`;

var editor;
var editorTheme = localStorage.getItem("editorTheme") || "github";
var editorFontSize = localStorage.getItem("editorFontSize") || "18";
var editorContent =
  localStorage.getItem("editorContent") || initialPresentation;
var presentationIframe = document.querySelector("#iframePresentation");
var presentationTheme = localStorage.getItem("presentationTheme") || "black";
var presentationConfig = {
  "Progress Bar": localStorage.getItem("presentationProgressBar") || "true",
  "Slide Number": localStorage.getItem("presentationSlideNumber") || "false",
  Loop: localStorage.getItem("presentationLoop") || "false",
  RTL: localStorage.getItem("presentationRTL") || "false",
  Mousewheel: localStorage.getItem("presentationMouseWheel") || "false",
};

// Functions

// Source: https://getbootstrap.com/docs/5.2/components/tooltips/#enable-tooltips
function initializeToolTips() {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
}

function initializeEditor() {
  editor = ace.edit("editor");
  editor.setTheme(`ace/theme/${editorTheme}`);
  editor.session.setMode("ace/mode/markdown");
  document.getElementById("editor").style.fontSize = `${editorFontSize}px`;
  editor.session.on("change", updatePresentation);
  console.log(editorContent);
  editor.setValue(editorContent, "-1"); // set value and move cursor to the start of the text
}

function updatePresentation() {
  // Create "reveal" div
  var revealDiv = document.createElement("div");
  revealDiv.classList.add("reveal");
  // Create "slides" div
  var slidesDiv = document.createElement("div");
  slidesDiv.classList.add("slides");
  revealDiv.append(slidesDiv);
  // Create markdown section
  var markdownSection = document.createElement("section");
  markdownSection.setAttribute("data-markdown", "");
  slidesDiv.append(markdownSection);
  // Create editor textarea
  var editorTextArea = document.createElement("textarea");
  editorTextArea.setAttribute("data-template", "");
  editorTextArea.innerHTML = editor.getValue();
  markdownSection.append(editorTextArea);

  let presentation = new Reveal(revealDiv, {
    hash: true,
    keyboardCondition: "focused", // TODO
    transition: localStorage.getItem("presentationTransition") || "slide",
    hideInactiveCursor: false,
    progress: JSON.parse(
      localStorage.getItem("presentationProgressBar") || true
    ),
    slideNumber: JSON.parse(
      localStorage.getItem("presentationSlideNumber") || false
    ),
    loop: JSON.parse(localStorage.getItem("presentationLoop") || false),
    rtl: JSON.parse(localStorage.getItem("presentationRTL") || false),
    mousewheel: JSON.parse(
      localStorage.getItem("presentationMouseWheel") || false
    ),

    plugins: [RevealMarkdown, RevealHighlight, RevealNotes, RevealZoom],
  });

  presentation.initialize();

  presentationIframe.contentWindow.document
    .querySelector(".reveal")
    .replaceWith(presentation.getRevealElement());

  forceLazyLoading();

  localStorage.setItem("editorContent", editor.getValue());
}

function closeModal(querySelector) {
  const editorConfigurationsModal = bootstrap.Modal.getInstance(
    document.querySelector(querySelector)
  );
  editorConfigurationsModal.hide();
}

function changeEditorTheme(event) {
  event.preventDefault();

  let formData = Object.fromEntries(new FormData(event.target).entries());
  let editorTheme = formData["editorTheme"];
  editor.setTheme(`ace/theme/${editorTheme}`);

  localStorage.setItem("editorTheme", editorTheme);

  closeModal("#editorConfigurations");
}

function changeEditorFontSize(event) {
  event.preventDefault();

  let formData = Object.fromEntries(new FormData(event.target).entries());
  let editorFontSize = formData["editorFontSize"];
  document.getElementById("editor").style.fontSize = `${editorFontSize}px`;

  localStorage.setItem("editorFontSize", editorFontSize);

  closeModal("#editorConfigurations");
}

function setPresentationTheme() {
  let linkThemeTag = presentationIframe.contentWindow.document.querySelector(
    "#linkPresentationTheme"
  );

  linkThemeTag.href = `dist/theme/${presentationTheme}.css`;
}

function changePresentationTheme(event) {
  event.preventDefault();

  let formData = Object.fromEntries(new FormData(event.target).entries());
  let presentationTheme = formData["presentationTheme"];
  let linkThemeTag = presentationIframe.contentWindow.document.querySelector(
    "#linkPresentationTheme"
  );

  linkThemeTag.href = `dist/theme/${presentationTheme}.css`;
  localStorage.setItem("presentationTheme", presentationTheme);

  closeModal("#presentationConfigurations");
}

function changePresentationTransition(event) {
  event.preventDefault();

  let formData = Object.fromEntries(new FormData(event.target).entries());
  let presentationTransition = formData["presentationTransition"];
  localStorage.setItem("presentationTransition", presentationTransition);

  closeModal("#presentationConfigurations");
  updatePresentation();
}

function renderPresentationOptions() {
  let optionsHtml = "";
  for (let option in presentationConfig) {
    let checkStatus = "";
    if (JSON.parse(presentationConfig[option]) == true) {
      checkStatus = "checked";
    }
    let html = `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="flexCheckDefault" name="${option}" ${checkStatus}>
        <label class="form-check-label" for="flexCheckDefault">
          ${option}
        </label>
      </div>
      `;
    optionsHtml += html;
  }
  optionsHtml +=
    '<button class="btn btn-primary mt-2" type="submit">Apply</button>';
  let presentationOptionsForm = document.querySelector(
    "#presentationOptionsForm"
  );
  presentationOptionsForm.innerHTML = optionsHtml;
}

function changePresentationOptions(event) {
  event.preventDefault();
  optionToLocalStorageName = {
    "Progress Bar": "presentationProgressBar",
    "Slide Number": "presentationSlideNumber",
    Loop: "presentationLoop",
    RTL: "presentationRTL",
    Mousewheel: "presentationMouseWheel",
  };

  let updatedPresentationConfig = {
    "Progress Bar": localStorage.getItem("presentationProgressBar") || "true",
    "Slide Number": localStorage.getItem("presentationSlideNumber") || "false",
    Loop: localStorage.getItem("presentationLoop") || "false",
    RTL: localStorage.getItem("presentationRTL") || "false",
    Mousewheel: localStorage.getItem("presentationMouseWheel") || "false",
  };

  let formData = Object.fromEntries(new FormData(event.target).entries());
  for (let option in updatedPresentationConfig) {
    let currentState = JSON.parse(updatedPresentationConfig[option]); // "true" -> true
    if (currentState === true) {
      if (!(option in formData)) {
        localStorage.setItem(optionToLocalStorageName[option], !currentState);
      }
    } else {
      if (option in formData) {
        localStorage.setItem(optionToLocalStorageName[option], !currentState);
      }
    }
  }

  closeModal("#presentationConfigurations");
  updatePresentation();
}

function exportPresentation() {
  let filename = "presentation.md";
  let content = editor.getValue();

  let downloadElement = document.createElement("a");
  downloadElement.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(content)
  );
  downloadElement.setAttribute("download", filename);

  downloadElement.style.display = "none";
  document.body.appendChild(downloadElement);

  downloadElement.click();

  document.body.removeChild(downloadElement);
}

function importPresentation(event) {
  event.preventDefault();

  let formData = Object.fromEntries(new FormData(event.target).entries());
  let fileToImport = formData["presentationFile"];

  let fileReader = new FileReader();
  fileReader.onload = function (fileLoadedEvent) {
    var content = fileLoadedEvent.target.result;
    editor.setValue(content, "-1");
    localStorage.setItem("editorContent", editor.getValue());
    closeModal("#importPresentation");
  };

  fileReader.readAsText(fileToImport, "UTF-8");
}

function forceLazyLoading() {
  editor.find(" src=");
  editor.replace(" data-src=");
}
