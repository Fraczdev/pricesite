import React, { useEffect, useState, useMemo } from 'react';
import './App.css';

interface Plan {
  name: string;
  price: number;
  currency: string;
}

interface Service {
  id: string;
  name: string;
  logoURL?: string;
  plans: Plan[];
  cancelURL: string;
}

const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
};

const App: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter services based on search term
  const filteredServices = useMemo(() => {
    if (!searchTerm.trim()) return services;
    return services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [services, searchTerm]);

  useEffect(() => {
    fetch('./services.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load services');
        return res.json();
      })
      .then(setServices)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="container">
      <div className="loader">
        <div className="spinner"></div>
        <p>Loading subscription services...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container">
      <div className="error">
        <h2>⚠️ Error Loading Services</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>💳 Subscription Manager</h1>
          <p className="subtitle">Manage and cancel your subscriptions easily</p>
          
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="21 21l-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Search services..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </header>

        {filteredServices.length === 0 && searchTerm ? (
          <div className="no-results">
            <h3>No services found</h3>
            <p>Try searching for something else</p>
          </div>
        ) : (
          <div className="services-list">
            {filteredServices.map((service) => (
              <div className="service-card" key={service.id}>
                <div className="service-header">
                  {service.logoURL && (
                    <img
                      src={service.logoURL}
                      alt={`${service.name} logo`}
                      className="service-logo"
                      loading="lazy"
                      onError={(e) => {
                        console.error('Logo failed to load:', service.logoURL);
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <h2 className="service-name">{service.name}</h2>
                </div>
                
                <div className="plans-section">
                  <h3 className="plans-title">Plans & Pricing</h3>
                  <ul className="plans-list">
                    {service.plans.map((plan, index) => (
                      <li key={`${plan.name}-${index}`} className="plan-item">
                        <span className="plan-name">{plan.name}</span>
                        <span className="plan-price">
                          {currencySymbols[plan.currency] || plan.currency}
                          {plan.price.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="actions">
                  <a 
                    className="cancel-link" 
                    href={service.cancelURL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg className="cancel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="15 9l-6 6"></path>
                      <path d="9 9l6 6"></path>
                    </svg>
                    Cancel Subscription
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <footer className="footer">
          <p>💡 Tip: Bookmark this page for easy access to cancel links</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
