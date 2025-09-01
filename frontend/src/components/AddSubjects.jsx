import { useState } from "react";
import API from "../api";

export default function AddSubjects() {
  const [subjects, setSubjects] = useState([{ name: "", lectures: 0, teacher: "" }]);

  // Handle input changes
  const handleChange = (index, e) => {
    const list = [...subjects];
    list[index][e.target.name] =
      e.target.name === "lectures" ? Number(e.target.value) : e.target.value;
    setSubjects(list);
  };

  // Add a new subject row
  const handleAdd = () => {
    setSubjects([...subjects, { name: "", lectures: 0, teacher: "" }]);
  };

  // Remove a subject row
  const handleRemove = (index) => {
    const list = [...subjects];
    list.splice(index, 1);
    setSubjects(list);
  };

  // Submit subjects to backend
  const handleSubmit = async () => {
    // Validation: all fields must be filled
    if (subjects.some(sub => !sub.name || !sub.teacher || sub.lectures <= 0)) {
      alert("Please fill all fields and enter valid lectures per week.");
      return;
    }

    try {
      // Map to backend expected field names
      const payload = subjects.map(s => ({
        name: s.name,
        lectures: s.lectures,
        teacher: s.teacher
      }));

      await API.post("/subjects", { subjects: payload });
      alert("Subjects added successfully!");
      setSubjects([{ name: "", lectures: 0, teacher: "" }]); // Reset form
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to add subjects. Check console for details.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Subjects</h2>

      {subjects.map((sub, idx) => (
        <div key={idx} className="mb-3 space-y-2 relative">
          {subjects.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute top-0 right-0 text-red-500 font-bold"
            >
              &times;
            </button>
          )}
          <input
            type="text"
            name="name"
            placeholder="Subject Name"
            className="w-full p-2 border rounded-lg"
            value={sub.name}
            onChange={(e) => handleChange(idx, e)}
          />
          <input
            type="number"
            name="lectures"
            placeholder="Lectures per week"
            className="w-full p-2 border rounded-lg"
            value={sub.lectures}
            onChange={(e) => handleChange(idx, e)}
          />
          <input
            type="text"
            name="teacher"
            placeholder="Teacher Name"
            className="w-full p-2 border rounded-lg"
            value={sub.teacher}
            onChange={(e) => handleChange(idx, e)}
          />
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={handleAdd}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          + Add More
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}
