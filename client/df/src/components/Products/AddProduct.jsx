import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
function AddProduct() {
    const [product,setProduct] = useState({productName:"",pack_size:"",mrp:0,status:"",category_id:0});
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    

    useEffect(() => {
        setTimeout(()=>{
            setMessage("");
        },3000)
    },[message])

    const onTextChange =(args)=>{
        var copyOfcat = {...product};
        copyOfcat[args.target.name] = args.target.value;
        setProduct(copyOfcat);
    }

    const validate = (id) => {
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>{
            if(helper.readyState == 4 && helper.status == 200)
                {
                    var responseReceived = JSON.parse(helper.responseText);
                    debugger;
                    if(responseReceived.length!=0)
                    {
                        addProduct();
                        
                    }
                    else{
                        setMessage("Enter valid category id!")
                    }
                }
        };
        helper.open("GET",`http://127.0.0.1:7373/category/${id}`);
        helper.setRequestHeader("Content-Type", "application/json")
        helper.send();
    }

    const addProduct = () => {
        console.log(product.status);
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
                        navigate('/products')
                    }
                    else{
                        setMessage("Enter valid product data!")
                    }
                }
        };
        helper.open("POST","http://127.0.0.1:7373/product/add");
        helper.setRequestHeader("Content-Type", "application/json")
        helper.send(JSON.stringify(product));  
    }

  return (
    <div>
        <Header/>
        Product
        <table>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Pack Size</th>
                    <th>Mrp</th>
                    <th>Status</th>
                    <th>Category id</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input type='text' name="productName" onChange={onTextChange} placeholder='Enter Name' value={product.name}></input>
                    </td>
                    <td>
                        <input type='text' name="pack_size" onChange={onTextChange} placeholder='Enter Pack Size' value={product.description}></input>
                    </td>
                    <td>
                        <input type='number' name="mrp" onChange={onTextChange} placeholder='Enter Mrp' value={product.description}></input>
                    </td>
                    <td>
                        {/* <select value={product.status} onChange={(e)=>setProduct(e.target.value)}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                        </select> */}
                        <input type='text' name="status" onChange={onTextChange} placeholder='Enter status' value={product.status}></input>
                    </td>
                    <td>
                        <input type='number' name="category_id" onChange={onTextChange} placeholder='Enter Category Id' value={product.description}></input>
                    </td>
                </tr>
                <tr>
                    <td>{message}</td>
                </tr>
            </tbody>
        </table>
        <button onClick={()=>{
            validate(product.category_id)
        }}>Add Product</button>
    </div>
  )
}

export default AddProduct