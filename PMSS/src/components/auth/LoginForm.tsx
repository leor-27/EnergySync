import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/useAuth"
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

type View = "login" | "request" | "forgot"

export default function LoginForm() {
  const [view, setView] = useState<View>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // ================= LOGIN =================
    if (view === "login") {
        const user = login(email, password)

        if (user) {
        toast.success("Login successful")

        if (user.role === "admin") {
            navigate("/admin-home")
        } else {
            navigate("/superadmin-home")
        }
        } else {
        toast.error("Invalid credentials")
        }
    }

    // ================= REQUEST ACCESS =================
    if (view === "request") {
      // simulate valid email check
      const isValid = email.includes("@")

      if (!isValid) {
        toast.error("Invalid email")
        return
      }

      // simulate opening email link
      const newTab = window.open("", "_blank")
      newTab?.document.write(`
        <h2>Admin Invite</h2>
        <p>Click link below:</p>
        <a href="/set-credentials">Set Credentials</a>
      `)

      toast("Access link generated")
    }

    // ================= FORGOT PASSWORD =================
    if (view === "forgot") {
      const newTab = window.open("", "_blank")
      newTab?.document.write(`
        <h2>Password Reset</h2>
        <a href="/reset-password">Reset Password</a>
      `)

      toast("Reset link sent")
    }
  }

  return (
    <Card className="w-full bg-transparent shadow-none border-none border-0">
    {/* <Card className="
      w-[520px]
      bg-white/40
      backdrop-blur-md
      shadow-xl
      border-none
      rounded-xl
    "> */}
      <CardHeader  className="p-0">
        <CardTitle className="text-center  font-normal text-[22px] mt-[15px] mb-[35px] text-[#222]">
          {view === "login" && "Login"}
          {view === "request" && "Admin Sign In"}
          {view === "forgot" && "Reset Password"}
        </CardTitle>
      </CardHeader>

      <CardContent  className="p-0">
        <form onSubmit={handleSubmit}  className="flex flex-col gap-[12px] text-left"> {/* className="space-y-4" */}

          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-[14px] font-medium text-[#222] pt-[5px]"> {/* className="text-sm" */}
              {view === "request" ? "Email Address" : "Email / Username"}
            </label>
            <Input
              className="bg-white border-none rounded-[10px] h-[40px] shadow-none focus-visible:ring-1 focus-visible:ring-blue-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD (ONLY LOGIN) */}
          {view === "login" && (
            <div  className="flex flex-col gap-1">
              <label className="text-[14px] font-medium text-[#222] pt-[5px]">Password</label> {/* className="text-sm" */}
              <Input
                 className="bg-white border-none rounded-[10px] h-[40px] shadow-none focus-visible:ring-1 focus-visible:ring-blue-200"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

<div className="flex justify-center">
          <Button type="submit" className="w-[50%] mt-[30px] h-[45px] bg-[#a3c2dc] text-black hover:bg-[#92b1cb] rounded-[10px] text-[16px] shadow-none border-none"> {/* className="w-full mt-4" */}
            {view === "login" && "Continue"}
            {view === "request" && "Request Access Link"}
            {view === "forgot" && "Send Reset Link"}
          </Button>
</div>

          {/* LINKS */}
        {view === "login" && (
            <div className="mt-[25px] space-y-2">
              <p className="text-center text-[13px]">
                <a href="#" className="hover:font-bold no-underline text-black" onClick={() => setView("forgot")}>
                  Forgot password?
                </a>
              </p>

              <p className="text-center text-[13px]">
                <a href="#" className="hover:font-bold no-underline text-black" onClick={() => setView("request")}>
                  First-time admin? Request access link.
                </a>
              </p>
            </div>
          )}

          {(view === "request" || view === "forgot") && (
            <p className="text-center text-[13px] mt-[25px]"> {/* className="text-center text-sm mt-4" */}
              <a href="#" className="hover:font-bold no-underline text-black" onClick={() => setView("login")}>
                Back to Login
              </a>
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}