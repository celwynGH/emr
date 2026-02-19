let records = JSON.parse(localStorage.getItem("proEMR")) || [];

function saveToStorage() {
  localStorage.setItem("proEMR", JSON.stringify(records));
}
//from here
function saveRecord() {

  const nameInput = document.getElementById("name").value.trim();
  const ageInput = document.getElementById("age").value;
  const genderInput = document.getElementById("gender").value;
  const bpInput = document.getElementById("bp").value;
  const hrInput = document.getElementById("hr").value;
  const tempInput = document.getElementById("temp").value;
  const diagnosisInput = document.getElementById("diagnosis").value;
  const medicationInput = document.getElementById("medication").value;
  const notesInput = document.getElementById("notes").value;

  if (nameInput === "") {
    alert("Patient name is required");
    return;
  }

  const record = {
    name: nameInput,
    age: ageInput,
    gender: genderInput,
    bp: bpInput,
    hr: hrInput,
    temp: tempInput,
    diagnosis: diagnosisInput,
    medication: medicationInput,
    notes: notesInput,
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
} //end here


function clearForm() {
  document.querySelectorAll("input, textarea").forEach(el => el.value = "");
}

function deleteRecord(index) {
  if (confirm("Delete this record?")) {
    records.splice(index, 1);
    saveToStorage();
    render();
  }
}
//from here
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
//end here


//start here for print record

function printRecord(index) {

  const r = records[index];

  const div = document.createElement("div");
  div.className = "printable";

  div.innerHTML = `
    <div style="text-align:center; border-bottom:2px solid black; padding-bottom:10px;">
      <img src="images/clinic-logo.png" style="height:70px;"><br>
      <h2>CELWYN (char lang) MEDICAL CLINIC</h2>
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
      Dr. Celwyn A. Panis, (Char kaayo) 😂<br>
      License No: ____________
    </div>
  `;

  document.body.appendChild(div);
  window.print();
  document.body.removeChild(div);
}
//end here

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
          <button onclick="deleteRecord(${i})">Delete</button>
        </div>
      </div>
    `;
  });
}


<button onclick="exportPDF(${i})">Export PDF</button>

//for PDF EXPORT
function exportPDF(index) {

  const r = records[index];

  const element = document.createElement("div");

  element.innerHTML = `
    <div style="text-align:center; border-bottom:2px solid black; padding-bottom:10px;">
      <img src="images/clinic-logo.png" style="height:70px;"><br>
      <h2>CELWYN (char lang) MEDICAL CLINIC</h2>
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
      Dr. Celwyn A. Panis, (Char kaayo) 😂<br>
      License No: ____________
    </div>
  `;

  html2pdf().from(element).save(r.name + "_Medical_Record.pdf");
}


render();
