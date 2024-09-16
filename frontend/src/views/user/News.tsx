import React, { useEffect, useState } from 'react';

interface NewsfeedItem {
  _id: string;
  description: string;
  discount: number;
  itemId: string;
  createdAt: string;
  updatedAt: string;
}

const News: React.FC = () => {
  const [newsfeeds, setNewsfeeds] = useState<NewsfeedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsfeeds = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/newsfeeds');
        const data = await response.json();
        setNewsfeeds(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching newsfeeds');
        setLoading(false);
      }
    };
    fetchNewsfeeds();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-screen-xl mx-auto my-20">
      {newsfeeds.length > 0 ? (
        newsfeeds.map((newsfeed) => (
          <div key={newsfeed._id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">{newsfeed.description}</h2>
              <p className="text-sm text-gray-600">Discount: {newsfeed.discount}%</p>
            </div>

          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No newsfeeds available</div>
      )}
    </div>
  );
};

export default News;
