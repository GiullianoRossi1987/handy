<template>
  <div class="scheduled-jobs">
    <!-- Header -->
    <div class="jobs-header">
      <div class="header-content">
        <h1 class="page-title">Scheduled Jobs</h1>
        <p class="page-subtitle">Manage your upcoming service appointments</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" @click="showAddJobModal = true">
          <i class="fas fa-plus"></i>
          Add New Job
        </button>
        <div class="view-toggle">
          <button
            class="toggle-btn"
            :class="{ active: viewMode === 'list' }"
            @click="viewMode = 'list'"
          >
            <i class="fas fa-list"></i>
          </button>
          <button
            class="toggle-btn"
            :class="{ active: viewMode === 'calendar' }"
            @click="viewMode = 'calendar'"
          >
            <i class="fas fa-calendar"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon pending">
          <i class="fas fa-clock"></i>
        </div>
        <div class="stat-info">
          <div class="stat-number">{{ stats.pending }}</div>
          <div class="stat-label">Pending</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon confirmed">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="stat-info">
          <div class="stat-number">{{ stats.confirmed }}</div>
          <div class="stat-label">Confirmed</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon today">
          <i class="fas fa-calendar-day"></i>
        </div>
        <div class="stat-info">
          <div class="stat-number">{{ stats.today }}</div>
          <div class="stat-label">Today</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon revenue">
          <i class="fas fa-dollar-sign"></i>
        </div>
        <div class="stat-info">
          <div class="stat-number">R$ {{ stats.estimatedRevenue }}</div>
          <div class="stat-label">Estimated Revenue</div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="filters-section">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search jobs by client or service..."
          class="search-input"
        />
      </div>
      <div class="filter-controls">
        <select v-model="statusFilter" class="filter-select">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select v-model="dateFilter" class="filter-select">
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
        <button class="btn btn-outline" @click="clearFilters">
          <i class="fas fa-times"></i>
          Clear
        </button>
      </div>
    </div>

    <!-- Jobs List View -->
    <div v-if="viewMode === 'list'" class="jobs-list">
      <div class="list-header">
        <div class="header-item client">Client & Service</div>
        <div class="header-item date">Date & Time</div>
        <div class="header-item value">Value</div>
        <div class="header-item status">Status</div>
        <div class="header-item actions">Actions</div>
      </div>

      <div class="jobs-container">
        <div
          v-for="job in filteredJobs"
          :key="job.id"
          class="job-card"
          :class="`status-${job.status}`"
        >
          <div class="job-client">
            <div class="client-avatar">
              {{ getInitials(job.clientName) }}
            </div>
            <div class="client-info">
              <div class="client-name">{{ job.clientName }}</div>
              <div class="service-type">{{ job.serviceType }}</div>
              <div class="job-address">
                <i class="fas fa-map-marker-alt"></i>
                {{ job.address }}
              </div>
            </div>
          </div>

          <div class="job-date">
            <div class="date-display">
              <i class="fas fa-calendar"></i>
              {{ formatDate(job.scheduledDate) }}
            </div>
            <div class="time-display">
              <i class="fas fa-clock"></i>
              {{ job.scheduledTime }}
            </div>
            <div v-if="isToday(job.scheduledDate)" class="today-badge">Today</div>
          </div>

          <div class="job-value">
            <div class="value-amount">R$ {{ job.value }}</div>
            <div v-if="job.paymentMethod" class="payment-method">
              {{ job.paymentMethod }}
            </div>
          </div>

          <div class="job-status">
            <span class="status-badge" :class="job.status">
              {{ getStatusText(job.status) }}
            </span>
          </div>

          <div class="job-actions">
            <button
              v-if="job.status === 'pending'"
              class="action-btn confirm"
              @click="confirmJob(job.id)"
              title="Confirm Job"
            >
              <i class="fas fa-check"></i>
            </button>
            <button class="action-btn edit" @click="editJob(job)" title="Edit Job">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete" @click="deleteJob(job.id)" title="Delete Job">
              <i class="fas fa-trash"></i>
            </button>
            <button class="action-btn view" @click="viewJobDetails(job)" title="View Details">
              <i class="fas fa-eye"></i>
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredJobs.length === 0" class="empty-state">
          <i class="fas fa-calendar-times"></i>
          <h3>No jobs found</h3>
          <p>No scheduled jobs match your current filters.</p>
          <button class="btn btn-primary" @click="clearFilters">Clear Filters</button>
        </div>
      </div>
    </div>

    <!-- Calendar View -->
    <div v-if="viewMode === 'calendar'" class="calendar-view">
      <div class="calendar-header">
        <button class="nav-btn" @click="previousWeek">
          <i class="fas fa-chevron-left"></i>
        </button>
        <h3 class="current-week">{{ currentWeekRange }}</h3>
        <button class="nav-btn" @click="nextWeek">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <div class="week-view">
        <div
          v-for="day in weekDays"
          :key="day.date"
          class="day-column"
          :class="{ today: isToday(day.date) }"
        >
          <div class="day-header">
            <div class="day-name">{{ day.name }}</div>
            <div class="day-date">{{ day.date }}</div>
          </div>
          <div class="day-jobs">
            <div
              v-for="job in getJobsForDate(day.date)"
              :key="job.id"
              class="calendar-job"
              :class="`status-${job.status}`"
              @click="viewJobDetails(job)"
            >
              <div class="job-time">{{ job.scheduledTime }}</div>
              <div class="job-client-name">{{ job.clientName }}</div>
              <div class="job-service">{{ job.serviceType }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Job Modal -->
    <div v-if="showAddJobModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add New Job</h3>
          <button class="close-btn" @click="showAddJobModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <!-- Add job form would go here -->
          <p>Job creation form will be implemented here...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
type Job = {
  id: number;
  clientName: string;
  serviceType: string;
  scheduledDate: string;
  scheduledTime: string;
  value: number;
  status: string;
  address: string;
  paymentMethod: string;
};
export default {
  name: 'ScheduleJobs',
  data() {
    return {
      viewMode: 'list',
      searchQuery: '',
      statusFilter: 'all',
      dateFilter: 'all',
      showAddJobModal: false,
      currentWeek: new Date(),
      jobs: [
        {
          id: 1,
          clientName: 'Maria Silva',
          serviceType: 'Home Cleaning',
          scheduledDate: '2024-01-15',
          scheduledTime: '09:00',
          value: 120.0,
          status: 'confirmed',
          address: 'Av. Paulista, 1000 - São Paulo',
          paymentMethod: 'Cash',
        },
        {
          id: 2,
          clientName: 'João Santos',
          serviceType: 'Plumbing Repair',
          scheduledDate: '2024-01-15',
          scheduledTime: '14:30',
          value: 200.0,
          status: 'pending',
          address: 'Rua Augusta, 500 - São Paulo',
          paymentMethod: 'PIX',
        },
        {
          id: 3,
          clientName: 'Ana Costa',
          serviceType: 'Electrical Installation',
          scheduledDate: '2024-01-16',
          scheduledTime: '10:00',
          value: 180.0,
          status: 'confirmed',
          address: 'Alameda Santos, 200 - São Paulo',
          paymentMethod: 'Credit Card',
        },
        {
          id: 4,
          clientName: 'Carlos Oliveira',
          serviceType: 'Painting Service',
          scheduledDate: '2024-01-18',
          scheduledTime: '08:00',
          value: 350.0,
          status: 'pending',
          address: 'Rua Oscar Freire, 800 - São Paulo',
          paymentMethod: 'Cash',
        },
      ],
      stats: {
        pending: 2,
        confirmed: 2,
        today: 2,
        estimatedRevenue: 850.0,
      },
    };
  },
  computed: {
    filteredJobs() {
      let filtered = this.jobs;

      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (job) =>
            job.clientName.toLowerCase().includes(query) ||
            job.serviceType.toLowerCase().includes(query) ||
            job.address.toLowerCase().includes(query),
        );
      }

      // Status filter
      if (this.statusFilter !== 'all') {
        filtered = filtered.filter((job) => job.status === this.statusFilter);
      }

      // Date filter
      if (this.dateFilter !== 'all') {
        const today = new Date().toISOString().split('T')[0];
        filtered = filtered.filter((job) => {
          if (this.dateFilter === 'today') {
            return job.scheduledDate === today;
          }
          // Add week and month filtering logic here
          return true;
        });
      }

      return filtered;
    },
    weekDays() {
      const days = [];
      const startOfWeek = new Date(this.currentWeek);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        days.push({
          name: date.toLocaleDateString('en', { weekday: 'short' }),
          date: date.toISOString().split('T')[0],
        });
      }
      return days;
    },
    currentWeekRange() {
      const start = new Date(this.weekDays[0].date);
      const end = new Date(this.weekDays[6].date);
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    },
  },
  methods: {
    getInitials(name: string) {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
    },
    formatDate(dateString: string) {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    },
    isToday(dateString: string) {
      const today = new Date().toISOString().split('T')[0];
      return dateString === today;
    },
    getStatusText(status: string): string {
      const statusMap: Record<string, string> = {
        pending: 'Pending',
        confirmed: 'Confirmed',
        completed: 'Completed',
        cancelled: 'Cancelled',
      };
      return statusMap[status] || status;
    },
    getJobsForDate(date: string) {
      return this.jobs.filter((job) => job.scheduledDate === date);
    },
    confirmJob(jobId: number) {
      const job = this.jobs.find((j) => j.id === jobId);
      if (job) {
        job.status = 'confirmed';
        this.updateStats();
      }
    },
    editJob(job: Job) {
      console.log('Edit job:', job);
      // Implement edit functionality
    },
    deleteJob(jobId: number) {
      if (confirm('Are you sure you want to delete this job?')) {
        this.jobs = this.jobs.filter((job) => job.id !== jobId);
        this.updateStats();
      }
    },
    viewJobDetails(job: Job) {
      console.log('View job details:', job);
      // Implement view details functionality
    },
    clearFilters() {
      this.searchQuery = '';
      this.statusFilter = 'all';
      this.dateFilter = 'all';
    },
    previousWeek() {
      this.currentWeek.setDate(this.currentWeek.getDate() - 7);
      this.currentWeek = new Date(this.currentWeek);
    },
    nextWeek() {
      this.currentWeek.setDate(this.currentWeek.getDate() + 7);
      this.currentWeek = new Date(this.currentWeek);
    },
    updateStats() {
      // Update statistics based on current jobs
      const today = new Date().toISOString().split('T')[0];
      this.stats.pending = this.jobs.filter((j) => j.status === 'pending').length;
      this.stats.confirmed = this.jobs.filter((j) => j.status === 'confirmed').length;
      this.stats.today = this.jobs.filter((j) => j.scheduledDate === today).length;
      this.stats.estimatedRevenue = this.jobs
        .filter((j) => j.status !== 'cancelled')
        .reduce((sum, job) => sum + job.value, 0);
    },
  },
};
</script>

