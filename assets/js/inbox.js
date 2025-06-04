// Read messages from localStorage
function getMessages() {
  const stored = localStorage.getItem("messages");
  if (!stored) return [];
  const parsed = JSON.parse(stored);
  return parsed.map(msg => ({
    ...msg,
    date: new Date(msg.date)
  }));
}

// Display messages in the inbox
function renderInbox() {
  const messages = getMessages();
  const inboxList = document.getElementById("inbox-list");
  inboxList.innerHTML = "";

  messages.sort((a, b) => b.date - a.date);

  messages.forEach((msg, index) => {
    const item = document.createElement("li");
    item.className = "inbox-item";

    item.innerHTML = `
      ${!msg.read ? '<span class="unread-dot"></span>' : ''}
      <strong>${msg.email}</strong> - ${msg.name}<br>
      <small>${msg.date.toLocaleString()}</small>
    `;

    item.addEventListener("click", () => {
    markAsRead(msg.id);
    showModal(msg);
    });


    inboxList.appendChild(item);
  });
}


// Mark a message as read
function markAsRead(id) {
  const stored = getMessages();
  const updated = stored.map(msg => {
    if (msg.id === id) {
      return { ...msg, read: true };
    }
    return msg;
  });

  localStorage.setItem("messages", JSON.stringify(updated));
  renderInbox(); // Refresh inbox
}



function showModal(message) {
  document.getElementById("modal-name").textContent = message.name;
  document.getElementById("modal-email").textContent = message.email;
  document.getElementById("modal-message").textContent = message.message;
  document.getElementById("message-modal").classList.remove("hidden");
  document.getElementById("message-modal").style.display = "flex";
}

document.querySelector(".close-btn").addEventListener("click", () => {
  document.getElementById("message-modal").style.display = "none";
});

document.addEventListener("DOMContentLoaded", renderInbox);
