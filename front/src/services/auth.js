import jwt from "jsonwebtoken"

export function authenticateUser() {
    const token = localStorage.getItem("Token")
    
    if(token) {
        const userType = jwt.decode(token).isVolunteer ? "volunteer" : "solicitant"
        return userType
    }
    return ""
}
