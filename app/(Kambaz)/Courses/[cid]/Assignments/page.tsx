"use client";

import { useParams } from "next/navigation";
import {
  ListGroup,
  ListGroupItem,
  Button,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { BsGripVertical, BsSearch, BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaRegEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { useState } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  const handleDelete = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedAssignment) {
      dispatch(deleteAssignment(selectedAssignment._id));
    }
    setShowConfirm(false);
  };

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
          <Link
            href={`/Courses/${cid}/Assignments/new`}
            className="btn btn-danger btn-lg"
            id="wd-add-assignment"
          >
            <FaPlus className="me-1" /> Assignment
          </Link>
        </div>
      </div>
      <ListGroup id="wd-modules" className="rounded-0">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <span className="text-muted fs-6 ms-2">40% of Total</span>
            <ModuleControlButtons
              moduleId=""
              deleteModule={() => {}}
              editModule={() => {}}
            />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <ListGroupItem
                  key={assignment._id}
                  className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
                >
                  <div>
                    <BsGripVertical className="me-2 fs-3" />
                    <FaRegEdit className="me-2 fs-5" />
                    <Link
                      href={`/Courses/${cid}/Assignments/${assignment._id}`}
                      className="wd-assignment-link text-dark text-decoration-none"
                    >
                      {assignment.title}
                    </Link>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    {/* Keep the 3-dot control buttons */}
                    <LessonControlButtons />
                    {/* Add trash icon next to it */}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(assignment)}
                    >
                      <BsTrash />
                    </Button>
                  </div>
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{selectedAssignment?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
