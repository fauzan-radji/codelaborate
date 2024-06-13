console.log('Hello mfs');
function showContextMenu(event, buttons){

 event.preventDefault();
 const context_menu = document.getElementById("context-menu");
 context_menu.innerHTML = '';
 const ul = document.createElement("ul");

 buttons.forEach((b)=>{
  const li = document.createElement("li");
  const button = document.createElement("button")
  button.textContent = b.title;
  button.addEventListener("click", b.action)
  li.appendChild(button);
  ul.appendChild(li);
 });


 context_menu.appendChild(ul);
 context_menu.style.display = "block";
 context_menu.style.setProperty("--y", event.clientY+"px");
 context_menu.style.setProperty("--x", event.clientX+"px");
}


