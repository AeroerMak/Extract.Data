
document.addEventListener("DOMContentLoaded", () => {
  const filter = document.getElementById("filter");
  const tableHeader = document.getElementById("tableHeader");
  const tableBody = document.getElementById("tableBody");
  const downloadBtn = document.getElementById("download");

  let companyData = [];

  fetch("companies_data.json")
    .then(response => response.json())
    .then(data => {
      companyData = data;
      renderTable("all");
    });

  filter.addEventListener("change", () => {
    renderTable(filter.value);
  });

  downloadBtn.addEventListener("click", () => {
    const element = document.getElementById("companyTable");
    html2pdf().from(element).save("company_data.pdf");
  });

  function renderTable(type) {
    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";

    let headers = ["company_name"];
    if (type === "all") {
      headers = ["company_name", "email", "phone", "address"];
    } else {
      headers.push(type);
    }

    headers.forEach(header => {
      const th = document.createElement("th");
      th.textContent = header.replace("_", " ").toUpperCase();
      tableHeader.appendChild(th);
    });

    companyData.forEach(company => {
      const tr = document.createElement("tr");
      headers.forEach(header => {
        const td = document.createElement("td");
        td.textContent = company[header] || "-";
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  }
});



document.getElementById("downloadExcel").addEventListener("click", () => {
  const table = document.getElementById("companyTable");

  // Convert table to worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(table);
  XLSX.utils.book_append_sheet(wb, ws, "Companies");

  // Export
  XLSX.writeFile(wb, "company_data.xlsx");
});



function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function scrollToBottom() {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }