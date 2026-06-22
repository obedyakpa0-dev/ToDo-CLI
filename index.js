#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs");
const path = require("path");

const program = new Command();

const TASK_FILE = path.join(__dirname, "task.json");

function loadTask() {
  if (!fs.existsSync(TASK_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(TASK_FILE, "utf8"));
}

function saveTask(tasks) {
  fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
}

program.name("todo").description("Simple Todo CLI").version("1.0.0");

program
  .command("add <task>")
  .description("Add a new task")
  .action((task) => {
    const tasks = loadTask();

    const newTask = {
      id: tasks.length + 1,
      task,
      completed: false,
    };

    tasks.push(newTask);
    saveTask(tasks);
    console.log("✓ Task added");
  });

program
  .command("list")
  .description("List all tasks")
  .action(() => {
    const tasks = loadTask();

    if (tasks.length == 0) {
      console.log("No task found");
      return;
    }

    tasks.forEach((task) => {
      const status = task.completed ? "✓" : "[ ]";

      console.log(`${task.id}. ${status} ${task.task}`);
    });
  });

program
  .command("complete <id>")
  .alias("done")
  .description("Mark a task as completed")
  .action((id) => {
    const tasks = loadTask();

    const task = tasks.find((t) => t.id === parseInt(id));
    if (!task) {
      console.log("Task not found");
      return;
    }
    task.completed = true;
    saveTask(tasks);
    console.log("✓ Task marked as completed");
  });

program
  .command("incomplete <id>")
  .description("Mark a task as incomplete")
  .action((id) => {
    const tasks = loadTask();
    const task = tasks.find((t) => t.id === parseInt(id));
    if (!task) {
      console.log("Task not found");
      return;
    }
    task.completed = false;
    saveTask(tasks);
    console.log("✓ Task marked as incomplete");
  });

program
  .command("clear")
  .description("Clear all tasks")
  .action(() => {
    saveTask([]);
    console.log("✓ All tasks cleared");
  });

program
  .command("clear-completed")
  .description("Clear all completed tasks")
  .action(() => {
    const tasks = loadTask();
    const newTasks = tasks.filter((task) => !task.completed);
    saveTask(newTasks);
    console.log("✓ Completed tasks cleared");
  });

program
  .command("stat")
  .description("Show task statistics")
  .action(() => {
    const tasks = loadTask();
    const completedTasks = tasks.filter((task) => task.completed);
    console.log(`Total tasks: ${tasks.length}`);
    console.log(`Completed tasks: ${completedTasks.length}`);
    console.log(`Incomplete tasks: ${tasks.length - completedTasks.length}`);
  });

program
  .command("delete <id>")
  .alias("rm")
  .description("Delete a task by id")
  .action((id) => {
    const tasks = loadTask();

    const taskExists = tasks.some((t) => t.id === parseInt(id));
    if (!taskExists) {
      console.log("Task not found");
      return;
    }

    const newTasks = tasks.filter((task) => task.id !== parseInt(id));
    saveTask(newTasks);
    console.log("✓ Task deleted");
  });

program.parse();
