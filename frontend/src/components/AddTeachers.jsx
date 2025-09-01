import { useState } from "react";
import API from "../api";

export default function AddTeachers() {
  const [teachers, setTeachers] = useState([{ name: "", maxLectures: 0 }]);

  // Handle input changes
  const handleChange = (index, e) => {
    const list = [...teachers];
    list[index][e.target.name] =
      e.target.name === "maxLectures" ? Number(e.target.value) : e.target.value;
    setTeachers(list);
  };

  // Add a new teacher row
  const handleAdd = () => {
    setTeachers([...teachers, { name: "", maxLectures: 0 }]);
  };

  // Submit teachers to backend
  const handleSubmit = async () => {
    // Validation
    if (teachers.some(t => !t.name || t.maxLectures <= 0)) {
      alert("Please fill all fields and enter valid max lectures.");
      return;
    }

    try {
      await API.post("/teachers", { teachers });
      alert("Teachers added successfully!");
      setTeachers([{ name: "", maxLectures: 0 }]); // Reset form
    } catch (err) {
      console.error(err);
      alert("Failed to add teachers. Check console for details.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Teachers</h2>

      {teachers.map((teacher, idx) => (
        <div key={idx} className="mb-3 space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Teacher Name"
            className="w-full p-2 border rounded-lg"
            value={teacher.name}
            onChange={(e) => handleChange(idx, e)}
          />
          <input
            type="number"
            name="maxLectures"
            placeholder="Max Lectures per Week"
            className="w-full p-2 border rounded-lg"
            value={teacher.maxLectures}
            onChange={(e) => handleChange(idx, e)}
          />
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleAdd}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          + Add More
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}
