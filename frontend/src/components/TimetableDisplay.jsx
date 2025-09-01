export default function TimetableDisplay({ timetable }) {
  if (!timetable || timetable.length === 0) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Generated Timetable</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Period/Day</th>
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
              <th key={day} className="border border-gray-300 px-4 py-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timetable.map((periodRow, idx) => (
            <tr key={idx} className="text-center">
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                {idx + 1}
              </td>
              {periodRow.map((cell, cidx) => (
                <td key={cidx} className="border border-gray-300 px-4 py-2">
                  <span className="font-medium">{cell.subject}</span>
                  <br />
                  <span className="text-sm text-gray-600">{cell.teacher}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}