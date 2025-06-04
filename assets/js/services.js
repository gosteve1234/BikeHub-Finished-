var users = JSON.parse(localStorage.getItem('users')) || [];
function renderTransaction() {
    var table = document.getElementById('management-table');
    while (table.rows.length > 1) table.deleteRow(1);
    var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(t => {
        var newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${t.id || ''}</td>
            <td>${t.email}</td>
            <td>${t.bikeModel}</td>
            <td>${t.rentalStartDate}</td>
            <td>${t.rentalEndDate}</td>
            <td>${t.rentalAmount}</td>   
                <button class="delete-btn">Delete</button>
            </td>
        `;
        newRow.querySelector('.delete-btn').addEventListener('click', function() {
            const up = transactions.filter(tr => tr.id !== t.id);
            localStorage.setItem('transactions', JSON.stringify(up));
            renderTransaction();
        });
    });
}

renderTransaction();