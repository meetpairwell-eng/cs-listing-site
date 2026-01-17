import { Link } from 'react-router-dom';
import './Services.css';

const Services = ({ onContactClick }) => {
    const services = [
        {
            id: 1,
            title: 'HOME SEARCH',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
            type: 'link',
            path: '/search'
        },
        {
            id: 2,
            title: 'HOME VALUATION',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
            type: 'modal'
        },
        {
            id: 3,
            title: "LET'S CONNECT",
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
            type: 'modal'
        }
    ];

    return (
        <section id="services" className="services-section">
            <div className="container">
                <div className="services-grid">
                    {services.map((service) => (
                        service.type === 'link' ? (
                            <Link
                                key={service.id}
                                to={service.path}
                                className="service-card"
                            >
                                <div className="service-image">
                                    <img src={service.image} alt={service.title} />
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
                                    <img src={service.image} alt={service.title} />
                                    <div className="service-overlay"></div>
                                </div>
                                <h3 className="service-title">{service.title}</h3>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
