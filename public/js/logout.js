/**
 * Log out the user assuming they were logged in.
 */
const logout = async () => {
    const response = await fetch("/api/user/logout", {method: "POST", headers: {"Content-Type": "application/json"}});
    if(response.ok){
        document.location.replace("/");
    }else{
        alert("Wait, what?");
    }
}

document.getElementById("logout").addEventListener("click", logout);