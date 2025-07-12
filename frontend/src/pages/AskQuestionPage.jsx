// src/components/AskQuestionPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Editor } from 'primereact/editor';

function AskQuestionPage() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [text, setText] = useState('');


  const handleSubmit = async (e) => {
     e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/questions/ask',
        { title, description, tags },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // token from login
          }
        }
      );

      alert('Question submitted!');
      setTitle('');
      setDescription('');
      setTags('');
    } catch (err) {
      console.error(err);
      alert('Failed to submit question.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col items-center py-8">
      {/* Header/Navbar - Replicated from previous context for consistency */}
     

      <div className="w-full max-w-3xl bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your question title"
              required
            />
          </div>

          {/* Description Field with Rich Text Editor Toolbar */}
          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
              Description
            </label>
           <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '220px' }} />
          </div>

          {/* Tags Field */}
          <div>
            <label htmlFor="tags" className="block text-lg font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., react, javascript, css (comma separated)"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AskQuestionPage;
