import  { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Added name field
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/register`, {
        email,
        password,
        name
      });
      login({ name, email }); // Update auth state
      navigate('/');
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
      <input 
          type="name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
      <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <h3></h3>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
