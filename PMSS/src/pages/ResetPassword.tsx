import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { toast } from "sonner"

export default function ResetPassword() {

  const { token } = useParams()

  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleReset = async () => {

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token,
            password
          })
        }
      )

      const data = await res.json()

      if (!data.success) {
        toast.error(data.message)
        return
      }

      toast.success("Password updated")

      navigate("/")

    } catch (err) {
      console.error(err)
      toast.error("Server error")
    }
  }

  return (
    <div className="landing-page flex flex-col items-center">

      <h1 className="welcome-title">
        Reset Password
      </h1>

      <div className="continue flex justify-center items-center">

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
              Set New Password
            </CardTitle>

          </CardHeader>

          <CardContent className="p-0">

            <div className="flex flex-col gap-[12px] text-left">

              <div className="flex flex-col gap-1">

                <label className="text-[14px] font-medium text-[#222] pt-[5px]">
                  New Password
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

              <div className="flex justify-center">

                <Button
                  onClick={handleReset}
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
                  Save New Password
                </Button>

              </div>

            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  )
}