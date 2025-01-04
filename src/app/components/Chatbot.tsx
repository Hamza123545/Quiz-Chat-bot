'use client';

import { useState } from 'react';

const Chatbot = () => {
  const [userName, setUserName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    { question: 'What is the primary benefit of using Next.js over traditional React?', options: ['Server-Side Rendering', 'Client-Side Rendering', 'Static Site Generation', 'All of the above'], correct: 'All of the above' },
    { question: 'What does Tailwind CSS use to style elements?', options: ['Predefined Classes', 'Inline Styles', 'JavaScript', 'None of the above'], correct: 'Predefined Classes' },
    { question: 'What is the command to create a new Next.js app?', options: ['npx create-next-app', 'npm create-next-app', 'create-next-app', 'next create app'], correct: 'npx create-next-app' },
    { question: 'Which hook is used for fetching data in Next.js?', options: ['useEffect', 'useState', 'getServerSideProps', 'getStaticProps'], correct: 'getServerSideProps' },
    { question: 'What is the file extension for a Next.js page?', options: ['.jsx', '.ts', '.tsx', '.page.js'], correct: '.tsx' },
    { question: 'How can you add a custom font in Tailwind CSS?', options: ['@import in CSS', 'In the tailwind.config.js file', 'FontAwesome package', 'None of the above'], correct: 'In the tailwind.config.js file' },
    { question: 'Which of these is true about Next.js Image optimization?', options: ['Next.js optimizes images automatically on demand', 'You must optimize images manually', 'Next.js doesn\'t support image optimization', 'None of the above'], correct: 'Next.js optimizes images automatically on demand' },
    { question: 'Which command is used to run a Next.js development server?', options: ['npm start', 'npm run dev', 'next dev', 'run dev'], correct: 'npm run dev' },
    { question: 'What is the default folder for static assets in Next.js?', options: ['public', 'static', 'assets', 'dist'], correct: 'public' },
    { question: 'How do you enable PurgeCSS in Tailwind?', options: ['@tailwind purge', 'Add purge option in tailwind.config.js', 'Use the tailwind purge command', 'None of the above'], correct: 'Add purge option in tailwind.config.js' },
    { question: 'What is the purpose of Next.js API routes?', options: ['To handle backend logic within a Next.js app', 'To provide authentication', 'To create middleware', 'None of the above'], correct: 'To handle backend logic within a Next.js app' },
    { question: 'How do you pass dynamic data to a page in Next.js?', options: ['With props', 'Using state', 'With query parameters', 'Through context'], correct: 'With props' },
    { question: 'Which of these is the correct way to handle routing in Next.js?', options: ['Using React Router', 'Using Next.js Link component', 'Using window.location', 'None of the above'], correct: 'Using Next.js Link component' },
    { question: 'How does Next.js handle static site generation?', options: ['By generating static HTML at build time', 'By generating static HTML on the fly', 'By using pre-generated data only', 'None of the above'], correct: 'By generating static HTML at build time' },
    { question: 'What does `next/image` optimize?', options: ['Images for performance and responsiveness', 'Only images for SEO', 'Static assets', 'Server-side assets'], correct: 'Images for performance and responsiveness' },
    { question: 'How can you style Next.js pages using Tailwind CSS?', options: ['By importing Tailwind classes in a global CSS file', 'By applying Tailwind classes directly in JSX', 'By using Tailwind classes in JavaScript', 'None of the above'], correct: 'By applying Tailwind classes directly in JSX' },
    { question: 'What is the command to create a new Tailwind project?', options: ['tailwind init', 'npx tailwind init', 'npm create tailwind', 'create-tailwind-project'], correct: 'npx tailwind init' },
    { question: 'How do you add responsive styles in Tailwind CSS?', options: ['By using `responsive` classes', 'By using `@media` queries', 'By using `sm`, `md`, `lg` classes', 'None of the above'], correct: 'By using `sm`, `md`, `lg` classes' },
    { question: 'How do you use Tailwind’s JIT mode?', options: ['By default', 'By configuring it in the tailwind.config.js file', 'By installing the JIT plugin', 'None of the above'], correct: 'By configuring it in the tailwind.config.js file' },
    { question: 'What command is used to run a Next.js production build?', options: ['next build', 'npm run build', 'next production', 'npm build'], correct: 'next build' },
  ];

  const handleSubmitDetails = () => {
    if (userName && rollNumber && contactNumber) {
      setQuizStarted(true);
    }
  };

  const handleAnswerClick = (answer: string) => {
    const correctAnswer = questions[currentQuestionIndex].correct;
    setUserAnswers((prevAnswers) => [...prevAnswers, answer]);
    if (answer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true); 
    }
  };


  const percentage = quizCompleted ? ((score / questions.length) * 100).toFixed(2) : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {!quizStarted ? (
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Enter Your Details</h2>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your Roll Number"
            className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your Contact Number"
            className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <button
            onClick={handleSubmitDetails}
            className="w-full py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Start Quiz
          </button>
        </div>
      ) : quizCompleted ? (
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Quiz Completed!</h2>
          <p className="text-xl text-gray-800 mb-4">Your Score: {score} / {questions.length}</p>
          <p className="text-xl text-gray-800 mb-4">Percentage: {percentage}%</p>
          <p className="text-lg text-gray-600">Thank you for taking the quiz!</p>
        </div>
      ) : (
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-xl border border-gray-200">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Question {currentQuestionIndex + 1}</h2>
          <p className="text-xl text-gray-700 mb-6">{questions[currentQuestionIndex]?.question}</p>
          <div className="space-y-4">
            {questions[currentQuestionIndex]?.options.map((option, idx) => (
              <button
                key={idx}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
