newFileName.addEventListener("keydown", async (e) => {
  if (e.key !== "Enter") return;

  const filename = newFileName.value;
  newFileName.value = "";
  newFileName.style.display = "none";
  await write(filename, "");
  fetchingFile("/" + filename);
  fetchingDir();
  currentWorkingFile = "/" + filename;
  document.title = filename;
});

document.getElementById("newfilebutton").addEventListener("click", (e) => {
  newFileName.style.display = "block";
});

let textarea = document.getElementById("textarea");

textarea.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "s" && e.ctrlKey) {
    e.preventDefault();
    save(currentWorkingFile);
  }
});
textarea.addEventListener("contextmenu", (event) => {
  showContextMenu(event, [
    {
      title: "Edit",
      action() {
        console.log("Editor");
      },
    },
  ]);
});

addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideContextMenu();
    newFileName.style.display = "none";
    const input = document.querySelector(".directories li input");
    if (input) input.parentNode.removeChild(input);
  }
});

sidebar.addEventListener("contextmenu", function (event) {
  if (this !== event.target) return;
  showContextMenu(event, [
    {
      title: "New folder",
      action() {
        newDirectoryNameInput.style.display = "block";
      },
    },
  ]);
});

newDirectoryNameInput.addEventListener("keydown", async (event) => {
  if (event.key !== "Enter") return;
  await newDirectory(newDirectoryNameInput.value);
  fetchingDir();

  newDirectoryNameInput.value = "";
  newDirectoryNameInput.style.display = "none";
});
