async function sendMessage() {
  const input     = document.getElementById('user-input');
  const chatWindow= document.getElementById('chat-window');
  const userText  = input.value.trim();

  if (!userText) return;

  // Exibe no chat a mensagem do usuário
  chatWindow.innerHTML += `<div class="chat-message user">${userText}</div>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // 2) Envia ao backend e aguarda a resposta
  try {
    const res = await fetch(`${window.API_BASE_URL}/api/chat,` {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pergunta: userText })
    });

    if (!res.ok) throw new Error(`Erro ${res.status}`);
    const json = await res.json();

    // 3) Exibe a resposta do bot
    const botResponse = json.resposta || "Sem resposta do servidor.";
    setTimeout(() => {
      chatWindow.innerHTML += <div class="chat-message bot">${botResponse}</div>;
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 300);

  } catch (err) {
    console.error(err);
    chatWindow.innerHTML += <div class="chat-message bot">Ocorreu um erro de comunicação.</div>;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  input.value = '';
}

// 4) Mantenha o listener no botão/enviar
document.getElementById('btn-enviar')
        .addEventListener('click', sendMessage);

//  Enviar ao apertar Enter
document.getElementById('user-input')
        .addEventListener('keypress', e => {
          if (e.key === 'Enter') sendMessage();
        });