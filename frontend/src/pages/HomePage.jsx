import React, { useState } from 'react';
import QuestionDetail from './QuestionDetailPage'; // Make sure this file exists and exports default component
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home({ onAskNewQuestionClick }) {
  const allQuestions = [
    {
      id: 1,
      title: 'How to join 2 columns in a data set to make a separate column in SQL',
      description: 'I do not know the code for it as I am a beginner...',
      tags: ['SQL', 'Beginner'],
      userName: 'User Name',
      answers: 5,
    },
    {
      id: 2,
      title: 'What is the difference between SQL and NoSQL databases?',
      description: 'I am trying to understand the fundamental differences...',
      tags: ['Databases', 'SQL', 'NoSQL'],
      userName: 'Data Explorer',
      answers: 3,
    },
    {
      id: 3,
      title: 'Question: How to implement authentication in a React app?',
      description: 'I am building a React application and need to add user authentication. What are the best practices and common libraries for this?',
      tags: ['React', 'Authentication', 'Security'],
      userName: 'React Dev',
      answers: 2,
    },
    {
      id: 4,
      title: 'Question: Explain the concept of closures in JavaScript.',
      description: 'I keep hearing about closures in JavaScript but find them hard to grasp. Could someone explain them with a simple example?',
      tags: ['JavaScript', 'Closures'],
      userName: 'JS Learner',
      answers: 8,
    },
    {
      id: 5,
      title: 'Question: Best way to handle state management in large React applications?',
      description: 'My React app is growing, and managing state is becoming complex. Should I use Redux, Context API, or something else?',
      tags: ['React', 'State Management', 'Redux', 'Context API'],
      userName: 'Scalable App',
      answers: 12,
    },
    {
      id: 6,
      title: 'Question: What are microservices and when should I use them?',
      description: 'I am trying to understand the architecture of microservices. What are their advantages and disadvantages, and in what scenarios are they most beneficial?',
      tags: ['Microservices', 'Architecture', 'Cloud'],
      userName: 'System Designer',
      answers: 7,
    },
    {
      id: 7,
      title: 'Question: How to optimize website performance for SEO?',
      description: 'My website is slow, and I believe it\'s affecting my SEO ranking. What are some key strategies to improve website performance?',
      tags: ['SEO', 'Web Performance', 'Optimization'],
      userName: 'SEO Guru',
      answers: 9,
    },
    {
      id: 8,
      title: 'Question: Introduction to Machine Learning algorithms.',
      description: 'I am new to Machine Learning and want to understand the basic types of algorithms like supervised, unsupervised, and reinforcement learning.',
      tags: ['Machine Learning', 'AI', 'Algorithms'],
      userName: 'AI Enthusiast',
      answers: 4,
    },
    {
      id: 9,
      title: 'Question: How to secure REST APIs?',
      description: 'I am developing a REST API and need to ensure it is secure from common vulnerabilities. What are the essential security measures?',
      tags: ['API', 'Security', 'REST'],
      userName: 'API Builder',
      answers: 6,
    },
    {
      id: 10,
      title: 'Question: Understanding asynchronous JavaScript: Callbacks, Promises, Async/Await.',
      description: 'Asynchronous programming in JavaScript is confusing. Can someone explain callbacks, promises, and async/await with practical examples?',
      tags: ['JavaScript', 'Asynchronous', 'Promises'],
      userName: 'Code Learner',
      answers: 11,
    },
    {
      id: 11,
      title: 'Question: What is Docker and how does it simplify deployment?',
      description: 'I\'m looking into containerization and Docker. How does it work, and what benefits does it offer for deploying applications?',
      tags: ['Docker', 'DevOps', 'Containerization'],
      userName: 'Deployment Pro',
      answers: 10,
    },
    {
      id: 12,
      title: 'Question: Getting started with Python for data analysis.',
      description: 'I want to use Python for data analysis. What are the essential libraries and steps to get started?',
      tags: ['Python', 'Data Analysis', 'Pandas', 'NumPy'],
      userName: 'Data Novice',
      answers: 7,
    },
    {
      id: 13,
      title: 'Question: How to design a responsive navigation bar in CSS?',
      description: 'I need to create a navigation bar that looks good and functions well on both desktop and mobile devices. Any tips for responsive CSS?',
      tags: ['CSS', 'Responsive Design', 'UI/UX'],
      userName: 'Web Designer',
      answers: 5,
    },
    {
      id: 14,
      title: 'Question: Explain the concept of Redux Sagas.',
      description: 'I am using Redux in my React app and want to understand how Redux Sagas can help with side effects like API calls.',
      tags: ['React', 'Redux', 'Asynchronous'],
      userName: 'Redux User',
      answers: 6,
    },
    {
      id: 15,
      title: 'Question: What is the event loop in JavaScript?',
      description: 'I\'m trying to grasp how JavaScript handles asynchronous operations internally. Can someone explain the event loop?',
      tags: ['JavaScript', 'Event Loop', 'Concurrency'],
      userName: 'JS Pro',
      answers: 9,
    },
    {
      id: 16,
      title: 'Question: How to secure a Node.js application?',
      description: 'Building a backend with Node.js and Express. What are the best security practices to prevent common vulnerabilities?',
      tags: ['Node.js', 'Security', 'Express.js'],
      userName: 'Backend Dev',
      answers: 7,
    },
    {
      id: 17,
      title: 'Question: Introduction to GraphQL vs REST.',
      description: 'I\'m comparing GraphQL and REST APIs. What are their main differences and when should I choose one over the other?',
      tags: ['GraphQL', 'REST', 'API'],
      userName: 'API Architect',
      answers: 5,
    },
    {
      id: 18,
      title: 'Question: Best practices for CSS Modules in React.',
      description: 'How should I effectively use CSS Modules in a React project to manage styles and avoid conflicts?',
      tags: ['React', 'CSS', 'Styling'],
      userName: 'UI Developer',
      answers: 4,
    },
    {
      id: 19,
      title: 'Question: Understanding Webpack for bundling assets.',
      description: 'Webpack seems powerful but complex. Can someone explain its core concepts and how it helps with bundling web assets?',
      tags: ['Webpack', 'Bundling', 'JavaScript'],
      userName: 'Front-end Tools',
      answers: 8,
    },
    {
      id: 20,
      title: 'Question: How to implement server-side rendering (SSR) in React?',
      description: 'I want to improve the initial load performance and SEO of my React app. How can I implement Server-Side Rendering?',
      tags: ['React', 'SSR', 'Performance', 'SEO'],
      userName: 'SSR Enthusiast',
      answers: 10,
    },
    {
      id: 21,
      title: 'Question: Introduction to Kubernetes for container orchestration.',
      description: 'I\'m learning about container orchestration. What is Kubernetes, and what problems does it solve?',
      tags: ['Kubernetes', 'DevOps', 'Containerization'],
      userName: 'Orchestration Learner',
      answers: 12,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('Newest Unanswered');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const questionsPerPage = 3;

  const getFilteredQuestions = () => {
    let filtered = [...allQuestions];

    if (activeFilter === 'Most Popular') {
      filtered.sort((a, b) => b.answers - a.answers);
    } else if (activeFilter === 'Recently Added') {
      filtered.sort((a, b) => b.id - a.id);
    } else if (activeFilter === 'Unanswered') {
      filtered = filtered.filter(q => q.answers === 0);
    } else if (activeFilter === 'My Questions') {
      filtered = filtered.filter(q => q.userName === 'React Dev');
    }

    return filtered;
  };

  const filteredAndSortedQuestions = getFilteredQuestions();
  const totalPages = Math.ceil(filteredAndSortedQuestions.length / questionsPerPage);
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredAndSortedQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (filterName) => {
    setActiveFilter(filterName);
    setCurrentPage(1);
  };

  const handleQuestionClick = (questionId) => {
    const question = allQuestions.find(q => q.id === questionId);
    setSelectedQuestion(question);
  };

  const handleBackToList = () => {
    setSelectedQuestion(null);
  };

  const Header = ({ activeFilter, onFilterChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleDropdownItemClick = (filterName) => {
      onFilterChange(filterName);
      setIsDropdownOpen(false);
    };

    return (
      <header className="flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-300 mb-6">
        {!selectedQuestion && (
          <Link
            to="/ask-question"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md mb-4 md:mb-0 md:mr-4 w-full md:w-auto text-center inline-block"
          >
            Ask New Question
          </Link>
        )}

        {!selectedQuestion && (
          <>
            <div className="relative flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center bg-gray-200 rounded-md px-3 py-1">
                <span className="text-gray-700 font-medium">{activeFilter}</span>
                <button
                  onClick={toggleDropdown}
                  className="ml-2 flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
              </div>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  {['Newest Unanswered', 'Most Popular', 'Recently Added', 'Unanswered', 'My Questions'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => handleDropdownItemClick(filter)}
                      className={`block w-full text-left px-4 py-2 text-sm ${activeFilter === filter
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative w-full md:w-1/3 lg:w-1/4">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </>
        )}
      </header>
    );
  };

  const QuestionList = ({ questions }) => (
    <div className="space-y-6">
      {questions.map((question) => (
        <div
          key={question.id}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer hover:shadow-md transition-shadow duration-200"
          onClick={() => handleQuestionClick(question.id)}
        >
          <div className="flex-grow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer">{question.title}</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {question.tags?.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-600 text-sm mb-3 md:mb-0">{question.description}</p>
            <p className="text-gray-500 text-xs mt-2">{question.userName}</p>
          </div>
          <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-6">
            <span className="text-lg font-bold text-blue-600">{question.answers} ans</span>
          </div>
        </div>
      ))}
    </div>
  );

  const Pagination = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <nav className="flex justify-center items-center mt-8 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-gray-600 hover:text-gray-900 p-2 rounded-md disabled:opacity-50"
        >
          &lt;
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-3 py-1 rounded-md ${number === currentPage ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-gray-600 hover:text-gray-900 p-2 rounded-md disabled:opacity-50"
        >
          &gt;
        </button>
      </nav>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        {selectedQuestion ? (
          <QuestionDetail question={selectedQuestion} onBackToList={handleBackToList} />
        ) : (
          <>
            <Header onAskNewQuestionClick={onAskNewQuestionClick} activeFilter={activeFilter} onFilterChange={handleFilterChange} />
            <QuestionList questions={currentQuestions} />
            <Pagination />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
