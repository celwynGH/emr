let records = JSON.parse(localStorage.getItem("proEMR")) || [];

function saveToStorage() {
  localStorage.setItem("proEMR", JSON.stringify(records));
}

function saveRecord() {
  const nameInput = document.getElementById("name").value.trim();

  if (nameInput === "") {
    alert("Patient name is required");
    return;
  }

  const record = {
    name: nameInput,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    bp: document.getElementById("bp").value,
    hr: document.getElementById("hr").value,
    temp: document.getElementById("temp").value,
    diagnosis: document.getElementById("diagnosis").value,
    medication: document.getElementById("medication").value,
    notes: document.getElementById("notes").value,
    date: new Date().toLocaleString()
  };

  const editIndex = document.getElementById("editIndex").value;

  if (editIndex === "") {
    records.push(record);
  } else {
    records[editIndex] = record;
  }

  document.getElementById("editIndex").value = "";
  clearForm();
  saveToStorage();
  render();
}

function clearForm() {
  document.querySelectorAll(".form-section input, .form-section textarea, .form-section select")
    .forEach(el => el.value = "");
}

function deleteRecord(index) {
  if (confirm("Delete this record?")) {
    records.splice(index, 1);
    saveToStorage();
    render();
  }
}

function editRecord(index) {
  const r = records[index];

  document.getElementById("name").value = r.name;
  document.getElementById("age").value = r.age;
  document.getElementById("gender").value = r.gender;
  document.getElementById("bp").value = r.bp;
  document.getElementById("hr").value = r.hr;
  document.getElementById("temp").value = r.temp;
  document.getElementById("diagnosis").value = r.diagnosis;
  document.getElementById("medication").value = r.medication;
  document.getElementById("notes").value = r.notes;

  document.getElementById("editIndex").value = index;
}

function printRecord(index) {
  const r = records[index];

  const div = document.createElement("div");
  div.className = "printable";

  div.innerHTML = `
    <div style="text-align:center; border-bottom:2px solid black; padding-bottom:10px;">
      <img src="images/clinic-logo.png" style="height:70px;"><br>
      <h2>CELWYN MEDICAL CLINIC</h2>
      <p>123 Hanap-hanapin Street, Di-matagpuan City, Philippines 1000</p>
      <p>📞 +63 912 345 6789 | ✉ celwynclinic@email.com</p>
    </div>

    <h3 style="margin-top:20px;">PATIENT MEDICAL RECORD</h3>

    <p><strong>Name:</strong> ${r.name}</p>
    <p><strong>Age:</strong> ${r.age}</p>
    <p><strong>Gender:</strong> ${r.gender}</p>
    <p><strong>Date:</strong> ${r.date}</p>

    <hr>

    <h4>Vital Signs</h4>
    <p>Blood Pressure: ${r.bp}</p>
    <p>Heart Rate: ${r.hr}</p>
    <p>Temperature: ${r.temp}</p>

    <hr>

    <h4>Clinical Details</h4>
    <p><strong>Diagnosis:</strong> ${r.diagnosis}</p>
    <p><strong>Medication:</strong> ${r.medication}</p>
    <p><strong>Notes:</strong><br>${r.notes}</p>

    <br><br><br>

    <div style="margin-top:50px;">
      _____________________________<br>
      Dr. Celwyn A. Panis<br>
      License No: ____________
    </div>
  `;

  document.body.appendChild(div);
  window.print();
  document.body.removeChild(div);
}

//start for PDF export
function exportPDF(i) {
  const r = records[i];
  const pdf = document.getElementById("pdfContent");

  pdf.style.display = "block";
  pdf.style.width = "794px";   // A4 width only
  pdf.style.padding = "40px";
  pdf.style.background = "white";
  pdf.style.color = "black";

  pdf.innerHTML = `
    <div style="text-align:center; border-bottom:2px solid black; padding-bottom:10px;">
      <img src="images/clinic-logo.png" style="height:70px;"><br>
      <h2>CELWYN MEDICAL CLINIC</h2>
      <p>123 Hanap-hanapin Street, Di-matagpuan City, Philippines 1000</p>
      <p>📞 +63 912 345 6789 | ✉ celwynclinic@email.com</p>
    </div>

    <h3 style="margin-top:25px;">PATIENT MEDICAL RECORD</h3>

    <p><strong>Name:</strong> ${r.name}</p>
    <p><strong>Age:</strong> ${r.age}</p>
    <p><strong>Gender:</strong> ${r.gender}</p>
    <p><strong>Date:</strong> ${r.date}</p>

    <hr>

    <h4>Vital Signs</h4>
    <p>Blood Pressure: ${r.bp}</p>
    <p>Heart Rate: ${r.hr}</p>
    <p>Temperature: ${r.temp}</p>

    <hr>

    <h4>Clinical Details</h4>
    <p><strong>Diagnosis:</strong> ${r.diagnosis}</p>
    <p><strong>Medication:</strong> ${r.medication}</p>
    <p><strong>Notes:</strong><br>${r.notes}</p>

    <br><br><br>

    <div style="margin-top:60px;">
      _____________________________<br>
      Dr. Celwyn A. Panis<br>
      License No: ____________
    </div>
  `;

  html2pdf().set({
    margin: 0,
    filename: `EMR_${r.name}.pdf`,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 1, scrollY: 0 },
    jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all'] }   // 🔥 THIS FIXES THE SPLIT
  })
  .from(pdf)
  .save()
  .then(() => {
    pdf.style.display = "none";
  });
}



//end for PDF export

function render() {
  const search = document.getElementById("search").value.toLowerCase();
  const container = document.getElementById("records");
  container.innerHTML = "";

  const filtered = records.filter(r =>
    r.name.toLowerCase().includes(search)
  );

  document.getElementById("totalPatients").innerText = records.length;

  filtered.forEach((r, i) => {
    container.innerHTML += `
      <div class="record-card">
        <h3>${r.name}</h3>
        <p>${r.diagnosis}</p>
        <small>${r.date}</small>
        <div class="actions">
          <button onclick="editRecord(${i})">Edit</button>
          <button onclick="printRecord(${i})">Print</button>
          <button onclick="exportPDF(${i})">Export PDF</button>
          <button onclick="deleteRecord(${i})">Delete</button>
        </div>
      </div>
    `;
  });
}

render();
