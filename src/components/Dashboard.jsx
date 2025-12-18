import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import Chatbot from './Chatbot';
import './Dashboard.css';

function Dashboard({ onLogout }) {
    const navigate = useNavigate();
    const [calendarKey, setCalendarKey] = useState(Date.now());

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    const refreshCalendar = useCallback(() => {
        setCalendarKey(Date.now());
    }, []);

    const calendarUrl = `https://calendar.google.com/calendar/embed?src=aldair30d%40gmail.com&ctz=America%2FLima&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&mode=MONTH&height=600&wkst=1&bgcolor=%23ffffff&refresh=${calendarKey}`;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="dashboard-header-left">
                    <div className="dashboard-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h1 className="dashboard-title">Panel de Control</h1>
                </div>

                <div className="dashboard-user">
                    <div className="user-info">
                        <div className="user-name">Administrador</div>
                        <div className="user-role">Usuario Principal</div>
                    </div>
                    <button
                        className="logout-button"
                        onClick={handleLogout}
                        aria-label="Cerrar sesión"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </header>

            <div className="dashboard-content">
                <section className="dashboard-section" aria-label="Sección de chatbot">
                    <div className="section-header">
                        <h2 className="section-title">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            Asistente Virtual
                        </h2>
                    </div>
                    <div className="section-content">
                        <Chatbot onEventCreated={refreshCalendar} />
                    </div>
                </section>

                <section className="dashboard-section" aria-label="Sección de calendario">
                    <div className="section-header">
                        <h2 className="section-title">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Calendario de Eventos
                        </h2>
                        <button
                            className="refresh-button"
                            onClick={refreshCalendar}
                            aria-label="Refrescar calendario"
                            title="Refrescar calendario"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>
                    <div className="section-content">
                        <div className="calendar-wrapper">
                            <iframe
                                key={calendarKey}
                                src={calendarUrl}
                                className="calendar-iframe"
                                title="Calendario de eventos"
                                loading="lazy"
                                aria-label="Calendario de eventos de Google"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;

