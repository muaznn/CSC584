let currentUser = JSON.parse(localStorage.getItem('recycleHubUser'));

function initPage(requiredRole) {
    if (!currentUser) window.location.href = 'login.html';
    if (requiredRole && currentUser.role !== requiredRole) window.location.href = 'login.html';
    renderHeader();
}

function getPickups() {
    return JSON.parse(localStorage.getItem('rh_pickups')) || [
        { id: 1, userId: 1, date: '2023-12-01', status: 'completed', finalWeight: 10, co2Saved: 13 },
        { id: 2, userId: 1, date: '2023-12-15', status: 'pending' }
    ];
}

function renderHeader() {
    const navItems = currentUser.role === 'admin' ? 
        `<li><a href="dashboard_admin.html">Dashboard</a></li><li><a href="login.html" onclick="localStorage.clear()">Logout</a></li>` :
        `<li><a href="dashboard_user.html">Dashboard</a></li><li><a href="pickup_request.html">Schedule</a></li><li><a href="rewards.html">Rewards</a></li><li><a href="login.html" onclick="localStorage.clear()">Logout</a></li>`;

    document.getElementById('header-container').innerHTML = `
        <header><div class="container header-content">
            <div class="logo">♻️ RecycleHub</div>
            <nav><ul>${navItems}</ul></nav>
            <div class="user-menu">${currentUser.name} (${currentUser.role})</div>
        </div></header>`;
}