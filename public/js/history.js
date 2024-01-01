fetch('/gethistory')
  .then(response => response.json())
  .then(data => {
    const historyTable = document.getElementById('historyTable');
    data.forEach(item => {
      const row = `
        <tr>
          <td>${item.bmi}</td>
          <td>${item.weight}</td>
          <td>${item.height}</td>
          <td>${item.timestamp}</td>
        </tr>
      `;
      historyTable.innerHTML += row;
    });
  });
