
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  UserRound,
  Save,
  Camera,
  Pencil,
  LogOut,
  LoaderCircle,
  X,
} from "lucide-react";

const API_URL = "http://localhost:3000/api/profile";
const SERVER_URL = "http://localhost:3000";

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [targetRole, setTargetRole] = useState("MERN Stack Developer");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Logged-in user ki profile load karo
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data.user;

        setName(user.name || "");
        setEmail(user.email || "");
        setTargetRole(
          user.targetRole || "MERN Stack Developer"
        );
        setProfilePhoto(user.profilePhoto || "");
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load your profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, token]);

  // Profile database mein save karo
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.put(
        API_URL,
        { name, targetRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = response.data.user;

      setName(user.name || "");
      setEmail(user.email || "");
      setTargetRole(
        user.targetRole || "MERN Stack Developer"
      );
      setProfilePhoto(user.profilePhoto || "");
      setEditing(false);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // Profile photo upload karo
  const handlePhotoChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, PNG or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Photo size must be less than 2 MB.");
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    setUploading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        `${API_URL}/photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfilePhoto(
        response.data.user.profilePhoto || ""
      );
      setMessage("Profile photo updated successfully!");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to upload profile photo."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const handleCancel = () => {
    setEditing(false);
    setError("");
    setMessage("");
    // Database wali values dobara load karna
    navigate(0);
  };

  if (loading) {
    return (
      <main className="flex min-h-64 items-center justify-center gap-3 text-gray-500">
        <LoaderCircle className="animate-spin" size={22} />
        Loading profile...
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 pb-10">
      {/* Heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-violet-50 p-3 text-violet-600">
            <UserRound size={24} />
          </span>

          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              My Profile
            </h1>
            <p className="mt-2 text-gray-500">
              Manage your account and career preferences.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 self-start rounded-xl border border-red-200 px-4 py-2.5 font-semibold text-red-600 transition hover:bg-red-50 sm:self-auto"
        >
          <LogOut size={18} />
          Logout
        </button>
      </section>

      {/* Profile form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7"
      >
        {/* Avatar and user details */}
        <div className="flex flex-col justify-between gap-5 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full bg-violet-100 text-violet-700">
              {profilePhoto ? (
                <img
                  src={`${SERVER_URL}${profilePhoto}`}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold">
                  {name.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {name || "Your name"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {email}
              </p>
              <p className="mt-1 text-xs text-violet-600">
                Career Explorer
              </p>
            </div>
          </div>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoChange}
              className="hidden"
            />

            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-violet-300 hover:bg-violet-50 disabled:opacity-60"
            >
              {uploading ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <Camera size={17} />
              )}
              {uploading ? "Uploading..." : "Change Photo"}
            </button>

            <p className="mt-2 text-xs text-gray-400">
              JPG, PNG or WEBP · Max 2 MB
            </p>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {/* Edit button */}
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900">
            Personal Information
          </h3>

          {!editing && (
            <button
              type="button"
              onClick={() => {
                setMessage("");
                setError("");
                setEditing(true);
              }}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-violet-600 hover:bg-violet-50"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          )}
        </div>

        {/* Name */}
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-700">
            Full Name
          </span>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={!editing}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-500 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </label>

        {/* Email */}
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-700">
            Email Address
          </span>

          <input
            type="email"
            value={email}
            disabled
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
          />

          <span className="mt-1 block text-xs text-gray-400">
            Email cannot be changed here.
          </span>
        </label>

        {/* Target role */}
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-700">
            Target Career Role
          </span>

          <select
            value={targetRole}
            onChange={(event) => setTargetRole(event.target.value)}
            disabled={!editing}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-500 disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option>MERN Stack Developer</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
            <option>Software Engineer</option>
          </select>
        </label>

        {/* Save and cancel */}
        {editing && (
          <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <Save size={17} />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-600 hover:bg-gray-50"
            >
              <X size={17} />
              Cancel
            </button>
          </div>
        )}
      </form>
    </main>
  );
}
