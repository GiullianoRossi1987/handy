<template>
  <div class="homepage">
    <!-- Navigation Header -->
    <header class="header">
      <nav class="nav">
        <div class="nav-brand">
          <img src="../assets/logo.png" alt="Logo" class="logo" />
          <span class="brand-name">Handy</span>
        </div>

        <div class="nav-links">
          <a href="#" class="nav-link active">Home</a>
          <a href="#" class="nav-link">Features</a>
          <a href="#" class="nav-link">Pricing</a>
          <a href="#" class="nav-link">About</a>
          <a href="#" class="nav-link">Contact</a>
        </div>

        <div class="nav-actions">
          <button class="btn btn-outline" @click="handleLogin">Já tem uma conta? Entre aqui</button>
          <button class="btn btn-primary" @click="handleSignUp">Comece Aqui</button>
        </div>

        <!-- Mobile menu button -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <a href="#" class="mobile-nav-link">Home</a>
        <a href="#" class="mobile-nav-link">Features</a>
        <a href="#" class="mobile-nav-link">Pricing</a>
        <a href="#" class="mobile-nav-link">About</a>
        <a href="#" class="mobile-nav-link">Contact</a>
        <div class="mobile-actions">
          <button class="btn btn-outline">Já tem uma conta? Entre aqui</button>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Simplifique seu
          <span class="text-gradient">Trabalho</span>
          E sua declaração
          <span class="text-gradient">de imposto</span>
        </h1>
        <p class="hero-subtitle">
          An intuitive platform designed to help informal workers in Brazil easily declare their
          services to the Federal Revenue Office. Save time and stay compliant. Uma plataforma para
          trabalhadores informais gerenciarem seu trabalho e declararem
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-large" @click="handleGetStarted">
            Start Declaring Now
          </button>
          <button class="btn btn-secondary btn-large" @click="handleDemo">Watch Demo</button>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <div class="stat-number">10K+</div>
            <div class="stat-label">Active Users</div>
          </div>
          <div class="stat">
            <div class="stat-number">98%</div>
            <div class="stat-label">Satisfaction Rate</div>
          </div>
          <div class="stat">
            <div class="stat-number">R$ 5M+</div>
            <div class="stat-label">Taxes Declared</div>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <img src="../assets/hero-dashboard.png" alt="Dashboard Preview" class="hero-image" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Why Choose Our Platform</h2>
          <p class="section-subtitle">
            Designed specifically for informal workers with features that make tax declaration
            simple and secure
          </p>
        </div>

        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.id">
            <div class="feature-icon" :style="{ backgroundColor: feature.color }">
              <i :class="feature.icon"></i>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">How It Works</h2>
          <p class="section-subtitle">Get started in just three simple steps</p>
        </div>

        <div class="steps">
          <div class="step" v-for="(step, index) in steps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Simplify Your Tax Declaration?</h2>
          <p class="cta-subtitle">
            Join thousands of informal workers who are already using our platform to stay compliant
            with the Federal Revenue Office.
          </p>
          <button class="btn btn-primary btn-large" @click="handleGetStarted">
            Get Started Free
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-brand">
              <img src="../assets/logo.png" alt="Logo" class="logo" />
              <span class="brand-name">YourBrand</span>
            </div>
            <p class="footer-description">
              Making tax declaration accessible for every informal worker in Brazil.
            </p>
          </div>

          <div class="footer-section">
            <h4>Product</h4>
            <a href="#" class="footer-link">Features</a>
            <a href="#" class="footer-link">Pricing</a>
            <a href="#" class="footer-link">API</a>
          </div>

          <div class="footer-section">
            <h4>Company</h4>
            <a href="#" class="footer-link">About</a>
            <a href="#" class="footer-link">Blog</a>
            <a href="#" class="footer-link">Careers</a>
          </div>

          <div class="footer-section">
            <h4>Support</h4>
            <a href="#" class="footer-link">Help Center</a>
            <a href="#" class="footer-link">Contact</a>
            <a href="#" class="footer-link">Privacy Policy</a>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2024 YourBrand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePage',
  data() {
    return {
      mobileMenuOpen: false,
      features: [
        {
          id: 1,
          icon: 'fas fa-shield-alt',
          title: 'Secure & Compliant',
          description: 'Bank-level security with full compliance to RFB standards',
          color: '#4f46e5',
        },
        {
          id: 2,
          icon: 'fas fa-bolt',
          title: 'Fast Processing',
          description: 'Submit your declarations in minutes, not hours',
          color: '#10b981',
        },
        {
          id: 3,
          icon: 'fas fa-mobile-alt',
          title: 'Mobile Friendly',
          description: 'Access your dashboard from any device, anywhere',
          color: '#f59e0b',
        },
        {
          id: 4,
          icon: 'fas fa-headset',
          title: '24/7 Support',
          description: 'Get help whenever you need it from our expert team',
          color: '#ef4444',
        },
      ],
      steps: [
        {
          title: 'Create Your Account',
          description: 'Sign up in 30 seconds with your basic information',
        },
        {
          title: 'Add Your Services',
          description: 'Input your service details and earnings information',
        },
        {
          title: 'Submit to RFB',
          description: 'We automatically generate and submit your declaration',
        },
      ],
    };
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    handleLogin() {
      this.$router.push('/login');
    },
    handleSignUp() {
      this.$router.push('/signup');
    },
    handleGetStarted() {
      this.$router.push('/signup');
    },
    handleDemo() {
      // Handle demo video playback
      console.log('Play demo video');
    },
  },
};
</script>

