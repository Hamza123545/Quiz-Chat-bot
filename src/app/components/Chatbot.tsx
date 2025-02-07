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
    {
      question: 'What is the purpose of `getStaticProps` in Next.js 15?',
      options: [
        'To fetch data at build time',
        'To fetch data on the client-side',
        'To handle API requests',
        'To manage runtime configuration',
      ],
      correct: 'To fetch data at build time',
    },
    {
      question: 'What is the purpose of `getServerSideProps` in Next.js 15?',
      options: [
        'To fetch data at build time',
        'To fetch data on each request',
        'To handle API requests',
        'To manage runtime configuration',
      ],
      correct: 'To fetch data on each request',
    },
    {
      question: 'How can you optimize performance in Next.js 15 using `next/image`?',
      options: [
        'By lazy loading images',
        'By using external image URLs',
        'By disabling image optimization',
        'By using inline images',
      ],
      correct: 'By lazy loading images',
    },
    {
      question: 'What is the purpose of `next/error` in Next.js 15?',
      options: [
        'To handle API errors',
        'To display custom error pages',
        'To manage runtime configuration',
        'To optimize static generation',
      ],
      correct: 'To display custom error pages',
    },
    {
      question: 'Which of the following is true about Next.js 15 and WebAssembly (Wasm)?',
      options: [
        'Wasm is not supported',
        'Wasm is supported out of the box',
        'Wasm requires additional configuration',
        'Wasm is deprecated in Next.js 15',
      ],
      correct: 'Wasm is supported out of the box',
    },
    {
      question: 'What is the purpose of `next/amp` in Next.js 15?',
      options: [
        'To enable AMP (Accelerated Mobile Pages)',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To enable AMP (Accelerated Mobile Pages)',
    },
    {
      question: 'Which of the following is true about Next.js 15 and GraphQL?',
      options: [
        'GraphQL is not supported',
        'GraphQL is supported out of the box',
        'GraphQL requires additional configuration',
        'GraphQL is deprecated in Next.js 15',
      ],
      correct: 'GraphQL requires additional configuration',
    },
    {
      question: 'What is the purpose of `next/analytics` in Next.js 15?',
      options: [
        'To track user interactions',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To track user interactions',
    },
    {
      question: 'Which of the following is true about Next.js 15 and WebSockets?',
      options: [
        'WebSockets are not supported',
        'WebSockets are supported out of the box',
        'WebSockets require additional configuration',
        'WebSockets are deprecated in Next.js 15',
      ],
      correct: 'WebSockets require additional configuration',
    },
    {
      question: 'What is the purpose of `next/plugins` in Next.js 15?',
      options: [
        'To extend Next.js functionality',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To extend Next.js functionality',
    },
    {
      question: 'Which of the following is true about Next.js 15 and Serverless Functions?',
      options: [
        'Serverless Functions are not supported',
        'Serverless Functions are supported out of the box',
        'Serverless Functions require additional configuration',
        'Serverless Functions are deprecated in Next.js 15',
      ],
      correct: 'Serverless Functions are supported out of the box',
    },
    {
      question: 'What is the purpose of `next/compat` in Next.js 15?',
      options: [
        'To ensure backward compatibility',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To ensure backward compatibility',
    },
    {
      question: 'Which of the following is true about Next.js 15 and CSS-in-JS?',
      options: [
        'CSS-in-JS is not supported',
        'CSS-in-JS is supported out of the box',
        'CSS-in-JS requires additional configuration',
        'CSS-in-JS is deprecated in Next.js 15',
      ],
      correct: 'CSS-in-JS is supported out of the box',
    },
    {
      question: 'What is the purpose of `next/experimental` in Next.js 15?',
      options: [
        'To enable experimental features',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To enable experimental features',
    },
    {
      question: 'Which of the following is true about Next.js 15 and Edge Functions?',
      options: [
        'Edge Functions are not supported',
        'Edge Functions are supported out of the box',
        'Edge Functions require additional configuration',
        'Edge Functions are deprecated in Next.js 15',
      ],
      correct: 'Edge Functions are supported out of the box',
    },
    {
      question: 'What is the purpose of `next/constants` in Next.js 15?',
      options: [
        'To define global constants',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To define global constants',
    },
    {
      question: 'Which of the following is true about Next.js 15 and Progressive Web Apps (PWA)?',
      options: [
        'PWA is not supported',
        'PWA is supported out of the box',
        'PWA requires additional configuration',
        'PWA is deprecated in Next.js 15',
      ],
      correct: 'PWA requires additional configuration',
    },
    {
      question: 'What is the purpose of `next/middleware` in Next.js 15?',
      options: [
        'To handle middleware logic',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To handle middleware logic',
    },
    {
      question: 'Which of the following is true about Next.js 15 and Web Workers?',
      options: [
        'Web Workers are not supported',
        'Web Workers are supported out of the box',
        'Web Workers require additional configuration',
        'Web Workers are deprecated in Next.js 15',
      ],
      correct: 'Web Workers require additional configuration',
    },
    {
      question: 'What is the purpose of `next/optimizations` in Next.js 15?',
      options: [
        'To enable performance optimizations',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To enable performance optimizations',
    },
    {
      question: 'Which of the following is true about Next.js 15 and Web Components?',
      options: [
        'Web Components are not supported',
        'Web Components are supported out of the box',
        'Web Components require additional configuration',
        'Web Components are deprecated in Next.js 15',
      ],
      correct: 'Web Components require additional configuration',
    },
    {
      question: 'What is the purpose of `next/polyfills` in Next.js 15?',
      options: [
        'To provide polyfills for older browsers',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To provide polyfills for older browsers',
    },
    {
      question: 'Which of the following is true about Next.js 15 and Web Vitals?',
      options: [
        'Web Vitals are not supported',
        'Web Vitals are supported out of the box',
        'Web Vitals require additional configuration',
        'Web Vitals are deprecated in Next.js 15',
      ],
      correct: 'Web Vitals are supported out of the box',
    },
    {
      question: 'What is the purpose of `next/security` in Next.js 15?',
      options: [
        'To enhance security features',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To enhance security features',
    },
    {
      question: 'Which of the following is true about Next.js 15 and WebAssembly (Wasm)?',
      options: [
        'Wasm is not supported',
        'Wasm is supported out of the box',
        'Wasm requires additional configuration',
        'Wasm is deprecated in Next.js 15',
      ],
      correct: 'Wasm is supported out of the box',
    },
    {
      question: 'What is the purpose of `next/testing` in Next.js 15?',
      options: [
        'To enable testing utilities',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To enable testing utilities',
    },
    {
      question: 'Which of the following is true about Next.js 15 and WebSockets?',
      options: [
        'WebSockets are not supported',
        'WebSockets are supported out of the box',
        'WebSockets require additional configuration',
        'WebSockets are deprecated in Next.js 15',
      ],
      correct: 'WebSockets require additional configuration',
    },
    {
      question: 'What is the purpose of `next/utilities` in Next.js 15?',
      options: [
        'To provide utility functions',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To provide utility functions',
    },
    {
      question: 'Which of the following is true about Next.js 15 and Web Workers?',
      options: [
        'Web Workers are not supported',
        'Web Workers are supported out of the box',
        'Web Workers require additional configuration',
        'Web Workers are deprecated in Next.js 15',
      ],
      correct: 'Web Workers require additional configuration',
    },
    {
      question: 'What is the purpose of `next/optimizations` in Next.js 15?',
      options: [
        'To enable performance optimizations',
        'To handle API requests',
        'To generate static pages',
        'To enable server-side rendering',
      ],
      correct: 'To enable performance optimizations',
    },
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      {!quizStarted ? (
        <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Enter Your Details</h2>
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your Roll Number"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your Contact Number"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <button
              onClick={handleSubmitDetails}
              className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-300 transform hover:scale-105 active:scale-95"
            >
              Start Quiz
            </button>
          </div>
        </div>
      ) : loading ? (
        <div className="text-xl text-gray-800">Loading questions...</div>
      ) : error ? (
        <div className="text-xl text-red-600">{error}</div>
      ) : quizCompleted ? (
        <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Quiz Completed!</h2>
          <div className="text-center space-y-4">
            <p className="text-xl text-gray-800">
              Your Score: <span className="font-bold">{score}</span> / {shuffledQuestions.length}
            </p>
            <p className="text-xl text-gray-800">
              Percentage: <span className="font-bold">{percentage}%</span>
            </p>
          </div>
          <div className="mt-8 space-y-6">
            {shuffledQuestions.map((question, index) => (
              <div
                key={index}
                className="p-6 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200"
              >
                <p className="text-lg font-semibold text-gray-800 mb-4">{question.question}</p>
                <p
                  className={`text-lg ${
                    userAnswers[index] === question.correct ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  Your Answer: {userAnswers[index]}
                </p>
                <p className="text-lg text-gray-600">Correct Answer: {question.correct}</p>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-600 mt-8 text-center">Thank you for taking the quiz!</p>
        </div>
      ) : (
        <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Question {currentQuestionIndex + 1}
          </h2>
          <p className="text-xl text-gray-700 mb-8">{shuffledQuestions[currentQuestionIndex]?.question}</p>
          <div className="space-y-4">
            {shuffledQuestions[currentQuestionIndex]?.options.map((option, idx) => (
              <button
                key={idx}
                className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-300 transform hover:scale-105 active:scale-95"
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