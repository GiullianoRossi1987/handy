<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>Bem-Vindo ao Handy !</h2>
        <p>Faça login para acessar sua conta</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="document">CPF / CNPJ</label>
          <input
            id="document"
            v-model="form.document"
            type="text"
            class="form-input"
            :class="{ error: errors.document }"
            placeholder="Insira seu CPF / CNPJ"
            required
          />
          <span v-if="errors.document" class="error-message">{{ errors.document }}</span>
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="form-input"
            :class="{ error: errors.password }"
            placeholder="Insira sua senha"
            required
          />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <div class="form-options">
          <label class="checkbox-container">
            <input type="checkbox" v-model="form.rememberMe" />
            <span class="checkmark"></span>
            Lembre-se de mim
          </label>
          <a href="#" class="forgot-password">Esqueceu sua senha?</a>
        </div>

        <button type="submit" class="login-button" :disabled="loading">
          <span v-if="loading">Login...</span>
          <span v-else>Login</span>
        </button>
      </form>

      <div class="login-footer">
        <p>Não possui uma conta? <a href="#" class="signup-link">Crie uma</a></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { UsersRequests } from '@requests/Users';

const userRequests = new UsersRequests();
// TODO add password encryption

export default {
  name: 'LoginScreen',
  data() {
    return {
      form: {
        document: '',
        password: '',
        rememberMe: false,
      },
      errors: {
        document: '',
        password: '',
      },
      loading: false,
    };
  },
  methods: {
    validateForm() {
      this.errors = { document: '', password: '' };
      let isValid = true;

      // cpf cpnj validation
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
      const cnpjRegex = /^\d{3}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
      if (!this.form.document) {
        this.errors.document = 'document is required';
        isValid = false;
      }
      if (!cpfRegex.test(this.form.document) && !cnpjRegex.test(this.form.document)) {
        this.errors.document = 'Please enter a valid document address';
        isValid = false;
      }

      // Password validation
      if (!this.form.password) {
        this.errors.password = 'Password is required';
        isValid = false;
      } else if (this.form.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters';
        isValid = false;
      }

      return isValid;
    },

    async handleLogin() {
      if (!this.validateForm()) {
        return;
      }

      this.loading = true;
      const response = await userRequests.Login(this.form.document, this.form.password);
      await new Promise((resolve: TimerHandler) => setTimeout(resolve, 2000));
      if (!response.success) {
        this.errors.password = 'Invalid password';
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  color: #333;
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 600;
}

.login-header p {
  color: #666;
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 14px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #666;
}

.checkbox-container input {
  margin-right: 8px;
}

.forgot-password {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #5a6fd8;
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 14px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-button:hover:not(:disabled) {
  background: #5a6fd8;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.login-button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.login-footer {
  text-align: center;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #e1e5e9;
  color: #666;
  font-size: 14px;
}

.signup-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.signup-link:hover {
  text-decoration: underline;
}

/* Responsive design */
@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }

  .form-options {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
}
</style>
