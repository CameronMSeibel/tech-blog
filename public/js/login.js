async function login(event){
    event.preventDefault();
    let body = {
        name: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value
    }
    body = JSON.stringify(body)
    try{
        const response = await fetch("/api/user/login", {method: "POST", body, headers: {"Content-Type": "application/json"}});
        if(response.ok){
            document.location.replace("/dashboard");
        }else{
            alert("Login attempt failed.")
        }
    }catch(error){
        alert(`Error: ${error}`);
    }
}

document.getElementById("login").addEventListener("submit", login);