import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import ArcImg from './assets/images/icon-arcade.svg';
import AdvImg from './assets/images/icon-advanced.svg';
import ProImg from './assets/images/icon-pro.svg';

const MainPage = () => {
  return(
    <main>
      <section id='steps'>
        <div>
          <button>1</button>
          <h1>Step 1</h1>
          <h2>Your info</h2>
        </div>
        <div>
          <button>2</button>
          <h1>Step 2</h1>
          <h2>Select plan</h2>
        </div>
        <div>
          <button>3</button>
          <h1>Step 3</h1>
          <h2>Add-ons</h2>
        </div>
        <div>
          <button>4</button>
          <h1>Step 4</h1>
          <h2>Summery</h2>
        </div>
      </section>
      <YourPlan />
    </main>
  );
};

const PersonalInfo = () => {
  return(
    <section id='personalForm'>
      <h3>Personal info</h3>
      <p>Please provide your name, email address, and phone number.</p>
      <form>
        <label for='name'>Name</label>
        <input type='text' id='name' placeholder='e.g. Stephen King'></input>
        <label for='mail'>Email Address</label>
        <input type='email' id='mail' placeholder='e.g. stephenking@lorem.com'></input>
        <label for='phone'>Phone Number</label>
        <input type='text' id='phone' placeholder='e.g. +1 234 567 890'></input>
      </form>
      <button className='nextBtn'>Next Step</button>
    </section>
  );
};

const YourPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [checked, setChecked] = useState(false);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
  };

  return(
    <section id='yuorPlan'>
      <h3>Select your plan</h3>
      <p>You have the option of monthly or yearly billing.</p>
      <div className={`opt ${selectedPlan === 'Arcade' ? 'selected' : ''}`}
        onClick={() => handlePlanClick('Arcade')}>
        <img src={ArcImg} alt='icon' />
        <h4>Arcade</h4>
        <h5>$9/mo</h5>
        {checked && <h6>2 month free</h6>}
      </div>
      <div className={`opt ${selectedPlan === 'Advanced' ? 'selected' : ''}`}
        onClick={() => handlePlanClick('Advanced')}>
        <img src={AdvImg} alt='icon' />
        <h4>Advanced</h4>
        <h5>$12/mo</h5>
        {checked && <h6>2 month free</h6>}
      </div>
      <div className={`opt ${selectedPlan === 'Pro' ? 'selected' : ''}`}
        onClick={() => handlePlanClick('Pro')}>
        <img src={ProImg} alt='icon' />
        <h4>Pro</h4>
        <h5>$15/mo</h5>
        {checked && <h6>2 month free</h6>}
      </div>
      <div className='subOpt'>
        <h6 className={!checked ? 'checked' : ''}>Monthly</h6>
        <label class="switch">
          <input type="checkbox"
                 checked={checked}
                 onChange={() => setChecked(!checked)} />
          <span class="slider round"></span>
        </label>
        <h6 className={checked ? 'checked' : ''}>Yearly</h6>
      </div>
      <div className='navBtns'>
        <button className='backBtn'>Go Back</button>
        <button className='nextBtn'>Next Step</button>
      </div>
    </section>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
