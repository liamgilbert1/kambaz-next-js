"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Form, Button, Card, Badge } from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import * as client from "../../../client";

export default function QuestionsEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();

  const [questions, setQuestions] = useState<any[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [isNewQuestion, setIsNewQuestion] = useState(false);

  const loadQuestions = async () => {
    const data = await client.findQuestionsForQuiz(cid as string, qid as string);
    setQuestions(data);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  const startNewQuestion = () => {
    setEditingQuestion({
      type: "multiple-choice",
      title: "",
      points: 0,
      question: "",
      choices: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      correctAnswer: null,
      possibleAnswers: [""],
      caseSensitive: false,
    });
    setIsNewQuestion(true);
  };

  const startEditQuestion = (question: any) => {
    setEditingQuestion({ ...question });
    setIsNewQuestion(false);
  };

  const cancelEdit = () => {
    setEditingQuestion(null);
    setIsNewQuestion(false);
  };

  const saveQuestion = async () => {
    if (isNewQuestion) {
      await client.createQuestionForQuiz(cid as string, qid as string, editingQuestion);
    } else {
      await client.updateQuestion(cid as string, qid as string, editingQuestion);
    }
    await loadQuestions();
    setEditingQuestion(null);
    setIsNewQuestion(false);
  };

  const deleteQuestion = async (questionId: string) => {
    if (confirm("Are you sure you want to delete this question?")) {
      await client.deleteQuestion(cid as string, qid as string, questionId);
      await loadQuestions();
    }
  };

  const updateEditingField = (field: string, value: any) => {
    setEditingQuestion((q: any) => ({ ...q, [field]: value }));
  };

  const addChoice = () => {
    setEditingQuestion((q: any) => ({
      ...q,
      choices: [...q.choices, { text: "", isCorrect: false }],
    }));
  };

  const removeChoice = (index: number) => {
    setEditingQuestion((q: any) => ({
      ...q,
      choices: q.choices.filter((_: any, i: number) => i !== index),
    }));
  };

  const updateChoice = (index: number, field: string, value: any) => {
    setEditingQuestion((q: any) => ({
      ...q,
      choices: q.choices.map((c: any, i: number) =>
        i === index ? { ...c, [field]: value } : c
      ),
    }));
  };

  const setCorrectChoice = (index: number) => {
    setEditingQuestion((q: any) => ({
      ...q,
      choices: q.choices.map((c: any, i: number) => ({
        ...c,
        isCorrect: i === index,
      })),
    }));
  };

  const addPossibleAnswer = () => {
    setEditingQuestion((q: any) => ({
      ...q,
      possibleAnswers: [...q.possibleAnswers, ""],
    }));
  };

  const removePossibleAnswer = (index: number) => {
    setEditingQuestion((q: any) => ({
      ...q,
      possibleAnswers: q.possibleAnswers.filter((_: any, i: number) => i !== index),
    }));
  };

  const updatePossibleAnswer = (index: number, value: string) => {
    setEditingQuestion((q: any) => ({
      ...q,
      possibleAnswers: q.possibleAnswers.map((a: string, i: number) =>
        i === index ? value : a
      ),
    }));
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Questions</h3>
        <div className="d-flex align-items-center gap-3">
          <Badge bg="secondary">Total Points: {totalPoints}</Badge>
          <Button variant="danger" size="sm" onClick={startNewQuestion}>
            <FaPlus className="me-1" /> New Question
          </Button>
        </div>
      </div>

      {questions.length === 0 && !editingQuestion && (
        <p className="text-muted">No questions yet. Click "New Question" to add one.</p>
      )}

      <div className="mb-3">
        {questions.map((question, index) => (
          <Card key={question._id} className="mb-2">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5>
                    Question {index + 1}{" "}
                    <Badge bg="info" className="ms-2">
                      {question.type}
                    </Badge>
                  </h5>
                  <p className="mb-1">
                    <strong>{question.title || "Untitled"}</strong>
                  </p>
                  <div
                    dangerouslySetInnerHTML={{ __html: question.question || "" }}
                    className="mb-2"
                  />
                  <small className="text-muted">{question.points} pts</small>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => startEditQuestion(question)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteQuestion(question._id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {editingQuestion && (
        <Card className="mb-3">
          <Card.Body>
            <h4>{isNewQuestion ? "New Question" : "Edit Question"}</h4>

            <Form.Group className="mb-3">
              <Form.Label>Question Type</Form.Label>
              <Form.Select
                value={editingQuestion.type}
                onChange={(e) => updateEditingField("type", e.target.value)}
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="fill-in-blank">Fill in the Blank</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editingQuestion.title}
                onChange={(e) => updateEditingField("title", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                value={editingQuestion.points}
                onChange={(e) => updateEditingField("points", Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editingQuestion.question}
                onChange={(e) => updateEditingField("question", e.target.value)}
              />
            </Form.Group>

            {editingQuestion.type === "multiple-choice" && (
              <div className="mb-3">
                <Form.Label>Choices</Form.Label>
                {editingQuestion.choices.map((choice: any, index: number) => (
                  <div key={index} className="d-flex gap-2 mb-2">
                    <Form.Check
                      type="radio"
                      name="correctChoice"
                      checked={choice.isCorrect}
                      onChange={() => setCorrectChoice(index)}
                    />
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={choice.text}
                      onChange={(e) => updateChoice(index, "text", e.target.value)}
                      placeholder={`Choice ${index + 1}`}
                    />
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeChoice(index)}
                      disabled={editingQuestion.choices.length <= 2}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                ))}
                <Button variant="outline-secondary" size="sm" onClick={addChoice}>
                  <FaPlus className="me-1" /> Add Choice
                </Button>
              </div>
            )}

            {editingQuestion.type === "true-false" && (
              <Form.Group className="mb-3">
                <Form.Label>Correct Answer</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="True"
                    name="correctAnswer"
                    checked={editingQuestion.correctAnswer === true}
                    onChange={() => updateEditingField("correctAnswer", true)}
                  />
                  <Form.Check
                    type="radio"
                    label="False"
                    name="correctAnswer"
                    checked={editingQuestion.correctAnswer === false}
                    onChange={() => updateEditingField("correctAnswer", false)}
                  />
                </div>
              </Form.Group>
            )}

            {editingQuestion.type === "fill-in-blank" && (
              <div className="mb-3">
                <Form.Label>Possible Correct Answers</Form.Label>
                {editingQuestion.possibleAnswers.map((answer: string, index: number) => (
                  <div key={index} className="d-flex gap-2 mb-2">
                    <Form.Control
                      type="text"
                      value={answer}
                      onChange={(e) => updatePossibleAnswer(index, e.target.value)}
                      placeholder={`Answer ${index + 1}`}
                    />
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removePossibleAnswer(index)}
                      disabled={editingQuestion.possibleAnswers.length <= 1}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                ))}
                <Button variant="outline-secondary" size="sm" onClick={addPossibleAnswer}>
                  <FaPlus className="me-1" /> Add Answer
                </Button>

                <Form.Group className="mt-3">
                  <Form.Check
                    label="Case Sensitive"
                    checked={editingQuestion.caseSensitive}
                    onChange={(e) => updateEditingField("caseSensitive", e.target.checked)}
                  />
                </Form.Group>
              </div>
            )}

            <div className="d-flex gap-2 mt-4">
              <Button variant="secondary" onClick={cancelEdit}>
                Cancel
              </Button>
              <Button variant="danger" onClick={saveQuestion}>
                {isNewQuestion ? "Save Question" : "Update Question"}
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
