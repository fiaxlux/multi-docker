import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = () => {
  const [index, setIndex] = useState('');
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});

  const isEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  useEffect(() => {
    fetchValues();
  }, [])

  // useEffect(() => {
  //   const interval = setInterval(fetchValues, 5000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [])

  useEffect(() => {
    fetchIndexes();
  }, [])

  // useEffect(() => {
  //   const interval = setInterval(fetchIndexes, 5000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [])

  const fetchValues = async () => {
    try {
      const { data } = await axios.get('/api/values/current');
      if (!isEqual(data, values)) {
        setValues(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchIndexes = async () => {
    try {
      const { data } = await axios.get('/api/values/all');
      if (!isEqual(data, seenIndexes)) {
        setSeenIndexes(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/values', { index });
      setIndex('');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ');
  }

  const renderValues = () => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }
    return entries;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
}

export default Fib;
