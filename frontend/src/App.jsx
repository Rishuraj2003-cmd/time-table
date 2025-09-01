import { useState } from "react";
import AddSubjects from "./components/AddSubjects";
import AddTeachers from "./components/AddTeachers";
import GenerateTimetable from "./components/GenerateTimetable";
import TimetableDisplay from "./components/TimetableDisplay";

function App() {
  const [timetable, setTimetable] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Automatic Class Timetable Generator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <AddSubjects />
        <AddTeachers />
      </div>

      <div className="flex justify-center mb-8">
        <GenerateTimetable setTimetable={setTimetable} />
      </div>

      <TimetableDisplay timetable={timetable} />
    </div>
  );
}

export default App;