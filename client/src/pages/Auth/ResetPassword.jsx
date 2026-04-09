import React, { useState } from "react";
import { useSearchParams, useNavigate, NavLink } from "react-router-dom";
import { axios } from "../../api";
import { toast } from "react-toastify";
import usePageTitle from "../../hooks/usePageTitle";

const ResetPassword = () => {
  usePageTitle("Reset Password");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: searchParams.get("email") || "",
    token: searchParams.get("token") || "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/reset-password", form);
      toast.success("Password reset successfully. Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="border p-4 p-lg-5 bg-white rounded">
            <h3 className="mb-4">Reset Password</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Reset Token</label>
                <input name="token" value={form.token} onChange={handleChange}
                  className="form-control" required placeholder="Paste token from email" />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange}
                  className="form-control" required minLength={8} />
              </div>
              <div className="mb-4">
                <label className="form-label">Confirm Password</label>
                <input name="password_confirmation" type="password" value={form.password_confirmation}
                  onChange={handleChange} className="form-control" required />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
              <div className="text-center mt-3">
                <NavLink to="/login">Back to Login</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
