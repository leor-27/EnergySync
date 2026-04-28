import { createContext, useContext, useState } from "react"

type Role = "admin" | "superadmin"

type User = {
  username: string
  password: string
  role: Role
}

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => User | null
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const defaultUsers: User[] = [
  { username: "admin", password: "password", role: "admin" },
  { username: "super", password: "password", role: "superadmin" },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (username: string, password: string) => {
    const found = defaultUsers.find(
      (u) => u.username === username && u.password === password
    )

    if (found) {
      setUser(found)
      return found
    }

    return null
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}