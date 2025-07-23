# 🧾 Task Tracker CLI

Una aplicación de línea de comandos (CLI) simple para gestionar tus tareas desde la terminal. Este proyecto fue desarrollado en Node.js sin librerías externas, utilizando un archivo JSON para almacenar las tareas.

---

## 🚀 Características

- ✅ Agregar, actualizar y eliminar tareas
- 🔁 Marcar tareas como en progreso o terminadas
- 📋 Listar todas las tareas o filtrarlas por estado (`todo`, `in-progress`, `done`)
- 💾 Almacenamiento persistente en `tasks.json`
- ⚠️ Sin dependencias externas

---

## 📦 Requisitos

- [Node.js](https://nodejs.org/) instalado en tu sistema

---

## 🛠️ Instalación

1. Clona o descarga este repositorio
2. Navega al directorio del proyecto:

```bash
cd task-cli
```

3. Asegúrate de tener un archivo `tasks.json` vacío, si no existe se creará automáticamente.

---

## 📌 Uso

Usa `node task-cli.js` seguido del comando:

### ➕ Agregar tarea

```bash
node task-cli.js add "Comprar leche"
```

### ✏️ Actualizar descripción

```bash
node task-cli.js update 1 "Comprar leche y pan"
```

### 🗑️ Eliminar tarea

```bash
node task-cli.js delete 1
```

### 🔄 Cambiar estado

```bash
node task-cli.js mark-in-progress 2
node task-cli.js mark-done 2
```

### 📋 Listar tareas

```bash
node task-cli.js list
node task-cli.js list todo
node task-cli.js list in-progress
node task-cli.js list done
```

---

## 📁 Estructura del Proyecto

```
task-cli/
├── task-cli.js       # Script principal de la CLI
├── tasks.json        # Archivo donde se almacenan las tareas
└── README.md         # Documentación del proyecto
```

---

## 📌 Formato de una tarea

Cada tarea se guarda en el archivo `tasks.json` con el siguiente formato:

```json
{
  "id": 1,
  "description": "Ejemplo de tarea",
  "status": "todo",
  "createdAt": "2025-07-23T12:00:00.000Z",
  "updatedAt": "2025-07-23T12:00:00.000Z"
}
```

---

## ❓ Ayuda

Para ver los comandos disponibles:

```bash
node task-cli.js help
```

---

## 📚 Aprendizajes

Este proyecto fue creado como una práctica para trabajar con:

- JavaScript sin frameworks
- Manejo de archivos (fs)
- Interacción desde línea de comandos (`process.argv`)
- Buenas prácticas de organización y validación de entradas

---

## 🧠 Futuras mejoras

- [ ] Búsqueda por palabra clave
- [ ] Establecer fecha límite para las tareas
- [ ] Exportar como archivo `.cmd` para usar `task-cli` directamente en Windows
- [ ] Interfaz gráfica (React) como segunda fase

---

## 🧑‍💻 Autor

Desarrollado por **[Tu Nombre Aquí]**  
Proyecto de práctica con Node.js CLI 💻

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT.