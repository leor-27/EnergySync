import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm"

export default function LandingPage() {

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

        <div className="continue flex justify-center items-center">
          <LoginForm />
       </div>
    </div>
  );
}