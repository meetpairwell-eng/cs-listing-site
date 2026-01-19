# SimplyRETS API Integration Guide

## Setup

### 1. Get Your API Credentials

1. Sign up at [SimplyRETS.com](https://simplyrets.com/)
2. Get your API Key and API Secret from your dashboard
3. Note your MLS ID (if applicable)

### 2. Configure Environment Variables

Update your `.env.local` file with your credentials:

```bash
VITE_SIMPLYRETS_API_KEY=your_actual_api_key
VITE_SIMPLYRETS_API_SECRET=your_actual_api_secret
VITE_AGENT_MLS_ID=your_mls_id
```

**Important:** Never commit `.env.local` to git! It's already in `.gitignore`.

### 3. Restart Development Server

After adding environment variables, restart your dev server:

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Usage

### Basic Property Fetch

```javascript
import { fetchProperties } from './api/idxService';

const properties = await fetchProperties({
  status: 'Active',
  cities: 'Dallas',
  limit: 50
});
```

### Search with Filters

```javascript
import { fetchProperties } from './api/idxService';

const searchResults = await fetchProperties({
  status: 'Active',
  minprice: 500000,
  maxprice: 2000000,
  minbeds: 3,
  minbaths: 2,
  cities: 'Dallas,Highland Park',
  type: 'Residential',
  limit: 50
});
```

### Get Single Property

```javascript
import { fetchPropertyById } from './api/idxService';

const property = await fetchPropertyById('MLS123456');
```

## Available Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `minprice` | number | Minimum list price | `500000` |
| `maxprice` | number | Maximum list price | `2000000` |
| `cities` | string | Comma-separated cities | `"Dallas,Frisco"` |
| `neighborhoods` | string | Comma-separated neighborhoods | `"Preston Hollow"` |
| `postalCodes` | string | Comma-separated zip codes | `"75205,75225"` |
| `minbeds` | number | Minimum bedrooms | `3` |
| `maxbeds` | number | Maximum bedrooms | `5` |
| `minbaths` | number | Minimum bathrooms | `2` |
| `maxbaths` | number | Maximum bathrooms | `4` |
| `minarea` | number | Minimum square feet | `2000` |
| `maxarea` | number | Maximum square feet | `5000` |
| `type` | string | Property type | `"Residential"` |
| `status` | string | Listing status | `"Active"` |
| `limit` | number | Results per page (max 500) | `50` |
| `offset` | number | Pagination offset | `0` |
| `sort` | string | Sort field (- for desc) | `"-listPrice"` |
| `water` | boolean | Waterfront properties | `"true"` |
| `pool` | boolean | Has pool | `"true"` |
| `garage` | number | Garage spaces | `"2"` |

## Data Mapping

SimplyRETS properties are automatically mapped to match your PropertyCard component:

```javascript
{
  id: "MLS123456",
  mlsId: "MLS123456",
  address: "123 Main St, Dallas, TX 75205",
  city: "Dallas",
  state: "TX",
  zip: "75205",
  price: 1500000,
  priceFormatted: "$1.50M",
  beds: 4,
  baths: 3,
  sqft: 3500,
  sqftFormatted: "3,500",
  status: "Active",
  image: "https://...",
  photos: [...],
  lat: 32.7767,
  lng: -96.7970,
  coordinates: { lat: 32.7767, lng: -96.7970 }
}
```

## Integration Example

### Update PropertySearch Component

```javascript
import { useState, useEffect } from 'react';
import { fetchProperties } from '../../api/idxService';
import PropertyList from './components/PropertyList';

const PropertySearch = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minprice: null,
    maxprice: null,
    cities: 'Dallas',
    minbeds: null,
  });

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const data = await fetchProperties({
          status: 'Active',
          ...filters,
          limit: 50
        });
        setListings(data);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [filters]);

  if (loading) return <div>Loading...</div>;

  return (
    <PropertyList 
      listings={listings}
      onPropertyClick={(property) => {
        // Handle property click
      }}
    />
  );
};
```

## Testing

### Test with Demo Credentials

SimplyRETS provides demo credentials for testing:

```bash
VITE_SIMPLYRETS_API_KEY=simplyrets
VITE_SIMPLYRETS_API_SECRET=simplyrets
```

These will return sample data from the Dallas area.

### Verify Integration

1. Check browser console for any errors
2. Verify API calls in Network tab
3. Ensure properties display in PropertyCard components

## Troubleshooting

### "API credentials not configured"
- Check that environment variables are set in `.env.local`
- Restart dev server after adding variables
- Verify variable names start with `VITE_`

### "401 Unauthorized"
- Verify API key and secret are correct
- Check that credentials are properly encoded in Basic Auth

### "No properties returned"
- Check your search filters aren't too restrictive
- Verify the cities/neighborhoods exist in your MLS
- Try broader search criteria

### CORS Errors
- SimplyRETS API should support CORS
- If issues persist, you may need a backend proxy

## API Documentation

Full SimplyRETS API documentation:
https://docs.simplyrets.com/api/index.html

## Support

For SimplyRETS API support:
- Email: support@simplyrets.com
- Documentation: https://docs.simplyrets.com/
