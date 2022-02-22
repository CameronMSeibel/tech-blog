async function login(event){
    event.preventDefault();
    let body = {
        name: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value
    }
    body = JSON.stringify(body)
    try{
        const response = await fetch("/api/user/", {method: "POST", body, headers: {"Content-Type": "application/json"}});
        if(response.ok){
            document.location.replace("/dashboard");
        }else{
            alert("Sign up failed.")
        }
    }catch(error){
        alert(`Error: ${error}`);
    }
}

document.getElementById("signup").addEventListener("submit", login);