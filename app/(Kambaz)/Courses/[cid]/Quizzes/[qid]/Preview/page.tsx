"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Form, Button, Card, Badge, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import * as client from "../../client";

export default function QuizPreview() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const loadQuizData = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    const currentQuiz = quizzes.find((q: any) => q._id === qid);
    setQuiz(currentQuiz);

    const questionsData = await client.findQuestionsForQuiz(cid as string, qid as string);
    setQuestions(questionsData);

    if (!isFaculty && currentUser) {
      const attempts = await client.findAttemptsForStudent(cid as string, qid as string);
      setAttemptCount(attempts.length);

      const latest = await client.getLatestAttempt(cid as string, qid as string);
      if (latest) {
        setLatestAttempt(latest);
        setSubmitted(true);

        const answerMap: any = {};
        latest.answers.forEach((ans: any) => {
          answerMap[ans.questionId] = ans.answer;
        });
        setAnswers(answerMap);

        const gradedResults: any = {};
        latest.answers.forEach((ans: any) => {
          gradedResults[ans.questionId] = {
            isCorrect: ans.isCorrect,
            pointsEarned: ans.pointsEarned,
            studentAnswer: ans.answer,
          };
        });
        setResults({
          totalScore: latest.score,
          maxScore: latest.maxScore,
          percentage: latest.maxScore > 0 ? Math.round((latest.score / latest.maxScore) * 100) : 0,
          gradedResults,
        });
      }
    }
  };

  useEffect(() => {
    loadQuizData();
  }, []);

  const updateAnswer = (questionId: string, answer: any) => {
    setAnswers((prev: any) => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;
    const gradedResults: any = {};

    questions.forEach((question) => {
      maxScore += question.points;
      const studentAnswer = answers[question._id];

      let isCorrect = false;
      let pointsEarned = 0;

      if (studentAnswer !== undefined && studentAnswer !== null && studentAnswer !== "") {
        if (question.type === "multiple-choice") {
          const selectedChoice = question.choices.find((c: any) => c.text === studentAnswer);
          if (selectedChoice && selectedChoice.isCorrect) {
            isCorrect = true;
            pointsEarned = question.points;
          }
        } else if (question.type === "true-false") {
          if (studentAnswer === question.correctAnswer) {
            isCorrect = true;
            pointsEarned = question.points;
          }
        } else if (question.type === "fill-in-blank") {
          const studentAnswerStr = String(studentAnswer || "");
          const matches = question.possibleAnswers.some((possible: string) => {
            if (question.caseSensitive) {
              return studentAnswerStr === possible;
            } else {
              return studentAnswerStr.toLowerCase() === possible.toLowerCase();
            }
          });
          if (matches) {
            isCorrect = true;
            pointsEarned = question.points;
          }
        }
      }

      totalScore += pointsEarned;
      gradedResults[question._id] = {
        isCorrect,
        pointsEarned,
        studentAnswer,
      };
    });

    return {
      totalScore,
      maxScore,
      percentage: maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0,
      gradedResults,
    };
  };

  const handleSubmit = async () => {
    if (isFaculty) {
      const calculatedResults = calculateScore();
      setResults(calculatedResults);
      setSubmitted(true);
    } else {
      if (!quiz.multipleAttempts && attemptCount >= 1) {
        alert("You have already taken this quiz and multiple attempts are not allowed.");
        return;
      }

      if (quiz.multipleAttempts && attemptCount >= quiz.maxAttempts) {
        alert(`You have reached the maximum number of attempts (${quiz.maxAttempts}).`);
        return;
      }

      const answersArray = Object.keys(answers).map((questionId) => ({
        questionId,
        answer: answers[questionId],
      }));

      const attempt = await client.submitQuizAttempt(cid as string, qid as string, answersArray);

      const gradedResults: any = {};
      attempt.answers.forEach((ans: any) => {
        gradedResults[ans.questionId] = {
          isCorrect: ans.isCorrect,
          pointsEarned: ans.pointsEarned,
          studentAnswer: ans.answer,
        };
      });

      setResults({
        totalScore: attempt.score,
        maxScore: attempt.maxScore,
        percentage: attempt.maxScore > 0 ? Math.round((attempt.score / attempt.maxScore) * 100) : 0,
        gradedResults,
      });
      setSubmitted(true);
      setAttemptCount(attemptCount + 1);
    }
  };

  const handleEditQuiz = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/Editor`);
  };

  if (!quiz || questions.length === 0) {
    return <p>Loading...</p>;
  }

  const canRetake = !isFaculty && quiz.multipleAttempts && attemptCount < quiz.maxAttempts;
  const canTakeFirstTime = !isFaculty && attemptCount === 0;

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3>{quiz.title}{isFaculty ? " - Preview" : ""}</h3>
          {isFaculty && <p className="text-muted">Preview mode for faculty</p>}
          {!isFaculty && attemptCount > 0 && (
            <p className="text-muted">
              Attempts: {attemptCount} / {quiz.multipleAttempts ? quiz.maxAttempts : 1}
            </p>
          )}
        </div>
        {isFaculty && (
          <Button variant="outline-primary" onClick={handleEditQuiz}>
            Edit Quiz
          </Button>
        )}
      </div>

      {submitted && results && (
        <Alert variant="success" className="mb-3">
          <h4>Quiz Complete!</h4>
          <p className="mb-1">
            Score: {results.totalScore} / {results.maxScore} points ({results.percentage}%)
          </p>
          {!isFaculty && canRetake && (
            <Button
              variant="primary"
              size="sm"
              className="mt-2"
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
                setResults(null);
              }}
            >
              Retake Quiz
            </Button>
          )}
        </Alert>
      )}

      {questions.map((question, index) => (
        <Card key={question._id} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5>
                Question {index + 1}{" "}
              </h5>
              <Badge bg="secondary">{question.points} pts</Badge>
            </div>

            {question.title && <p className="mb-2"><strong>{question.title}</strong></p>}

            <div
              dangerouslySetInnerHTML={{ __html: question.question || "" }}
              className="mb-3"
            />

            {submitted && results && (
              <div className="mb-2">
                {results.gradedResults[question._id].isCorrect ? (
                  <Badge bg="success">
                    <FaCheckCircle className="me-1" /> Correct (+{question.points} pts)
                  </Badge>
                ) : (
                  <Badge bg="danger">
                    <FaTimesCircle className="me-1" /> Incorrect (0 pts)
                  </Badge>
                )}
              </div>
            )}

            {question.type === "multiple-choice" && (
              <div>
                {question.choices.map((choice: any, choiceIndex: number) => (
                  <div
                    key={choiceIndex}
                    className={`mb-2 p-2 rounded ${
                      submitted && results
                        ? choice.isCorrect
                          ? "bg-success bg-opacity-10 border border-success"
                          : results.gradedResults[question._id].studentAnswer === choice.text
                          ? "bg-danger bg-opacity-10 border border-danger"
                          : ""
                        : ""
                    }`}
                  >
                    <Form.Check
                      type="radio"
                      label={choice.text}
                      name={`question-${question._id}`}
                      value={choice.text}
                      checked={answers[question._id] === choice.text}
                      onChange={(e) => updateAnswer(question._id, e.target.value)}
                      disabled={submitted}
                    />
                  </div>
                ))}
              </div>
            )}

            {question.type === "true-false" && (
              <div>
                <div
                  className={`mb-2 p-2 rounded ${
                    submitted && results
                      ? question.correctAnswer === true
                        ? "bg-success bg-opacity-10 border border-success"
                        : results.gradedResults[question._id].studentAnswer === true
                        ? "bg-danger bg-opacity-10 border border-danger"
                        : ""
                      : ""
                  }`}
                >
                  <Form.Check
                    type="radio"
                    label="True"
                    name={`question-${question._id}`}
                    checked={answers[question._id] === true}
                    onChange={() => updateAnswer(question._id, true)}
                    disabled={submitted}
                  />
                </div>
                <div
                  className={`mb-2 p-2 rounded ${
                    submitted && results
                      ? question.correctAnswer === false
                        ? "bg-success bg-opacity-10 border border-success"
                        : results.gradedResults[question._id].studentAnswer === false
                        ? "bg-danger bg-opacity-10 border border-danger"
                        : ""
                      : ""
                  }`}
                >
                  <Form.Check
                    type="radio"
                    label="False"
                    name={`question-${question._id}`}
                    checked={answers[question._id] === false}
                    onChange={() => updateAnswer(question._id, false)}
                    disabled={submitted}
                  />
                </div>
              </div>
            )}

            {question.type === "fill-in-blank" && (
              <div>
                <Form.Control
                  type="text"
                  value={answers[question._id] || ""}
                  onChange={(e) => updateAnswer(question._id, e.target.value)}
                  placeholder="Enter your answer"
                  disabled={submitted}
                  className={
                    submitted && results
                      ? results.gradedResults[question._id].isCorrect
                        ? "border-success"
                        : "border-danger"
                      : ""
                  }
                />
                {submitted && results && !results.gradedResults[question._id].isCorrect && (
                  <small className="text-muted mt-1 d-block">
                    Possible correct answers: {question.possibleAnswers.join(", ")}
                  </small>
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      ))}

      {!submitted && (
        <div className="d-flex gap-2">
          <Button
            variant="secondary"
            onClick={() => router.push(`/Courses/${cid}/Quizzes${isFaculty ? `/${qid}` : ""}`)}
          >
            {isFaculty ? "Cancel" : "Back to Quizzes"}
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        </div>
      )}

      {submitted && !isFaculty && !canRetake && (
        <div className="mt-3">
          <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes`)}>
            Back to Quizzes
          </Button>
        </div>
      )}
    </div>
  );
}
