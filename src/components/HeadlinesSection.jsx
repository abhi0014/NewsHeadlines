
import React, { useState, useEffect } from 'react';

function HeadlinesSection() {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHeadlines = async () => {
    try {
      const response = await fetch(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=9f31baec8e834d9096308d83bf4a224d'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch headlines');
      }
      const data = await response.json();
      setHeadlines(data.articles.slice(0, 5)); // Limit to 5 headlines
      setLoading(false);
    } catch (error) {
      setError('Error fetching headlines. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeadlines();
  }, []);

  // const handleRefresh = () => {
  //   setLoading(true);
  //   fetchHeadlines();
  // };

  return (
    <div className="headlines-section">
      <div className="refresh-container">
        <h2>Latest Headlines</h2>
        {/* <button onClick={handleRefresh} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button> */}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="headlines-container">
          {headlines.map((headline, index) => (
            <div className="headline" key={index}>
              <h3>{headline.title}</h3>
              <p>{headline.source.name}</p>
              <p>{new Date(headline.publishedAt).toDateString()}</p>
              <a href={headline.url} target="_blank" rel="noopener noreferrer">Read More</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HeadlinesSection;
