const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Fetch error');
    }

    return await response.json();
  } catch (error) {
    console.error('fetchData error:', error.message);
    throw error;
  }
};

export default fetchData;
