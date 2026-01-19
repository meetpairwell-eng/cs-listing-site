import { useState } from 'react';
import { fetchProperties } from '../api/idxService';

/**
 * SimplyRETS API Test Page
 * Navigate to /api-test to verify your API integration
 */
const APITestPage = () => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const testAPI = async () => {
        setLoading(true);
        setError(null);
        setResults(null);

        try {
            console.log('🔍 Testing SimplyRETS API...');

            // Test with minimal parameters
            const properties = await fetchProperties({
                status: 'Active',
                limit: 5  // Just get 5 properties for testing
            });

            console.log('✅ API Response:', properties);
            setResults(properties);
        } catch (err) {
            console.error('❌ API Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            padding: '40px',
            maxWidth: '1200px',
            margin: '0 auto',
            fontFamily: 'var(--font-body)'
        }}>
            <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                marginBottom: '2rem'
            }}>
                SimplyRETS API Test
            </h1>

            <div style={{
                background: '#f5f5f5',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '2rem'
            }}>
                <h2 style={{ marginBottom: '1rem' }}>Environment Variables Status:</h2>
                <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                    <div style={{ marginBottom: '8px' }}>
                        <strong>API Key:</strong> {import.meta.env.VITE_SIMPLYRETS_API_KEY ?
                            <span style={{ color: 'green' }}>✓ Set</span> :
                            <span style={{ color: 'red' }}>✗ Missing</span>
                        }
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                        <strong>API Secret:</strong> {import.meta.env.VITE_SIMPLYRETS_API_SECRET ?
                            <span style={{ color: 'green' }}>✓ Set</span> :
                            <span style={{ color: 'red' }}>✗ Missing</span>
                        }
                    </div>
                    <div>
                        <strong>MLS ID:</strong> {import.meta.env.VITE_AGENT_MLS_ID ?
                            <span style={{ color: 'green' }}>✓ Set ({import.meta.env.VITE_AGENT_MLS_ID})</span> :
                            <span style={{ color: 'orange' }}>⚠ Optional</span>
                        }
                    </div>
                </div>
            </div>

            <button
                onClick={testAPI}
                disabled={loading}
                style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    background: loading ? '#ccc' : '#4A5D4F',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginBottom: '2rem'
                }}
            >
                {loading ? 'Testing API...' : 'Test API Connection'}
            </button>

            {loading && (
                <div style={{
                    padding: '20px',
                    background: '#e3f2fd',
                    borderRadius: '8px',
                    marginBottom: '2rem'
                }}>
                    <p>🔄 Fetching properties from SimplyRETS...</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                        Check the browser console (F12) for detailed logs
                    </p>
                </div>
            )}

            {error && (
                <div style={{
                    padding: '20px',
                    background: '#ffebee',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    border: '1px solid #f44336'
                }}>
                    <h3 style={{ color: '#d32f2f', marginBottom: '1rem' }}>❌ Error</h3>
                    <p style={{ fontFamily: 'monospace', fontSize: '14px' }}>{error}</p>

                    <div style={{ marginTop: '1rem', fontSize: '14px' }}>
                        <strong>Common Issues:</strong>
                        <ul style={{ marginTop: '8px' }}>
                            <li>Check that API credentials are correct in .env.local</li>
                            <li>Verify you restarted the dev server after adding credentials</li>
                            <li>Make sure credentials start with VITE_ prefix</li>
                            <li>Try using demo credentials: simplyrets / simplyrets</li>
                        </ul>
                    </div>
                </div>
            )}

            {results && (
                <div style={{
                    padding: '20px',
                    background: '#e8f5e9',
                    borderRadius: '8px',
                    border: '1px solid #4caf50'
                }}>
                    <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>
                        ✅ Success! Found {results.length} properties
                    </h3>

                    <div style={{
                        background: 'white',
                        padding: '15px',
                        borderRadius: '4px',
                        marginTop: '1rem'
                    }}>
                        <h4 style={{ marginBottom: '1rem' }}>Sample Properties:</h4>
                        {results.map((property, index) => (
                            <div
                                key={property.id}
                                style={{
                                    padding: '15px',
                                    marginBottom: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    background: '#fafafa'
                                }}
                            >
                                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                                    Property {index + 1}: {property.address}
                                </div>
                                <div style={{ fontSize: '14px', color: '#666' }}>
                                    <div>MLS ID: {property.mlsId}</div>
                                    <div>Price: {property.priceFormatted}</div>
                                    <div>Beds: {property.beds} | Baths: {property.baths} | Sqft: {property.sqftFormatted}</div>
                                    <div>Status: {property.status}</div>
                                    {property.image && (
                                        <div style={{ marginTop: '8px' }}>
                                            <img
                                                src={property.image}
                                                alt={property.address}
                                                style={{
                                                    maxWidth: '200px',
                                                    height: 'auto',
                                                    borderRadius: '4px'
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        marginTop: '1rem',
                        padding: '15px',
                        background: 'white',
                        borderRadius: '4px'
                    }}>
                        <strong>✓ API is working correctly!</strong>
                        <p style={{ fontSize: '14px', marginTop: '8px' }}>
                            You can now use the idxService in your components to fetch real properties.
                        </p>
                    </div>
                </div>
            )}

            <div style={{
                marginTop: '3rem',
                padding: '20px',
                background: '#fff3e0',
                borderRadius: '8px'
            }}>
                <h3 style={{ marginBottom: '1rem' }}>📋 What to Check:</h3>
                <ol style={{ fontSize: '14px', lineHeight: '1.8' }}>
                    <li><strong>Environment Variables:</strong> Make sure all three variables show "✓ Set" above</li>
                    <li><strong>Browser Console:</strong> Open DevTools (F12) → Console tab to see detailed logs</li>
                    <li><strong>Network Tab:</strong> Check DevTools → Network tab for API requests to api.simplyrets.com</li>
                    <li><strong>Test Button:</strong> Click "Test API Connection" to verify the integration</li>
                    <li><strong>Success Message:</strong> You should see green success box with property data</li>
                </ol>
            </div>

            <div style={{
                marginTop: '2rem',
                padding: '20px',
                background: '#f5f5f5',
                borderRadius: '8px',
                fontSize: '14px'
            }}>
                <h3 style={{ marginBottom: '1rem' }}>🔧 Troubleshooting:</h3>
                <ul style={{ lineHeight: '1.8' }}>
                    <li><strong>401 Unauthorized:</strong> Check API key/secret are correct</li>
                    <li><strong>CORS Error:</strong> SimplyRETS should support CORS, but check console</li>
                    <li><strong>No properties:</strong> Try demo credentials (simplyrets/simplyrets)</li>
                    <li><strong>Variables not set:</strong> Restart dev server after updating .env.local</li>
                </ul>
            </div>
        </div>
    );
};

export default APITestPage;
