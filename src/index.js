import React, {useState, useRef, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import autoAnimate from '@formkit/auto-animate';

import ArcImg from './assets/images/icon-arcade.svg';
import AdvImg from './assets/images/icon-advanced.svg';
import ProImg from './assets/images/icon-pro.svg';
import OkImg from './assets/images/icon-thank-you.svg';

const MainPage = () => {
  const parentRef = useRef(null);
  const [currStep, setCurrStep] = useState(1);
  const [contentData, setContentData] = useState(
    {
      name: "",
      email: "",
      phone: "",

      plan: "",
      mny: false,

      onlineServise: false,
      largerStorage: false,
      customProfile: false,
    }
  );

  const numbData = {
    Arcade: 9,
    Advanced: 12,
    Pro: 15,

    OnlineService: 1,
    LargerStorage: 2,
    CustomProfile: 2,

    time1: "mo",
    time2: "month",
  };

  const numbData2 = {
    Arcade: 90,
    Advanced: 120,
    Pro: 150,

    OnlineService: 10,
    LargerStorage: 20,
    CustomProfile: 20,

    time1: "yr",
    time2: "year",
  };

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  const handleCurrStepChange = (newStep, updatedData) => {
    setContentData(updatedData);
    setCurrStep(newStep);
  };

  return(
    <main ref={parentRef}>
      <section id='steps'>
        <div>
          <button className={`stepBtn ${currStep === 1 ? 'currStep' : 'step'}`}>1</button>
          <h1>Step 1</h1>
          <h2>Your info</h2>
        </div>
        <div>
          <button className={`stepBtn ${currStep === 2 ? 'currStep' : 'step'}`}>2</button>
          <h1>Step 2</h1>
          <h2>Select plan</h2>
        </div>
        <div>
          <button className={`stepBtn ${currStep === 3 ? 'currStep' : 'step'}`}>3</button>
          <h1>Step 3</h1>
          <h2>Add-ons</h2>
        </div>
        <div>
          <button className={`stepBtn ${currStep >= 4 ? 'currStep' : 'step'}`}>4</button>
          <h1>Step 4</h1>
          <h2>Summery</h2>
        </div>
      </section>
      {currStep === 1 && <PersonalInfo onStepChange={handleCurrStepChange} contentData={contentData} />}
      {currStep === 2 && <YourPlan onStepChange={handleCurrStepChange} contentData={contentData} numbData={numbData} numbData2={numbData2} />}
      {currStep === 3 && <AddOns onStepChange={handleCurrStepChange} contentData={contentData} numbData={numbData} numbData2={numbData2} />}
      {currStep === 4 && <FinishingUp onStepChange={handleCurrStepChange} contentData={contentData} numbData={numbData} numbData2={numbData2} />}
      {currStep === 5 && <FinnalStep onStepChange={handleCurrStepChange} />}
    </main>
  );
};

const PersonalInfo = (props) => {
  const [name, setName] = useState(props.contentData.name);
  const [email, setEmail] = useState(props.contentData.email);
  const [phone, setPhone] = useState(props.contentData.phone);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleValidation = () => {
    // Check if any field is empty
    if (!name) {
      setNameError(true);
    } else {
      setNameError(false);
    };
    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    };
    if (!phone) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate fields
    handleValidation();

    // If all fields are filled, proceed to the next step
    
    if (name && email && phone) {   
      const updatedContentData = {
        ...props.contentData,
        name,
        email,
        phone,
      };
      props.onStepChange(2, updatedContentData);
    }
  };

  return(
    <section id='personalForm'>
      <h3 className='secHeadline'>Personal info</h3>
      <p className='secSecondLine'>Please provide your name, email address, and phone number.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        {nameError && <p className='error'>This field is required</p>}
        <input 
          type='text' 
          id='name' 
          placeholder='e.g. Stephen King'
          value={name}
          onChange={(e) => setName(e.target.value)} />
        <label htmlFor='mail'>Email Address</label>
        {emailError && <p className='error'>This field is required</p>}
        <input 
          type='email' 
          id='mail' 
          placeholder='e.g. stephenking@lorem.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor='phone'>Phone Number</label>
         {phoneError && <p className='error'>This field is required</p>}
        <input 
          type='text' 
          id='phone' 
          placeholder='e.g. +1 234 567 890'
          value={phone}
          onChange={(e) => setPhone(e.target.value)} />
        <button className='nextBtn' type='submit' >Next Step</button>
      </form>
    </section>
  );
};

