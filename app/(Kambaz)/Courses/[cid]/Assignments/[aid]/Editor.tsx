"use client";

import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../../Assignments/reducer";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const existing = assignments.find((a: any) => a._id === aid);
  const [assignment, setAssignment] = useState<any>(
    existing || {
      _id: uuidv4(),
      course: cid,
      title: "",
      description: "",
      points: 100,
      due: "",
      availableFrom: "",
      availableUntil: "",
    }
  );

  const handleSave = () => {
    if (existing) {
      dispatch(updateAssignment(assignment));
    } else {
      dispatch(addAssignment({ ...assignment, course: cid }));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <FormGroup className="mb-3" controlId="wd-name">
          <FormLabel>Assignment Name</FormLabel>
          <FormControl
            type="text"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="wd-description">
          <FormLabel>Description</FormLabel>
          <FormControl
            as="textarea"
            rows={6}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="wd-points">
          <FormLabel>Points</FormLabel>
          <FormControl
            type="number"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({ ...assignment, points: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="wd-dates">
          <FormLabel>Due Date</FormLabel>
          <FormControl
            type="date"
            value={assignment.due}
            onChange={(e) =>
              setAssignment({ ...assignment, due: e.target.value })
            }
          />
          <FormLabel className="mt-3">Available From</FormLabel>
          <FormControl
            type="date"
            value={assignment.availableFrom}
            onChange={(e) =>
              setAssignment({ ...assignment, availableFrom: e.target.value })
            }
          />
          <FormLabel className="mt-3">Available Until</FormLabel>
          <FormControl
            type="date"
            value={assignment.availableUntil}
            onChange={(e) =>
              setAssignment({ ...assignment, availableUntil: e.target.value })
            }
          />
        </FormGroup>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
