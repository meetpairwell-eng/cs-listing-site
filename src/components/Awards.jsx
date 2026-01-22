import { SITE_CONFIG } from '../config';
import './Awards.css';

const Awards = () => {
    // Only render if awards are defined
    if (!SITE_CONFIG.awards || SITE_CONFIG.awards.length === 0) return null;

    const getImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        return `${SITE_CONFIG.mediaBaseUrl}/${path}`;
    };

    return (
        <section className="awards-section">
            <div className="container">
                <div className="awards-grid">
                    {SITE_CONFIG.awards.map((award, index) => (
                        <div key={index} className="award-item">
                            <img
                                src={getImageUrl(award)}
                                alt={`Award ${index + 1}`}
                                className="award-image"
                                onError={(e) => {
                                    // Fallback: Show a visible placeholder box instead of hiding
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `<div style="width: 150px; height: 80px; background: #eee; display: flex; align-items: center; justify-content: center; color: #888; font-size: 11px; border: 1px dashed #bbb; border-radius: 4px;">AWARDS PLACEHOLDER</div>`;
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Awards;
