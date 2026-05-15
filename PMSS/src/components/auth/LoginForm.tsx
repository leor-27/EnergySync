// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { useAuth } from "@/contexts/useAuth"
// import {
//   Card, CardContent, CardHeader, CardTitle
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { toast } from "sonner"

// type View = "login" | "request" | "forgot"

// export default function LoginForm() {
//   const [view, setView] = useState<View>("login")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const navigate = useNavigate()
//   const { login } = useAuth()

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     // ================= LOGIN =================
//     if (view === "login") {
//         const user = login(email, password)

//         if (user) {
//         toast.success("Login successful")

//         if (user.role === "admin") {
//             navigate("/admin-home")
//         } else {
//             navigate("/superadmin-home")
//         }
//         } else {
//         toast.error("Invalid credentials")
//         }
//     }

//     // ================= REQUEST ACCESS =================
//     if (view === "request") {
//       // simulate valid email check
//       const isValid = email.includes("@")

//       if (!isValid) {
//         toast.error("Invalid email")
//         return
//       }

//       // simulate opening email link
//       const newTab = window.open("", "_blank")
//       newTab?.document.write(`
//         <h2>Admin Invite</h2>
//         <p>Click link below:</p>
//         <a href="/set-credentials">Set Credentials</a>
//       `)

//       toast("Access link generated")
//     }

//     // ================= FORGOT PASSWORD =================
//     if (view === "forgot") {
//       const newTab = window.open("", "_blank")
//       newTab?.document.write(`
//         <h2>Password Reset</h2>
//         <a href="/reset-password">Reset Password</a>
//       `)

//       toast("Reset link sent")
//     }
//   }

//   return (
//     <Card className="w-full bg-transparent shadow-none !border-0 !outline-none">
//     {/* <Card className="
//       w-[520px]
//       bg-white/40
//       backdrop-blur-md
//       shadow-xl
//       border-none
//       rounded-xl
//     "> */}
//       <CardHeader  className="p-0">
//         <CardTitle className="text-center  font-normal text-[22px] mt-[15px] mb-[35px] text-[#222]">
//           {view === "login" && "Login"}
//           {view === "request" && "Admin Sign In"}
//           {view === "forgot" && "Reset Password"}
//         </CardTitle>
//       </CardHeader>

//       <CardContent  className="p-0">
//         <form onSubmit={handleSubmit}  className="flex flex-col gap-[12px] text-left"> {/* className="space-y-4" */}

//           {/* EMAIL */}
//           <div className="flex flex-col gap-1">
//             <label className="text-[14px] font-medium text-[#222] pt-[5px]"> {/* className="text-sm" */}
//               {view === "request" ? "Email Address" : "Email / Username"}
//             </label>
//             <Input
//               className="bg-white border-none rounded-[10px] h-[40px] shadow-none focus-visible:ring-1 focus-visible:ring-blue-200"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           {/* PASSWORD (ONLY LOGIN) */}
//           {view === "login" && (
//             <div  className="flex flex-col gap-1">
//               <label className="text-[14px] font-medium text-[#222] pt-[5px]">Password</label> {/* className="text-sm" */}
//               <Input
//                  className="bg-white border-none rounded-[10px] h-[40px] shadow-none focus-visible:ring-1 focus-visible:ring-blue-200"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           )}

// <div className="flex justify-center">
//           <Button type="submit" className="w-[50%] mt-[30px] h-[45px] bg-[#a3c2dc] text-black hover:bg-[#92b1cb] rounded-[10px] text-[16px] shadow-none border-none"> {/* className="w-full mt-4" */}
//             {view === "login" && "Continue"}
//             {view === "request" && "Request Access Link"}
//             {view === "forgot" && "Send Reset Link"}
//           </Button>
// </div>

//           {/* LINKS */}
//         {view === "login" && (
//             <div className="mt-[25px] space-y-2">
//               <p className="text-center text-[13px]">
//                 <a href="#" className="hover:font-bold no-underline text-black" onClick={() => setView("forgot")}>
//                   Forgot password?
//                 </a>
//               </p>

//               <p className="text-center text-[13px]">
//                 <a href="#" className="hover:font-bold no-underline text-black" onClick={() => setView("request")}>
//                   First-time admin? Request access link.
//                 </a>
//               </p>
//             </div>
//           )}

