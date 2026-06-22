# todo-cli

A simple command-line TODO application written in Node.js.

Files

- [index.js](index.js): main executable script (uses `commander`).
- [package.json](package.json): project metadata and `todo` CLI entry in `bin`.
- [task.json](task.json): local JSON file used to persist tasks (created automatically).

Requirements

- Node.js v12 or newer

Installation

1. Install dependencies (none required by default, but run to be safe):

```bash
npm install
```

2. (Optional) Make the `todo` command available globally on your machine:

```bash
npm link
```

Usage

- Run directly with Node:

```bash
node index.js <command> [args]
```

- Or after `npm link`, use the global `todo` command:

```bash
todo <command> [args]
```

Commands

- `add <task>` — Add a new task. Example:

```bash
todo add "Buy milk"
```

- `list` — List all tasks. Example:

```bash
todo list
```

- `complete <id>` — Mark task with the given id as completed. Example:

```bash
todo complete 2
```

- `incomplete <id>` — Mark task as not completed. Example:

```bash
todo incomplete 2
```

- `delete <id>` — Delete the task with the given id. Example:

```bash
todo delete 3
```

- Aliases: `done` → `complete`, `rm` → `delete` are available as shorthand commands.

- `clear` — Remove all tasks.

```bash
todo clear
```

- `clear-completed` — Remove only completed tasks.

```bash
todo clear-completed
```

- `stat` — Show simple statistics (total, completed, incomplete).

```bash
todo stat
```

Persistence

- Tasks are persisted to `task.json` in the project folder. Example format:

```json
[
  { "id": 1, "task": "Buy milk", "completed": false },
  { "id": 2, "task": "Write README", "completed": true }
]
```

Manually creating a tasks.json file (optional)

If you'd like to create the tasks file yourself (for example to pre-populate tasks or ensure the file exists), create a file named `tasks.json` in the project root with the same JSON structure shown above. Example:

```json
[
  { "id": 1, "task": "Buy milk", "completed": false },
  { "id": 2, "task": "Write README", "completed": true }
]
```

Note: the CLI creates `task.json` automatically by default. If you prefer the filename `tasks.json`, update the code in `index.js` to point to `tasks.json` instead of `task.json` (search for the filename in the source and change it), or rename `tasks.json` to `task.json` so the CLI can read it without changes.

Notes

- IDs are assigned sequentially based on array length when adding; deleting tasks will not reassign existing IDs in the current implementation.
- If you prefer zero global installs, run the CLI with `node index.js` from the project directory.

Troubleshooting

- If `todo` is not found after `npm link`, ensure your global npm bin is on `PATH`, or run:

```bash
node index.js <command>
```