const YourPlan = (props) => {
  const [selectedPlan, setSelectedPlan] = useState(props.contentData.plan);
  const [checked, setChecked] = useState(props.contentData.mny);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
  };

  const clickNextStep = (n) => {
    const updatedContentData = {
      ...props.contentData,
      plan: selectedPlan,
      mny: checked,
    };

    props.onStepChange(n, updatedContentData);
  };

  return(
    <section id='yuorPlan'>
      <h3 className='secHeadline'>Select your plan</h3>
      <p className='secSecondLine'>You have the option of monthly or yearly billing.</p>
      <div className={`opt ${selectedPlan === 'Arcade' ? 'selected' : ''}`}
        onClick={() => handlePlanClick('Arcade')}>
        <img src={ArcImg} alt='icon' />
        <h4>Arcade</h4>
        <h5>${!checked ? props.numbData.Arcade : props.numbData2.Arcade}/{!checked ? props.numbData.time1 : props.numbData2.time1}</h5>
        {checked && <h6>2 month free</h6>}
      </div>
      <div className={`opt ${selectedPlan === 'Advanced' ? 'selected' : ''}`}
        onClick={() => handlePlanClick('Advanced')}>
        <img src={AdvImg} alt='icon' />
        <h4>Advanced</h4>
        <h5>${!checked ? props.numbData.Advanced : props.numbData2.Advanced}/{!checked ? props.numbData.time1 : props.numbData2.time1}</h5>
        {checked && <h6>2 month free</h6>}
      </div>
      <div className={`opt ${selectedPlan === 'Pro' ? 'selected' : ''}`}
        onClick={() => handlePlanClick('Pro')}>
        <img src={ProImg} alt='icon' />
        <h4>Pro</h4>
        <h5>${!checked ? props.numbData.Pro : props.numbData2.Pro}/{!checked ? props.numbData.time1 : props.numbData2.time1}</h5>
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
        <button className='backBtn' onClick={() => clickNextStep(1)}>Go Back</button>
        <button className='nextBtn' onClick={() => clickNextStep(3)}>Next Step</button>
      </div>
    </section>
  );
};

const AddOns = (props) => {
  const [onlineServiceChecked, setOnlineServiceChecked] = useState(props.contentData.onlineServise);
  const [largerStorageChecked, setLargerStorageChecked] = useState(props.contentData.largerStorage);
  const [customizableProfileChecked, setCustomizableProfileChecked] = useState(props.contentData.customProfile);

  const handleOnlineServiceClick = () => {
    setOnlineServiceChecked(!onlineServiceChecked);
  };

  const handleLargerStorageClick = () => {
    setLargerStorageChecked(!largerStorageChecked);
  };

  const handleCustomizableProfileClick = () => {
    setCustomizableProfileChecked(!customizableProfileChecked);
  };

  const clickNextStep = (n) => {
    const updatedContentData = {
      ...props.contentData,
      onlineServise: onlineServiceChecked,
      largerStorage: largerStorageChecked,
      customProfile: customizableProfileChecked,
    };

    props.onStepChange(n, updatedContentData);
  };

  return (
    <section id='addOns'>
      <h3 className='secHeadline'>Pick add-ons</h3>
      <p className='secSecondLine'>Add-ons help enhance your gaming experience.</p>
      <div className={`addOn ${onlineServiceChecked ? 'checked' : ''}`}
           onClick={handleOnlineServiceClick}>
          <label className='checkBox'>
            <input type='checkbox' checked={onlineServiceChecked} />
            <span class="checkmark"></span>
        </label>
        <h4>Online service</h4>
        <h5>+${!props.contentData.mny ? props.numbData.OnlineService : props.numbData2.OnlineService}/{!props.contentData.mny ? props.numbData.time1 : props.numbData2.time1}</h5>
        <p>Access to multiplayer games</p>
      </div>
      <div className={`addOn ${largerStorageChecked ? 'checked' : ''}`}
           onClick={handleLargerStorageClick}>
        <label className='checkBox'>
          <input type='checkbox' checked={largerStorageChecked} />
          <span class="checkmark"></span>
        </label>
        <h4>Larger storage</h4>
        <h5>+${!props.contentData.mny ? props.numbData.LargerStorage : props.numbData2.LargerStorage}/{!props.contentData.mny ? props.numbData.time1 : props.numbData2.time1}</h5>
        <p>Extra 1TB of cloud save</p>
      </div>
      <div className={`addOn ${customizableProfileChecked ? 'checked' : ''}`}
           onClick={handleCustomizableProfileClick}>
        <label className='checkBox'>
          <input type='checkbox' checked={customizableProfileChecked} />
          <span class="checkmark"></span>
        </label>
        <h4>Customizable Profile</h4>
        <h5>+${!props.contentData.mny ? props.numbData.CustomProfile : props.numbData2.CustomProfile}/{!props.contentData.mny ? props.numbData.time1 : props.numbData2.time1}</h5>
        <p>Custom theme on your profile</p>
      </div>
      <div className='navBtns'>
        <button className='backBtn' onClick={() => clickNextStep(2)}>Go Back</button>
        <button className='nextBtn' onClick={() => clickNextStep(4)}>Next Step</button>
      </div>
    </section>
  );
};

