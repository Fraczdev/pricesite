import { useEffect, useState } from 'react'
import './App.css'

interface Plan {
  name: string;
  price: number;
  currency: string;
}

interface Service {
  id: string;
  name: string;
  plans: Plan[];
  cancelURL: string;
}

function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('./services.json') // Use relative path for GitHub Pages
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
    <div className="container">
      <h1>Subscription Services</h1>
      <div className="services-list">
        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <h2>{service.name}</h2>
            <ul className="plans-list">
              {service.plans.map((plan) => (
                <li key={plan.name} className="plan-item">
                  <span className="plan-name">{plan.name}</span>
                  <span className="plan-price">{plan.price.toFixed(2)} {plan.currency}</span>
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
  );
}

export default App
