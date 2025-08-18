function gerarSenha(tamanho = 12) {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let senha = "";
  for (let i = 0; i < tamanho; i++) {
    const index = Math.floor(Math.random() * caracteres.length);
    senha += caracteres[index];
  }
  return senha;
}

document.getElementById("gerar").addEventListener("click", () => {
  const senha = gerarSenha();
  document.getElementById("senha").value = senha;
});

let notificacoesAtivas = 0;
const LIMITE_NOTIFICACOES = 3;

function mostrarToast(texto, cor) {
  if (notificacoesAtivas >= LIMITE_NOTIFICACOES) return;

  notificacoesAtivas++;

  Toastify({
    text: texto,
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: cor,
    stopOnFocus: true,
    callback: () => {
      notificacoesAtivas--;
    },
  }).showToast();
}

document.getElementById("copiar").addEventListener("click", () => {
  const campoSenha = document.getElementById("senha");
  if (campoSenha.value) {
    navigator.clipboard.writeText(campoSenha.value);
    mostrarToast("Senha copiada!", "#28a745");
  } else {
    mostrarToast("Nenhuma senha para copiar!", "#dc3545");
  }
});
