const validate = async () => {
    const token = localStorage.getItem("token")
    
    if (!token){
    window.location.href = "/login.html"
    return
    }

    fetchFile()
    
}

const fetchFile = async () => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch("http://localhost:3000/api/file/", {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        
        if (!response.ok) {
            throw new Error("Error fetching files")
        } else {

            const data = await response.json()
            data.forEach(file => {
                addFileWall(file.filename, file.createdAt)
            })
        }

    } catch (error) {
        console.error("Error fetching files:", error)
    }
}

// Validate the user when page loads
validate()


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
document.getElementById("refresh").addEventListener("click", fetchFiles)


function addFileWall(filename, date) {
    const fileList = document.getElementById("filelist")    
    const listItem = document.createElement("li")
    const label = document.createElement("label")
    const span = document.createElement("span")
    const aEvent = document.createElement("a")

    aEvent.append(`${filename}`)
    span.append(`${date}`)
    
    label.appendChild(aEvent)
    label.appendChild(span)

    listItem.appendChild(label)
    fileList.appendChild(listItem)
}