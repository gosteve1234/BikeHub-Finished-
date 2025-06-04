var users = JSON.parse(localStorage.getItem('users')) || [];
function renderUsers() {
    var table = document.getElementById('management-table');
    while (table.rows.length > 1) table.deleteRow(1);
    var users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => {
        var newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${user.id || ''}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        newRow.querySelector('.delete-btn').addEventListener('click', function() {
            users = users.filter(u => u.id !== user.id);
            localStorage.setItem('users', JSON.stringify(users));
            renderUsers();
        });
    });
}

renderUsers();