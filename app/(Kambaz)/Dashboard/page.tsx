"use client";

import { useState } from "react";
import Link from "next/link";
import * as db from "../Database";
import { v4 as uuidv4 } from "uuid";
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
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();

  const initialEnrollments = db.enrollments
    .filter((enr: any) => enr.user === currentUser?._id)
    .map((enr: any) => enr.course);

  const [showAll, setShowAll] = useState(false);
  const [userEnrollments, setUserEnrollments] =
    useState<string[]>(initialEnrollments);

  const toggleEnrollments = () => setShowAll(!showAll);

  const handleEnroll = (courseId: string) => {
    setUserEnrollments([...userEnrollments, courseId]);
  };

  const handleUnenroll = (courseId: string) => {
    setUserEnrollments(userEnrollments.filter((id) => id !== courseId));
  };

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const visibleCourses = showAll
    ? courses
    : courses.filter((c: any) => userEnrollments.includes(c._id));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={() => dispatch(updateCourse(course))}
          id="wd-update-course-click"
        >
          Update
        </button>
      </h5>
      <br />
      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        as="textarea"
        value={course.description}
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <h2 id="wd-dashboard-published">
          {showAll ? "All Courses" : "Enrolled Courses"} (
          {visibleCourses.length})
        </h2>
        <Button
          variant="primary"
          className="float-end"
          onClick={toggleEnrollments}
          id="wd-toggle-enrollments"
        >
          {showAll ? "Show Enrolled" : "Show All"}
        </Button>
      </div>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {currentUser &&
            visibleCourses.map((course: any) => {
              const isEnrolled = userEnrollments.includes(course._id);
              return (
                <Col
                  className="wd-dashboard-course"
                  style={{ width: "300px" }}
                  key={course._id}
                >
                  <Card>
                    {isEnrolled ? (
                      <Link
                        href={`/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark"
                      >
                        <CourseCard
                          course={course}
                          dispatch={dispatch}
                          setCourse={setCourse}
                          handleUnenroll={() => handleUnenroll(course._id)}
                          isEnrolled={isEnrolled}
                        />
                      </Link>
                    ) : (
                      <div className="text-muted">
                        <CourseCard
                          course={course}
                          dispatch={dispatch}
                          setCourse={setCourse}
                          handleEnroll={() => handleEnroll(course._id)}
                          isEnrolled={isEnrolled}
                        />
                      </div>
                    )}
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
}

function CourseCard({
  course,
  dispatch,
  setCourse,
  handleEnroll,
  handleUnenroll,
  isEnrolled,
}: any) {
  return (
    <>
      <CardImg
        src="/images/reactjs.jpg"
        variant="top"
        width="100%"
        height={160}
      />
      <CardBody>
        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
          {course.name}
        </CardTitle>
        <CardText
          className="wd-dashboard-course-description overflow-hidden"
          style={{ height: "100px" }}
        >
          {course.description}
        </CardText>

        {isEnrolled ? (
          <>
            <Button variant="primary">Go</Button>
            <Button
              variant="danger"
              className="float-end"
              onClick={(e) => {
                e.preventDefault();
                handleUnenroll();
              }}
            >
              Unenroll
            </Button>
          </>
        ) : (
          <Button
            variant="success"
            className="float-end"
            onClick={(e) => {
              e.preventDefault();
              handleEnroll();
            }}
          >
            Enroll
          </Button>
        )}

        <Button
          onClick={(event) => {
            event.preventDefault();
            dispatch(deleteCourse(course._id));
          }}
          className="btn btn-danger mt-2 w-100"
          id="wd-delete-course-click"
        >
          Delete
        </Button>
        <Button
          id="wd-edit-course-click"
          onClick={(event) => {
            event.preventDefault();
            setCourse(course);
          }}
          className="btn btn-warning mt-2 w-100"
        >
          Edit
        </Button>
      </CardBody>
    </>
  );
}
