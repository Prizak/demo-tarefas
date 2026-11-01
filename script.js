"use strict";

// Os dados vivem apenas nesta variável; recarregar a página limpa tudo.
let tarefas = [];
let proximoId = 1;

const formulario = document.getElementById("formulario");
const campo = document.getElementById("nova-tarefa");
const lista = document.getElementById("lista");
const vazio = document.getElementById("vazio");
const status = document.getElementById("status");

function anunciar(mensagem) {
  status.textContent = mensagem;
}

function criarItem(tarefa) {
  const li = document.createElement("li");
  li.className = "item" + (tarefa.concluida ? " concluida" : "");

  const caixa = document.createElement("input");
  caixa.type = "checkbox";
  caixa.id = "tarefa-" + tarefa.id;
  caixa.checked = tarefa.concluida;
  caixa.addEventListener("change", () => {
    tarefa.concluida = caixa.checked;
    li.classList.toggle("concluida", tarefa.concluida);
    anunciar(tarefa.concluida ? "Tarefa concluída." : "Tarefa reaberta.");
  });

  const rotulo = document.createElement("label");
  rotulo.htmlFor = caixa.id;
  rotulo.textContent = tarefa.texto;

  const remover = document.createElement("button");
  remover.type = "button";
  remover.className = "remover";
  remover.textContent = "Remover";
  remover.setAttribute("aria-label", "Remover tarefa: " + tarefa.texto);
  remover.addEventListener("click", () => {
    tarefas = tarefas.filter((t) => t.id !== tarefa.id);
    renderizar();
    anunciar("Tarefa removida.");
    campo.focus();
  });

  li.append(caixa, rotulo, remover);
  return li;
}

function renderizar() {
  lista.replaceChildren(...tarefas.map(criarItem));
  vazio.hidden = tarefas.length > 0;
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const texto = campo.value.trim();
  if (!texto) {
    campo.focus();
    return;
  }
  tarefas.push({ id: proximoId++, texto: texto, concluida: false });
  campo.value = "";
  renderizar();
  anunciar("Tarefa adicionada.");
  campo.focus();
});

renderizar();
