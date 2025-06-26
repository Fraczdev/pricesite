import React, { useEffect, useState } from 'react';
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

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <div className="container">
        <h1>Subscription Services</h1>
        <div className="services-list">
          {services.map((service) => (
            <div className="service-card" key={service.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {service.logoURL && (
                  <img
                    src={service.logoURL}
                    alt={service.name + ' logo'}
                    style={{ width: 32, height: 32, objectFit: 'contain', marginRight: 8, background: '#fff', border: '1px solid #eee', borderRadius: 8 }}
                    loading="lazy"
                    onError={e => {
                      console.error('Logo failed to load:', service.logoURL);
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <h2>{service.name}</h2>
              </div>
              <ul className="plans-list">
                {service.plans.map((plan) => (
                  <li key={plan.name} className="plan-item">
                    <span className="plan-name">{plan.name}</span>
                    <span className="plan-price">
                      {currencySymbols[plan.currency] || plan.currency} {plan.price.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <a className="cancel-link" href={service.cancelURL} target="_blank" rel="noopener noreferrer">
                Cancel Subscription
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
