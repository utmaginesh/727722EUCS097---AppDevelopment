import React, { useState, useContext, useEffect } from 'react';
import '../Assests/css/Login.css';
import axios from 'axios';
import user_icon from '../Assests/img/person.png';
import email_icon from '../Assests/img/email.png';
import password_icon from '../Assests/img/password.png';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../UserContext';

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser, setAuth, setRole, auth } = useContext(UserContext);
    const handleSignup = async () => {
        if (action === "Login") {
            setAction("Sign Up");
            setName('');
            setEmail('');
            setPassword('');
            return;
        }
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/user/register', {
                name,
                email,
                password,
            });
            console.log(response);
            if (response.data === 1) {
                alert('Student already Registered.');
                navigate('/login');
                window.location.reload();
                return;
            } else {
                setUser(email);
                setRole('user');
                alert('Registered Successfully');
                navigate('/dashboard');
                return;
            }
        } catch (error) {
            console.error('There was an error registering the user!', error);
        }
    };

    const handleLogin = async () => {
        if (action === "Sign Up") {
            setAction("Login");
            return;
        }
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        try {
            const res = await fetch('http://localhost:3001/admin');
            const admin = await res.json();
            if (admin.email === email && admin.password === password) {
                setRole('admin');
                setUser(email);
                alert("Admin Logged In Successfully");
                setAuth(true);
                navigate("/admindashboard");
                return;
            } else if (admin.email === email) {
                alert("Password is incorrect!");
                setPassword('');
                return;
            }
            const response = await axios.post('http://localhost:8080/api/user/login', {
                email,
                password,
            });
            console.log(response);
            if (response.data === 1) {
                alert('Student is not Registered.');
                handleSignup();
                return;
            } else if (response.data === 2) {
                alert('Incorrect Password.');
                return;
            } else {
                setAuth(true);
                setUser(email);
                setRole('user');
                alert('Logged In Successfully');
                navigate('/dashboard');
                return;
            }
        } catch (error) {
            console.log('There was an error logging in the user!', error);
        }
            
    };

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    return (
        <div className='loginpage'>
            <div className='container'>
                <div className='header'>
                    <div className='text'>{action}</div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    {action === "Login" ? <div></div> : 
                    <div className='input'>
                        <img src={user_icon} alt=''></img>
                        <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required></input>
                    </div>}
                    <div className='input'>
                        <img src={email_icon} alt=''></img>
                        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                    </div>
                    <div className='input'>
                        <img src={password_icon} alt=''></img>
                        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                    </div>
                </div>
                {action === 'Sign Up' ? <div></div> :
                <div className='forgot-password'>Forgot Password? <span>Click Here!</span></div>}
                <div className='submit-container'>
                    <div className={action === 'Login' ? 'submit gray' : 'submit'} onClick={handleSignup}>Sign Up</div>
                    <div type="submit" className={action === 'Sign Up' ? 'submit gray' : 'submit'} onClick={handleLogin}>Login</div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
