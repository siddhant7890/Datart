import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ViewData = () => {
  const location = useLocation();
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const passedData = location.state ? location.state.data : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://server-dot-aatman-studio.el.r.appspot.com/Product/1/ALL');
        console.log(response.data);
        setApiData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch data', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Submitted and API Data</h1>
      <h2>Submitted Data:</h2>
      {passedData ? (
        <pre>{JSON.stringify(passedData, null, 2)}</pre>
      ) : (
        <p>No submitted data available.</p>
      )}
      <h2>API Data:</h2>
      {isLoading ? (
        <p>Loading API data...</p>
      ) : (
        <ul>
          {apiData.map(product => (
            <li key={product.id}>
              {product.title} - ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewData;
