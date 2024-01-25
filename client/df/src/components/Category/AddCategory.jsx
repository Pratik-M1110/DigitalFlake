import React, { useEffect } from 'react'
import { useState } from 'react';
import Header from '../Header/Header';
function AddCategory() {
    const [cat,setCat] = useState({name:"",description:"",status:""});
    const [message,setMessage] = useState("");

    useEffect(() => {
        setTimeout(()=>{
            setMessage("");
        },3000)
    },[message])

    const onTextChange =(args)=>{
        var copyOfcat = {...cat};
        copyOfcat[args.target.name] = args.target.value;
        setCat(copyOfcat);
    }

    const addCategory = () => {
        console.log(cat.status);
        debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>{
            if(helper.readyState == 4 &&
                helper.status == 200)
                debugger;
                {
                    var responseReceived = JSON.parse(helper.responseText);
                    if(responseReceived.affectedRows!=undefined && responseReceived.affectedRows>0)
                    {
                        setCat({name:"",description:""});
                        setMessage("Insert Successfull!")
                    }
                    else{
                        setMessage("Something went wrong!")
                    }
                }
        };
        helper.open("POST","http://127.0.0.1:7373/category/add");
        helper.setRequestHeader("Content-Type", "application/json")
        helper.send(JSON.stringify(cat));  
    }

  return (
    <div>
        <Header/>
        Category
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input type='text' name="name" onChange={onTextChange} placeholder='Enter Name' value={cat.name}></input>
                    </td>
                    <td>
                        <input type='text' name="description" onChange={onTextChange} placeholder='Enter Description' value={cat.description}></input>
                    </td>
                    <td>
                        {/* <select value={cat.status} onChange={(e)=>setCat(e.target.value)}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                        </select> */}
                        <input type='text' name="status" onChange={onTextChange} placeholder='Enter status' value={cat.status}></input>
                    </td>
                </tr>
                <tr>
                    <td>{message}</td>
                </tr>
            </tbody>
        </table>
        <button onClick={addCategory}>Add Category</button>
    </div>
  )
}

export default AddCategory