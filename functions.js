async function fetchingDir() {
        parent.innerHTML = "";
        const files = await fetch("list.php")
          .then((res) => res.json())
          .then((value) => value);
        recursiveReadingDirs(parent, files);
}


function write(path, content) {
        return fetch(ROOT + "/write.php?path=" + path, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content,
          }),
        }).then((res) => res.text());
}

function recursiveReadingDirs(parent, children, depth = 0) {
        children.forEach((v) => {
          const list = document.createElement("li");
          if (v.type === "directory") {
            const details = document.createElement("details");
            const summary = document.createElement("summary");
            const ul = document.createElement("ul");
            summary.textContent = v.name;
            details.appendChild(summary);
            details.classList.add("folder-button");
            details.style.paddingLeft = depth * 10 + "px";
            recursiveReadingDirs(ul, v.children, depth + 1);
            details.appendChild(ul);
            list.appendChild(details);
          } else {
            const button = document.createElement("button");
            button.textContent = v.name;
            button.classList.add("file-button");
            button.addEventListener("click", (event) => {
              fetchingFile(v.path);
              currentWorkingFile = v.path;

              document.title = v.name;
            });
            button.addEventListener("contextmenu", (event) => {
              showContextMenu(event, [
                { title: "Rename", action(){renameFile(button, v.path)}},
                { title: "Delete", action(){deleteFile(v.path)} },
              ]);
            });
            button.style.paddingLeft = depth * 10 + "px";
            list.appendChild(button);
          }
          parent.appendChild(list);
        });
      }


function fetchingFile(path) {
        fetch(ROOT + "/read.php?path=" + path)
          .then((res) => res.text())
          .then((text) => (textarea.value = text));
      }

function save(currentWorkingFile) {
        write(currentWorkingFile, textarea.value).then((text) => {
          console.log({ text });
          location.reload();
        });
      }

async function deleteFile(filePath){
 fetch(ROOT+"/delete.php?path="+filePath)
 .then((value)=>value.text()) 
 .then((value)=>{
   console.log(value);
   fetchingDir();
 });
}

function showContextMenu(event, buttons) {
        event.preventDefault();
        const context_menu = document.getElementById("context-menu");
        context_menu.innerHTML = "";
        const ul = document.createElement("ul");

        buttons.forEach((b) => {
          const li = document.createElement("li");
          const button = document.createElement("button");
          button.textContent = b.title;
          button.addEventListener("click", (e) => {
            b.action(e);
            hideContextMenu();
          });
          li.appendChild(button);
          ul.appendChild(li);
        });

        context_menu.appendChild(ul);
        context_menu.style.display = "block";
        context_menu.style.setProperty("--y", event.clientY + "px");
        context_menu.style.setProperty("--x", event.clientX + "px");
      }

function hideContextMenu() {
  document.getElementById('context-menu').style.display = 'none';
}

function renameFile(elementToChangeName, oldPath){
 const oldName = elementToChangeName.textContent;
 const parent = elementToChangeName.parentElement;
 
 const input = document.createElement("input");
 input.value = oldName;
 input.addEventListener("keydown", (event)=>{
 if(event.key === "Enter"){
   const oldPathArr = oldPath.split("/");
   oldPathArr.pop();
   const newPath = oldPathArr.join("/") + `/${input.value}`; 
   fetch(`${ROOT}/rename.php?old=${oldPath}&new=${newPath}`).then(() => {
     input.parentNode.removeChild(input);
      fetchingDir();
   });
 }
 });
 parent.appendChild(input);
 input.focus();




}