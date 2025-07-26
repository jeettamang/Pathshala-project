import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../../utils/axios";
import { URLS } from "../../../constants/apiRoute";
import { ToastContainer, toast } from "react-toastify";

const UserDetail = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await instance.get(URLS.USER_DETAIL(id));
        console.log("User data from API:", res.data.user);

        setUser(res.data.user);

        setLoading(false);
      } catch (err) {
        console.error("Failed to load user detail", err);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "completed") {
      setUser((prev) => ({ ...prev, completed: checked }));
    } else if (name === "internshipStatus") {
      setUser((prev) => ({
        ...prev,
        internship: { ...prev.internship, status: checked },
      }));
    } else if (name === "certificate") {
      setUser((prev) => ({
        ...prev,
        internship: { ...prev.internship, certificate: value },
      }));
    }
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const updatePayload = {
        completed: user.completed,
        internshipStatus: user.internship?.status,
        certificate: user.internship?.certificate,
      };

      await instance.patch(URLS.UPDATE_USER(id), updatePayload);
      toast.success("User status updated!");
    } catch (err) {
      toast.error("Failed to update");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !user)
    return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-md rounded-xl">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 border-b border-green-400 pb-2">
        {user.name}
      </h2>

      {/* Display Section */}
      <div className="space-y-4 text-sm mb-8">
        <ProfileRow label="📧 Email" value={user.email} />
        <ProfileRow label="📚 Course" value={user.course} />
        <ProfileRow label="💰 Payment" value={`Rs. ${user.payment}`} />
        <ProfileRow
          label="💸 Due Amount"
          value={`Rs. ${user.remaining}`}
          valueClass="text-red-600"
        />
        <ProfileRow
          label="📆 Course Duration"
          value={user.courseDuration || "Not set"}
        />

        <ProfileRow
          label="🛠 Internship"
          value={user.internship?.status ? "Yes" : "No"}
          valueClass={
            user.internship?.status ? "text-green-600" : "text-gray-600"
          }
        />
        <ProfileRow
          label="🎓 Certificate"
          value={user.internship?.certificate || "Not available"}
          valueClass={
            user.internship?.certificate
              ? "text-green-600"
              : "text-gray-500 italic"
          }
        />
      </div>

      {/* Edit Section */}
      <h3 className="text-lg font-semibold mb-3 border-b pb-2">
        Update Status
      </h3>
      <div className="space-y-4 text-sm bg-slate-50">
        <div className="flex justify-between items-center">
          <label>Course Completed</label>
          <input
            type="checkbox"
            name="completed"
            checked={user.completed}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <label>Internship Completed</label>
          <input
            type="checkbox"
            name="internshipStatus"
            checked={user.internship?.status}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Certificate</label>
          <input
            type="text"
            name="certificate"
            value={user.internship?.certificate || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
          onClick={handleUpdate}
          disabled={updating}
        >
          {updating ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

const ProfileRow = ({ label, value, valueClass = "" }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <span className="font-medium text-gray-600 w-1/3">{label}:</span>
    <span className={`w-2/3 text-right text-base font-semibold ${valueClass}`}>
      {value}
    </span>
  </div>
);

export default UserDetail;
