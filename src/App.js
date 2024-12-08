
import './App.css';
import React, {useEffect, useState} from 'react'
import { EmployeeData } from './EmployeeData';
function App() {
const [data, setData]=useState([]);
const[firstName, setFirstName]=useState('');
const[lastName, setLastName]=useState('');
const[age, setAge]=useState(0);
const[id, setId]=useState(0);
const[isUpdate, setIsUpdate]=useState(false);

useEffect(()=>{
  setData(EmployeeData)
}, []);

const handleEdit =(id)=>{
const dt = data.filter(item => item.id === id);
if(dt !== undefined)
  {
    setIsUpdate(true);
  setId(id);
  setFirstName(dt[0].firstName);
  setLastName(dt[0].lastName);
  setAge(dt[0].age);
}
}

const handleDelet =(id)=>{
 if(id>0){
  if(window.confirm("Are you Sure You Want Delete")){
    const dt=data.filter(item=>item.id !== id);
  setData(dt);
  }
}
}
const handleSave =(e)=>{
  let error ='';
  if(firstName === '')
    error+='FirstName is Required, ';
  if(lastName === '')
    error+='LastName is Required, ';
  if(age <= 0)
    error+='age is Required, ';

if(error === ''){
 e.preventDefault();
 const dt=[...data];
 const newObject = {
  id:EmployeeData.length +1,
  firstName:firstName,
  lastName:lastName,
  age:age
 }
 dt.push(newObject);
 setData(dt);
}
else{
  alert(error);
}
}
const handleClear =()=>{
  setId(0);
  setFirstName('');
  setLastName('');
  setAge('');
  setIsUpdate(false);
}

const handleUpdate =()=>{
 const index =data.map((item)=>{
  return item.id
 }).indexOf(id);
 const dt=[...data];
 dt[index].firstName=firstName;
 dt[index].lastNametName=lastName;
 dt[index].age=age;
 setData(dt);
 handleClear();
}


return (
    <div className='App'>
   <div style={{display:'flex', justifyContent:'center', marginBottom:'20px',marginTop:'20px' }}>
   <label>First Name :
    <input type='text' placeholder='Enter Fist Name' onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
   </label>
   <label>Last Name :
    <input type='text' placeholder='Enter Last Name' onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
   </label>
   <label>Age :
    <input type='text' placeholder='Enter Age'  onChange={(e)=>setAge(e.target.value)} value={age}/>
   </label>
   <div>
    {
      !isUpdate ?  <button className='btn btn-success' onClick={(e)=>handleSave(e)}>Save</button>
      :
      <button className='btn btn-info' onClick={()=>handleUpdate()}>Update</button>
    }
  
   <button className='btn btn-danger'onClick={()=>handleClear()}>Clear</button>
   </div>
   </div>

    <table className='table table-hover'>
      <thead>
        <tr>
          <td>ID</td>
          <td>FisrName</td>
          <td>lastname</td>
          <td>Age</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item, index)=>{
         return(
          <tr key={index}>
          <td>{index+1}</td>
          <td>{item.id}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.age}</td>
          <td>
            <button className='btn btn-success' onClick={()=>handleEdit(item.id)}>Edit</button>&nbsp;
            <button className='btn btn-danger'onClick={()=>handleDelet(item.id)}>Delete</button>
          </td>
        </tr>
         )
          })
        }
      </tbody>
    </table>
    </div>
  );
}

export default App;
