import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import OptimizedImage from './common/OptimizedImage';
import './Services.css';

const Services = ({ onContactClick }) => {
    const services = [
        {
            id: 2,
            title: 'HOME VALUATION',
            image: SITE_CONFIG.serviceImages?.homeValuation,
            type: 'link',
            path: '/home-valuation'
        },
        {
            id: 3,
            title: "LET'S CONNECT",
            image: SITE_CONFIG.serviceImages?.connect,
            type: 'modal'
        }
    ];

    return (
        <section id="services" className="services-section">
            <div className="services-grid">
                {services.map((service) => (
                    service.type === 'link' ? (
                        <Link
                            key={service.id}
                            to={service.path}
                            className="service-card"
                        >
                            <div className="service-image">
                                <OptimizedImage src={service.image} alt={service.title} width={1000} />
                                <div className="service-overlay"></div>
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                        </Link>
                    ) : (
                        <div
                            key={service.id}
                            onClick={onContactClick}
                            className="service-card"
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="service-image">
                                <OptimizedImage src={service.image} alt={service.title} width={1000} />
                                <div className="service-overlay"></div>
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                        </div>
                    )
                ))}
            </div>
        </section>
    );
};

export default Services;
