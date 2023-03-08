import { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const [password, setPassword] = useState('');
  const [errorPassword, seterrorPassword] = useState(null);

// new code 
const [firstName,setFirstName]=useState('')
const [lastName,setLastName]=useState('')


  const userData={firstName: "", lastName: "", age: "0",gender:'',email:''}
  const onSubmitHandler = (e)=>{
   e.preventDefault() 
   userData.firstName=firstName
   userData.lastName=lastName
   userData.age=age
   userData.gender=gender
   userData.email=email
  }
function handleChangFirstname(e){
  setFirstName(e.target.value)

}
function handleChangeLastName(e){
  setLastName(e.target.value)
}

  
  




  //end 
  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  
  const renderDays = () => {
    let content = [];
    const date = new Date();
    for (let i = 1; i <= daysInMonth(date.getMonth() + 1, date.getFullYear()); i++) {
      content.push(<option value='day'>{i}</option>)
    }
    return content
  }

  const renderMonths = () => {
    let months = []
    for (let i = 1; i <= 12; i++) {
      months.push(<option value='day'>{i}</option>)
    }
    return months
  }
  const renderYears = () => {
    let months = []
    for (let i = 1930; i <= 2008; i++) {
      months.push(<option value='day'>{i}</option>)
    }
    return months
  }

  function testEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  const handleChange = event => {
    if (!testEmail(event.target.value)) {
      setError('Email is invalid');
    } else {
      setError(null);
    }

    setEmail(event.target.value);
  }
  

  function testPassword(password){
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)
  }

  const handleChangePassword = event => {
    if (!testPassword(event.target.value)) {
      seterrorPassword('Password is invalid');
    } else {
      seterrorPassword(null);
    }

    setPassword(event.target.value);
  }
  return (
    <div className="App">
      <div className="container">
        <form className='formWrraper'  onSubmit={onSubmitHandler}>
          <label> <div>Name:*</div>
            <input type="text" name='name'
            onChange={handleChangFirstname}
              required
              maxLength="50" />
          </label>
          <label> <div>Surname:*</div>
            <input type="text" name='surname'
            onChange={handleChangeLastName}
              required
              maxLength="50" />
          </label>
          <label> <div> Email:*</div>
            <input type="email" name='email'
              required 
              value={email}
              onChange={handleChange}/>
              {error && <div style={{color: 'red'}}>{error}</div>}
          </label>
          <label>  <div>Password:*</div>
            <input  type='password' name='password'
              required
              value={password} 
              onChange={handleChangePassword}/>
              {errorPassword && <div style={{color: 'red'}}>{errorPassword}</div>}
          </label>
          <label><div>Date of birth:*</div>
            <select className='days' name='days' required>
              <option>day</option>
              {renderDays()}
            </select>
            <select className='month' name='month' required>
              <option  >month</option>
              {renderMonths()}
            </select>
            <select className='year' name='year' required>
              <option value='year'>year</option>
              {renderYears()}
            </select>
          </label>
          <labe> <div>Bio:</div>
            <textarea name="bio" rows="4" cols="50" />
          </labe>
          <label><div>Languages:*</div>
            <div>
              <input type="checkbox" name='language ' required/>
              <label>Armenian</label>
            </div>
            <div>
              <input type="checkbox" name='language ' />
              <label >Russian</label>
            </div>
            <div>
              <input type="checkbox" name='language ' />
              <label>English</label>
            </div>
          </label>
          <label required> <div>Gender:*</div>
            <div>
              <input type="radio" name='male' />
              <label>Male</label>
            </div>
            <div>
              <input type="radio" name='female' />
              <label>Female</label>
            </div>
          </label>
          <label><div>Upload Photo:</div>
            <input type="file" name="img" />
          </label>
          <input type='submit' value='Log in'></input>

          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
