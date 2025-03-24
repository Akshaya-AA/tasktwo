
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("beneficiaryForm");
    const tableBody = document.getElementById("beneficiaryTable");
    let editRow = null;

    function updateSerialNumbers() {
        const rows = tableBody.getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
            rows[i].cells[0].textContent = i + 1;
        }
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const sno = tableBody.getElementsByTagName("tr").length + 1;
        const name = document.getElementById("name").value;
        const relationship = document.getElementById("relationship").value;
        const dob = document.getElementById("dob").value;

        if (!name || !relationship || !dob) {
            alert("Please fill all fields!");
            return;
        }

        if (editRow) {
            editRow.cells[1].textContent = name;
            editRow.cells[2].textContent = relationship;
            editRow.cells[3].textContent = dob;
            editRow = null;
        } else {
            const newRow = tableBody.insertRow();
            newRow.innerHTML = `
                <td>${sno}</td>
                <td>${name}</td>
                <td>${relationship}</td>
                <td>${dob}</td>
                <td class="text-success">Active</td>
                <td>
                    <button class="btn btn-sm btn-secondary edit">Edit</button>
                    <button class="btn btn-sm btn-danger delete">Delete</button>
                </td>
            `;
        }

        updateSerialNumbers();
        form.reset();
    });

    tableBody.addEventListener("click", function(event) {
        if (event.target.classList.contains("edit")) {
            editRow = event.target.closest("tr");
            document.getElementById("name").value = editRow.cells[1].textContent;
            document.getElementById("relationship").value = editRow.cells[2].textContent;
            document.getElementById("dob").value = editRow.cells[3].textContent;
        }

        if (event.target.classList.contains("delete")) {
            event.target.closest("tr").remove();
            updateSerialNumbers();
        }
    });
});
