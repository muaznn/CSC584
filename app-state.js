// Application State Management
const appState = {
    currentUser: null,
    isLoggedIn: false,
    userRole: 'guest',
    currentPickupDetails: null,
    
    sampleData: {
        users: [
            { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 123-4567', address: '123 Green Street', role: 'user' },
            { id: 2, name: 'Admin User', email: 'admin@recyclehub.com', phone: '+1 (555) 987-6543', address: '456 Admin Avenue', role: 'admin' }
        ],
        pickups: [
            { id: 1, userId: 1, date: '2023-12-15', time: 'morning', materials: ['paper', 'plastic'], weights: { paper: 5, plastic: 3 }, status: 'scheduled', collector: null },
            { id: 2, userId: 1, date: '2023-12-08', time: 'afternoon', materials: ['glass', 'metal'], weights: { glass: 8, metal: 4 }, status: 'completed', collector: 'Mike Johnson', finalWeight: 12, co2Saved: 16 }
        ],
        collectors: [
            { id: 1, name: 'Mike Johnson', status: 'available' },
            { id: 2, name: 'Sarah Williams', status: 'busy' }
        ]
    },
    
    rewardsData: {
        rewards: [
            { id: 1, name: "Free Coffee", description: "Get a free coffee at Green Beans Cafe", points: 100, category: "food", partner: "Green Beans Cafe" },
            { id: 2, name: "Bus Voucher", description: "One-day free bus pass for city transit", points: 150, category: "transport", partner: "City Transit" },
            { id: 3, name: "10% Grocery Discount", description: "10% off your total purchase at EcoMart", points: 200, category: "shopping", partner: "EcoMart" },
            { id: 4, name: "Movie Ticket", description: "One free movie ticket at Cinema Verde", points: 250, category: "entertainment", partner: "Cinema Verde" },
            { id: 5, name: "Plant Sapling", description: "Get a free plant sapling for your garden", points: 50, category: "garden", partner: "Green Thumb Nursery" },
            { id: 6, name: "Reusable Bottle", description: "Eco-friendly stainless steel water bottle", points: 300, category: "merchandise", partner: "RecycleHub Store" }
        ],
        userRewards: [],
        ranks: [
            { name: "Bronze", minPoints: 0, color: "#cd7f32" },
            { name: "Silver", minPoints: 1000, color: "#c0c0c0" },
            { name: "Gold", minPoints: 2500, color: "#ffd700" },
            { name: "Platinum", minPoints: 5000, color: "#e5e4e2" }
        ],
        currentRewardRedemption: null
    }
};

// Helper Functions
function showAlert(containerId, message, type) {
    const container = document.getElementById(containerId);
    if (container) {
        container.textContent = message;
        container.className = `alert alert-${type}`;
        container.style.display = 'block';
        
        setTimeout(() => {
            container.style.display = 'none';
        }, 5000);
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function updateNavigation() {
    const navMenu = document.getElementById('nav-menu');
    if (!navMenu) return;
    
    navMenu.innerHTML = '';
    
    if (appState.isLoggedIn) {
        if (appState.userRole === 'admin' || appState.userRole === 'collector') {
            navMenu.innerHTML += `
                <li><a href="admin-dashboard.html">Dashboard</a></li>
                <li><a href="all-requests.html">All Requests</a></li>

            `;
        } else {
            navMenu.innerHTML += `
                <li><a href="user-dashboard.html">Dashboard</a></li>
                <li><a href="request-pickup.html">Schedule Pickup</a></li>
                <li><a href="pickup-history.html">History</a></li>
                <li><a href="profile.html">Profile</a></li>
                <li><a href="rewards.html">Rewards</a></li>
            `;
        }
    }
}

function updateUserDisplay() {
    if (appState.currentUser) {
        const userDisplay = document.getElementById('user-display');
        const userRole = document.getElementById('user-role');
        
        if (userDisplay) userDisplay.textContent = appState.currentUser.name;
        if (userRole) userRole.textContent = appState.currentUser.role;
    }
}

function logout() {
    appState.currentUser = null;
    appState.isLoggedIn = false;
    appState.userRole = 'guest';
    localStorage.removeItem('recycleHubUser');
    window.location.href = 'login.html';
}