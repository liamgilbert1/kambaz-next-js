"use client";

import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormSelect,
  Button,
  FormCheck,
} from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <FormGroup className="mb-3" controlId="wd-name">
          <FormLabel>Assignment Name</FormLabel>
          <FormControl type="text" defaultValue="A1 - ENV + HTML" />
        </FormGroup>

        <FormGroup className="mb-3" controlId="wd-description">
          <FormLabel>Description</FormLabel>
          <FormControl
            as="textarea"
            rows={6}
            defaultValue={`The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="wd-points">
          <FormLabel>Points</FormLabel>
          <FormControl type="number" defaultValue={100} />
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
            <FormCheck type="checkbox" id="wd-text-entry" label="Text Entry" />
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
          <FormControl type="date" defaultValue="2024-05-13" className="mb-2" />

          <FormLabel>Available from</FormLabel>
          <FormControl type="date" defaultValue="2024-05-06" className="mb-2" />

          <FormLabel>Until</FormLabel>
          <FormControl type="date" defaultValue="2024-05-20" />
        </FormGroup>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}