<style scoped>
.homepage {
  min-height: 100vh;
}

/* Header Styles */
.header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo {
  height: 32px;
  width: auto;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #4f46e5;
}

.nav-actions {
  display: flex;
  gap: 1rem;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.mobile-menu-btn span {
  width: 20px;
  height: 2px;
  background: #374151;
  transition: 0.3s;
}

/* Hero Section */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: inherit;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.hero-stats {
  display: flex;
  gap: 3rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #4f46e5;
}

.stat-label {
  color: #6b7280;
  font-size: 0.875rem;
}

.hero-image {
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Button Styles */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 0.875rem;
}

.btn-primary {
  background: #4f46e5;
  color: white;
}

.btn-primary:hover {
  background: #4338ca;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: #4f46e5;
  border: 2px solid #4f46e5;
}

.btn-outline:hover {
  background: #4f46e5;
  color: white;
}

.btn-secondary {
  background: #f8fafc;
  color: #374151;
  border: 2px solid #e5e7eb;
}

.btn-secondary:hover {
  background: #f1f5f9;
  border-color: #d1d5db;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1rem;
}

/* Section Styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

/* Features Section */
.features {
  padding: 6rem 0;
  background: #f8fafc;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 1.5rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.feature-description {
  color: #6b7280;
  line-height: 1.6;
}

/* How It Works Section */
.how-it-works {
  padding: 6rem 0;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
}

.step {
  text-align: center;
  position: relative;
}

.step-number {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #4f46e5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1.5rem;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.step-description {
  color: #6b7280;
  line-height: 1.6;
}

/* CTA Section */
.cta {
  padding: 6rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1.125rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Footer */
.footer {
  background: #1f2937;
  color: white;
  padding: 4rem 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h4 {
  margin-bottom: 1rem;
  font-weight: 600;
}

.footer-link {
  display: block;
  color: #d1d5db;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: white;
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 2rem;
  text-align: center;
  color: #9ca3af;
}

/* Mobile Menu */
.mobile-menu {
  display: none;
  background: white;
  padding: 1rem 2rem;
  border-top: 1px solid #e5e7eb;
}

.mobile-nav-link {
  display: block;
  padding: 0.75rem 0;
  color: #374151;
  text-decoration: none;
  border-bottom: 1px solid #f3f4f6;
}

.mobile-actions {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-links,
  .nav-actions {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .mobile-menu {
    display: block;
  }

  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 2rem 1rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .hero-stats {
    justify-content: center;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .steps {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .nav {
    padding: 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .cta-title {
    font-size: 2rem;
  }
}
</style>
