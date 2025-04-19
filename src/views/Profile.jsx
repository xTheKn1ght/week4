import { useEffect, useState } from 'react';
import { useUser } from '../hooks/apiHooks';

const Profile = () => {
  const { getUserByToken } = useUser();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserByToken();
        setUser(userData);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <h1>Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </>
  );
};

export default Profile;