//           {(view === "request" || view === "forgot") && (
//             <p className="text-center text-[13px] mt-[25px]"> {/* className="text-center text-sm mt-4" */}
//               <a href="#" className="hover:font-bold no-underline text-black" onClick={() => setView("login")}>
//                 Back to Login
//               </a>
//             </p>
//           )}
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/useAuth"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { toast } from "sonner"

type View =
  | "login"
  | "request"
  | "forgot"
  | "set"

export default function LoginForm() {

  const [view, setView] = useState<View>("login")

  const [email, setEmail] = useState("")
  const [credential, setCredential] = useState("")

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [alsoDj, setAlsoDj] = useState(false)
  const [stageName, setStageName] = useState("")

  const [adminId, setAdminId] = useState<number | null>(null)

  const navigate = useNavigate()

  const { setUser } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    // ================= LOGIN =================
    if (view === "login") {

      try {

        const res = await fetch(
          "http://localhost:5000/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
           body: JSON.stringify({
  credential,
  password
})
          }
        )

        const data = await res.json()

        if (!data.success) {
          toast.error(data.message)
          return
        }

        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))

        setUser(data.user)

        toast.success("Login successful")

        if (data.user.role === "Superadmin") {
          navigate("/superadmin-home")
        } else {
          navigate("/admin-home")
        }

      } catch (err) {
        console.error(err)
        toast.error("Server error")
      }
    }

    // ================= REQUEST ACCESS =================
    if (view === "request") {

      try {

        const res = await fetch(
          "http://localhost:5000/api/auth/request-access",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email
            })
          }
        )

        const data = await res.json()

        if (!data.success) {
          toast.error(data.message)
          return
        }

        setAdminId(data.admin_id)

        toast.success("Email verified")

        setView("set")

      } catch (err) {
        console.error(err)
        toast.error("Server error")
      }
    }

    // ================= SET CREDENTIALS =================
    if (view === "set") {

      if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        return
      }

      try {

        const res = await fetch(
          "http://localhost:5000/api/auth/set-credentials",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              admin_id: adminId,
              first_name: firstName,
              last_name: lastName,
              username,
              password,
              also_dj: alsoDj,
              stage_name: stageName
            })
          }
        )

        const data = await res.json()

        if (!data.success) {
          toast.error(data.message)
          return
        }

        toast.success("Credentials saved")

        setView("login")

        setUsername("")
        setPassword("")
        setConfirmPassword("")
        setEmail("")

        setAlsoDj(false)
        setStageName("")

      } catch (err) {
        console.error(err)
        toast.error("Server error")
      }
    }

    // ================= FORGOT PASSWORD =================
    if (view === "forgot") {

      try {

        const res = await fetch(
          "http://localhost:5000/api/auth/forgot-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: credential
            })
          }
        )

        const data = await res.json()

        if (!data.success) {
          toast.error(data.message)
          return
        }

        toast.success("Email verified")

        // window.open(data.resetLink, "_blank")
        navigate(`/reset-password/${data.token}`)

        // toast.success("Reset link generated")

      } catch (err) {
        console.error(err)
        toast.error("Server error")
      }
    }
  }

  return (

    <Card className="w-full bg-transparent shadow-none !border-0 !outline-none">

      <CardHeader className="p-0">

        <CardTitle className="
          text-center
          font-normal
          text-[22px]
          mt-[15px]
          mb-[35px]
          text-[#222]
        ">

          {view === "login" && "Login"}

          {view === "request" && "Admin Sign In"}

          {view === "forgot" && "Reset Password"}

          {view === "set" && "Set Your Credentials"}

        </CardTitle>

      </CardHeader>

      <CardContent className="p-0">

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[12px] text-left"
        >

          {/* LOGIN */}
          {view === "login" && (
            <>
              <div className="flex flex-col gap-1">

                <label className="text-[14px] font-medium text-[#222] pt-[5px]">
                  Email / Username
                </label>

                <Input
                  className="
                    bg-white
                    border-none
                    rounded-[10px]
                    h-[40px]
                    shadow-none
                  "
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                />

              </div>

              <div className="flex flex-col gap-1">

                <label className="text-[14px] font-medium text-[#222] pt-[5px]">
                  Password
                </label>

                <Input
                  className="
                    bg-white
                    border-none
                    rounded-[10px]
                    h-[40px]
                    shadow-none
                  "
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>
            </>
          )}

          {/* REQUEST ACCESS */}
          {view === "request" && (
            <div className="flex flex-col gap-1">

              <label className="text-[14px] font-medium text-[#222] pt-[5px]">
                Email Address
              </label>

              <Input
                className="
                  bg-white
                  border-none
                  rounded-[10px]
                  h-[40px]
                  shadow-none
                "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>
          )}

          {/* FORGOT PASSWORD */}
          {view === "forgot" && (
            <div className="flex flex-col gap-1">

              <label className="text-[14px] font-medium text-[#222] pt-[5px]">
                Email Address
              </label>

              <Input
                className="
                  bg-white
                  border-none
                  rounded-[10px]
                  h-[40px]
                  shadow-none
                "
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
              />

            </div>
          )}

          {/* SET CREDENTIALS */}
          {view === "set" && (
            <>
            <div className="flex flex-col gap-1">

  <label className="text-[14px] font-medium text-[#222] pt-[5px]">
    First Name
  </label>

  <Input
    className="
      bg-white
      border-none
      rounded-[10px]
      h-[40px]
      shadow-none
    "
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
  />

</div>

<div className="flex flex-col gap-1">

  <label className="text-[14px] font-medium text-[#222] pt-[5px]">
    Last Name
  </label>

  <Input
    className="
      bg-white
      border-none
      rounded-[10px]
      h-[40px]
      shadow-none
    "
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
  />

</div>

<div className="flex items-center gap-2 pt-[5px]">
  <input
    type="checkbox"
    checked={alsoDj}
    onChange={(e) => setAlsoDj(e.target.checked)}
  />

  <label className="text-[14px] font-medium text-[#222]">
    Also works as DJ
  </label>
</div>

{alsoDj && (
  <div className="flex flex-col gap-1">

    <label className="text-[14px] font-medium text-[#222] pt-[5px]">
      Stage Name
    </label>

    <Input
      className="
        bg-white
        border-none
        rounded-[10px]
        h-[40px]
        shadow-none
      "
      value={stageName}
      onChange={(e) => setStageName(e.target.value)}
    />

  </div>
)}

              <div className="flex flex-col gap-1">

                <label className="text-[14px] font-medium text-[#222] pt-[5px]">
                  Username
                </label>

                <Input
                  className="
                    bg-white
                    border-none
                    rounded-[10px]
                    h-[40px]
                    shadow-none
                  "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

              </div>

              <div className="flex flex-col gap-1">

                <label className="text-[14px] font-medium text-[#222] pt-[5px]">
                  Password
                </label>

                <Input
                  className="
                    bg-white
                    border-none
                    rounded-[10px]
                    h-[40px]
                    shadow-none
                  "
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>

              <div className="flex flex-col gap-1">

                <label className="text-[14px] font-medium text-[#222] pt-[5px]">
                  Confirm Password
                </label>

                <Input
                  className="
                    bg-white
                    border-none
                    rounded-[10px]
                    h-[40px]
                    shadow-none
                  "
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

              </div>
            </>
          )}

          <div className="flex justify-center">

            <Button
              type="submit"
              className="
                w-[50%]
                mt-[30px]
                h-[45px]
                bg-[#a3c2dc]
                text-black
                hover:bg-[#92b1cb]
                rounded-[10px]
                text-[16px]
                shadow-none
                border-none
              "
            >

              {view === "login" && "Continue"}

              {view === "request" && "Request Access Link"}

              {view === "forgot" && "Send Reset Link"}

              {view === "set" && "Save Credentials"}

            </Button>

          </div>

          {/* LINKS */}
          {view === "login" && (
            <div className="mt-[25px] space-y-2">

              <p className="text-center text-[13px]">

                <a
                  href="#"
                  className="hover:font-bold no-underline text-black"
                  onClick={() => setView("forgot")}
                >
                  Forgot password?
                </a>

              </p>

              <p className="text-center text-[13px]">

                <a
                  href="#"
                  className="hover:font-bold no-underline text-black"
                  onClick={() => setView("request")}
                >
                  First-time admin? Request access link.
                </a>

              </p>

            </div>
          )}

          {(view === "request" ||
            view === "forgot" ||
            view === "set") && (

            <p className="text-center text-[13px] mt-[25px]">

              <a
                href="#"
                className="hover:font-bold no-underline text-black"
                onClick={() => setView("login")}
              >
                Back to Login
              </a>

            </p>
          )}

        </form>

      </CardContent>

    </Card>
  )
}