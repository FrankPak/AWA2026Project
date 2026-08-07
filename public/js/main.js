const validate = async () => {
    const token = localStorage.getItem("token")
    
    if (!token){
    window.location.href = "/login.html"
    return
    }


    const response = await fetch("/api/private", {
        method: "GET",
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
    const data = await response.json()

    if (!response.ok) {
       window.location.href = "/login.html"
    }
    
}

validate()


const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login.html"
}

document.getElementById("logout").addEventListener("click", logout)