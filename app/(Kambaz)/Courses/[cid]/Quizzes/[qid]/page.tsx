"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Row, Col, Card, Badge } from "react-bootstrap";
import * as client from "../client";

export default function QuizDetails() {
  const router = useRouter();
  const { cid, qid } = useParams<{ cid: string; qid: string }>();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadQuiz = async () => {
    setLoading(true);
    const quizzes = await client.findQuizzesForCourse(cid as string);

    const found = quizzes.find((q: any) => q._id === qid);
    if (found && !found.published && !isFaculty) {
      router.push(`/Courses/${cid}/Quizzes`);
      return;
    }

    setQuiz(found);
    setLoading(false);
  };

  useEffect(() => {
    loadQuiz();
  }, [cid, qid]);

  const togglePublish = async () => {
    if (!isFaculty) return;
    const updated = await client.updateQuiz({
      ...quiz,
      published: !quiz.published,
    });
    setQuiz(updated);
  };

  const goToEditor = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/Editor`);
  };

  const goToPreview = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`);
  };

  if (loading) return <p>Loading quiz...</p>;
  if (!quiz) return <p>Quiz not found.</p>;

  const format = (value: any) => {
    if (!value) return "None";
    return new Date(value).toLocaleString();
  };

  return (
    <div className="p-3">
      <Row className="align-items-center mb-3">
        <Col>
          <h2>{quiz.title}</h2>
        </Col>

        <Col className="text-end">
          {isFaculty && (
            <>
              <Button
                variant={quiz.published ? "outline-secondary" : "success"}
                className="me-2"
                onClick={togglePublish}
              >
                {quiz.published ? "Unpublish" : "Publish"}
              </Button>

              <Button
                variant="outline-primary"
                className="me-2"
                onClick={goToPreview}
              >
                Preview
              </Button>

              <Button variant="danger" onClick={goToEditor}>
                Edit
              </Button>
            </>
          )}
          {!isFaculty && (
            <Button variant="primary" onClick={goToPreview}>
              Take Quiz
            </Button>
          )}
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <h5>Quiz Information</h5>
          <p className="text-muted">{quiz.description || "No description"}</p>

          <div className="mb-2">
            <strong>Status:</strong>{" "}
            {quiz.published ? (
              <Badge bg="success">Published</Badge>
            ) : (
              <Badge bg="secondary">Unpublished</Badge>
            )}
          </div>

          <div>
            <strong>Points:</strong> {quiz.points}
          </div>
          <div>
            <strong>Due:</strong> {format(quiz.dueDate)}
          </div>
          <div>
            <strong>Available From:</strong> {format(quiz.availableDate)}
          </div>
          <div>
            <strong>Until:</strong> {format(quiz.untilDate)}
          </div>
          <div>
            <strong>Time Limit:</strong> {quiz.timeLimit || "None"}
          </div>
          <div>
            <strong>Shuffle Answers:</strong>{" "}
            {quiz.shuffleAnswers ? "Yes" : "No"}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
