import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  username: string;
  firstname: string;
  lastname: string;
  address: string;
  mobilenumber: string;
  email: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Assumes you store the token in localStorage
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profilep-get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err: any) {
        setError(err.response?.data.message || 'Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <p>Loading user profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-profile">
      {user && (
        <div>
          <h1>{user.firstname} {user.lastname}'s Profile</h1>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile Number:</strong> {user.mobilenumber}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
