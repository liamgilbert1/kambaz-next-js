"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  InputGroup,
  FormControl,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import { BsGripVertical, BsSearch, BsCheckCircleFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import * as client from "./client";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function QuizzesPage() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const isFaculty = currentUser?.role === "FACULTY";

  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [attempts, setAttempts] = useState<any>({});

  const loadQuizzes = async () => {
    setLoading(true);
    let data = await client.findQuizzesForCourse(cid as string);

    if (!isFaculty) {
      data = data.filter((q: any) => q.published);
      const attemptsMap: any = {};
      for (const quiz of data) {
        try {
          const latestAttempt = await client.getLatestAttempt(
            cid as string,
            quiz._id
          );
          if (latestAttempt) {
            attemptsMap[quiz._id] = latestAttempt;
          }
        } catch (error) {}
      }
      setAttempts(attemptsMap);
    }

    data.sort((a: any, b: any) => {
      const da = a.availableDate ? new Date(a.availableDate).getTime() : 0;
      const db = b.availableDate ? new Date(b.availableDate).getTime() : 0;
      return da - db;
    });

    if (search.trim() !== "") {
      const s = search.toLowerCase();
      data = data.filter((q: any) => q.title.toLowerCase().includes(s));
    }

    data = await Promise.all(
      data.map(async (quiz: any) => {
        try {
          const questions = await client.findQuestionsForQuiz(
            cid as string,
            quiz._id
          );
          return { ...quiz, questionsCount: questions.length };
        } catch (err) {
          return { ...quiz, questionsCount: 0 };
        }
      })
    );

    setQuizzes(data);
    setLoading(false);
  };

  useEffect(() => {
    loadQuizzes();
  }, [cid, isFaculty, search]);

  const handleAddQuiz = async () => {
    if (!isFaculty) return;
    const created = await client.createQuizForCourse(cid as string, {
      title: "New Quiz",
      description: "",
      points: 0,
      published: false,
      availableDate: null,
      untilDate: null,
      dueDate: null,
    });
    router.push(`/Courses/${cid}/Quizzes/${created._id}`);
  };

  const handleDelete = async (quizId: string) => {
    if (!isFaculty) return;
    if (!window.confirm("Delete this quiz?")) return;
    await client.deleteQuiz(quizId);
    loadQuizzes();
  };

  const handleTogglePublish = async (quiz: any) => {
    if (!isFaculty) return;
    await client.updateQuiz({ ...quiz, published: !quiz.published });
    loadQuizzes();
  };

  const formatDate = (value: any) => {
    if (!value) return null;
    const d = new Date(value);
    return d.toLocaleString();
  };

  const getAvailabilityLabel = (quiz: any) => {
    const now = Date.now();
    const available = quiz.availableDate
      ? new Date(quiz.availableDate).getTime()
      : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate).getTime() : null;

    if (available && now < available) {
      return `Not available until ${formatDate(quiz.availableDate)}`;
    }
    if (until && now > until) {
      return "Closed";
    }
    return "Available";
  };

  return (
    <div id="wd-quizzes" className="p-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroup.Text>
            <BsSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Search for Quiz"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        {isFaculty && (
          <Button variant="danger" size="lg" onClick={handleAddQuiz}>
            <FaPlus className="me-1" /> Quiz
          </Button>
        )}
      </div>
      <ListGroup className="rounded-0">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div
            className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center"
            style={{ color: "black", fontWeight: "600" }}
          >
            <BsGripVertical className="me-3 fs-3" />
            Assignment Quizzes
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {loading && (
              <div className="p-3 text-muted">Loading quizzes...</div>
            )}

            {!loading && quizzes.length === 0 && (
              <div className="p-3 text-muted">
                No quizzes found.
                {isFaculty && " Click + Quiz to add one."}
              </div>
            )}

            {quizzes.map((quiz) => (
              <ListGroupItem
                key={quiz._id}
                className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
              >
                <div
                  className="flex-grow-1"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    router.push(`/Courses/${cid}/Quizzes/${quiz._id}`)
                  }
                >
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="fw-bold">{quiz.title}</span>
                  </div>

                  <div className="text-muted small">
                    {getAvailabilityLabel(quiz)} | Due{" "}
                    {formatDate(quiz.dueDate) ?? "None"} | {quiz.points ?? 0}{" "}
                    pts | {quiz.questionsCount ?? 0} Questions
                    {!isFaculty && attempts[quiz._id] && (
                      <span className="ms-2">
                        |{" "}
                        <strong>
                          Score: {attempts[quiz._id].score}/
                          {attempts[quiz._id].maxScore}
                        </strong>
                      </span>
                    )}
                  </div>
                </div>
                {quiz.published && (
                  <BsCheckCircleFill
                    className="text-success"
                    style={{ fontSize: "20px", marginRight: "10px" }}
                    title="Published"
                  />
                )}
                {isFaculty && (
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="link"
                      bsPrefix="p-0 m-0 border-0 bg-transparent"
                      style={{ color: "#333" }}
                    >
                      <BsThreeDotsVertical size={22} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleTogglePublish(quiz)}>
                        {quiz.published ? "Unpublish" : "Publish"}
                      </Dropdown.Item>

                      <Dropdown.Item
                        onClick={() =>
                          router.push(`/Courses/${cid}/Quizzes/${quiz._id}`)
                        }
                      >
                        Edit
                      </Dropdown.Item>

                      <Dropdown.Item onClick={() => handleDelete(quiz._id)}>
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
