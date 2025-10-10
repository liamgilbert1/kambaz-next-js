"use client";

import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
} from "react-bootstrap";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import Link from "next/link";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignments = db.assignments;

  return (
    <div id="wd-assignments-editor" className="p-3">
      {assignments
        .filter((assignment: any) => assignment._id === aid)
        .map((assignment: any) => (
          <Form key={assignment._id}>
            <FormGroup className="mb-3" controlId="wd-name">
              <FormLabel>Assignment Name</FormLabel>
              <FormControl type="text" defaultValue={assignment.title} />
            </FormGroup>
            <FormGroup className="mb-3" controlId="wd-description">
              <FormLabel>Description</FormLabel>
              <FormControl
                as="textarea"
                rows={6}
                defaultValue={
                  assignment.description ||
                  "Write assignment description."
                }
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="wd-points">
              <FormLabel>Points</FormLabel>
              <FormControl
                type="number"
                defaultValue={assignment.points || 100}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="wd-group">
              <FormLabel>Assignment Group</FormLabel>
              <FormSelect defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECTS">PROJECTS</option>
              </FormSelect>
            </FormGroup>
            <FormGroup className="mb-3" controlId="wd-display-grade-as">
              <FormLabel>Display Grade as</FormLabel>
              <FormSelect defaultValue="Percentage">
                <option value="Percentage">Percentage</option>
                <option value="Points">Points</option>
                <option value="Letter">Letter</option>
              </FormSelect>
            </FormGroup>
            <FormGroup className="mb-3" controlId="wd-submission-type">
              <FormLabel>Submission Type</FormLabel>
              <FormSelect defaultValue="Online">
                <option value="Online">Online</option>
                <option value="On Paper">On Paper</option>
                <option value="No Submission">No Submission</option>
              </FormSelect>
              <div className="mt-2">
                <FormCheck
                  type="checkbox"
                  id="wd-text-entry"
                  label="Text Entry"
                />
                <FormCheck
                  type="checkbox"
                  id="wd-website-url"
                  label="Website URL"
                />
                <FormCheck
                  type="checkbox"
                  id="wd-media-recordings"
                  label="Media Recordings"
                />
                <FormCheck
                  type="checkbox"
                  id="wd-student-annotation"
                  label="Student Annotation"
                />
                <FormCheck
                  type="checkbox"
                  id="wd-file-upload"
                  label="File Uploads"
                />
              </div>
            </FormGroup>
            <FormGroup className="mb-3" controlId="wd-assign-to">
              <FormLabel>Assign to</FormLabel>
              <FormControl type="text" defaultValue="Everyone" />
            </FormGroup>

            <FormGroup className="mb-3" controlId="wd-dates">
              <FormLabel>Due</FormLabel>
              <FormControl
                type="date"
                defaultValue="2024-05-13"
                className="mb-2"
              />
              <FormLabel>Available from</FormLabel>
              <FormControl
                type="date"
                defaultValue="2024-05-06"
                className="mb-2"
              />
              <FormLabel>Until</FormLabel>
              <FormControl type="date" defaultValue="2024-05-20" />
            </FormGroup>
            <div className="d-flex justify-content-end gap-2">
              <Link
                href={`/Courses/${cid}/Assignments`}
                className="btn btn-secondary"
              >
                Cancel
              </Link>
              <Link
                href={`/Courses/${cid}/Assignments`}
                className="btn btn-danger"
              >
                Save
              </Link>
            </div>
          </Form>
        ))}
    </div>
  );
}
