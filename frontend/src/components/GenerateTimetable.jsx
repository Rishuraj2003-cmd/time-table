import { useState, useEffect } from "react";
import API from "../api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Ensure correct import for autotable

export default function GenerateTimetable() {
  const [timetables, setTimetables] = useState([]);

  // Fetch all timetables
  const fetchTimetables = async () => {
    try {
      const res = await API.get("/timetable");
      setTimetables(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch timetables.");
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, []);

  // Generate new timetable
  const handleGenerate = async () => {
    try {
      await API.post("/timetable/generate");
      fetchTimetables();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || "Failed to generate timetable.";
      alert(msg);
    }
  };

  // Download timetable as PDF
  const downloadPDF = (tt, idx) => {
    const doc = new jsPDF();
    doc.text(`Timetable #${timetables.length - idx}`, 14, 15);

    const head = [["Period / Day", ...tt.grid[0].map(cell => cell.day)]];
    const body = tt.grid.map((row, p) => [
      `Period ${p + 1}`,
      ...row.map(cell => `${cell.subject}\n${cell.teacher}`),
    ]);

    autoTable(doc, {
      head,
      body,
      startY: 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [63, 81, 181], textColor: 255 },
    });

    doc.save(
      `Timetable_${tt.meta.generatedAt ? new Date(tt.meta.generatedAt).toISOString() : idx}.pdf`
    );
  };

  // Delete timetable
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this timetable?")) return;
    try {
      await API.delete(`/timetable/${id}`);
      fetchTimetables(); // Refresh list
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || "Failed to delete timetable.";
      alert(msg);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      {/* Centered Generate Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleGenerate}
          className="bg-purple-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:bg-purple-700 transition duration-200 text-lg font-semibold"
        >
          Generate New Timetable
        </button>
      </div>

      {/* Timetables */}
      {timetables.length === 0 ? (
        <p className="text-gray-500 mt-4 text-center">No timetables generated yet.</p>
      ) : (
        timetables.map((tt, idx) => (
          <div key={tt._id} className="bg-white shadow-md rounded-2xl p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h3 className="font-semibold text-lg">
                Timetable #{timetables.length - idx}{" "}
                {tt.meta?.generatedAt &&
                  `(Generated: ${new Date(tt.meta.generatedAt).toLocaleString()})`}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => downloadPDF(tt, idx)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => handleDelete(tt._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table-auto w-full border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-3 py-2">Period / Day</th>
                    {tt.grid[0]?.map((cell, d) => (
                      <th key={d} className="border px-3 py-2">
                        {cell?.day || ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tt.grid.map((row, p) => (
                    <tr
                      key={p}
                      className={p % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="border px-3 py-2 font-semibold text-center">
                        Period {p + 1}
                      </td>
                      {row.map((cell, d) => (
                        <td key={d} className="border px-3 py-2 text-center">
                          <div className="font-medium">{cell?.subject || ""}</div>
                          <div className="text-sm text-gray-600">{cell?.teacher || ""}</div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
