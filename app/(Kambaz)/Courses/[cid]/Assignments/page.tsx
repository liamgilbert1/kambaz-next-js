"use client";

import {
  ListGroup,
  ListGroupItem,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { BsGripVertical, BsSearch } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import LessonControlButtons from "../Modules/LessonControlButtons";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroupText>
            <BsSearch />
          </InputGroupText>
          <FormControl
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </InputGroup>

        <div>
          <Button
            variant="secondary"
            size="lg"
            className="me-2"
            id="wd-add-assignment-group"
          >
            <FaPlus className="me-1" /> Group
          </Button>
          <Button variant="danger" size="lg" id="wd-add-assignment">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <span className="text-muted fs-6 ms-2">40% of Total</span>
            <ModuleControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <FaRegEdit className="me-2 fs-5" />
              <Link
                href="/Courses/1234/Assignments/123"
                className="wd-assignment-link text-dark text-decoration-none"
              >
                A1 - ENV + HTML
              </Link>
              <LessonControlButtons />
              <div className="text-muted fs-6 mt-1 ps-4">
                Multiple Modules | <b>Not available until</b> May 6 at 12:00am
                <br />
                <b>Due</b> May 13 at 11:59pm | 100 pts
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <FaRegEdit className="me-2 fs-5" />
              <Link
                href="/Courses/1234/Assignments/123"
                className="wd-assignment-link text-dark text-decoration-none"
              >
                A2 - CSS + BOOTSTRAP
              </Link>
              <LessonControlButtons />
              <div className="text-muted fs-6 mt-1 ps-4">
                Multiple Modules | <b>Not available until</b> May 13 at 12:00am
                <br />
                <b>Due</b> May 20 at 11:59pm | 100 pts
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <FaRegEdit className="me-2 fs-5" />
              <Link
                href="/Courses/1234/Assignments/123"
                className="wd-assignment-link text-dark text-decoration-none"
              >
                A3 - JAVASCRIPT + REACT
              </Link>
              <LessonControlButtons />
              <div className="text-muted fs-6 mt-1 ps-4">
                Multiple Modules | <b>Not available until</b> May 20 at 12:00am
                <br />
                <b>Due</b> May 27 at 11:59pm | 100 pts
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
