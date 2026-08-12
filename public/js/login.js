const initializeLogin = () => {
    document.getElementById("loginForm").addEventListener("submit", (event) => {
        fetchData(event)
    })
}

const fetchData = async (event) => {
    event.preventDefault()
    const formData = {
        email: event.target.email.value,
        password: event.target.password.value,
    }
    console.log(formData)
    
    try {
        const response = await fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            throw new Error("Error fetching data")
        } else {
            const data = await response.json()
            
            //if(data.token) {
                localStorage.setItem("token", data.token)
                window.location.href = "/"
            //}
            
        }

    } catch(error) {
        console.error("Error:", error)
    }
    document.getElementById("loginForm").reset()


}

initializeLogin()