<style scoped>
.scheduled-jobs {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Header Styles */
.jobs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #6b7280;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.view-toggle {
  display: flex;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 4px;
}

.toggle-btn {
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.3s ease;
}

.toggle-btn.active {
  background: white;
  color: #4f46e5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
}

.stat-icon.pending {
  background: #f59e0b;
}
.stat-icon.confirmed {
  background: #10b981;
}
.stat-icon.today {
  background: #3b82f6;
}
.stat-icon.revenue {
  background: #8b5cf6;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.stat-label {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Filters Section */
.filters-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
}

.search-box {
  position: relative;
  flex: 1;
}

.search-box i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: #4f46e5;
}

.filter-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.filter-select {
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  font-size: 14px;
}

/* Jobs List */
.list-header {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.job-card {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  align-items: center;
  transition: transform 0.2s ease;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.job-client {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.client-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4f46e5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.client-name {
  font-weight: 600;
  color: #1f2937;
}

.service-type {
  color: #6b7280;
  font-size: 0.875rem;
}

.job-address {
  color: #9ca3af;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.job-address i {
  margin-right: 0.25rem;
}

.job-date {
  color: #374151;
}

.date-display,
.time-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
}

.today-badge {
  background: #dcfce7;
  color: #166534;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 0.5rem;
  display: inline-block;
}

.value-amount {
  font-weight: 600;
  color: #1f2937;
  font-size: 1.125rem;
}

.payment-method {
  color: #6b7280;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.confirmed {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.completed {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.job-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.action-btn.confirm {
  background: #d1fae5;
  color: #065f46;
}

.action-btn.edit {
  background: #dbeafe;
  color: #1e40af;
}

.action-btn.delete {
  background: #fee2e2;
  color: #dc2626;
}

.action-btn.view {
  background: #f3f4f6;
  color: #374151;
}

.action-btn:hover {
  transform: scale(1.1);
}

/* Calendar View */
.calendar-view {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.nav-btn {
  padding: 8px 12px;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  color: #374151;
}

.current-week {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.week-view {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #e5e7eb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.day-column {
  background: white;
  min-height: 400px;
}

.day-column.today {
  background: #f0f9ff;
}

.day-header {
  background: #f8fafc;
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
}

.day-name {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
}

.day-date {
  color: #6b7280;
  font-size: 0.875rem;
}

.day-jobs {
  padding: 0.5rem;
  min-height: 350px;
}

.calendar-job {
  background: white;
  border-left: 4px solid #4f46e5;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.calendar-job:hover {
  transform: translateX(2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.calendar-job.status-pending {
  border-left-color: #f59e0b;
}

.calendar-job.status-confirmed {
  border-left-color: #10b981;
}

.job-time {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.75rem;
}

.job-client-name {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  margin: 0.25rem 0;
}

.job-service {
  color: #6b7280;
  font-size: 0.75rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
}

.empty-state i {
  font-size: 4rem;
  color: #d1d5db;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #374151;
  margin-bottom: 0.5rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #6b7280;
  cursor: pointer;
}

.modal-body {
  padding: 1.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .scheduled-jobs {
    padding: 1rem;
  }

  .jobs-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }

  .list-header {
    display: none;
  }

  .job-card {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .week-view {
    grid-template-columns: 1fr;
    overflow-x: auto;
  }

  .day-column {
    min-height: 200px;
  }
}
</style>
