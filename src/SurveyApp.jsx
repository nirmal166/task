import React, { useState, useEffect } from 'react';

const SurveyApp = () => {
const [currentQuestion, setCurrentQuestion] = useState(0);
const [isSurveyCompleted, setSurveyCompleted] = useState(false);
const [showThankYou, setShowThankYou] = useState(false);
const [surveyResponses, setSurveyResponses] = useState([]);

  const questions = [
{ text: 'How satisfied are you with our products?', type: 'rating' },
{ text: 'How fair are the prices compared to similar retailers?', type: 'rating' },
{ text: 'How satisfied are you with the value for money of your purchase?', type: 'rating' },
{ text: 'On a scale of 1-10, how would you recommend us to your friends and family?', type: 'rating' },
{ text: 'What could we do to improve our service?', type:'text' },
  ];
  useEffect(() => {
const storedResponses = JSON.parse(localStorage.getItem('surveyResponses')) || [];
setSurveyResponses(storedResponses);
  }, []);

  useEffect(() => {
localStorage.setItem('surveyResponses', JSON.stringify(surveyResponses));
  }, [surveyResponses]);

  useEffect(() => {
    if (isSurveyCompleted) {
      setTimeout(() => {
        setSurveyCompleted(false);
        setShowThankYou(false);
        setCurrentQuestion(0);
      }, 5000); // Redirect to the welcome screen after 5 seconds
    }
  }, [isSurveyCompleted]);

  const handleStartSurvey = () => {
    setShowThankYou(false);
    setSurveyCompleted(false);
    setCurrentQuestion(0);
  };
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
const isConfirmed = window.confirm('Do you want to submit the survey?');
      if (isConfirmed) {
setSurveyCompleted(true);
        setShowThankYou(true);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSkipQuestion = () => {
    handleNextQuestion();
  };

  const handleSurveyResponse = (response) => {
    const updatedResponses = [...surveyResponses];
updatedResponses[currentQuestion] = { question: questions[currentQuestion].text, response };
    setSurveyResponses(updatedResponses);
  };
  return (
<div>
 {!showThankYou ? (
     <>
<h1>Welcome to our Survey!</h1>
<button onClick={handleStartSurvey}>Start Survey</button>
{currentQuestion < questions.length && (
    <div>
 <p>{`${currentQuestion + 1}/${questions.length}`}</p>
    <p>{questions[currentQuestion].text}</p>
    {questions[currentQuestion].type === 'rating' && (
        <input
        type="number"
    onChange={(e) => handleSurveyResponse(e.target.value)}
        />
              )}
    {questions[currentQuestion].type === 'text' && (
                <textarea
     onChange={(e) => handleSurveyResponse(e.target.value)}
        />
    )}
<button onClick={handleNextQuestion}>Next</button>
<button onClick={handlePreviousQuestion}>Previous</button>
<button onClick={handleSkipQuestion}>Skip</button>
            </div>
          )}
        </>
      ) : (
        <div>
          <h1>Thank you for your time!</h1>
        </div>
      )}
    </div>
  );
};

export default SurveyApp;