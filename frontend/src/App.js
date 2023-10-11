
import './App.css';
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import { useState } from 'react';

function App() {

  const responseGoogle = (response) => {
    console.log(response)

    const {code} =response
    axios.post('/api/create-tokens',{code}).then(response=>{
      console.log(response)
      setSignedIn(true)
    })
 
  }
  const responseError = (err) => {
    console.log(err)
  }

  const handleSubmit =(e) =>{
    e.preventDefault()
    // console.log(summary ,description ,location,startDateTime,endDateTime) 
    axios.post('/app/create-event',{summary ,description ,location,startDateTime,endDateTime})
  }

  const [summary ,setSummary] =useState('')
  const [description ,setDescription] =useState('')
  const [location,setLocation] =useState('')
  const [startDateTime,setStartDateTime] =useState('')
  const [endDateTime,setEndDateTime] =useState('')
  const [signedIn ,setSignedIn] =useState('')
  
 
  return (
    <div>
    <div className="App">
      <h1>Google Calendar API</h1>
    </div>

{
  !signedIn ?( <div>
    <GoogleLogin clientId="343285813766-5u6dnmh3br081tt13av65qb0g1qnr5a1.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseError}
      cookiePolicy={'single_host_origin'}
      responseType='code'
      accessType='offline'
      scope ='openid email profile https://www.googleapis.com/auth/calendar'
      />
      </div>) :(<div>
   
   <form onSubmit={handleSubmit}>
     <label htmlFor='summary'>Summary</label>
     <br/>
     <input type='text' id='summary' value={summary} onChange={e=> setSummary(e.target.value)}/>
<br/>

<label htmlFor='location'>Location</label>
     <br/>
     <input type='text' id='location' value={location} onChange={e=> setLocation(e.target.value)}/>
<br/>
     <label htmlFor='description'>Description</label>
     <br/>
     <textarea id='description' value={description} onChange={e=> setDescription(e.target.value)}/>


    
     <br/>
     <input type='datetime-local' id='startDateTime' value={startDateTime} onChange={e=> setStartDateTime(e.target.value)}/>

     <label htmlFor='startDateTime'>Start Date Time</label>
     <br/>
     <input  type='datetime-local' id='endDateTime' value={endDateTime} onChange={e=> setEndDateTime (e.target.value)}/>
     <label htmlFor='endDateTime'>End Date Time</label>
  <br/>
  <button type='submit'>Submit</button>
   </form>

  

   </div>)
}

</div>
  )}


  export default App;