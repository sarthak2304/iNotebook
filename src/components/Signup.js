import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword: ""})
    let history = useHistory();

    const onChange=(e)=>{
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e, props)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name, email, password})
        })
        const json = await response.json()
        console.log(json)
        if (json.success){
            //redirect and save the auth token
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            props.showAlert("Account created succesfully", "success")
        }
        else{
            props.showAlert("Invalid Credentials. If already a user try logging in.", "danger")
        }

    }

    return (
        <div className='container mt-3'>
            <h2>You need to create an account to start using iNotebook. Let's get you started</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChange} id="name" aria-describedby="emailHelp" name="name" required/></div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} id="email" aria-describedby="emailHelp" name="email" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} id="password" minLength={8} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" onChange={onChange} id="cpassword" minLength={8} required />
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        </div>
    )
};

export default Signup;
