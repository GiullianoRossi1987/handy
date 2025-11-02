<template>
  <div class="account-screen">
    <!-- Header -->
    <div class="account-header">
      <div class="header-content">
        <h1 class="page-title">My Account</h1>
        <p class="page-subtitle">Manage your profile and account settings</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-outline" @click="exportData">
          <i class="fas fa-download"></i>
          Export Data
        </button>
        <button class="btn btn-primary" @click="saveProfile">
          <i class="fas fa-save"></i>
          Save Changes
        </button>
      </div>
    </div>

    <div class="account-content">
      <!-- Sidebar Navigation -->
      <div class="account-sidebar">
        <nav class="sidebar-nav">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="nav-item"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <i :class="tab.icon"></i>
            <span>{{ tab.name }}</span>
            <i v-if="tab.notification" class="notification-dot"></i>
          </button>
        </nav>

        <!-- Account Status -->
        <div class="account-status">
          <div class="status-header">
            <i class="fas fa-shield-check"></i>
            <h4>Account Status</h4>
          </div>
          <div class="status-content">
            <div class="status-item">
              <span class="status-label">Verification</span>
              <span class="status-badge verified">Verified</span>
            </div>
            <div class="status-item">
              <span class="status-label">Tax Profile</span>
              <span class="status-badge" :class="taxStatus.class">{{ taxStatus.text }}</span>
            </div>
            <div class="status-item">
              <span class="status-label">Member Since</span>
              <span class="status-value">{{ formatDate(workerData.joinDate) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="account-main">
        <!-- Profile Tab -->
        <div v-if="activeTab === 'profile'" class="tab-content">
          <div class="profile-section">
            <h3 class="section-title">Personal Information</h3>
            <div class="profile-card">
              <div class="avatar-section">
                <div class="avatar-upload">
                  <img
                    :src="workerData.avatar || '/default-avatar.png'"
                    alt="Profile"
                    class="avatar-image"
                  >
                  <button class="avatar-edit" @click="triggerAvatarUpload">
                    <i class="fas fa-camera"></i>
                  </button>
                  <input
                    type="file"
                    ref="avatarInput"
                    @change="handleAvatarUpload"
                    accept="image/*"
                    class="avatar-input"
                  >
                </div>
                <div class="avatar-info">
                  <h4>{{ workerData.fullName }}</h4>
                  <p>{{ workerData.profession }}</p>
                  <span class="member-since">Member since {{ formatDate(workerData.joinDate) }}</span>
                </div>
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label for="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    v-model="workerData.fullName"
                    type="text"
                    class="form-input"
                    placeholder="Your full name"
                  >
                </div>

                <div class="form-group">
                  <label for="cpf">CPF *</label>
                  <input
                    id="cpf"
                    v-model="workerData.cpf"
                    type="text"
                    class="form-input"
                    placeholder="000.000.000-00"
                    v-mask="'###.###.###-##'"
                  >
                </div>

                <div class="form-group">
                  <label for="email">Email *</label>
                  <input
                    id="email"
                    v-model="workerData.email"
                    type="email"
                    class="form-input"
                    placeholder="your.email@example.com"
                  >
                </div>

                <div class="form-group">
                  <label for="phone">Phone *</label>
                  <input
                    id="phone"
                    v-model="workerData.phone"
                    type="tel"
                    class="form-input"
                    placeholder="(11) 99999-9999"
                    v-mask="'(##) #####-####'"
                  >
                </div>

                <div class="form-group full-width">
                  <label for="address">Address</label>
                  <input
                    id="address"
                    v-model="workerData.address"
                    type="text"
                    class="form-input"
                    placeholder="Street, Number, Neighborhood, City - State"
                  >
                </div>

                <div class="form-group">
                  <label for="profession">Main Profession *</label>
                  <select v-model="workerData.profession" class="form-input">
                    <option value="">Select your profession</option>
                    <option value="cleaner">Home Cleaner</option>
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="painter">Painter</option>
                    <option value="handyman">Handyman</option>
                    <option value="beautician">Beautician</option>
                    <option value="driver">Driver</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="hourlyRate">Hourly Rate (R$)</label>
                  <input
                    id="hourlyRate"
                    v-model="workerData.hourlyRate"
                    type="number"
                    class="form-input"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="profile-section">
            <h3 class="section-title">About Me</h3>
            <div class="profile-card">
              <div class="form-group full-width">
                <label for="bio">Professional Bio</label>
                <textarea
                  id="bio"
                  v-model="workerData.bio"
                  class="form-textarea"
                  rows="4"
                  placeholder="Tell clients about your experience, skills, and what makes you a great professional..."
                ></textarea>
                <div class="char-count">{{ workerData.bio.length }}/500</div>
              </div>

              <div class="form-group full-width">
                <label>Skills & Services</label>
                <div class="skills-tags">
                  <span
                    v-for="skill in workerData.skills"
                    :key="skill"
                    class="skill-tag"
                  >
                    {{ skill }}
                    <button @click="removeSkill(skill)" class="tag-remove">
                      <i class="fas fa-times"></i>
                    </button>
                  </span>
                  <div class="skill-input-container">
                    <input
                      v-model="newSkill"
                      type="text"
                      class="skill-input"
                      placeholder="Add a skill..."
                      @keyup.enter="addSkill"
                    >
                    <button @click="addSkill" class="skill-add-btn">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tax Information Tab -->
        <div v-if="activeTab === 'tax'" class="tab-content">
          <div class="tax-section">
            <h3 class="section-title">Tax Information</h3>
            <div class="tax-card">
              <div class="tax-status">
                <div class="status-indicator" :class="taxStatus.class"></div>
                <div class="status-info">
                  <h4>Tax Declaration Status</h4>
                  <p>{{ taxStatus.description }}</p>
                </div>
                <button class="btn btn-primary" @click="updateTaxInfo">
                  Update Tax Info
                </button>
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label for="taxId">Tax ID (CPF)</label>
                  <input
                    id="taxId"
                    v-model="workerData.taxInfo.cpf"
                    type="text"
                    class="form-input"
                    disabled
                  >
                </div>

                <div class="form-group">
                  <label for="taxCategory">Tax Category</label>
                  <select v-model="workerData.taxInfo.category" class="form-input">
                    <option value="individual">Individual (PF)</option>
                    <option value="mei">Individual Entrepreneur (MEI)</option>
                    <option value="company">Company</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="monthlyIncome">Average Monthly Income (R$)</label>
                  <input
                    id="monthlyIncome"
                    v-model="workerData.taxInfo.monthlyIncome"
                    type="number"
                    class="form-input"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  >
                </div>
              </div>

              <div class="tax-summary">
                <h4>Tax Summary - Last 30 Days</h4>
                <div class="summary-grid">
                  <div class="summary-item">
                    <span class="summary-label">Total Earnings</span>
                    <span class="summary-value">R$ {{ workerData.taxInfo.totalEarnings }}</span>
                  </div>
                  <div class="summary-item">
                    <span class="summary-label">Taxes Due</span>
                    <span class="summary-value">R$ {{ workerData.taxInfo.taxesDue }}</span>
                  </div>
                  <div class="summary-item">
                    <span class="summary-label">Next Declaration</span>
                    <span class="summary-value">{{ workerData.taxInfo.nextDeclaration }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tax-section">
            <h3 class="section-title">Declaration History</h3>
            <div class="history-card">
              <div class="declaration-list">
                <div
                  v-for="declaration in workerData.declarationHistory"
                  :key="declaration.id"
                  class="declaration-item"
                >
                  <div class="declaration-info">
                    <div class="declaration-period">{{ declaration.period }}</div>
                    <div class="declaration-date">Submitted on {{ formatDate(declaration.submittedAt) }}</div>
                  </div>
                  <div class="declaration-amount">
                    <div class="amount">R$ {{ declaration.amount }}</div>
                    <div class="status-badge" :class="declaration.status">
                      {{ declaration.status }}
                    </div>
                  </div>
                  <button class="declaration-download" @click="downloadDeclaration(declaration.id)">
                    <i class="fas fa-download"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Methods Tab -->
        <div v-if="activeTab === 'payment'" class="tab-content">
          <div class="payment-section">
            <h3 class="section-title">Payment Methods</h3>
            <div class="payment-methods">
              <div
                v-for="method in workerData.paymentMethods"
                :key="method.id"
                class="payment-method-card"
                :class="{ default: method.isDefault }"
              >
                <div class="method-icon">
                  <i :class="getPaymentMethodIcon(method.type)"></i>
                </div>
                <div class="method-info">
                  <h4>{{ getPaymentMethodName(method.type) }}</h4>
                  <p>{{ method.details }}</p>
                  <span v-if="method.isDefault" class="default-badge">Default</span>
                </div>
                <div class="method-actions">
                  <button
                    v-if="!method.isDefault"
                    class="action-btn set-default"
                    @click="setDefaultPayment(method.id)"
                  >
                    Set as Default
                  </button>
                  <button class="action-btn remove" @click="removePaymentMethod(method.id)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>

              <div class="add-payment-method" @click="showAddPaymentModal = true">
                <div class="add-icon">
                  <i class="fas fa-plus"></i>
                </div>
                <p>Add Payment Method</p>
              </div>
            </div>
          </div>

          <div class="payment-section">
            <h3 class="section-title">Payout Settings</h3>
            <div class="payout-card">
              <div class="form-group">
                <label for="payoutFrequency">Payout Frequency</label>
                <select v-model="workerData.payoutSettings.frequency" class="form-input">
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Every 2 Weeks</option>
                  <option value="monthly">Monthly</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
              <div class="form-group">
                <label for="autoPayout">Automatic Payouts</label>
                <div class="toggle-switch">
                  <input
                    id="autoPayout"
                    v-model="workerData.payoutSettings.autoPayout"
                    type="checkbox"
                    class="toggle-input"
                  >
                  <span class="toggle-slider"></span>
                </div>
              </div>
              <div class="payout-summary">
                <h4>Next Payout</h4>
                <div class="payout-amount">R$ {{ workerData.payoutSettings.nextPayoutAmount }}</div>
                <div class="payout-date">Scheduled for {{ workerData.payoutSettings.nextPayoutDate }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Settings Tab -->
        <div v-if="activeTab === 'settings'" class="tab-content">
          <div class="settings-section">
            <h3 class="section-title">Preferences</h3>
            <div class="settings-card">
              <div class="setting-item">
                <div class="setting-info">
                  <h4>Email Notifications</h4>
                  <p>Receive updates about new jobs and declarations</p>
                </div>
                <div class="toggle-switch">
                  <input
                    v-model="workerData.settings.emailNotifications"
                    type="checkbox"
                    class="toggle-input"
                  >
                  <span class="toggle-slider"></span>
                </div>
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <h4>SMS Notifications</h4>
                  <p>Get job alerts via text message</p>
                </div>
                <div class="toggle-switch">
                  <input
                    v-model="workerData.settings.smsNotifications"
                    type="checkbox"
                    class="toggle-input"
                  >
                  <span class="toggle-slider"></span>
                </div>
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <h4>Tax Reminders</h4>
                  <p>Get reminded about upcoming tax declarations</p>
                </div>
                <div class="toggle-switch">
                  <input
                    v-model="workerData.settings.taxReminders"
                    type="checkbox"
                    class="toggle-input"
                  >
                  <span class="toggle-slider"></span>
                </div>
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <h4>Language</h4>
                  <p>Interface language</p>
                </div>
                <select v-model="workerData.settings.language" class="form-input">
                  <option value="pt">Português</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
            </div>
          </div>

          <div class="settings-section">
            <h3 class="section-title">Security</h3>
            <div class="settings-card">
              <div class="setting-item">
                <div class="setting-info">
                  <h4>Change Password</h4>
                  <p>Update your account password</p>
                </div>
                <button class="btn btn-outline" @click="showChangePassword = true">
                  Change Password
                </button>
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <div class="toggle-switch">
                  <input
                    v-model="workerData.settings.twoFactorAuth"
                    type="checkbox"
                    class="toggle-input"
                  >
                  <span class="toggle-slider"></span>
                </div>
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <h4>Login Activity</h4>
                  <p>Recent account access</p>
                </div>
                <button class="btn btn-outline" @click="viewLoginActivity">
                  View Activity
                </button>
              </div>
            </div>
          </div>

          <div class="settings-section danger-zone">
            <h3 class="section-title">Danger Zone</h3>
            <div class="settings-card">
              <div class="danger-item">
                <div class="danger-info">
                  <h4>Export Account Data</h4>
                  <p>Download all your data in a portable format</p>
                </div>
                <button class="btn btn-outline" @click="exportData">
                  Export Data
                </button>
              </div>

              <div class="danger-item">
                <div class="danger-info">
                  <h4>Delete Account</h4>
                  <p>Permanently delete your account and all data</p>
                </div>
                <button class="btn btn-danger" @click="confirmDeleteAccount">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <AddPaymentModal
      v-if="showAddPaymentModal"
      @close="showAddPaymentModal = false"
      @add-payment="addPaymentMethod"
    />

    <ChangePasswordModal
      v-if="showChangePassword"
      @close="showChangePassword = false"
      @change-password="handlePasswordChange"
    />
  </div>
</template>

<script lang="ts">
import AddPaymentModal from '@components/AddPaymentModal.vue'
import ChangePasswordModal from '@components/ChangePasswordModal.vue'

export default {
  name: 'WorkerAccount',
  components: {
    AddPaymentModal,
    ChangePasswordModal
  },
  data() {
    return {
      activeTab: 'profile',
      showAddPaymentModal: false,
      showChangePassword: false,
      newSkill: '',
      tabs: [
        { id: 'profile', name: 'Profile', icon: 'fas fa-user' },
        { id: 'tax', name: 'Tax Info', icon: 'fas fa-receipt', notification: true },
        { id: 'payment', name: 'Payment', icon: 'fas fa-credit-card' },
        { id: 'settings', name: 'Settings', icon: 'fas fa-cog' }
      ],
      workerData: {
        fullName: 'João Silva',
        profession: 'electrician',
        email: 'joao.silva@email.com',
        phone: '(11) 99999-9999',
        cpf: '123.456.789-00',
        address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
        hourlyRate: 50.00,
        bio: 'Professional electrician with 5+ years of experience. Specialized in residential electrical installations and repairs.',
        skills: ['Electrical Installation', 'Lighting Repair', 'Circuit Breaker', 'Safety Inspection'],
        avatar: null,
        joinDate: '2023-03-15',
        taxInfo: {
          cpf: '123.456.789-00',
          category: 'individual',
          monthlyIncome: 3500.00,
          totalEarnings: 4200.00,
          taxesDue: 320.50,
          nextDeclaration: '2024-02-15',
          status: 'pending'
        },
        declarationHistory: [
          {
            id: 1,
            period: 'January 2024',
            submittedAt: '2024-01-20',
            amount: 320.50,
            status: 'paid'
          },
          {
            id: 2,
            period: 'December 2023',
            submittedAt: '2023-12-18',
            amount: 280.00,
            status: 'paid'
          }
        ],
        paymentMethods: [
          {
            id: 1,
            type: 'pix',
            details: 'joao.silva@email.com',
            isDefault: true
          },
          {
            id: 2,
            type: 'bank',
            details: 'Banco do Brasil ••• 1234',
            isDefault: false
          }
        ],
        payoutSettings: {
          frequency: 'weekly',
          autoPayout: true,
          nextPayoutAmount: 1250.00,
          nextPayoutDate: '2024-01-22'
        },
        settings: {
          emailNotifications: true,
          smsNotifications: false,
          taxReminders: true,
          language: 'pt',
          twoFactorAuth: false
        }
      }
    }
  },
  computed: {
    taxStatus() {
      const status = this.workerData.taxInfo.status
      const statusMap = {
        pending: { class: 'pending', text: 'Pending Update', description: 'Your tax information needs to be updated for the current period.' },
        verified: { class: 'verified', text: 'Verified', description: 'Your tax information is up to date and verified.' },
        overdue: { class: 'overdue', text: 'Overdue', description: 'You have overdue tax declarations that need attention.' }
      }
      return statusMap[status] || statusMap.pending
    }
  },
  methods: {
    formatDate(dateString: string) {
      return new Date(dateString).toLocaleDateString('pt-BR')
    },
    triggerAvatarUpload() {
      this.$refs.avatarInput.click()
    },
    handleAvatarUpload(event: Event) {
      const file = event.target?.files[0]
      if (file) {
        // Handle avatar upload logic here
        const reader = new FileReader()
        reader.onload = (e) => {
          this.workerData.avatar = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    addSkill() {
      if (this.newSkill.trim() && !this.workerData.skills.includes(this.newSkill.trim())) {
        this.workerData.skills.push(this.newSkill.trim())
        this.newSkill = ''
      }
    },
    removeSkill(skill) {
      this.workerData.skills = this.workerData.skills.filter(s => s !== skill)
    },
    getPaymentMethodIcon(type) {
      const icons = {
        pix: 'fas fa-qrcode',
        bank: 'fas fa-university',
        credit: 'fas fa-credit-card',
        cash: 'fas fa-money-bill-wave'
      }
      return icons[type] || 'fas fa-wallet'
    },
    getPaymentMethodName(type) {
      const names = {
        pix: 'PIX',
        bank: 'Bank Transfer',
        credit: 'Credit Card',
        cash: 'Cash'
      }
      return names[type] || 'Payment Method'
    },
    setDefaultPayment(methodId) {
      this.workerData.paymentMethods.forEach(method => {
        method.isDefault = method.id === methodId
      })
    },
    removePaymentMethod(methodId) {
      this.workerData.paymentMethods = this.workerData.paymentMethods.filter(
        method => method.id !== methodId
      )
    },
    addPaymentMethod(paymentData) {
      const newMethod = {
        id: Date.now(),
        ...paymentData,
        isDefault: this.workerData.paymentMethods.length === 0
      }
      this.workerData.paymentMethods.push(newMethod)
      this.showAddPaymentModal = false
    },
    handlePasswordChange(newPassword) {
      console.log('Password changed:', newPassword)
      this.showChangePassword = false
    },
    updateTaxInfo() {
      // Implement tax info update logic
      console.log('Updating tax information...')
    },
    downloadDeclaration(declarationId) {
      // Implement download logic
      console.log('Downloading declaration:', declarationId)
    },
    exportData() {
      // Implement data export logic
      console.log('Exporting account data...')
    },
    saveProfile() {
      // Implement save profile logic
      console.log('Saving profile...', this.workerData)
      // Show success message
    },
    viewLoginActivity() {
      // Implement login activity view
      console.log('Viewing login activity...')
    },
    confirmDeleteAccount() {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        // Implement account deletion logic
        console.log('Deleting account...')
      }
    }
  }
}
</script>

<style scoped>
.account-screen {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.account-header {
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

.account-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
}

/* Sidebar Styles */
.account-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-nav {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6b7280;
  position: relative;
}

.nav-item:hover {
  background: #f3f4f6;
  color: #374151;
}

.nav-item.active {
  background: #4f46e5;
  color: white;
}

.notification-dot {
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  margin-left: auto;
}

.account-status {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.status-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.status-header i {
  color: #10b981;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.status-item:last-child {
  border-bottom: none;
}

.status-label {
  color: #6b7280;
  font-size: 0.875rem;
}

.status-value {
  color: #374151;
  font-weight: 500;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.verified {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.overdue {
  background: #fee2e2;
  color: #991b1b;
}

/* Main Content Styles */
.account-main {
  min-height: 600px;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.profile-card,
.tax-card,
.history-card,
.payout-card,
.settings-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Profile Section */
.avatar-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.avatar-upload {
  position: relative;
}

.avatar-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-edit {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  background: #4f46e5;
  border: 3px solid white;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.avatar-input {
  display: none;
}

.avatar-info h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.avatar-info p {
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.member-since {
  color: #9ca3af;
  font-size: 0.875rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #4f46e5;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.char-count {
  text-align: right;
  color: #9ca3af;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

/* Skills */
.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.skill-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #e0e7ff;
  color: #3730a3;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.tag-remove {
  background: none;
  border: none;
  color: #3730a3;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skill-input-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.skill-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  font-size: 0.875rem;
  width: 120px;
}

.skill-add-btn {
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* Tax Section */
.tax-status {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.status-indicator.pending {
  background: #f59e0b;
}

.status-indicator.verified {
  background: #10b981;
}

.status-indicator.overdue {
  background: #ef4444;
}

.status-info {
  flex: 1;
}

.status-info h4 {
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.status-info p {
  color: #6b7280;
  font-size: 0.875rem;
}

.tax-summary {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.summary-label {
  color: #6b7280;
  font-size: 0.875rem;
}

.summary-value {
  font-weight: 600;
  color: #1f2937;
  font-size: 1.125rem;
}

/* Declaration History */
.declaration-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.declaration-item:last-child {
  border-bottom: none;
}

.declaration-info {
  flex: 1;
}

.declaration-period {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.declaration-date {
  color: #6b7280;
  font-size: 0.875rem;
}

.declaration-amount {
  text-align: right;
}

.declaration-amount .amount {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.declaration-download {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
}

/* Payment Methods */
.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-method-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s ease;
}
