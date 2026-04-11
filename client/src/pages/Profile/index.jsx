import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { axios } from "../../api";
import { toast } from "react-toastify";
import Hero from "../../components/Hero";
import usePageTitle from "../../hooks/usePageTitle";

const Profile = () => {
  usePageTitle("My Profile");
  const { user, login } = useContext(AuthContext);

  const [form, setForm] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    password: "",
    password_confirmation: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.password_confirmation) {
      toast.error("Passwords do not match.");
      return;
    }
    if (form.password && form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.password) {
        delete payload.password;
        delete payload.password_confirmation;
      }
      const res = await axios.put("/profile", payload);
      // Update auth context user data
      const token = localStorage.getItem("token");
      if (token) {
        // Re-fetch user to update context
        const userRes = await axios.get("/user");
        // We don't have a setUser exposed from context, but we can trigger a reload
        // For now just show success
      }
      toast.success("Profile updated successfully!");
      setForm((p) => ({ ...p, password: "", password_confirmation: "" }));
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        Object.values(errors).forEach((msgs) => toast.error(msgs[0]));
      } else {
        toast.error(err.response?.data?.message || "Failed to update profile.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Hero title="My Profile" />
      <div className="untree_co-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="border p-4 p-lg-5 bg-white rounded">
                <h4 className="mb-4">Account Information</h4>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name</label>
                      <input name="first_name" value={form.first_name} onChange={handleChange}
                        className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name</label>
                      <input name="last_name" value={form.last_name} onChange={handleChange}
                        className="form-control" required />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange}
                      className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Address</label>
                    <input name="address" value={form.address} onChange={handleChange} className="form-control" />
                  </div>
                  <hr />
                  <h5 className="mb-3">Change Password <small className="text-muted fs-6">(leave blank to keep current)</small></h5>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input name="password" type="password" value={form.password} onChange={handleChange}
                      className="form-control" placeholder="Min. 8 characters" />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Confirm New Password</label>
                    <input name="password_confirmation" type="password" value={form.password_confirmation}
                      onChange={handleChange} className="form-control" />
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
