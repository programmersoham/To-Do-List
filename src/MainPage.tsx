import React, { FormEventHandler, FormEvent } from "react";
import { type Task } from "wasp/entities";
import { type AuthUser, getUsername } from "wasp/auth";
import { logout } from "wasp/client/auth";
import { createTask, updateTask, deleteTasks, useQuery, getTasks } from "wasp/client/operations";
import waspLogo from "./waspLogo.png";

import "./Main.css";

export const MainPage = ({ user }: { user: AuthUser }) => {
  const { data: tasks, isLoading, error } = useQuery(getTasks);

  if (isLoading) return "Loading...";
  if (error) return "Error: " + error;

  const completed = tasks?.filter((task) => task.isDone).map((task) => task.id);

  return (
    <div>
      <nav className="flex items-center justify-between p-4 bg-gray-200">
        <div className="flex items-center">
          <img src={waspLogo} alt="wasp logo" className="w-8 h-8 mr-2" />
          <h1 className="text-xl font-bold">Todo List</h1>
        </div>
        {user && (
          <div className="flex items-center">
            <h1 className="text-lg font-semibold mr-2">
              {getUsername(user)}
            </h1>
            <button
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </nav>
      <main className="flex justify-center items-center">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <NewTaskForm />
          {tasks && <TasksList tasks={tasks} />}
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => void deleteTasks(completed ?? [])}
            >
              Delete
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

function Todo({ id, isDone, description }: Task) {
  const handleIsDoneChange: FormEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      await updateTask({
        id,
        isDone: event.currentTarget.checked,
      });
    } catch (err: any) {
      window.alert("Error while updating task " + err?.message);
    }
  };

  return (
    <li className="flex items-center justify-between py-2">
      <span className="flex items-center">
        <input
          type="checkbox"
          id={id.toString()}
          checked={isDone}
          onChange={handleIsDoneChange}
          className="mr-2"
        />
        <span>{description}</span>

      </span>
      <span className="flex items-center">
        <span className={`ml-4 mr-2 ${isDone ? 'text-green-500' : 'text-yellow-500'}`}>
          {isDone ? "Complete" : "Incomplete"}
        </span>

        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => void deleteTasks([id])}
        >
          Delete
        </button>
      </span>
    </li>
  );
}

function TasksList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) return <p className="text-center">No tasks yet.</p>;
  return (
    <ol className="mt-4 space-y-2">
      {tasks.map((task, idx) => (
        <Todo {...task} key={idx} />
      ))}
    </ol>
  );
}

function NewTaskForm() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const description = event.currentTarget.description.value;
      console.log(description);
      event.currentTarget.reset();
      await createTask({ description });
    } catch (err: any) {
      window.alert("Error: " + err?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4 space-y-4">
      <input
        name="description"
        type="text"
        defaultValue=""
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
      />
      <input
        type="submit"
        value="Create task"
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 w-full"
      />
    </form>
  );
}
