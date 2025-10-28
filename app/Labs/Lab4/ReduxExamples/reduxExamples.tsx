"use client";
import HelloRedux from "./HelloRedux/helloRedux";
import CounterRedux from "./CounterRedux/counterRedux";
import AddRedux from "./AddRedux/addRedux";
import TodoList from "./todos/TodoList";

export default function ReduxExamples() {
  return (
    <div>
      <h2>Redux Examples</h2>
      <HelloRedux />
      <CounterRedux />
      <AddRedux />
      <TodoList />
    </div>
  );
}
