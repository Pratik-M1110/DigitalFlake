import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
function Category() {
    const [cats,setCats] = useState([])
    
    const navigate = useNavigate();
    useEffect(()=>{
        getCats();
     },[])

     const remove = (id) => {
        debugger;
        var helper = new XMLHttpRequest();
         helper.onreadystatechange = () => {
            if( helper.readyState == 4 && helper.status == 200){
                // var response = JSON.parse(helper.responseText);
                getCats();
            }
         }
         helper.open("DELETE",`http://127.0.0.1:7373/category/${id}`);
         helper.send();
     }

     const getCats = () => {
         var helper = new XMLHttpRequest();
         helper.onreadystatechange = () => {
            if( helper.readyState == 4 && helper.status == 200){
                var response = JSON.parse(helper.responseText);
                setCats(response);
            }
         }
         helper.open("GET",`http://127.0.0.1:7373/category/`);
         helper.send();
     }
     
     const add = () => {
        navigate('/addCategory');
     }

  return (
    
    <div>
        <Header/>
        <button onClick={add}>Add Category</button>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    cats.map((cat)=>{
                        return <>
                        <tr>
                            <td>{cat.id}</td>
                            <td>{cat.name}</td>
                            <td>{cat.description}</td>
                            <td>
                            <select name="status">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            </td>
                            <td>
                                <button onClick={()=>{
                                remove(cat.id);
                                }}>Delete</button>
                            </td>   
                        </tr>
                        </>
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Category