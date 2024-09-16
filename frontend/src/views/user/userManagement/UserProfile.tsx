import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div className=''>
      <main className="flex-1 md:px-20 px-4 sm:px-8 lg:pt-4 lg:px-56 flex flex-col mx-auto mb-10">
        <section className="bg-gray-100 shadow rounded-2xl shadow-lg mt-10">
          <div className="md:flex border-b dark:border-gray-300">
            <h2 className="text-10 text-gray-500 font-semibold bg-grey-light text-left w-full py-4 pl-10 rounded-t-2xl">User Profile Details</h2>
          </div>
          <form className='p-10'>
            <div className="md:flex mb-8">
              <div className="md:w-1/3">
                <legend className="text-base font-bold tracking-tight text-gray-900 dark:text-grey">Account Details</legend>
              </div>
              {user && (
                <div className="md:flex-1 mb:mt-0 md:px-3">
                  <div className="md:flex mb-4">
                    <div className="md:flex-1 md:pr-3 mb-3">
                      <label className="text-base font-semibold tracking-tight text-gray-900 dark:text-grey">First Name</label>
                      <input className="w-full rounded-lg p-2 border-0" type="text" readOnly placeholder={user.firstname} />
                    </div>
                    <div className="md:flex-1 md:pl-3 mb-3">
                      <label className="text-base font-semibold tracking-tight text-gray-900 dark:text-grey">Last Name</label>
                      <input className="w-full rounded-lg p-2 border-0" type="text" readOnly placeholder={user.lastname} />
                    </div>
                  </div>
                  <div className="md:flex mb-4">
                    <div className="md:flex-1 md:pr-3 mb-3">
                      <label className="text-base font-semibold tracking-tight text-gray-900 dark:text-grey">Email Address</label>
                      <input className="w-full rounded-lg p-2 border-0" type="text" readOnly placeholder={user.email} />
                    </div>
                    <div className="md:flex-1 md:pl-3 mb-3">
                      <label className="text-base font-semibold tracking-tight text-gray-900 dark:text-grey">Password</label>
                      <input className="w-full rounded-lg p-2 border-0" type="password" readOnly placeholder="********" />
                    </div>
                  </div>
                  <div className="md:flex-1 mb-10">
                      <label className="text-base font-semibold tracking-tight text-gray-900 dark:text-grey">Delivery Address</label>
                      <input className="w-full rounded-lg p-2 border-0" type="text" readOnly placeholder={user.address} />
                    </div>
                  <Link to="/user-profile/update" className="mx-2">
                    <button type="button" className="px-5 py-2 bg-primary text-20 text-white font-semibold rounded-lg border border-primary transition duration-1000 ease-in-out hover:text-white hover:bg-grey -ml-2">Edit Details</button>
                  </Link>
                  
                </div>
              )}
            </div>


          </form>
        </section>

        <div className='My-orders'>
        </div>
      </main>
    </div>
  );
};

export default Profile;
