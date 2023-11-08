import React, { useState } from "react";
import styles from "./NavBar.module.css";
import { useValue } from "../ContactContext";


export default function NavBar() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [titlee,setTitlee]=useState("");
  const [number,setNumber]=useState("")
  const [email,setEmail]=useState(null);
  const [ids,setIds]=useState(null);
  const {addNewAlbum}=useValue();

  //============================Form visibility setUp=======================================
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };


  //============================addNewContact    (function calling)===========================
  const handleSubmits=(e)=>{
    e.preventDefault();
    addNewAlbum(titlee,email,ids,number);

    setTitlee("");
    setEmail("");
    setNumber("");
    setIds("");
  }

  return (
   <div className={styles.Nav}>
   <div className={styles.PageTitle}>Contact List</div>
   <div
     className={`${styles.addForm} ${isFormVisible && styles.visible}`}
     onMouseEnter={toggleFormVisibility}
     onMouseLeave={toggleFormVisibility}
   >
     <button className={styles.hhhh}>AddContact</button>
     <form onSubmit={handleSubmits} className={styles.formss}>
       <input className={styles.titleInp} placeholder="Name" onChange={(e)=>setTitlee(e.target.value)} value={titlee} required/>
       <input className={styles.AlbumId} placeholder="Example@email.com" type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
       <input className={styles.titleInp} placeholder="Number"  type="number" onChange={(e)=>setNumber(e.target.value)} value={number} required/>
       <input className={styles.AlbumId} placeholder="Id" type="number" onChange={(e)=>setIds(e.target.value)} value={ids} required/>
       <button className={styles.submit}>Submit</button>
     </form>
   </div>
 </div>
 
  );
}
