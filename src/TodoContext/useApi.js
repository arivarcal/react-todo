import React from 'react';

const API_URL = 'https://fastapi-product-gm21.onrender.com/tasks/';

function useApi() {
  const [item, setItem] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setItem(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, []);

  const saveItem = async (newItem) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      const data = await response.json();
      setItem([...item, data]);
    } catch (error) {
      setError(true);
    }
  };

  const updateItem = async (id, updatedItem) => {
    try {
      await fetch(`${API_URL}${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });
      setItem(item.map((i) => (i.id === id ? updatedItem : i)));
    } catch (error) {
      setError(true);
    }
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`${API_URL}${id}`, {
        method: 'DELETE',
      });
      setItem(item.filter((i) => i.id !== id));
    } catch (error) {
      setError(true);
    }
  };

  return {
    item,
    saveItem,
    updateItem,
    deleteItem,
    loading,
    error,
  };
}

export { useApi };