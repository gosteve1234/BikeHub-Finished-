// Close MODAL (USER INFO)
var modal = document.getElementById("login-modal");
var loginbtn = document.getElementById('loginbtn');
var logoutbtn = document.getElementById('logout');
const validUsername = "admin";
const validPassword = "123";
window.addEventListener('load', () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        modal.style.display = "none";
    }  
});
logoutbtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn', 'false');
    alert("You have logged out successfully.");
    window.location.href = "admin.html";
});
loginbtn.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === validUsername && password === validPassword) {
        localStorage.setItem('isLoggedIn', 'true');
        modal.style.display = "none";
    } else {
        alert("No user found");
    }
});
document.addEventListener('DOMContentLoaded', function() {
  const currentUsers = document.getElementById('current-users');
  const currentTransactions = document.getElementById('current-transactions');  
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  if (currentUsers && currentTransactions) {
    currentUsers.textContent = users.length;
    currentTransactions.textContent = transactions.length;
  }
});