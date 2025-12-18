import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        setTimeout(() => {
            if (username === 'admin' && password === 'admin1234') {
                onLogin();
                navigate('/dashboard');
            } else {
                setError('Usuario o contraseña incorrectos. Por favor, intenta de nuevo.');
                setPassword('');
                setIsLoading(false);
                document.getElementById('username')?.focus();
            }
        }, 500);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-icon" role="img" aria-label="Icono de usuario">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="login-title">Bienvenido</h1>
                    <p className="login-subtitle">Ingresa tus credenciales para continuar</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    {error && (
                        <div className="error-message" role="alert" aria-live="polite">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label" htmlFor="username">
                            Usuario
                            <span className="required" aria-label="campo requerido">*</span>
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="form-input"
                            placeholder="Ingresa tu usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                            autoFocus
                            aria-required="true"
                            aria-invalid={error ? 'true' : 'false'}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            Contraseña
                            <span className="required" aria-label="campo requerido">*</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="form-input"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            aria-required="true"
                            aria-invalid={error ? 'true' : 'false'}
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={isLoading || !username || !password}
                        aria-busy={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner" aria-hidden="true"></span>
                                Iniciando sesión...
                            </>
                        ) : (
                            'Iniciar Sesión'
                        )}
                    </button>
                </form>


            </div>
        </div>
    );
}

export default Login;
