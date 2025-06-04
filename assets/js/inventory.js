const bikesModel = [
    {id: 1, model: 'Mountain Bike', stocks: 0 },
    {id: 2, model: 'Road Bike', stocks: 0 },
    {id: 3, model: 'Hybrid Bike', stocks: 0 },
    {id: 4, model: 'BMX Bike', stocks: 0 },
    {id: 5, model: 'E-Bike', stocks: 0 },
    {id: 6, model: 'Kids Bike', stocks: 0 },
    {id: 7, model: 'Cruiser Bike', stocks: 0 },
    {id: 8, model: 'Gravel Bike', stocks: 0 },
    {id: 9, model: 'Folding Bike', stocks: 0 },
]
if (!localStorage.getItem('bikes')) {
    localStorage.setItem('bikes', JSON.stringify(bikesModel));
}
function renderInventory() {
    var bikes = JSON.parse(localStorage.getItem('bikes')) || [];
    var table = document.getElementById('management-table');
    while (table.rows.length > 1) table.deleteRow(1);
    bikes.forEach(b => {
        var newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${b.id || ''}</td>
            <td>${b.model}</td>
            <td>${b.stocks}</td>
            <td>
                <input type="number" value="${b.stocks}" min="0" class="stock-input" />
            </td>
            <td>
                <button class="update-btn">Update</button>
            </td>
        `;
        newRow.querySelector('.update-btn').addEventListener('click', function() {
            var input = newRow.querySelector('.stock-input');
            var updatedStocks = parseInt(input.value, 10);
            var bikeIndex = bikes.findIndex(bike => bike.id === b.id);
            if (bikeIndex !== -1) {
                bikes[bikeIndex].stocks = updatedStocks;
                localStorage.setItem('bikes', JSON.stringify(bikes));
                renderInventory();
            } 
        });
    });
}
renderInventory();
