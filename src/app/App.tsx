/**
 * Main App Component - Sınıf Planlama Uygulaması
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/shared/lang/LanguageProvider';
import { ClassroomPlannerPage } from '@/features/classroom/components/ClassroomPlannerPage';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<ClassroomPlannerPage />} />
            <Route path="/classroom/:id" element={<ClassroomPlannerPage />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
};