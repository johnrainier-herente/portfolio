let archives = { 'Quiz': [], 'Lab': [], 'Exam': [] };

window.onload = () => { 
    ['Quiz', 'Lab', 'Exam'].forEach(updateDashboard); 
};

function showPage(pId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pId).classList.add('active');
    document.querySelectorAll('nav ul li a').forEach(a => a.classList.remove('active'));
    document.getElementById('link-' + pId).classList.add('active');
}

function openModal(src) {
    document.getElementById('modalImg').src = src;
    document.getElementById('imageModal').style.display = 'flex';
}

function closeModal() { 
    document.getElementById('imageModal').style.display = 'none'; 
}

function handleUpload(cat) {
    const pre = cat.toLowerCase();
    const t = document.getElementById(pre + '-title');
    const s = document.getElementById(pre + '-score');
    const p = document.getElementById(pre + '-proof');

    if (!p.files) { 
        alert("Please select an image"); 
        return; 
    }

    const file = p.files;
    const reader = new FileReader();

    reader.onload = function(e) {
        archives[cat].push({
            title: t.value || "Untitled",
            score: s.value || "N/A",
            fileName: file.name,
            proofSrc: e.target.result,
            date: new Date().toLocaleDateString()
        });
        updateDashboard(cat);
        showPage('dashboard');
        t.value = ""; 
        s.value = ""; 
        p.value = "";
    };
    
    reader.readAsDataURL(file);
}

function updateDashboard(cat) {
    const list = document.getElementById('list-' + cat);
    document.getElementById('count-' + cat).innerText = archives[cat].length;
    list.innerHTML = "";
    archives[cat].forEach(item => {
        list.innerHTML += `
            <div class="entry-card">
                <img src="${item.proofSrc}" class="entry-img" onclick="openModal('${item.proofSrc}')">
                <div class="card-info">
                    <strong>${item.title}</strong>
                    <span class="score-badge">${item.score}</span>
                </div>
                <div class="file-name">File: ${item.fileName}</div>
                <div class="date-stamp">${item.date}</div>
            </div>`;
    });
}