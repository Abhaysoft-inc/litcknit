export interface User {
    name: string,
    email: string,
    phone: string,
    password: string,
    role?: UserRoles
}


enum UserRoles {
    ADMIN = "admin",
    MEMBER = "member",
    USER = "user"
}