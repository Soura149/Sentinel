import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
    Activity,
    Brain,
    Shield,
    Users,
    TrendingUp,
    Clock,
    CheckCircle2,
    ArrowRight,
    BarChart3,
    FileText,
    Lock,
    Zap,
    Moon,
    Sun
} from 'lucide-react';
import logo from '../assets/logo.png';
import './Landing.css';

const Landing = () => {
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();

    const handleRequestDemo = () => {
        navigate('/login');
    };

    const handleViewDashboard = () => {
        navigate('/login');
    };

    return (
        <div className="landing-page">
            {/* Navigation Bar */}
            <nav className="landing-nav">
                <div className="landing-nav-content">
                    <div className="landing-brand">
                        <img src={logo} alt="Sentinel" className="landing-logo" />
                        <span>Sentinel</span>
                    </div>
                    <div className="landing-nav-right">
                        <button
                            className="theme-toggle-landing"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className="btn-secondary" onClick={handleViewDashboard}>
                            View Dashboard
                        </button>
                        <button className="btn-primary" onClick={handleRequestDemo}>
                            Sign In
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">
                        <Zap size={16} />
                        <span>AI-Powered Patient Monitoring</span>
                    </div>
                    <h1 className="hero-title">
                        Intelligent ICU Management
                        <span className="gradient-text"> for Modern Healthcare</span>
                    </h1>
                    <p className="hero-description">
                        Real-time vital signs monitoring, AI-driven insights, and comprehensive patient management
                        in one secure, HIPAA-compliant platform. Trusted by medical professionals worldwide.
                    </p>
                    <div className="hero-cta">
                        <button className="btn-primary btn-lg" onClick={handleRequestDemo}>
                            Sign In
                            <ArrowRight size={20} />
                        </button>
                        <button className="btn-secondary btn-lg" onClick={handleViewDashboard}>
                            View Dashboard
                        </button>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-value">24/7</div>
                            <div className="stat-label">Monitoring</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">99.9%</div>
                            <div className="stat-label">Uptime</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">HIPAA</div>
                            <div className="stat-label">Compliant</div>
                        </div>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="hero-card-preview">
                        <div className="preview-header">
                            <div className="preview-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span className="preview-title">Sentinel Dashboard</span>
                        </div>
                        <div className="preview-content">
                            <div className="preview-metric">
                                <Activity size={20} />
                                <div>
                                    <div className="metric-label">Heart Rate</div>
                                    <div className="metric-value">72 bpm</div>
                                </div>
                            </div>
                            <div className="preview-metric">
                                <TrendingUp size={20} />
                                <div>
                                    <div className="metric-label">O2 Saturation</div>
                                    <div className="metric-value">98%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="features-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Everything You Need for Modern ICU Management</h2>
                        <p>Comprehensive tools designed for healthcare professionals</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Activity size={32} />
                            </div>
                            <h3>Real-Time Vitals Monitoring</h3>
                            <p>
                                Track heart rate, blood pressure, oxygen saturation, temperature, and more
                                with live updates and historical trend analysis.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Brain size={32} />
                            </div>
                            <h3>AI-Driven Insights & Alerts</h3>
                            <p>
                                Intelligent analysis of patient data with predictive alerts and
                                actionable recommendations powered by advanced AI.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Shield size={32} />
                            </div>
                            <h3>Secure Medical Records</h3>
                            <p>
                                HIPAA-compliant storage and management of medical documents, reports,
                                images, and patient history with end-to-end encryption.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Users size={32} />
                            </div>
                            <h3>Role-Based Dashboards</h3>
                            <p>
                                Customized interfaces for Admins, Medical Staff, and Patients with
                                appropriate access controls and permissions.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <BarChart3 size={32} />
                            </div>
                            <h3>Advanced Analytics</h3>
                            <p>
                                Comprehensive reporting and data visualization to track patient
                                progress and identify trends over time.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <FileText size={32} />
                            </div>
                            <h3>Document Management</h3>
                            <p>
                                Upload, view, and manage medical reports, X-rays, lab results, and
                                other critical documents in one centralized location.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2>How Sentinel Works</h2>
                        <p>Simple, streamlined workflow for better patient care</p>
                    </div>
                    <div className="workflow-steps">
                        <div className="workflow-step">
                            <div className="step-number">1</div>
                            <div className="step-icon">
                                <Users size={24} />
                            </div>
                            <h3>Admit Patient</h3>
                            <p>
                                Quickly register new patients with comprehensive medical history,
                                allergies, and emergency contact information.
                            </p>
                        </div>
                        <div className="workflow-arrow">
                            <ArrowRight size={24} />
                        </div>
                        <div className="workflow-step">
                            <div className="step-number">2</div>
                            <div className="step-icon">
                                <Activity size={24} />
                            </div>
                            <h3>Monitor Vitals</h3>
                            <p>
                                Real-time tracking of all vital signs with automatic alerts for
                                abnormal readings and critical thresholds.
                            </p>
                        </div>
                        <div className="workflow-arrow">
                            <ArrowRight size={24} />
                        </div>
                        <div className="workflow-step">
                            <div className="step-number">3</div>
                            <div className="step-icon">
                                <Brain size={24} />
                            </div>
                            <h3>Receive AI Insights</h3>
                            <p>
                                Get intelligent recommendations and early warnings from our AI system
                                analyzing patient data patterns.
                            </p>
                        </div>
                        <div className="workflow-arrow">
                            <ArrowRight size={24} />
                        </div>
                        <div className="workflow-step">
                            <div className="step-number">4</div>
                            <div className="step-icon">
                                <TrendingUp size={24} />
                            </div>
                            <h3>Improve Outcomes</h3>
                            <p>
                                Make data-driven decisions that lead to better patient outcomes and
                                more efficient care delivery.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security & Compliance */}
            <section className="security-section">
                <div className="section-container">
                    <div className="security-content">
                        <div className="security-text">
                            <div className="security-badge">
                                <Lock size={20} />
                                <span>Enterprise Security</span>
                            </div>
                            <h2>HIPAA-Ready Infrastructure</h2>
                            <p>
                                Sentinel is built with healthcare security and compliance at its core.
                                Your patient data is protected with industry-leading encryption and
                                access controls.
                            </p>
                            <div className="security-features">
                                <div className="security-feature">
                                    <CheckCircle2 size={20} />
                                    <span>End-to-end encryption</span>
                                </div>
                                <div className="security-feature">
                                    <CheckCircle2 size={20} />
                                    <span>Role-based access control</span>
                                </div>
                                <div className="security-feature">
                                    <CheckCircle2 size={20} />
                                    <span>Audit logs & compliance</span>
                                </div>
                                <div className="security-feature">
                                    <CheckCircle2 size={20} />
                                    <span>Regular security audits</span>
                                </div>
                            </div>
                        </div>
                        <div className="security-visual">
                            <div className="security-card">
                                <Shield size={48} />
                                <div className="security-stats">
                                    <div className="security-stat">
                                        <div className="stat-number">256-bit</div>
                                        <div className="stat-desc">Encryption</div>
                                    </div>
                                    <div className="security-stat">
                                        <div className="stat-number">99.9%</div>
                                        <div className="stat-desc">Uptime SLA</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="cta-section">
                <div className="section-container">
                    <div className="cta-content">
                        <h2>Start Using Sentinel Today</h2>
                        <p>
                            Join leading healthcare facilities using Sentinel to improve patient care
                            and streamline ICU operations.
                        </p>
                        <div className="cta-buttons">
                            <button className="btn-primary btn-xl" onClick={handleRequestDemo}>
                                Sign In
                                <ArrowRight size={20} />
                            </button>
                            <button className="btn-secondary btn-xl" onClick={handleViewDashboard}>
                                View Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="section-container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <img src={logo} alt="Sentinel" className="footer-logo" />
                            <span>Sentinel</span>
                        </div>
                        <div className="footer-links">
                            <a href="#features">Features</a>
                            <a href="#security">Security</a>
                            <a href="#contact">Contact</a>
                        </div>
                        <div className="footer-copyright">
                            © {new Date().getFullYear()} Sentinel. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;

