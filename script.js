document.addEventListener('DOMContentLoaded', () => {
    const saleOrders = [
        { id: 1, customer: 'John Doe', date: '2024-07-20', status: 'Shipped', total: '$1000' },
        { id: 2, customer: 'Jane Smith', date: '2024-07-21', status: 'Pending', total: '$500' },
        // Add more orders here as needed
    ];

    const tableBody = document.querySelector('#saleOrderTable tbody');
    const addOrderButton = document.getElementById('addOrderButton');

    function populateTable() {
        tableBody.innerHTML = '';
        saleOrders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.date}</td>
                <td>${order.status}</td>
                <td>${order.total}</td>
                <td><button class="view-details" data-id="${order.id}">View</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    addOrderButton.addEventListener('click', () => {
        const newOrder = {
            id: saleOrders.length + 1,
            customer: prompt('Enter customer name:'),
            date: prompt('Enter date (YYYY-MM-DD):'),
            status: prompt('Enter status:'),
            total: prompt('Enter total amount:')
        };
        saleOrders.push(newOrder);
        populateTable();
    });

    populateTable();
});

