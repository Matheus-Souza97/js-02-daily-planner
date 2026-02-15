const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tarefas = [];

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    criarTarefa(taskText);

    taskInput.value = "";
});

function criarTarefa(texto, concluida = false) {
    const li = document.createElement("li");

    if (concluida) {
        li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = texto;

    span.addEventListener("click", () => {
        li.classList.toggle("completed");
        salvarNoLocalStorage();
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";

    removeBtn.addEventListener("click", () => {
        li.remove();
        salvarNoLocalStorage();
    });

    li.appendChild(span);
    li.appendChild(removeBtn);

    taskList.appendChild(li);

    salvarNoLocalStorage();

}

function salvarNoLocalStorage() {
    const tarefasAtualizadas = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tarefasAtualizadas.push({texto:
    li.querySelector("span").textContent, concluida:
    li.classList.contains("completed")
        });
    }); 
    localStorage.setItem("tarefas",
        JSON.stringify(tarefasAtualizadas));
};

document.addEventListener("DOMContentLoaded", () => {
    const tarefasSalvas = 
    JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefasSalvas.forEach(tarefa => {
        criarTarefa(tarefa.texto, tarefa.concluida);
    });
});