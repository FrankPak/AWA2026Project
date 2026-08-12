const initializeRegister = () => {
    document.getElementById("registerForm").addEventListener("submit", (event) => {
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
        const response = await fetch("http://localhost:3000/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const result = await response.json()

        window.location.href = "/login.html"
    } catch (error) {
        console.error("Error:", error)
    }
    document.getElementById("registerForm").reset()


}

initializeRegister()
