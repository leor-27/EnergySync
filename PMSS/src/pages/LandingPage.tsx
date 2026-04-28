import { useEffect } from "react";
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm"

export default function LandingPage() {

// useEffect(() => {
//   const forgotWrapper = document.getElementById("forgot-wrapper") as HTMLElement | null;
//   const form = document.getElementById("admin-form") as HTMLFormElement | null;
//   const stepField = document.getElementById("step") as HTMLInputElement | null;
//   const inputField = document.getElementById("email") as HTMLInputElement | null;
//   const passwordField = document.getElementById("password") as HTMLInputElement | null;
//   const button = document.getElementById("login-btn") as HTMLButtonElement | null;
//   const inputLabel = document.getElementById("input-label") as HTMLElement | null;
//   const formTitle = document.getElementById("form-title") as HTMLElement | null;
//   const requestAccessWrapper = document.querySelector(".request-access") as HTMLElement | null;
//   const adminBox = document.getElementById("admin-login") as HTMLElement | null;
//   const passwordLabel = document.getElementById("password-label") as HTMLElement | null;

//   if (!form || !forgotWrapper || !passwordField || !button || !inputField || !stepField) return;

//   let step = "login";

//   if (step === "login") {
//   const email = inputField.value;
//   const password = passwordField.value;

//   // ✅ HARDCODED USERS
//   if (email === "admin@test.com" && password === "1234") {
//     localStorage.setItem("auth", "admin");
//     navigate("/admin-home");
//   } 
//   else if (email === "super@test.com" && password === "1234") {
//     localStorage.setItem("auth", "superadmin");
//     navigate("/superadmin-home");
//   } 
//   else {
//     alert("Invalid credentials");
//   }

//   return;
// }

//   // Initial UI
//   stepField.value = "login";
//   passwordField.style.display = "block";
//   passwordField.disabled = false;

//   if (passwordLabel) passwordLabel.style.display = "block";

//   button.innerText = "Continue";
//   forgotWrapper.style.display = "block";
//   if (requestAccessWrapper) requestAccessWrapper.style.display = "block";

//   if (adminBox) {
//     adminBox.style.display = "block";
//   }

//   // =========================
//   // FORM SUBMIT
//   // =========================
//   const handleSubmit = (e: Event) => {
//     e.preventDefault();

//     const formData = new FormData(form);
//     let emailTab: Window | null = null;

//     if (step === "request" || step === "forgot") {
//       emailTab = window.open("", "_blank");
//     }

//     // REQUEST ACCESS
//     if (step === "request") {
//       fetch("request-invite.php", {
//         method: "POST",
//         body: formData
//       })
//         .then(res => res.text())
//         .then(response => {
//           if (!response.startsWith("http")) {
//             emailTab?.close();
//             alert(response);
//             return;
//           }

//           emailTab!.document.write(`
//             <h2>Admin Invite</h2>
//             <a href="${response}">${response}</a>
//           `);
//           emailTab!.document.close();
//         });

//       return;
//     }

//     // FORGOT PASSWORD
//     if (step === "forgot") {
//       fetch("request-reset.php", {
//         method: "POST",
//         body: formData
//       })
//         .then(res => res.text())
//         .then(response => {
//           if (!response.startsWith("http")) {
//             emailTab?.close();
//             alert(response);
//             return;
//           }

//           emailTab!.document.write(`
//             <h2>Password Reset</h2>
//             <a href="${response}">${response}</a>
//           `);
//           emailTab!.document.close();
//         });

//       return;
//     }

//     // LOGIN / SET / RESET
//     fetch("backend/admin-auth.php", {
//       method: "POST",
//       body: formData
//     })
//       .then(res => res.text())
//       .then(response => {
//         if (response === "success") {

//         } else if (response === "reset_success") {
//           alert("Password reset successful.");
//           window.location.replace("index.php");
//         } else if (response === "setup") {
//           (window as any).showSetCredentials();
//         } else {
//           alert(response);
//         }
//       });
//   };

//   form.addEventListener("submit", handleSubmit);

//   // =========================
//   // UI FUNCTIONS
//   // =========================

//   (window as any).showSetCredentials = () => {
//     step = "set";
//     stepField.value = "set";

//     if (formTitle) formTitle.innerText = "Set Your Credentials";
//     if (inputLabel) inputLabel.innerText = "Username";

//     inputField.value = "";
//     passwordField.value = "";

//     passwordField.style.display = "block";
//     passwordField.disabled = false;
//     if (passwordLabel) passwordLabel.style.display = "block";

//     button.innerText = "Save Credentials";

//     forgotWrapper.style.display = "none";
//     if (requestAccessWrapper) {
//       requestAccessWrapper.style.display = "none";
//     }
//   };

//   (window as any).showResetPassword = () => {
//     step = "reset";
//     stepField.value = "reset";

//     if (formTitle) formTitle.innerText = "Reset Password";

//     inputField.value = "";
//     inputField.style.display = "none";
//     if (inputLabel) inputLabel.style.display = "none";

//     passwordField.value = "";
//     passwordField.style.display = "block";
//     passwordField.disabled = false;
//     if (passwordLabel) passwordLabel.style.display = "block";

//     button.innerText = "Save New Password";

//     forgotWrapper.style.display = "none";
//     if (requestAccessWrapper) {
//       requestAccessWrapper.style.display = "none";
//     }
//   };

//   // =========================
//   // CLICK HANDLERS
//   // =========================

//   const requestBtn = document.getElementById("request-access");
//   const forgotBtn = document.getElementById("forgot-password");

//   const handleRequest = (e: Event) => {
//     e.preventDefault();

//     step = "request";
//     stepField.value = "request";

//     if (formTitle) formTitle.innerText = "Admin Sign In";
//     if (inputLabel) inputLabel.innerText = "Email Address";

//     inputField.value = "";
//     passwordField.value = "";

//     passwordField.style.display = "none";
//     passwordField.disabled = true;
//     if (passwordLabel) passwordLabel.style.display = "none";

//     button.innerText = "Request Access Link";

//     forgotWrapper.style.display = "none";

//     if (requestAccessWrapper) {
//       requestAccessWrapper.style.display = "none";
//     }
//   };

//   const handleForgot = (e: Event) => {
//     e.preventDefault();

//     step = "forgot";
//     stepField.value = "forgot";

//     if (formTitle) formTitle.innerText = "Reset Password";
//     if (inputLabel) inputLabel.innerText = "Email / Username";

//     inputField.value = "";
//     passwordField.value = "";

//     passwordField.style.display = "none";
//     passwordField.disabled = true;
//     if (passwordLabel) passwordLabel.style.display = "none";

//     button.innerText = "Send Reset Link";

//     forgotWrapper.style.display = "none";
//     if (requestAccessWrapper) {
//       requestAccessWrapper.style.display = "none";
//     }
//   };

//   requestBtn?.addEventListener("click", handleRequest);
//   forgotBtn?.addEventListener("click", handleForgot);

//   // =========================
//   // CLEANUP (IMPORTANT)
//   // =========================
//   return () => {
//     form.removeEventListener("submit", handleSubmit);
//     requestBtn?.removeEventListener("click", handleRequest);
//     forgotBtn?.removeEventListener("click", handleForgot);
//   };

// }, []);

  return (
    <div className="landing-page  flex flex-col items-center">
      <div className="landing-page-header">
        <div className="header-logo-row">
          <Link to="/">
            <img src="/logo.png" alt="Energy FM 106.3 Naga Logo"
              className="logo-landing-page" />
          </Link>
          <h2 className="station-title">Energy FM Naga</h2>
        </div>

        <div className="header-line"></div>
      </div>

      <h1 className="welcome-title">
        Welcome to <span>ENERGYSYNC</span>
      </h1>

      {/* <div className="continue">
        <section id="admin-login" className="admin-section">
          <h1 id="form-title">Login</h1>

          <form id="admin-form" className="admin-form" method="POST">
            <input type="hidden" name="step" id="step" value="login" />

            <label id="input-label">Email / Username</label>
            <input type="text" id="email" name="email" />

            <label id="password-label">Password</label>
            <input type="password" id="password" name="password" />

            <div className="login">
              <button type="submit" className="login-button" id="login-btn">
                Continue
              </button>
            </div>

            <p className="forgot-password" id="forgot-wrapper">
              <a href="#" id="forgot-password">Forgot password?</a>
            </p>

            <p className="request-access">
              <a href="#" id="request-access">First-time admin? Request access link.</a>
            </p>
          </form>
        </section>
      </div> */}
        <div className="continue flex justify-center items-center">
          <LoginForm />
       </div>
    </div>
  );
}