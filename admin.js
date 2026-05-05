fetch("/api/orders")
.then(res => res.json())
.then(data => {

    const table = document.getElementById("ordersBody");

    data.forEach(order => {

        const row = `
        <tr>
        <td>${order.name}</td>
        <td>${order.phone}</td>
        <td>${order.address}</td>
        <td>${order.payment}</td>
        <td>₹${order.total}</td>
        </tr>
        `;

        table.innerHTML += row;

    });

});