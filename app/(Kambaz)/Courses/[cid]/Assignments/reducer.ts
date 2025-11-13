import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../../Database";

const initialState = {
  assignments: db.assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action) => {
      state.assignments = [
        ...state.assignments,
        {
          ...action.payload,
          _id: new Date().getTime().toString(),
        },
      ];
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === action.payload._id ? action.payload : a
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
