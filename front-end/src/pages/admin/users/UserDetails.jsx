import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../../utils/axios";
import { URLS } from "../../../constants/apiRoute";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [courseDuration, setCourseDuration] = useState("Not set");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await instance.get(URLS.USER_DETAIL(id));
        setUser(res.data.user);

        //course details
        if (res.data.user?.course) {
          const courseRes = await instance.get(URLS.GET_COURSES);
          const course = courseRes.data.data.find(
            (c) => c.name === res.data.user.course
          );
          setCourseDuration(course?.duration || "Not set");
        }
      } catch (err) {
        console.error("Failed to load user detail", err);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6 border-b border-green-400 pb-2">
        {user.name}
      </h2>
      <div className="space-y-4 text-sm">
        <ProfileRow label="📧 Email" value={user.email} />
        <ProfileRow label="📚 Course" value={user.course} />
        <ProfileRow label="💰 Payment" value={`Rs. ${user.payment}`} />
        <ProfileRow
          label="💸 Due Amount"
          value={`Rs. ${user.remaining}`}
          valueClass="text-red-600"
        />
        <ProfileRow label="📆 Course Duration" value={courseDuration} />
        <ProfileRow
          label="✅ Completed"
          value={user.completed ? "Yes" : "No"}
          valueClass={user.completed ? "text-green-600" : "text-yellow-500"}
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
