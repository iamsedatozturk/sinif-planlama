import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ClassroomPlannerPage } from "./components/ClassroomPlannerPage";

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<ClassroomPlannerPage />} />
          <Route path="/classroom/:id" element={<ClassroomPlannerPage />} />
        </Routes>
      </div>
    </Router>
  );
};
