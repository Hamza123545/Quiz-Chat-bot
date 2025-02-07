'use client';

import { useState, useEffect } from 'react';

type Question = {
  question: string;
  options: string[];
  correct: string;
};

const Chatbot = () => {
  const [userName, setUserName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Local question bank
  const questions: Question[] = [
    {
      question: 'What is the primary purpose of React Server Components in Next.js 15?',
      options: [
        'To enable server-side rendering',
        'To reduce client-side JavaScript',
        'To improve SEO',
        'To simplify API routing',
      ],
      correct: 'To reduce client-side JavaScript',
    },
    {
      question: 'Which of the following is a new feature in Next.js 15?',
      options: [
        'Automatic Image Optimization',
        'Middleware API',
        'Static Site Generation',
        'Incremental Static Regeneration',
      ],
      correct: 'Middleware API',
    },
    {
      question: 'How does Next.js 15 handle caching by default?',
      options: [
        'No caching',
        'Cache everything',
        'Cache based on headers',
        'Cache only API routes',
      ],
      correct: 'Cache based on headers',
    },
    {
      question: 'What is the purpose of the `use client` directive in Next.js 15?',
      options: [
        'To mark a component as client-side only',
        'To enable server-side rendering',
        'To optimize static generation',
        'To define API routes',
      ],
      correct: 'To mark a component as client-side only',
    },
    {
      question: 'Which of the following is true about Next.js 15 middleware?',
      options: [
        'It runs on the client-side only',
        'It can modify request and response headers',
        'It is used for static site generation',
        'It replaces API routes',
      ],
      correct: 'It can modify request and response headers',
    },
    {
      question: 'What is the purpose of `generateStaticParams` in Next.js 15?',
      options: [
        'To generate static pages at build time',
        'To define dynamic API routes',
        'To optimize client-side rendering',
        'To handle server-side errors',
      ],
      correct: 'To generate static pages at build time',
    },
    {
      question: 'How does Next.js 15 handle dynamic routes with `fallback: true`?',
      options: [
        'It generates all pages at build time',
        'It generates pages on-demand',
        'It returns a 404 for unknown routes',
        'It disables dynamic routing',
      ],
      correct: 'It generates pages on-demand',
    },
    {
      question: 'What is the purpose of `next/font` in Next.js 15?',
      options: [
        'To optimize image loading',
        'To enable custom fonts with automatic optimization',
        'To handle API requests',
        'To generate static pages',
      ],
      correct: 'To enable custom fonts with automatic optimization',
    },
    {
      question: 'Which of the following is true about Next.js 15 API routes?',
      options: [
        'They can only be used for GET requests',
        'They run on the client-side',
        'They can be used to create backend logic',
        'They are deprecated in Next.js 15',
      ],
      correct: 'They can be used to create backend logic',
    },
    {
      question: 'What is the purpose of `next/image` in Next.js 15?',
      options: [
        'To optimize image loading and performance',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To optimize image loading and performance',
    },
    {
      question: 'What is the purpose of `next/script` in Next.js 15?',
      options: [
        'To optimize third-party scripts',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To optimize third-party scripts',
    },
    {
      question: 'Which of the following is true about Incremental Static Regeneration (ISR) in Next.js 15?',
      options: [
        'It regenerates static pages on every request',
        'It regenerates static pages at build time only',
        'It regenerates static pages on-demand after build',
        'It is deprecated in Next.js 15',
      ],
      correct: 'It regenerates static pages on-demand after build',
    },
    {
      question: 'What is the purpose of `next/head` in Next.js 15?',
      options: [
        'To optimize image loading',
        'To manage the document head (e.g., title, meta tags)',
        'To handle API requests',
        'To generate static pages',
      ],
      correct: 'To manage the document head (e.g., title, meta tags)',
    },
    {
      question: 'Which of the following is true about Next.js 15 and TypeScript?',
      options: [
        'TypeScript is not supported in Next.js 15',
        'TypeScript is supported out of the box',
        'TypeScript requires additional configuration',
        'TypeScript is deprecated in Next.js 15',
      ],
      correct: 'TypeScript is supported out of the box',
    },
    {
      question: 'What is the purpose of `next/dynamic` in Next.js 15?',
      options: [
        'To enable dynamic imports',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To enable dynamic imports',
    },
    {
      question: 'Which of the following is true about Next.js 15 and CSS Modules?',
      options: [
        'CSS Modules are not supported',
        'CSS Modules are supported out of the box',
        'CSS Modules require additional configuration',
        'CSS Modules are deprecated in Next.js 15',
      ],
      correct: 'CSS Modules are supported out of the box',
    },
    {
      question: 'What is the purpose of `next/link` in Next.js 15?',
      options: [
        'To handle API requests',
        'To enable client-side navigation',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To enable client-side navigation',
    },
    {
      question: 'Which of the following is true about Next.js 15 and error handling?',
      options: [
        'Errors are not handled by default',
        'Errors are handled using `getStaticProps`',
        'Errors are handled using `getServerSideProps`',
        'Errors are handled using `ErrorBoundary`',
      ],
      correct: 'Errors are handled using `ErrorBoundary`',
    },
    {
      question: 'What is the purpose of `next/config` in Next.js 15?',
      options: [
        'To manage runtime configuration',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To manage runtime configuration',
    },
    {
      question: 'Which of the following is true about Next.js 15 and internationalization (i18n)?',
      options: [
        'i18n is not supported',
        'i18n is supported out of the box',
        'i18n requires additional configuration',
        'i18n is deprecated in Next.js 15',
      ],
      correct: 'i18n is supported out of the box',
    },
    // Add 30 more advanced questions here...
  ];

  useEffect(() => {
    if (quizStarted) {
      // Shuffle questions locally
      const shuffled = [...questions].sort(() => Math.random() - 0.5);
      setShuffledQuestions(shuffled);
    }
  }, [quizStarted]);

  const handleSubmitDetails = () => {
    if (userName && rollNumber && contactNumber) {
      setQuizStarted(true);
    }
  };

  const handleAnswerClick = (answer: string) => {
    const correctAnswer = shuffledQuestions[currentQuestionIndex].correct;
    setUserAnswers((prevAnswers) => [...prevAnswers, answer]);
    if (answer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const percentage = quizCompleted ? ((score / shuffledQuestions.length) * 100).toFixed(2) : null;

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
      ) : loading ? (
        <div className="text-xl text-gray-800">Loading questions...</div>
      ) : error ? (
        <div className="text-xl text-red-600">{error}</div>
      ) : quizCompleted ? (
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Quiz Completed!</h2>
          <p className="text-xl text-gray-800 mb-4">Your Score: {score} / {shuffledQuestions.length}</p>
          <p className="text-xl text-gray-800 mb-4">Percentage: {percentage}%</p>
          <div className="space-y-4">
            {shuffledQuestions.map((question, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <p className="text-lg font-semibold text-gray-800">{question.question}</p>
                <p className={`text-lg ${userAnswers[index] === question.correct ? 'text-green-600' : 'text-red-600'}`}>
                  Your Answer: {userAnswers[index]}
                </p>
                <p className="text-lg text-gray-600">Correct Answer: {question.correct}</p>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-600 mt-6">Thank you for taking the quiz!</p>
        </div>
      ) : (
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-xl border border-gray-200">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Question {currentQuestionIndex + 1}</h2>
          <p className="text-xl text-gray-700 mb-6">{shuffledQuestions[currentQuestionIndex]?.question}</p>
          <div className="space-y-4">
            {shuffledQuestions[currentQuestionIndex]?.options.map((option, idx) => (
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