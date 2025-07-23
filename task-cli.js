#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "tasks.json");

//Cargar tareas desde el archivo JSON

function loadTasks() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    console.error(
      "X Error al leer tasks.json. ?Está corrupto? Asegúrate de que contenga [] si está vacío."
    );
    process.exit(1);
  }
}

//Guardar tareas en archivo
function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

function generateId(tasks) {
  return tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
}

function showHelp() {
  console.log(`
    Uso de task-cli:
    
        node task-cli.js add "Tarea nueva"
        node task-cli.js update <id> "Nueva descripción"
        node task-cli.js delete <id>
        node task-cli.js-mark-in-progress <id>
        node task-cli.js mark-done <id>
        node task-cli.js [todo | in-progress | done ]
        `);
}

function printTask(task) {
  console.log(`#${task.id} [${task.status.toUpperCase()}] - ${task.description}`);
}

function main() {
  const [, , command, ...args] = process.argv;
  let tasks = loadTasks();

  switch (command) {
    case "add": {
        if (args.length === 0) return console.log("Proporciona una descripcion para la tarea.");
      const description = args.join(" ");
      const newTaks = {
        id: generateId(tasks),
        description,
        status: "todo",
        createdAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
      };
      tasks.push(newTaks);
      saveTasks(tasks);
      console.log(`Tarea agregada correctamente: (ID: ${newTaks.id})`);
      break;
    }

    case "update": {
      const id = parseInt(args[0]);
      const newDesc = args.slice(1).join(" ");
      if (!id || !newDesc) return console.log(`Uso: update <id> "nueva descripcion"`);
      const task = tasks.find((t) => t.id === Number(id));
      if (!task) return console.log(`No se encontró la tarea con ID: ${id}`);
      task.description = newDesc;
      task.updateAt = new Date().toISOString();
      saveTasks(tasks);
      console.log('✅ Tarea actualizada correctamente');
      break;
    }

    case "delete": {
      const id = parseInt(args[0]);
      if (!id) return console.log('⚠️ Proporciona un ID válido para eliminar.');
      const countBefore = tasks.length;
      tasks = tasks.filter(t => t.id !== id);
      if (tasks.length === countBefore) {
        return console.log(`❌ No se encontró la tarea con ID: ${id}`);
      }
      saveTasks(tasks);
      console.log(`🗑️ Tarea con ID: ${id} eliminada correctamente.`);
      break;
    }

    case "mark-in-progress":
    case "mark-done": {
      const id = parseInt(args[0]);
      if (!id) return console.log('Proporciona un ID válido.');
      const task = tasks.find((t) => t.id === id);
      if (!task) return console.log(`Tarea no encontrada`);
      task.status = command === "mark-in-progress" ? "in-progress" : "done";
      task.updateAt = new Date().toISOString();
      saveTasks(tasks);
      console.log(`Tarea con ID: ${id} marcada como ${task.status}.`);
      break;
    }

    case "list": {
      const filter = args[0];
      let filteredTasks = tasks;
      if (["todo", "done", "in-progress"].includes(filter)) {
        filteredTasks = tasks.filter((t) => t.status === filter);
      }
      if (filteredTasks.length === 0)
        return console.log("No hay tareas para mostrar.");
      filteredTasks.forEach(printTask)
      break;
    }

    case "list": {
      const filter = args[0];
      let filteredTasks = tasks;
      if (["todo", "done", "in-progress"].includes(filter)) {
        filteredTasks = tasks.filter((t) => t.status === filter);
      }
      if (filteredTasks.length === 0)
        return console.log("No hay tareas para mostrar.");
      filteredTasks.forEach((t) => {
        console.log(`#${t.id} [${t.status.toUpperCase()}] - ${t.description}`);
      });
      break;
    }

    default: {
      showHelp();
    }
  }
  console.log(args);
  console.log(args[0]);
  
}

main();
