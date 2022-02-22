async function post(event){
    event.preventDefault();
    let body = {
        text: document.getElementById("text").value.trim(),
        post_id: document.location.pathname.substring(1)
    }
    body = JSON.stringify(body);
    const response = await fetch("/api/blog/comment", {
        method: "POST",
        body,
        headers: {"Content-Type": "application/json"}
    });
    if(response.ok){
        document.location.reload();
    }else{
        alert("Comment failed!")
    }
}

document.getElementById("comment-button").addEventListener("click", (event) => {
    document.getElementById("comment-form").classList.remove("invisible");
    event.target.classList.add("invisible");
});

document.getElementById("new-comment").addEventListener("submit", post);