async function login(event){
    event.preventDefault();
    let body = {
        name: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value
    }
    body = JSON.stringify(body)
    console.log(body);
    try{
        const response = await fetch("/api/user/login", {method: "POST", body});
        if(response.ok){
            document.location.replace("/");
        }else{
            alert("Login attempt failed.")
        }
    }catch(error){
        alert(`Error: ${error}`);
    }
}

document.getElementById("login").addEventListener("submit", login);