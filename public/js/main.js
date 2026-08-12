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

const fetchFiles = async () => {
    const token = localStorage.getItem("token")

    const response = await fetch("http://localhost:3000/api/files", {
        method: "GET",
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
    const data = await response.json()
    console.log(data)

    if (!response.ok) {
        document.getElementById("file").innerText = "Error fetching files"
    }
}


validate()
fetchFiles()

const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login.html"
}

const createFile = async () => {
    const token = localStorage.getItem("token")
    const response = await fetch("http://localhost:3000/api/file", {
        method: "POST",
        
        headers: {
            "authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            filename: "newFile",
            content: "newContent"
        })
    })
}

document.getElementById("logout").addEventListener("click", logout)
document.getElementById("createfile").addEventListener("click", createFile)