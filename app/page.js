"use client";

import React, { useEffect, useState } from 'react';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test_db`, {
          method: "GET",
        });

        if (!result.ok) {
          throw new Error('Error to fetch users');
        }

        const data = await result.json();
        console.log(data);
        
        if (data.data && Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          throw new Error('Invalid data format');
        }

      } catch (error) {
        console.log(error.message);
      }
    }

    getUser();
  }, []);

  return (
    <div>
      Home
      <ul>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              <li>{user.username}</li>
              <li>{user.password}</li>
              <li>{user.email}</li>
            </div>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  )
}

export default Home