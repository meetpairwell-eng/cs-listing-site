/**
 * Example: How to use the SimplyRETS API Service
 * 
 * This file demonstrates how to integrate the idxService into your components
 */

import { fetchProperties, fetchPropertyById } from '../api/idxService';

// Example 1: Fetch all active properties
export const getAllActiveProperties = async () => {
    try {
        const properties = await fetchProperties({
            status: 'Active',
            limit: 50
        });
        return properties;
    } catch (error) {
        console.error('Error fetching properties:', error);
        return [];
    }
};

// Example 2: Search properties with filters
export const searchProperties = async (filters) => {
    try {
        const params = {
            status: 'Active',
            minprice: filters.minPrice,
            maxprice: filters.maxPrice,
            minbeds: filters.minBeds,
            minbaths: filters.minBaths,
            cities: filters.cities, // e.g., "Dallas,Highland Park"
            neighborhoods: filters.neighborhoods,
            type: filters.propertyType, // e.g., "Residential"
            limit: filters.limit || 50,
            offset: filters.offset || 0
        };

        const properties = await fetchProperties(params);
        return properties;
    } catch (error) {
        console.error('Error searching properties:', error);
        return [];
    }
};

// Example 3: Get property details by MLS ID
export const getPropertyDetails = async (mlsId) => {
    try {
        const property = await fetchPropertyById(mlsId);
        return property;
    } catch (error) {
        console.error('Error fetching property details:', error);
        return null;
    }
};

// Example 4: Integration with React component
/*
import { useState, useEffect } from 'react';
import { fetchProperties } from '../api/idxService';
import PropertyList from '../modules/property-search/components/PropertyList';

const PropertySearchPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const data = await fetchProperties({
          status: 'Active',
          cities: 'Dallas,Highland Park',
          minprice: 500000,
          maxprice: 5000000,
          limit: 50
        });
        setListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PropertyList 
      listings={listings}
      onPropertyClick={(property) => console.log('Clicked:', property)}
    />
  );
};
*/

// Example 5: Available query parameters for fetchProperties()
/*
{
  // Price filters
  minprice: 100000,
  maxprice: 1000000,
  
  // Location filters
  cities: "Dallas,Highland Park,University Park",
  neighborhoods: "Preston Hollow,Lakewood",
  postalCodes: "75205,75225",
  
  // Property specs
  minbeds: 3,
  maxbeds: 5,
  minbaths: 2,
  maxbaths: 4,
  minarea: 2000,  // sqft
  maxarea: 5000,
  
  // Property type
  type: "Residential", // or "Condo", "Townhouse", etc.
  
  // Status
  status: "Active", // or "Pending", "Closed"
  
  // Pagination
  limit: 50,  // max 500
  offset: 0,
  
  // Sorting
  sort: "-listPrice",  // - for descending, + for ascending
  
  // Additional filters
  water: "true",  // waterfront properties
  pool: "true",
  garage: "2",
  
  // Date filters
  lastmod: "2024-01-01",  // properties modified since this date
}
*/

export default {
    getAllActiveProperties,
    searchProperties,
    getPropertyDetails,
};
