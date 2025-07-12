import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Common/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AskQuestionPage from './pages/AskQuestionPage.jsx';
import QuestionDetailPage from './pages/QuestionDetailPage.jsx';
import PrivateRoute from './PrivateRoute.jsx'; // <--- UPDATED: .jsx extension

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/questions/:id" element={<QuestionDetailPage />} />

          {/* Protected Routes - only accessible when logged in */}
          <Route element={<PrivateRoute />}>
            <Route path="/ask-question" element={<AskQuestionPage />} />
            {/* Add other protected routes here */}
          </Route>

          {/* Add a 404 Not Found page */}
          <Route path="*" element={<h1 className="text-xl text-center mt-8">404 - Page Not Found</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;