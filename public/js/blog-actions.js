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

const links = document.querySelectorAll(".delete");
links.forEach((link) => link.addEventListener("click", remove));
document.getElementById("new-post").addEventListener("submit", post);