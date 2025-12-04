"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as client from "../../../client";

export default function QuizDetailsEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();

  const [quiz, setQuiz] = useState<any>(null);

  const loadQuiz = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    setQuiz(quizzes.find((q: any) => q._id === qid));
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  const updateField = (field: string, value: any) => {
    setQuiz((q: any) => ({ ...q, [field]: value }));
  };

  const save = async () => {
    await client.updateQuiz(quiz);
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  const saveAndPublish = async () => {
    await client.updateQuiz({ ...quiz, published: true });
    router.push(`/Courses/${cid}/Quizzes`);
  };

  const cancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="p-3">
      <h3>Edit Quiz Details</h3>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={quiz.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={quiz.description || ""}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                value={quiz.points ?? 0}
                onChange={(e) => updateField("points", Number(e.target.value))}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Check
                label="Shuffle Answers"
                checked={quiz.shuffleAnswers}
                onChange={(e) =>
                  updateField("shuffleAnswers", e.target.checked)
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check
            label="Time Limit"
            checked={!!quiz.timeLimit}
            onChange={(e) =>
              updateField(
                "timeLimit",
                e.target.checked ? quiz.timeLimit || 20 : null
              )
            }
          />
          {quiz.timeLimit && (
            <Form.Control
              type="number"
              className="mt-2"
              value={quiz.timeLimit}
              onChange={(e) => updateField("timeLimit", Number(e.target.value))}
            />
          )}
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Available Date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={
                  quiz.availableDate
                    ? new Date(quiz.availableDate).toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) => updateField("availableDate", e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Until Date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={
                  quiz.untilDate
                    ? new Date(quiz.untilDate).toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) => updateField("untilDate", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="datetime-local"
            value={
              quiz.dueDate
                ? new Date(quiz.dueDate).toISOString().slice(0, 16)
                : ""
            }
            onChange={(e) => updateField("dueDate", e.target.value)}
          />
        </Form.Group>

        <div className="d-flex gap-2 mt-4">
          <Button variant="secondary" onClick={cancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={save}>
            Save
          </Button>
          <Button variant="success" onClick={saveAndPublish}>
            Save & Publish
          </Button>
        </div>
      </Form>
    </div>
  );
}