const FinishingUp = (props) => {
  const clickNextStep = (n) => {
    props.onStepChange(n, props.contentData);
  };

  return(
    <section id='finishingUp'>
      <h3 className='secHeadline'>Finishing up</h3>
      <p className='secSecondLine'>Double-check everything looks OK before confirming.</p>
      <div className='mainFrame'>
        <div className='planShow'>
          <h4>{props.contentData.plan} ({!props.contentData.mny ? "Monthly" : "Yearly"})</h4>
          <h5>${!props.contentData.mny ? props.numbData[props.contentData.plan] :  props.numbData2[props.contentData.plan]}/{!props.contentData.mny ? props.numbData.time1 : props.numbData2.time1}</h5>
          <a onClick={() => clickNextStep(2)}>Change</a>
        </div>
        {props.contentData.onlineServise === true && (
          <div className='addonsShow'>
            <h4>Online Service</h4>
            <h5>+${!props.contentData.mny ? props.numbData.OnlineService : props.numbData2.OnlineService}/{!props.contentData.mny ? props.numbData.time1 : props.numbData2.time1}</h5>
          </div>)}
          {props.contentData.largerStorage === true && (
          <div className='addonsShow'>
            <h4>Larger Storage</h4>
            <h5>+${!props.contentData.mny ? props.numbData.LargerStorage : props.numbData2.LargerStorage}/{!props.contentData.mny ? props.numbData.time1 : props.numbData2.time1}</h5>
          </div>)}
          {props.contentData.customProfile === true && (
          <div className='addonsShow'>
            <h4>Custom Profile</h4>
            <h5>+${!props.contentData.mny ? props.numbData.CustomProfile : props.numbData2.CustomProfile}/{!props.contentData.mny ? props.numbData.time1 : props.numbData2.time1}</h5>
          </div>)}
      </div>
      <div className='sumAdds'>
        <h5>Total (per {!props.contentData.mny ? props.numbData.time2 : props.numbData2.time2})</h5>
        <h6>+$
          {
          !props.contentData.mny ? (
              (props.numbData[props.contentData.plan]) +
              (props.contentData.onlineServise ? props.numbData.OnlineService : 0) +
              (props.contentData.largerStorage ? props.numbData.LargerStorage : 0) +
              (props.contentData.customProfile ? props.numbData.CustomProfile : 0)
          ) : (
              (props.numbData2[props.contentData.plan]) +
              (props.contentData.onlineServise ? props.numbData2.OnlineService : 0) +
              (props.contentData.largerStorage ? props.numbData2.LargerStorage : 0) +
              (props.contentData.customProfile ? props.numbData2.CustomProfile : 0)
          )
          }
          /{!props.contentData.mny ? props.numbData.time1 : props.numbData2.time1}
        </h6>
      </div>
      <div className='navBtns'>
        <button className='backBtn' onClick={() => clickNextStep(3)}>Go Back</button>
        <button className='confBtn' onClick={() => clickNextStep(5)}>Confirm</button>
      </div>
    </section>
  );
};

const FinnalStep = () => {
  return (
    <section id='finnalStep'>
      <img src={OkImg} alt="okImg" />
      <h3 className='secHeadline'>Thank you!</h3>
      <p className='secSecondLine'>Thanks for confirming your subscription! We hope you have fun 
      using our platform. If you ever need support, please feel free 
      to email us at support@loremgaming.com.</p>
    </section>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);

reportWebVitals();
