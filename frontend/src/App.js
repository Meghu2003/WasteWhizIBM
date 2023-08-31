import React, { useEffect} from "react";
import { useState } from "react";
import './App.css';
function App(){
  const [formData,setFormData]=useState({
    industry:'',
    deal_value:'',
    weighted_amount:'',
    pitch:'',
    lead_revenue:'',
    fund_category:'',
    hiring_candidate:'',
    level_of_meeting:'',
    last_update:'',
    resource:'',
    internal_rating:''
  });
  const [selectedIndustry,setSelectedIndustry]=useState('');
  const handleSelectIndustry=event=>{
    const {value}=event.target;
    setSelectedIndustry(value);
    setFormData(prevData=>({ ...prevData,industry:value}));
  }
  const [selectedPitch,setSelectedPitch]=useState('');
  const handleSelectPitch=event=>{
    const {value}=event.target;
    setSelectedPitch(value);
    setFormData(prevData=>({ ...prevData,pitch:value}));
  }
  const [selectedLeadR,setSelectedLeadR]=useState('');
  const handleSelectLeadR=event=>{
    const {value}=event.target;
    setSelectedLeadR(value);
    setFormData(prevData=>({ ...prevData,lead_revenue:value}));
  }
  const [selectedFund,setSelectedFund]=useState('');
  const handleSelectFund=event=>{
    const {value}=event.target;
    setSelectedFund(value);
    setFormData(prevData=>({ ...prevData,fund_category:value}));
  }
  const [selectedHiring,setSelectedHiring]=useState('');
  const handleSelectHirirng=event=>{
    const {value}=event.target;
    setSelectedHiring(value);
    setFormData(prevData=>({ ...prevData,hiring_candidate:value}));
  }
  const [selectedLevel,setSelectedLevel]=useState('');
  const handleSelectLevel=event=>{
    const {value}=event.target;
    setSelectedLevel(value);
    setFormData(prevData=>({ ...prevData,level_of_meeting:value}));
  }
  const [selectedLastLead,setSelectedLastLead]=useState('');
  const handleSelectLastLead=event=>{
    const {value}=event.target;
    setSelectedLastLead(value);
    setFormData(prevData=>({ ...prevData,last_update:value}));
  }
  const [selectedResource,setSelectedResource]=useState('');
  const handleSelectResource=event=>{
    const {value}=event.target;
    setSelectedResource(value);
    setFormData(prevData=>({ ...prevData,resource:value}));
  }
  const [selectedInternal,setSelectedInternal]=useState('');
  const handleSelectInternal=event=>{
    const {value}=event.target;
    setSelectedInternal(value);
    setFormData(prevData=>({ ...prevData,internal_rating:value}));
  }
  
  const [data,setData]=useState({industryarr:[],pitcharr:[],leadrevenuearr:[],fundcategoryarr:[],hiringcandidatearr:[],levelofmeetingarr:[],lastleadupdatearr:[],resourcearr:[],internalratingarr:[]});
  const [responseMessage,setResponseMessage]=useState('');
  useEffect(()=>{
    fetch('/arrays')
    .then(response=>response.json())
    .then(data=>{
      setData(data);
    })
    .catch(error=>{
      console.error('Error fetching arrays:',error);
    });
  },[]);
  const handleInputDeal=event=>{
    const {value}=event.target;
    setFormData(prevData=>({ ...prevData,deal_value:value}));
  };
  const handleInputWeighted=event=>{
    const {value}=event.target;
    setFormData(prevData=>({ ...prevData,weighted_amount:value}));
  };
  const handleSubmit=async event=>{
    event.preventDefault();
    try{
      const response=await fetch('/api/submit',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      if(response.ok){
        const data=await response.json();
        setResponseMessage(data.message);
      }
      else{
        console.log('Error:',response.statusText);
      }
    }
    catch(error){
      console.error('Error:',error);
    }
  }
  return(
  <html>
    <body>
      <header>
        <h1>WasteWhiz: Data Science-enabled Marketing Efficiency Enhancement</h1>
        <a className="button" href="#form-section">Go to Form</a>
      </header>

      <section className="form-section" id="form-section">
        <p>WasteWhiz is a waste management company that aims to optimize its marketing efforts through data science techniques. The company operates in multiple regions, offering management solutions to various industries and businesses.We have developed a data science enabled tool,WasteWhiz, that enhances the company's marketing efficiency by leveraging data analysis, predictive modeling, and customer segmentation techniques. WasteWhiz will provide actionable insights and recommendations to optimize marketing campaigns, improve customer targeting, and enhance overall conversion rates.There are total of 13 input fields in the below form,each of which contain drop down menu.Please go through the form and fill out the deatials correctly ,as soon as the form is filled click on submit.</p>
        <h2>Data Analysis Form</h2>
        <form onSubmit={handleSubmit}>
          <p>Industry:</p>
          <select name="industry" value={selectedIndustry} onChange={handleSelectIndustry}>
            <option value=''>Select the Industry</option>
              {data.industryarr.map((option,index)=>(
            <option key={index} value={option}>
              {option}
            </option>
            ))}
          </select>
          <p>Deal Value:</p>
          <input type="number" name="deal_value" placeholder="Deal Value" onChange={handleInputDeal}/>
          <p>Weighted Amount:</p>
          <input type="number" name="weighted_amount" placeholder="Weighted Amount" onChange={handleInputWeighted}/>
          <p>Pitch</p>
          <select name="pitch" value={selectedPitch} onChange={handleSelectPitch}>
            <option value=''>Select the Product</option>
            {data.pitcharr.map((option,index)=>(
            <option key={index} value={option}>
              {option}
            </option>
            ))}
          </select>
          <p>Lead Revenue:</p>
          <select name="lead_revenue" value={selectedLeadR} onChange={handleSelectLeadR}>
            <option value=''>Select the your revenue Category</option>
            {data.leadrevenuearr.map((option,index)=>(
            <option key={index} value={option}>
              {option}
            </option>
            ))}
          </select>
          <p>Fund Category:</p>
          <select name="fund_category" value={selectedFund} onChange={handleSelectFund}>
            <option value=''>Select the your fund Category</option>
            {data.fundcategoryarr.map((option,index)=>(
            <option key={index} value={option}>
              {option}
            </option>
            ))}
          </select>
          <p>Hiring Candidate:</p>
          <select name='hiring_candidate' value={selectedHiring} onChange={handleSelectHirirng}>
            <option value=''>Select the Hiring role</option>
            {data.hiringcandidatearr.map((option,index)=>(
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p>Level of Meeting</p>
          <select name="level_of_meeting" value={selectedLevel} onChange={handleSelectLevel}>
            <option value=''>Select the Level of meeting</option>
            {data.levelofmeetingarr.map((option,index)=>(
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p>Last Lead Update:</p>
          <select name="last_update" value={selectedLastLead} onChange={handleSelectLastLead}>
            <option value=''>Select the update about the product</option>
            {data.lastleadupdatearr.map((option,index)=>(
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p>Resources:</p>
          <select name="resource" value={selectedResource} onChange={handleSelectResource}>
            <option value=''>Select the Resource Type</option>
            {data.resourcearr.map((option,index)=>(
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p>Internal Rating:</p>
          <select name="internal_rating" value={selectedInternal} onChange={handleSelectInternal}>
            <option value=''>Select the Internal Rating</option>
            {data.internalratingarr.map((option,index)=>(
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
            
          <div className="output-field">Success Probability::{responseMessage}%</div>

          <button className="button">Submit</button>
        </form>
    </section>
  </body>
</html>
  );
}
export default App;
/*<select value={selectedOption} onChange={handleSelectChange}>
          <option value=''>select a option</option>
          {data.industryarr.map((option,index)=>(
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>*/