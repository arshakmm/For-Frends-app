import { useState } from 'react';
import './App.css';
import bcrypt from 'bcryptjs'
import defaultAvatar from './assets/defaultAvatar.jpg'
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

function App() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');
  const [errorPassword, seterrorPassword] = useState(null);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [errorDate, setErrorDate] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [bio, setBio] = useState('')
  const [languages, setLanguages] = useState([])
  const [gender, setGender] = useState('')
  const [avatarPhoto, setAvatarPhoto] = useState('')

  const navigate = useNavigate()

  const userData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    day: '',
    month: '',
    year: '',
    bio: '',
    languages: ',',
    gender: '',
    avatarPhoto: ''
  }
  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (!day || !month || !year) {
      setErrorDate('input date')
      setTimeout(() => setErrorDate(''), 3000)
      return
    }
    userData.firstName = firstName
    userData.lastName = lastName
    userData.email = email
    userData.password = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
    userData.bio = bio
    userData.day = day;
    userData.month = month;
    userData.year = year;
    userData.languages = languages
    userData.gender = gender
    userData.avatarPhoto = avatarPhoto

    navigate('/profile', {
      state: {
        userData
      }
    })

    emailjs.send('service_ggeuffa', 'template_sks7ddj', {
      user_name: firstName,
      message: bio
    }, 'MynObeToSrNFTIhBg')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }


  function handleChangFirstname(e) {
    setFirstName(e.target.value)

  }
  function handleChangeLastName(e) {
    setLastName(e.target.value)
  }

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  const renderDays = () => {
    let content = [];
    const date = new Date();
    for (let i = 1; i <= daysInMonth(date.getMonth() + 1, date.getFullYear()); i++) {
      content.push(<option key={i} value={i}>{i}</option>)
    }
    return content
  }

  const renderMonths = () => {
    let months = []
    for (let i = 1; i <= 12; i++) {
      months.push(<option key={i} value={i}>{i}</option>)
    }
    return months
  }
  const renderYears = () => {
    let months = []
    for (let i = 1930; i <= 2008; i++) {
      months.push(<option key={i} value={i}>{i}</option>)
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


  function testPassword(password) {
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
  const handleChangeDate = (event, key) => {
    if (key === 'day') {
      setDay(event.target.value)
    } else if (key === 'month') {
      setMonth(event.target.value)
    } else if (key === 'year') {
      setYear(event.target.value)
    }
  }

  const handleChangeBio = event => {
    setBio(event.target.value)
  }

  const handleChangeLanguage = event => {

    let newLanguages = [...languages];


    if (!newLanguages.includes(event.target.value)) {
      newLanguages.push(event.target.value)
    } else {
      newLanguages = newLanguages.filter((el) => el === event.target.value)
    }

    setLanguages(newLanguages)
    // console.log("🚀 ~ file: App.js:158 ~ handleChangeLanguage ~ newLanguages:", newLanguages)
  }

  const handleChangeGender = event => {

    setGender(event.target.value)

  }
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  const handleChangeAvatarPhoto = event => {
    if (event.target.files[0]) {
      getBase64(event.target.files[0], setAvatarPhoto)
    }
  }

  return (
    <div className="App">
      <div className="container">
        <form className='formWrraper' onSubmit={onSubmitHandler}>
          <div className='formContainer'>
            <div className='formWrraperLeftSide'>
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
                  onChange={handleChange} />
                {error && <div style={{ color: 'red' }}>{error}</div>}
              </label>
              <label>  <div>Password:*</div>
                <input type='password' name='password'
                  required
                  value={password}
                  onChange={handleChangePassword} />
                {errorPassword && <div style={{ color: 'red' }}>{errorPassword}</div>}
              </label>
              <label><div>Date of birth:*</div>
                <select className='days' name='days' onChange={(e) => handleChangeDate(e, "day")}>
                  <option>day</option>
                  {renderDays()}
                </select>
                <select className='month' name='month'
                  onChange={(e) => handleChangeDate(e, "month")} >
                  <option>month</option>
                  {renderMonths()}
                </select>
                <select className='year' name='year'
                  onChange={(e) => handleChangeDate(e, 'year')} >
                  <option value='year'>year</option>
                  {renderYears()}
                </select>
              </label>
              {errorDate && <div style={{ color: 'red' }}>{errorDate}</div>}
            </div>
            <div>
              <label><div>Languages:*</div>
                <div onChange={handleChangeLanguage}>
                  <div>
                    <input type="checkbox" name='language ' id='Armenian' value={'Armenian'} />
                    <label htmlFor='Armenian'>Armenian</label>
                  </div>
                  <div>
                    <input type="checkbox" name='language ' id='Russian' value={'Russian'} />
                    <label htmlFor='Russian' >Russian</label>
                  </div>
                  <div>
                    <input type="checkbox" name='language ' id='English' value={'English'} />
                    <label htmlFor='English'>English</label>
                  </div>
                </div>

              </label>
              <label required> <div>Gender:*</div>
                <div >
                  <div>
                    <input type="radio" name='male' id='Male' value={"Male"}
                      onChange={handleChangeGender}
                      checked={gender === 'Male'}
                    />
                    <label htmlFor='Male'>Male</label>
                  </div>
                  <div>
                    <input type="radio" name='female' id='Female' value={"Female"}
                      checked={gender === "Female"}
                      onChange={handleChangeGender} />
                    <label htmlFor='Female' >Female</label>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div>
            <label> <div>Bio:</div>
              <textarea name="bio" rows="4" cols="50"
                onChange={handleChangeBio}
              />
            </label>
          </div>
          <label className='uloadPhotoContainer'><div>Upload Photo:</div>
            <img style={{
              width: '100px',
              height: '100px',
              border: '1px solid #CCC',
              borderRadius: '5px'
            }} src={avatarPhoto ? avatarPhoto : defaultAvatar} alrt="avatar" />
            <input type="file" name="img"
              onChange={handleChangeAvatarPhoto}
            />
          </label>
          <div >
            <button className='submitButton'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
