// =================== USER LOGIN MODAL ===================
const userIcon = document.getElementById('userIcon');
const userModal = document.getElementById('userModal');
const closeUserModal = document.querySelector('.close-user-modal');
const userMenuPopup = document.getElementById('userMenuPopup');

userIcon.addEventListener('click', () => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const isMenuVisible = userMenuPopup.style.display === 'block';

  userModal.style.display = 'none';
  userMenuPopup.style.display = 'none';

  if (loggedInUser && !isMenuVisible) {
    userMenuPopup.style.display = 'block';
  } else if (!loggedInUser) {
    userModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
});

closeUserModal.addEventListener('click', () => {
  userModal.style.display = 'none';
  document.body.style.overflow = '';
});

window.addEventListener('click', (event) => {
  if (event.target == userModal) {
    userModal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// =================== SIGN UP MODAL ===================
const signUpBtn = document.querySelector('.signup-btn');
const signUpModal = document.getElementById('signUpModal');
const closeSignUpModal = document.querySelector('.close-signup-modal');

signUpBtn.addEventListener('click', () => {
  userModal.style.display = 'none';
  signUpModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

closeSignUpModal.addEventListener('click', () => {
  signUpModal.style.display = 'none';
  document.body.style.overflow = '';
});

window.addEventListener('click', (event) => {
  if (event.target === signUpModal) {
    signUpModal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// =================== USER PROFILE ===================
const profileBtn = document.getElementById('profileBtn'); 
const profileModal = document.getElementById('profileModal');
const closeProfileModal = document.querySelector('.close-profile-modal');
const profileImage = document.getElementById('profileImage');
const profileUsername = document.getElementById('profileUsername');
const profileEmail = document.getElementById('profileEmail');
const editPictureBtn = document.getElementById('editPictureBtn');
const pictureOptionsModal = document.getElementById('pictureOptionsModal');
const closePictureOptions = document.querySelector('.close-picture-options');
const takePhotoBtn = document.getElementById('takePhotoBtn');
const pickFromAlbumBtn = document.getElementById('pickFromAlbumBtn');
const fileInput = document.getElementById('fileInput');

profileBtn.addEventListener('click', () => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const userData = users.find(u => u.username === loggedInUser);

  if (userData) {
    profileImage.src = userData.profileImage || 'assets/img/usericon.png';
    document.getElementById('menuProfileImage').src = userData.profileImage || 'assets/img/usericon.png';
    profileUsername.textContent = loggedInUser;
    profileEmail.textContent = userData.email;
    profileModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
});

closeProfileModal.addEventListener('click', () => {
  profileModal.style.display = 'none';
  document.body.style.overflow = '';
});

editPictureBtn.addEventListener('click', () => {
  pictureOptionsModal.style.display = 'block';
});

closePictureOptions.addEventListener('click', () => {
  pictureOptionsModal.style.display = 'none';
});

takePhotoBtn.addEventListener('click', async () => {
  pictureOptionsModal.style.display = 'none';

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    const captureModal = document.createElement('div');
    captureModal.classList.add('modal');
    captureModal.style.display = 'block';

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const video = document.createElement('video');
    video.autoplay = true;
    video.style.width = '100%';
    video.style.maxHeight = '300px';
    video.srcObject = stream;

    modalContent.appendChild(video);

    const captureBtn = document.createElement('button');
    captureBtn.id = 'captureBtn';
    captureBtn.innerText = '📷';
    captureBtn.style.backgroundColor = '#4CAF50';
    modalContent.appendChild(captureBtn);

    captureModal.appendChild(modalContent);
    document.body.appendChild(captureModal);

    captureBtn.addEventListener('click', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/png');

      // Stop the video stream
      stream.getTracks().forEach(track => track.stop());

      // Replace video with image preview
      modalContent.innerHTML = '';
      const imagePreview = document.createElement('img');
      imagePreview.src = imageData;
      imagePreview.style.width = '70%';
      imagePreview.style.maxHeight = '300px';
      modalContent.appendChild(imagePreview);

      // Save/Discard buttons
      const buttonContainer = document.createElement('div');
      buttonContainer.style.marginTop = '10px';
      buttonContainer.style.display = 'flex';
      buttonContainer.style.justifyContent = 'space-between';

      const saveBtn = document.createElement('button');
      saveBtn.innerText = 'Save';
      saveBtn.style.backgroundColor = '#4CAF50';
      const cancelBtn = document.createElement('button');
      cancelBtn.innerText = 'Cancel';
      cancelBtn.style.backgroundColor = '#f44336';

      buttonContainer.appendChild(cancelBtn);
      buttonContainer.appendChild(saveBtn);
      modalContent.appendChild(buttonContainer);

      saveBtn.addEventListener('click', () => {
        updateProfileImage(imageData);
        captureModal.remove();
      });

      cancelBtn.addEventListener('click', () => {
        captureModal.remove();
      });
    });

  } catch (error) {
    alert("Camera access denied or not available.");
    console.error(error);
  }
});

pickFromAlbumBtn.addEventListener('click', () => {
  pictureOptionsModal.style.display = 'none';
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageData = e.target.result;
      updateProfileImage(imageData);
    };
    reader.readAsDataURL(file);
  }
});

function updateProfileImage(imageData) {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.username === loggedInUser);
  if (user) {
    user.profileImage = imageData;
    localStorage.setItem('users', JSON.stringify(users));
    
    profileImage.src = imageData;
    document.getElementById('menuProfileImage').src = imageData;
  }
}

// =================== FORGOT PASSWORD MODAL ===================
const forgotPasswordLink = document.querySelector('.forgot-password a');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const closeForgotModal = document.querySelector('.close-forgot-modal');

forgotPasswordLink.addEventListener('click', (e) => {
  e.preventDefault();
  userModal.style.display = 'none';
  forgotPasswordModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

closeForgotModal.addEventListener('click', () => {
  forgotPasswordModal.style.display = 'none';
  document.body.style.overflow = '';
});

window.addEventListener('click', (event) => {
  if (event.target === forgotPasswordModal) {
    forgotPasswordModal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// =================== SERVICES MODAL ===================
const openButtons = document.querySelectorAll('.openModal');
const closeButtons = document.querySelectorAll('.closeModal');
const rentButtons = document.querySelectorAll('.rentBtn');
const rentFormModal = document.getElementById('rentFormModal');
const closeFormButton = document.querySelector('.close-form');
const rentForm = document.getElementById('rentForm');
let pendingModalId = null;

openButtons.forEach(button => {
  button.addEventListener('click', function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const modalId = this.getAttribute('data-modal');

    if (loggedInUser) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    } else {
      pendingModalId = modalId;

      userModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  });
});
closeButtons.forEach(button => {
  button.addEventListener('click', function () {
    const modal = this.closest('.modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});

closeFormButton.addEventListener('click', () => {
  rentFormModal.style.display = 'none';
  rentForm.style.display = 'block';
});

// ============= RECEIPT MODAL =============
let selectedBikeName = '';
let selectedBikeImage = '';
let selectedBikePrice = 0;

function openRentForm(name, image, price) {
  selectedBikeName = name;
  selectedBikeImage = image;
  selectedBikePrice = price;
  rentForm.reset();
  document.getElementById("rentFormModal").style.display = "flex";
}

function submitRentForm(event) {
  event.preventDefault();
  const totalPurchase = parseInt(document.getElementById("totalPurchase").value);
  const startDate = document.getElementById("rentalDate").value;
  const duration = parseInt(document.getElementById("duration").value);
  const total = selectedBikePrice * duration;
  const totalAmount = total * totalPurchase;

  document.getElementById("receiptBikeName").innerText = selectedBikeName;
  document.getElementById("receiptBikeImage").src = selectedBikeImage;
  document.getElementById("receiptBikePrice").innerText = selectedBikePrice;
  document.getElementById("receiptTotalPurchase").innerText = totalPurchase;
  document.getElementById("receiptStartDate").innerText = startDate;
  document.getElementById("receiptDuration").innerText = duration;
  document.getElementById("receiptTotal").innerText = totalAmount;

  receiptModal.style.display = "block";
}

function closeReceiptModal() {
  document.getElementById("receiptModal").style.display = "none";
}
function confirmRental() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.username === loggedInUser);
  const bikeName = document.getElementById("receiptBikeName").innerText;
  const startDate = document.getElementById("receiptStartDate").innerText;
  const duration = document.getElementById("receiptDuration").innerText;
  const total = document.getElementById("receiptTotalPurchase").innerText;
  const bikes = JSON.parse(localStorage.getItem('bikes')) || [];
  const bike = bikes.find(b => b.model === selectedBikeName);

  let endDate = "";
  if (startDate && duration) {
    const start = new Date(startDate);
    start.setDate(start.getDate() + parseInt(duration));
    endDate = start.toISOString().split('T')[0];
  }
  if (!bike || bike.stocks < total) {
    alert("No stocks");
    closeReceiptModal();
  } else {
  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
  const newId = Math.max (...transactions.map(u => u.id || 0)) + 1;
  transactions.push({id: newId, email: user ? user.email : '', bikeModel: bikeName, rentalStartDate: startDate, rentalEndDate: endDate, rentalAmount: total });
  localStorage.setItem('transactions', JSON.stringify(transactions));
  bike.stocks -= total;
  localStorage.setItem('bikes', JSON.stringify(bikes));
  alert("Rental confirmed! Thank you.");
  closeReceiptModal();
  updateAvailabilityStatus();
}}
// =================== AVAILABILITY STATUS ===================

function updateAvailabilityStatus() {
  const bikes = JSON.parse(localStorage.getItem('bikes')) || [];
    bikes.forEach(bike => {
      const statusEl = document.getElementById(`status${bike.id}`);
    if (statusEl) {
      statusEl.textContent = `Available: ${bike.stocks}`;
      if (bike.stocks === 0) {
        statusEl.className = "availability-status none";
      } else if (bike.stocks <= 5) {
        statusEl.className = "availability-status low";
      } else {
        statusEl.className = "availability-status high";
      }
    }
  });
}

window.addEventListener("DOMContentLoaded", updateAvailabilityStatus);

setInterval(() => {
  for (const id in bikeInventory) {
    bikeInventory[id] = Math.floor(Math.random() * 11);
  }
  updateAvailabilityStatus();
}, 5000);

// =================== DEMO SIGN-UP ===================
document.getElementById('signUpForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('newUsername').value.trim();
  const email = document.getElementById('newEmail').value.trim();
  const password = document.getElementById('newPassword').value;
  const retypePassword = document.getElementById('retypePassword').value;

  if (password !== retypePassword) {
    alert("Passwords do not match.");
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.username === username);
  if (user) {
    alert("Username already exists.");
    return;
  }
  const newId = Math.max (...users.map(u => u.id || 0)) + 1;
  users.push({ id: newId, username, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('loggedInUser', username); 
  alert("Account created successfully!");

  document.getElementById('signUpModal').style.display = 'none';
  document.getElementById('signUpForm').reset();
  document.body.style.overflow = '';

  if (pendingModalId) {
    const modal = document.getElementById(pendingModalId);
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
    pendingModalId = null;
  }
});
// =================== DEMO FORGOT PASSWORD ===================
document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const identifier = document.getElementById('resetUsernameEmail').value.trim();
  const newPassword = document.getElementById('newResetPassword').value;
  const retypePassword = document.getElementById('retypeResetPassword').value;

  if (newPassword !== retypePassword) {
    alert("Passwords do not match.");
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  let userFound = false;
    const user = users.find(u => u.username === identifier|| u.email === identifier);
    if (user) {
      user.password = newPassword;
      userFound = true;
    }
  if (userFound) {
    localStorage.setItem('users', JSON.stringify(users));
    alert("Password reset successfully.");
    forgotPasswordModal.style.display = 'none';
    document.body.style.overflow = '';
    document.getElementById('forgotPasswordForm').reset();
  } else {
    alert("Username or Email not found.");
  }
});


// =================== DEMO LOGIN ===================
document.getElementById('userLoginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const usernameOrEmail = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password);

  if (user) {
    alert(`Welcome, ${user.username}!`);
    localStorage.setItem('loggedInUser', user.username);
    document.getElementById('userModal').style.display = 'none';
    document.getElementById('userLoginForm').reset();
    document.body.style.overflow = '';

    if (pendingModalId) {
      const modal = document.getElementById(pendingModalId);
      if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
      pendingModalId = null;
    }

  } else {
    alert("Invalid username or password.");
  }
});

// ================NAVIGATION LINK PROTECTION================
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('#navlinks'); 

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (!loggedInUser) {
        event.preventDefault(); 
        userModal.style.display = 'block'; 
        document.body.style.overflow = 'hidden';
        alert("Please sign in or sign up to access this page.");
      }
    });
  });
});

// =================== TRANSACTION MODAL ===================
const transactionBtn = document.getElementById('transactionBtn');
const transactionModal = document.getElementById('transactionModal');
const closeTransactionModal = document.getElementById('closeTransactionModal');
const transactionTable = document.getElementById('transaction-table');

transactionBtn.addEventListener('click', () => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.username === loggedInUser);
  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

  transactionTable.innerHTML = `
    <tr>
      <th>Bike Model</th>
      <th>Rental Start</th>
      <th>Rental End</th>
      <th>Purchased</th>
    </tr>
  `;

  transactions
    .filter(t => t.email === user?.email)
    .forEach(t => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${t.bikeModel}</td>
        <td>${t.rentalStartDate}</td>
        <td>${t.rentalEndDate}</td>
        <td>${t.rentalAmount}</td>
      `;
      transactionTable.appendChild(row);
    });

  transactionModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

closeTransactionModal.addEventListener('click', () => {
  transactionModal.style.display = 'none';
  document.body.style.overflow = '';
});

window.addEventListener('click', (e) => {
  if (e.target === transactionModal) {
    transactionModal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// ================DARK MODE TOGGLE================

document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  const toggle = document.getElementById('darkModeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    });
  }
});

// ================ LOG OUT ======================

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('loggedInUser');
  userMenuPopup.style.display = 'none';
  alert("You have been logged out.");
});




