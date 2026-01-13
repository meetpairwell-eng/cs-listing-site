import './Services.css';

const Services = () => {
    const services = [
        {
            id: 1,
            title: 'HOME SEARCH',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
            link: '#listings'
        },
        {
            id: 2,
            title: 'HOME VALUATION',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
            link: '#contact'
        },
        {
            id: 3,
            title: "LET'S CONNECT",
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
            link: '#contact'
        }
    ];

    return (
        <section id="services" className="services-section">
            <div className="container">
                <div className="services-grid">
                    {services.map((service) => (
                        <a
                            key={service.id}
                            href={service.link}
                            className="service-card"
                        >
                            <div className="service-image">
                                <img src={service.image} alt={service.title} />
                                <div className="service-overlay"></div>
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
