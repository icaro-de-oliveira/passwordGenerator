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

document.getElementById("copiar").addEventListener("click", () => {
  const campoSenha = document.getElementById("senha");
  if (campoSenha.value) {
    navigator.clipboard.writeText(campoSenha.value);
    Toastify({
      text: "Senha copiada!",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "#28a745",
    }).showToast();
  } else {
    Toastify({
      text: "Nenhuma senha para copiar!",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "#dc3545",
    }).showToast();
  }
});
