import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { axios } from "../../api";
import { toast } from "react-toastify";
import usePageTitle from "../../hooks/usePageTitle";

const ForgotPassword = () => {
  usePageTitle("Forgot Password");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [devToken, setDevToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/forgot-password", { email });
      setSent(true);
      // dev_token is returned in development only — remove in production
      if (res.data.dev_token) setDevToken(res.data.dev_token);
      toast.success("Reset instructions sent!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="border p-4 p-lg-5 bg-white rounded">
            <h3 className="mb-2">Forgot Password</h3>
            <p className="text-muted mb-4">Enter your email and we'll send a reset link.</p>
            {sent ? (
              <div>
                <div className="alert alert-success">
                  Check your email for a password reset link.
                </div>
                {devToken && (
                  <div className="alert alert-warning small">
                    <strong>Dev mode:</strong> Your reset token is <code>{devToken}</code>
                    <br />
                    <NavLink to={`/reset-password?email=${encodeURIComponent(email)}&token=${devToken}`}>
                      Click here to reset →
                    </NavLink>
                  </div>
                )}
                <NavLink to="/login" className="btn btn-outline-secondary w-100 mt-2">Back to Login</NavLink>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input type="email" className="form-control" value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
                <div className="text-center mt-3">
                  <NavLink to="/login">Back to Login</NavLink>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
