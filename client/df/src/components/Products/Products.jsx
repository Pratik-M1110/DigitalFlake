import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
function Products() {
    const [products,setProducts] = useState([])
    const [message,setMessage] = useState("");

    const navigate = useNavigate();
    useEffect(()=>{
        getProducts();
     },[])

     useEffect(() => {
        setTimeout(()=>{
            setMessage("");
        },3000)
    },[message])

     const getProducts = () => {
         var helper = new XMLHttpRequest();
         helper.onreadystatechange = () => {
            if( helper.readyState == 4 && helper.status == 200){
                var response = JSON.parse(helper.responseText);
                setProducts(response);
            }
         }
         helper.open("GET",`http://127.0.0.1:7373/product/`);
         helper.send();
     }
     
     const add = () => {
        navigate('/addProduct');
     }
    
     const remove = (id) => {
        debugger;
        var helper = new XMLHttpRequest();
         helper.onreadystatechange = () => {
            if( helper.readyState == 4 && helper.status == 200){
                // var response = JSON.parse(helper.responseText);
                getProducts();
            }
         }
         helper.open("DELETE",`http://127.0.0.1:7373/product/${id}`);
         helper.send();
     }

  return (
    
    <div>
        <Header/>
        <button onClick={add}>Add Product</button>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Pack Size</th>
                    {/* <th>Category</th> */}
                    <th>MRP</th>
                    <th>Status</th>
                    <th>Category Id</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((product)=>{
                        return <>
                        <tr>
                            <td>{product.id}</td>
                            <td>{product.productName}</td>
                            <td>{product.pack_size}</td>
                            {/* <td>{product.category}</td> */}
                            <td>{product.mrp}</td>
                            <td>{product.status}</td>
                            <td>{product.category_id}</td>
                            <td><button onClick={()=>{
                                remove(product.id);
                            }}>Delete</button></td>
                            {/* <select name="status">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>    */}
                        </tr>
                        <tr>
                            <td>{message}</td>
                        </tr>
                        </>
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Products