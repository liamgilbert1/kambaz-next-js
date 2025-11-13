import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const [moduleObj, setModuleObj] = useState({
    id: "C4550",
    name: "Implementing RESTful Web APIs with Express.js",
    description: "Building Web APIs using Express.js framework",
    course: "Web Development",
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <hr />
      <h4>Modifying Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title{" "}
      </a>
      <FormControl
        className="w-75"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <FormControl
        className="w-75 mb-2"
        id="wd-assignment-score"
        type="number"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
      />
      <a
        className="btn btn-success me-2"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        id="wd-update-assignment-score"
      >
        Update Score
      </a>
      <div className="form-check mb-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="wd-assignment-completed"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-assignment-completed">
          Completed
        </label>
      </div>
      <a
        className="btn btn-warning"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        id="wd-update-assignment-completed"
      >
        Update Completed
      </a>
      <h4>Module Object</h4>
      <a
        className="btn btn-primary me-2"
        href={`${MODULE_API_URL}`}
        id="wd-get-module"
      >
        Get Module
      </a>
      <a
        className="btn btn-secondary"
        href={`${MODULE_API_URL}/name`}
        id="wd-get-module-name"
      >
        Get Module Name
      </a>

      <h5 className="mt-3">Modify Module</h5>
      <FormControl
        className="w-75 mb-2"
        id="wd-module-name"
        defaultValue={moduleObj.name}
        onChange={(e) => setModuleObj({ ...moduleObj, name: e.target.value })}
      />
      <a
        className="btn btn-success me-2"
        href={`${MODULE_API_URL}/name/${moduleObj.name}`}
        id="wd-update-module-name"
      >
        Update Module Name
      </a>

      <FormControl
        className="w-75 mb-2"
        id="wd-module-description"
        defaultValue={moduleObj.description}
        onChange={(e) =>
          setModuleObj({ ...moduleObj, description: e.target.value })
        }
      />
      <a
        className="btn btn-warning"
        href={`${MODULE_API_URL}/description/${moduleObj.description}`}
        id="wd-update-module-description"
      >
        Update Module Description
      </a>
      <hr />
    </div>
  );
}
