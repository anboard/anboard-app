import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/register.module.css";
import config from "../config";

const RegistrationPage: React.FC = () => {
    const [upn, setUpn] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [registrationToken, setRegistrationToken] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showPasswordRules, setShowPasswordRules] = useState<boolean>(false);
    const [passwordValidations, setPasswordValidations] = useState({
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token') as string;
        setRegistrationToken(token);
    }, []);

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (
            !passwordValidations.hasUppercase ||
            !passwordValidations.hasLowercase ||
            !passwordValidations.hasNumber ||
            !passwordValidations.hasSpecialChar
        ) {
            setError('Password does not meet the required criteria');
            return;
        }

        try {
            const response = await fetch(`${config.AUTH_BASE_URL}/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    upn,
                    email,
                    password,
                    token: registrationToken
                })
            });

            const data = await response.json();

            if (data.status === 'success') {
                navigate('/auth/login');
            } else if (data.status === 'error') {
                setError('Link expired');
            } else {
                setError(data.error[0].msg);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);

        // Validate password rules
        setPasswordValidations({
            hasUppercase: /[A-Z]/.test(value),
            hasLowercase: /[a-z]/.test(value),
            hasNumber: /\d/.test(value),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        });
    };

    return (
        <div className={styles.registrationpage}>
            <header className={styles.headermain}>
                <h1>Welcome to ANBOARD</h1>
            </header>
            <div className={styles.registrationcontainer}>
                <img src="/images/logo.png" alt="ANBOARD Logo" />
                <h2>Register your account</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <div className={styles.formgroup}>
                        <label htmlFor="upn">UPN</label>
                        <input
                            type="text"
                            id="upn"
                            required
                            value={upn}
                            onChange={(e) => setUpn(e.target.value)}
                        />
                    </div>
                    <div className={styles.formgroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.formgroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            onFocus={() => setShowPasswordRules(true)}
                            onBlur={() => setShowPasswordRules(false)}
                        />
                        {showPasswordRules && (
                            <div className={styles.passwordrules}>
                                <p>Password must contain:</p>
                                <ul>
                                    <li className={passwordValidations.hasUppercase ? styles.valid : ''}>
                                        At least one uppercase letter
                                    </li>
                                    <li className={passwordValidations.hasLowercase ? styles.valid : ''}>
                                        At least one lowercase letter
                                    </li>
                                    <li className={passwordValidations.hasNumber ? styles.valid : ''}>
                                        At least one number
                                    </li>
                                    <li className={passwordValidations.hasSpecialChar ? styles.valid : ''}>
                                        At least one special character
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className={styles.formgroup}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className={styles.errormessage}>{error}</p>}
                    <button type="submit" className={styles.submitbutton}>Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;
