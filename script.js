let archives = {
            'Quiz': [
                { title: 'Quiz 1', score: '17/20', fileName: 'quiz1.jpg', proofSrc: 'quiz1.jpg', date: '02/26/2026' },
                { title: 'Quiz 2', score: '19/20', fileName: 'quiz2.jpg', proofSrc: 'quiz2.jpg', date: '02/26/2026' },
                { title: 'Quiz 3', score: '4/20', fileName: 'N/A', proofSrc: 'placeholder.png', date: '01/22/2026' },
                { title: 'Long Quiz', score: '43/45', fileName: 'longquiz1.jpg', proofSrc: 'longquiz1.jpg', date: '04/08/2026' }
            ],
            'Lab': [
                { title: 'Lab 1', score: 'N/A', fileName: 'N/A', proofSrc: 'placeholder.png', date: '01/12/2026' },
                { title: 'Lab 2', score: 'N/A', fileName: 'N/A', proofSrc: 'placeholder.png', date: '01/20/2026' }
            ],
            'Exam': [
                { title: 'Midterm Exam', score: 'N/A', fileName: 'N/A', proofSrc: 'placeholder.png', date: '04/16/2026' },
                { title: 'Finals Exam', score: 'N/A', fileName: 'N/A', proofSrc: 'placeholder.png', date: 'N/A' }
            ]
        };

        window.onload = () => { updateDashboard('Quiz'); updateDashboard('Lab'); updateDashboard('Exam'); };

        function showPage(pageId) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');
            document.querySelectorAll('nav ul li a').forEach(a => a.classList.remove('active'));
            const link = document.getElementById('link-' + pageId);
            if(link) link.classList.add('active');
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

            if (!p.files || !p.files[0]) {
                alert("Please select an image.");
                return;
            }

            const file = p.files[0];
            const imgUrl = URL.createObjectURL(file);

            archives[cat].push({
                title: t.value.trim() || "Untitled",
                score: s.value.trim() || "N/A",
                fileName: file.name,
                proofSrc: imgUrl,
                date: new Date().toLocaleDateString()
            });

            updateDashboard(cat);
            showPage('dashboard');
            t.value = ""; s.value = ""; p.value = "";
        }

        function updateDashboard(cat) {
            const list = document.getElementById('list-' + cat);
            document.getElementById('count-' + cat).innerText = archives[cat].length;
            list.innerHTML = "";
            archives[cat].forEach(item => {
                list.innerHTML += `
                    <div class="entry-card">
                        <img src="${item.proofSrc}" class="entry-img" onclick="openModal('${item.proofSrc}')" onerror="this.src='https://via.placeholder.com/200x130?text=No+Image'">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <strong style="color: white; font-size: 0.9rem;">${item.title}</strong>
                            <span style="color: bisque; font-size: 0.75rem; font-weight: bold; background: #363a36; padding: 2px 6px; border-radius: 4px;">${item.score}</span>
                        </div>
                        <div style="font-size: 0.7rem; color: #666; margin-top: 4px;">File: ${item.fileName}</div>
                        <div style="font-size: 0.7rem; color: #444;">${item.date}</div>
                    </div>
                `;
            });
        }
