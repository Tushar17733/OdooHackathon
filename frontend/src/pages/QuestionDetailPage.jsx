import React, { useState } from 'react';

function QuestionDetail({ question, onBackToList }) {
  // State for the new answer textarea
  const [newAnswer, setNewAnswer] = useState('');

  // Sample answers (you'd likely fetch these from an API)
  const [answers, setAnswers] = useState([
    {
      id: 101,
      text: 'The || Operator.\nThe + Operator.\nThe CONCAT Function.',
      votes: 1,
    },
    {
      id: 102,
      text: 'Using CONCAT() or CONCAT_WS() for combining columns is generally the most robust method in SQL. For example: SELECT CONCAT(first_name, \' \', last_name) AS full_name FROM users;',
      votes: 0,
    },
    // Add more sample answers if needed
  ]);

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (newAnswer.trim()) {
      // In a real app, you'd send this to a backend and get a new ID
      const newAns = {
        id: answers.length + 101, // Simple ID generation
        text: newAnswer,
        votes: 0,
      };
      setAnswers([...answers, newAns]);
      setNewAnswer(''); // Clear the textarea
      alert('Answer submitted! (Note: Voting requires login)'); // Simulating login prompt
    }
  };

  const handleVote = (answerId, type) => {
    // This is where login/signup popup would typically appear if not logged in.
    // For now, let's just log it and simulate a vote.
    console.log(`Voting ${type} for answer ID: ${answerId}`);
    alert(`Voting functionality (up/down) would require login and is for demonstration only. You voted ${type} for Answer ${answerId}`);

    // Simulate vote change (for demonstration, no actual user login/state is managed here)
    setAnswers(answers.map(answer =>
      answer.id === answerId
        ? { ...answer, votes: type === 'up' ? answer.votes + 1 : answer.votes - 1 }
        : answer
    ));
  };


  if (!question) {
    return <div className="text-center text-lg text-gray-600 mt-10">Question not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 md:p-6 lg:p-8">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
        {/* Header/Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <button onClick={onBackToList} className="text-blue-600 hover:underline">
            {'< Home'}
          </button>
          <span className="mx-2">/</span>
          <span>Question &gt; {question.title.substring(0, 30)}...</span>
        </div>

        {/* Question Section */}
        <div className="pb-6 border-b border-gray-200 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{question.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            {question.description}
          </p>
          <p className="text-gray-500 text-sm">Asked by: {question.userName}</p>
        </div>

        {/* Answers Section */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Answers ({answers.length})</h2>
        <div className="space-y-6">
          {answers.length > 0 ? (
            answers.map((answer) => (
              <div key={answer.id} className="flex items-start bg-gray-50 p-4 rounded-md border border-gray-100">
                <div className="flex flex-col items-center mr-4 mt-1">
                  <button
                    onClick={() => handleVote(answer.id, 'up')}
                    className="text-gray-600 hover:text-blue-600 focus:outline-none"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                  </button>
                  <span className="font-bold text-gray-800">{answer.votes}</span>
                  <button
                    onClick={() => handleVote(answer.id, 'down')}
                    className="text-gray-600 hover:text-red-600 focus:outline-none"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{answer.text}</p>
                  {/* You could add answer author and timestamp here */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No answers yet. Be the first to answer!</p>
          )}
        </div>

        {/* Submit Your Answer Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Submit Your Answer</h2>
          <form onSubmit={handleSubmitAnswer}>
            {/* Rich text editor placeholder - for simplicity, using a textarea */}
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              rows="6"
              placeholder="Type your answer here..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              required
            ></textarea>
            {/* The image showed B I S U elements, typically for rich text.
                For simplicity, we're omitting actual rich text editor controls here,
                but you would integrate a library like Draft.js or Quill.js here. */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;