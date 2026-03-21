let sortKey = 'weeklyScore';
let sortDir = 'desc';

function renderTable() {
    const tbody = document.querySelector('#ranking-table tbody');
    tbody.innerHTML = '';
    users.forEach((u, i) => {
        const rank = i + 1;
        const isCurrentUser = u.username === window.currentUsername;
        tbody.innerHTML += `<tr${isCurrentUser ? ' class="current-user-row"' : ''} style="animation-delay: ${i * 0.07}s">
      <td>${getRankDisplay(rank)}</td>
      <td class="avatar-cell">
        <img src="${u.avatar}" alt="${u.username} avatar">
      </td>
      <td class="username-cell">${u.username}</td>
      <td>${u.level}</td>
      <td>${u.weeklyScore}</td>
    </tr>`;
    });
}


function sortTable(key) {
    sortKey = key;
    sortDir = 'desc';
    users.sort((a, b) => {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
        return 0;
    });
    renderTable();
}

async function fetchAndRenderLeaderboard(sortKey = 'weeklyScore') {
    const res = await fetch(`/api/leaderboard?sort=${sortKey}`);
    const data = await res.json();
    users = data;
    renderTable();

    // Animate rows
    const tbody = document.querySelector('#ranking-table tbody');
    Array.from(tbody.children).forEach((tr, i) => {
        setTimeout(() => {
            tr.classList.add('fade-in');
        }, i * 70);
    });

    // Show user position
    fetchAndShowUserPosition(sortKey);
}

function setActiveHeader(colIndex) {
    document.querySelectorAll('#ranking-table th .th-active-indicator').forEach((span, i) => {
        if (i === colIndex - 3) { // Adjust index if needed (depends on your table structure)
            span.classList.add('active');
        } else {
            span.classList.remove('active');
        }
    });
}

async function fetchAndShowUserPosition(sortKey = 'score') {
    try {
        // Only allow 'level' or 'weeklyScore' as sortKey
        let sort = (sortKey === 'level') ? 'level' : 'weeklyScore';
        const res = await fetch(`/api/leaderboard/position?sort=${sort}`);
        if (!res.ok) return;
        const { position } = await res.json();
        const num = document.getElementById('user-position-number');
        num.textContent = position ?? '';
    } catch (e) {
        const num = document.getElementById('user-position-number');
        num.textContent = '';
    }
}

function getRankDisplay(rank) {
    if (rank === 1) {
        return `<span class="rank-badge gold">${rank}</span>`;
    } else if (rank === 2) {
        return `<span class="rank-badge silver">${rank}</span>`;
    } else if (rank === 3) {
        return `<span class="rank-badge bronze">${rank}</span>`;
    }
    return `<span class="rank-badge">${rank}</span>`;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderLeaderboard('weeklyScore');
    // Level column (index 3)
    document.querySelector('#ranking-table th:nth-child(4)').addEventListener('click', () => {
        fetchAndRenderLeaderboard('level');
        setActiveHeader(3);
    });
    // Weekly Score column (index 4)
    document.querySelector('#ranking-table th:nth-child(5)').addEventListener('click', () => {
        fetchAndRenderLeaderboard('weeklyScore');
        setActiveHeader(4);
    });
    // Set initial active header
    setActiveHeader(4);
});