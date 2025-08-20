const slider = document.getElementById("tamanho-slider");
const valor = document.getElementById("tamanho-valor");

if (slider && valor) {
  const atualizarValor = () => (valor.textContent = slider.value);
  slider.addEventListener("input", atualizarValor);
  atualizarValor();
}

function getTamanhoSenha() {
  return slider ? parseInt(slider.value) : 12;
}
function gerarSenha() {
  const tamanho = Math.min(32, Math.max(4, getTamanhoSenha() || 12));

  const incluirMaiusculas = document.getElementById("maiusculas").checked;
  const incluirMinusculas = document.getElementById("minusculas").checked;
  const incluirNumeros = document.getElementById("numeros").checked;
  const incluirSimbolos = document.getElementById("simbolos").checked;

  let caracteres = "";
  if (incluirMaiusculas) caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (incluirMinusculas) caracteres += "abcdefghijklmnopqrstuvwxyz";
  if (incluirNumeros) caracteres += "0123456789";
  if (incluirSimbolos) caracteres += "!@#$%^&*()-_=+[]{};:,.<>?/";

  if (caracteres.length === 0) {
    mostrarToast("Selecione pelo menos uma opção!", "#ffc107"); // #dc3545
    return "";
  }

  let senha = "";
  for (let i = 0; i < tamanho; i++) {
    const index = Math.floor(Math.random() * caracteres.length);
    senha += caracteres[index];
  }
  return senha;
}

document.getElementById("gerar").addEventListener("click", () => {
  const senha = gerarSenha();
  if (senha) {
    document.getElementById("senha").value = senha;
  }
});

let notificacoesAtivas = 0;
function getLimiteNotificacoes() {
  return window.innerWidth <= 600 || /Mobi|Android/i.test(navigator.userAgent)
    ? 2
    : 3;
}

function mostrarToast(texto, cor) {
  const limite = getLimiteNotificacoes();
  if (notificacoesAtivas >= limite) return;

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
