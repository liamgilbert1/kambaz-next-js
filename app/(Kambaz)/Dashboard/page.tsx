"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import * as client from "../Courses/client";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();

  const [showAll, setShowAll] = useState(false);
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);

  const initialCourse = {
    _id: "0",
    name: "New Course",
    description: "New Description",
  };
  const [course, setCourse] = useState<any>(initialCourse);

  const fetchCourses = async () => {
    if (!currentUser) return;

    const allCourses = await client.fetchAllCourses();
    const myCourses = await client.findMyCourses();

    const enrolledIdsArr = myCourses.map((c: any) => c._id);
    setEnrolledIds(enrolledIdsArr);

    const visible = showAll
      ? allCourses
      : allCourses.filter((c: any) => enrolledIdsArr.includes(c._id));

    dispatch(setCourses(visible));
  };

  const onEnroll = async (courseId: string) => {
    await client.enrollIntoCourse(currentUser._id, courseId);
    fetchCourses();
  };

  const onUnenroll = async (courseId: string) => {
    await client.unenrollFromCourse(currentUser._id, courseId);
    fetchCourses();
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse({
      ...course,
      number: "",
      startDate: "",
      endDate: "",
      image: "",
    });

    dispatch(setCourses([...courses, newCourse]));
    setCourse(initialCourse);
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    if (!course._id || course._id === "0") {
      alert("Select a course to edit first.");
      return;
    }

    const updated = await client.updateCourse({
      ...course,
      number: undefined,
      startDate: undefined,
      endDate: undefined,
      image: undefined,
    });

    dispatch(
      setCourses(courses.map((c: any) => (c._id === course._id ? updated : c)))
    );

    setCourse(initialCourse);
  };

  const toggleShowAll = () => setShowAll(!showAll);

  useEffect(() => {
    fetchCourses();
  }, [currentUser, showAll]);

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button variant="primary" onClick={toggleShowAll}>
          {showAll ? "Show Enrolled" : "Show All"}
        </Button>
      </div>
      <hr />
      <h5>
        New Course
        <button className="btn btn-primary float-end" onClick={onAddNewCourse}>
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={onUpdateCourse}
        >
          Update
        </button>
      </h5>
      <br />
      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
        placeholder="New Course"
      />
      <FormControl
        as="textarea"
        rows={4}
        className="mb-2"
        value={course.description}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
        placeholder="New Description"
      />
      <hr />
      <h2>
        {showAll ? "All Courses" : "Enrolled Courses"} ({courses.length})
      </h2>
      <hr />

      <Row xs={1} md={5} className="g-4">
        {courses.map((c: any) => {
          const isEnrolled = enrolledIds.includes(c._id);
          return (
            <Col key={c._id} style={{ width: "300px" }}>
              <Card>
                <CardImg src={c.image || "/images/reactjs.jpg"} height={160} />
                <CardBody>
                  <CardTitle>{c.name}</CardTitle>
                  <CardText
                    className="mb-3"
                    style={{ maxHeight: "100px", overflowY: "auto" }}
                  >
                    {c.description}
                  </CardText>

                  {isEnrolled ? (
                    <>
                      <Link
                        href={`/Courses/${c._id}/Home`}
                        className="btn btn-primary w-100 mb-2"
                      >
                        Go
                      </Link>
                      <Button
                        variant="danger"
                        className="w-100 mb-2"
                        onClick={() => onUnenroll(c._id)}
                      >
                        Unenroll
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="success"
                      className="w-100 mb-2"
                      onClick={() => onEnroll(c._id)}
                    >
                      Enroll
                    </Button>
                  )}

                  <Button
                    className="btn btn-danger mt-2 w-100"
                    onClick={() => onDeleteCourse(c._id)}
                  >
                    Delete
                  </Button>

                  <Button
                    className="btn btn-warning mt-2 w-100"
                    onClick={() =>
                      setCourse({
                        _id: c._id,
                        name: c.name,
                        description: c.description,
                      })
                    }
                  >
                    Edit
                  </Button>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
