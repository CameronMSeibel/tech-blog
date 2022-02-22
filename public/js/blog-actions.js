async function edit(event){
    event.preventDefault();
    let body = {
        title: document.getElementById("title").value.trim(),
        text: document.getElementById("text").value.trim()
    }
    body = JSON.stringify(body);
    const response = await fetch(`/api/blog/${document.location.pathname.split("/").pop()}`, {
        method: "PUT",
        body,
        headers: {"Content-Type": "application/json"}
    });
    if(response.ok){
        document.location.replace("/dashboard");
    }else{
        alert("Failed to update.");
    }
}

async function post(event){
    event.preventDefault();
    let body = {
        title: document.getElementById("title").value.trim(),
        text: document.getElementById("text").value.trim()
    }
    body = JSON.stringify(body);
    const response = await fetch("/api/blog/", {
        method: "POST",
        body,
        headers: {"Content-Type": "application/json"}
    });
    if(response.ok){
        document.location.replace("/dashboard");
    }else{
        alert("Failed to post.");
    }
}

async function remove(){
    const response = await fetch(`/api/blog/${this.dataset.id}`, {method: "DELETE"});
    if(!response.ok){
        alert("Failed to delete.");
    }
    document.location.reload();
}

document.querySelectorAll(".delete").forEach((link) => link.addEventListener("click", remove));
try{
    document.getElementById("edit-post").addEventListener("submit", edit);
}catch(error){
    console.error(error);
}
try{
    document.getElementById("new-post").addEventListener("submit", post);
}catch(error){
    console.error(error);
}
