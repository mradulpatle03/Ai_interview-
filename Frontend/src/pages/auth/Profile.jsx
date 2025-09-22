import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../api/authApi";

const Profile = () => {
  const { token } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ name: "", experienceLevel: "", preferences: {} });

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile(token);
      setProfile(data);
      setFormData({
        name: data.name,
        experienceLevel: data.experienceLevel,
        preferences: data.preferences,
      });
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await updateProfile(token, formData);
    setProfile(updated.user);
    alert("Profile updated!");
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Profile</h2>
      <input name="name" value={formData.name} onChange={handleChange} />
      <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange}>
        <option value="junior">Junior</option>
        <option value="mid">Mid</option>
        <option value="senior">Senior</option>
      </select>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;
