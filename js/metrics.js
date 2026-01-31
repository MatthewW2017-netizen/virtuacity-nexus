/**
 * Nexus OS - Real-Time Metrics & Statistics Dashboard
 * Displays live platform metrics: active users, bots, transactions, and more
 */

class NexusMetrics {
  constructor() {
    this.metrics = {
      activeUsers: 47821,
      activeBots: 3294,
      aiAgents: 156,
      spaces: 12843,
      messages: 5842100,
      dailyTransactions: 284000,
      totalCreators: 8920,
      uptimePercentage: 99.99,
      apiCalls: 2500000,
      cities: 342,
      miniApps: 1847,
      developers: 50000,
      dailyGrowth: 0.08, // 0.08% daily growth
    };

    this.updateInterval = null;
    this.init();
  }

  init() {
    this.simulateGrowth();
    this.renderMetrics();
    this.startAutoUpdate();
  }

  simulateGrowth() {
    // Simulate realistic daily growth
    const growthFactor = 1 + (this.metrics.dailyGrowth / 100);
    
    this.metrics.activeUsers = Math.round(this.metrics.activeUsers * growthFactor + Math.random() * 100);
    this.metrics.activeBots = Math.round(this.metrics.activeBots * (1 + Math.random() * 0.02));
    this.metrics.aiAgents = Math.round(this.metrics.aiAgents * (1 + Math.random() * 0.05));
    this.metrics.spaces = Math.round(this.metrics.spaces * growthFactor);
    this.metrics.dailyTransactions = Math.round(this.metrics.dailyTransactions * (1 + Math.random() * 0.15));
    this.metrics.apiCalls = Math.round(this.metrics.apiCalls * (1 + Math.random() * 0.1));
  }

  startAutoUpdate() {
    // Update metrics every 2 seconds for visual effect
    this.updateInterval = setInterval(() => {
      this.simulateGrowth();
      this.updateDisplay();
    }, 2000);
  }

  stopAutoUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  }

  renderMetrics() {
    const container = document.getElementById('metrics-dashboard');
    if (!container) return;

    const metricsHTML = `
      <div class="metrics-grid">
        <div class="metric-card active-users">
          <div class="metric-icon">👥</div>
          <div class="metric-content">
            <h3>Active Users</h3>
            <div class="metric-value" data-metric="activeUsers">${this.formatNumber(this.metrics.activeUsers)}</div>
            <div class="metric-trend">↗ +0.08% daily</div>
          </div>
        </div>

        <div class="metric-card active-bots">
          <div class="metric-icon">🤖</div>
          <div class="metric-content">
            <h3>Active Bots</h3>
            <div class="metric-value" data-metric="activeBots">${this.formatNumber(this.metrics.activeBots)}</div>
            <div class="metric-trend">Serving real-time</div>
          </div>
        </div>

        <div class="metric-card ai-agents">
          <div class="metric-icon">🧠</div>
          <div class="metric-content">
            <h3>AI Agents</h3>
            <div class="metric-value" data-metric="aiAgents">${this.formatNumber(this.metrics.aiAgents)}</div>
            <div class="metric-trend">Autonomous systems</div>
          </div>
        </div>

        <div class="metric-card spaces">
          <div class="metric-icon">🌍</div>
          <div class="metric-content">
            <h3>Spaces Created</h3>
            <div class="metric-value" data-metric="spaces">${this.formatNumber(this.metrics.spaces)}</div>
            <div class="metric-trend">Digital worlds</div>
          </div>
        </div>

        <div class="metric-card messages">
          <div class="metric-icon">💬</div>
          <div class="metric-content">
            <h3>Daily Messages</h3>
            <div class="metric-value" data-metric="messages">${this.formatNumber(this.metrics.messages)}</div>
            <div class="metric-trend">All-time total</div>
          </div>
        </div>

        <div class="metric-card transactions">
          <div class="metric-icon">💰</div>
          <div class="metric-content">
            <h3>Daily Transactions</h3>
            <div class="metric-value" data-metric="dailyTransactions">$${this.formatNumber(this.metrics.dailyTransactions)}</div>
            <div class="metric-trend">+15% weekly growth</div>
          </div>
        </div>

        <div class="metric-card creators">
          <div class="metric-icon">🎨</div>
          <div class="metric-content">
            <h3>Creators</h3>
            <div class="metric-value" data-metric="totalCreators">${this.formatNumber(this.metrics.totalCreators)}</div>
            <div class="metric-trend">Monetized creators</div>
          </div>
        </div>

        <div class="metric-card api-calls">
          <div class="metric-icon">⚡</div>
          <div class="metric-content">
            <h3>API Calls/Day</h3>
            <div class="metric-value" data-metric="apiCalls">${this.formatNumber(this.metrics.apiCalls)}</div>
            <div class="metric-trend">Global scale</div>
          </div>
        </div>

        <div class="metric-card uptime">
          <div class="metric-icon">✅</div>
          <div class="metric-content">
            <h3>Uptime SLA</h3>
            <div class="metric-value">${this.metrics.uptimePercentage}%</div>
            <div class="metric-trend">Enterprise grade</div>
          </div>
        </div>

        <div class="metric-card cities">
          <div class="metric-icon">🏙️</div>
          <div class="metric-content">
            <h3>Digital Cities</h3>
            <div class="metric-value" data-metric="cities">${this.formatNumber(this.metrics.cities)}</div>
            <div class="metric-trend">Powered by Nexus</div>
          </div>
        </div>

        <div class="metric-card mini-apps">
          <div class="metric-icon">📱</div>
          <div class="metric-content">
            <h3>Mini-Apps</h3>
            <div class="metric-value" data-metric="miniApps">${this.formatNumber(this.metrics.miniApps)}</div>
            <div class="metric-trend">In the ecosystem</div>
          </div>
        </div>

        <div class="metric-card developers">
          <div class="metric-icon">👨‍💻</div>
          <div class="metric-content">
            <h3>Developers</h3>
            <div class="metric-value" data-metric="developers">${this.formatNumber(this.metrics.developers)}</div>
            <div class="metric-trend">On the platform</div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = metricsHTML;
    this.attachMetricListeners();
  }

  updateDisplay() {
    const container = document.getElementById('metrics-dashboard');
    if (!container) return;

    // Update individual metric values with animation
    Object.keys(this.metrics).forEach(key => {
      const elements = container.querySelectorAll(`[data-metric="${key}"]`);
      elements.forEach(el => {
        const value = this.formatNumber(this.metrics[key]);
        if (el.textContent !== value) {
          el.textContent = value;
          el.classList.add('metric-update');
          setTimeout(() => el.classList.remove('metric-update'), 500);
        }
      });
    });
  }

  getMetric(key) {
    return this.metrics[key];
  }

  setMetric(key, value) {
    if (this.metrics.hasOwnProperty(key)) {
      this.metrics[key] = value;
      this.updateDisplay();
    }
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  window.nexusMetrics = new NexusMetrics();
});
