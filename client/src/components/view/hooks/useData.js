import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://mern-test-i7hp.onrender.com/drowing';

const useData = (path,id) => {
  const [drowing, setDrowing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDrowingData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(id?`${BASE_URL}/${path}/${id}`:`${BASE_URL}/${path}`);
      setDrowing(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error fetching drowing data:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrowingData();
  }, [id]); // Empty dependency array means this effect runs once after the initial render

  return { drowing, loading, error };
};

export default useData;
