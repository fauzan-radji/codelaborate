const newFileName = document.getElementById("newfilename");
newFileName.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const filename = newFileName.value;
    newFileName.value = "";
    newFileName.style.display = "none";
    write(filename, "").then(() => {
     fetchingFile("/"+filename);
     fetchingDir();
     currentWorkingFile = "/"+filename;
     document.title = filename;
    })
    
    

  }
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
    newFileName.style.display = 'none';
    const input = document.querySelector('.directories li input');
    if(input) input.parentNode.removeChild(input);
  }
});
