document.addEventListener("DOMContentLoaded", function () {
  // =================== USER LOGIN MODAL ===================
  const userIcon = document.getElementById('userIcon');
  const userModal = document.getElementById('userModal');
  const closeUserModal = document.querySelector('.close-user-modal');
  const userMenuPopup = document.getElementById('userMenuPopup');

  if (userIcon && userModal && closeUserModal && userMenuPopup) {
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
      if (event.target === userModal) {
        userModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  // =================== SIGN UP MODAL ===================
  const signUpBtn = document.querySelector('.signup-btn');
  const signUpModal = document.getElementById('signUpModal');
  const closeSignUpModal = document.querySelector('.close-signup-modal');

  if (signUpBtn && userModal && signUpModal && closeSignUpModal) {
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
  }

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

  if (profileBtn && profileModal && closeProfileModal && profileImage && profileUsername && profileEmail) {
    profileBtn.addEventListener('click', () => {
      const loggedInUser = localStorage.getItem('loggedInUser');
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userData = users.find(u => u.username === loggedInUser);

      if (userData) {
        profileImage.src = userData.profileImage || 'assets/img/usericon.png';
        const menuProfileImage = document.getElementById('menuProfileImage');
        if (menuProfileImage) {
          menuProfileImage.src = userData.profileImage || 'assets/img/usericon.png';
        }
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
  }

  if (editPictureBtn && pictureOptionsModal && closePictureOptions && takePhotoBtn && pickFromAlbumBtn && fileInput) {
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

          stream.getTracks().forEach(track => track.stop());

          modalContent.innerHTML = '';
          const imagePreview = document.createElement('img');
          imagePreview.src = imageData;
          imagePreview.style.width = '70%';
          imagePreview.style.maxHeight = '300px';
          modalContent.appendChild(imagePreview);

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

        if (profileImage) profileImage.src = imageData;
        const menuProfileImage = document.getElementById('menuProfileImage');
        if (menuProfileImage) menuProfileImage.src = imageData;
      }
    }
  }

  // =================== FORGOT PASSWORD MODAL ===================
  const forgotPasswordLink = document.querySelector('.forgot-password a');
  const forgotPasswordModal = document.getElementById('forgotPasswordModal');
  const closeForgotModal = document.querySelector('.close-forgot-modal');

  if (forgotPasswordLink && userModal && forgotPasswordModal && closeForgotModal) {
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
  }

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
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}

document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
});


  // =================== USER LOGOUT ===================
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('loggedInUser');
  userMenuPopup.style.display = 'none';
  alert("You have been logged out.");
  window.location.href = 'index.html'; // Redirect to home page
  document.body.style.overflow = '';});
});
