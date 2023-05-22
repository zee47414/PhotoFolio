import { collection ,doc, setDoc } from 'firebase/firestore';
import {db} from '../FirebaseInit';
import { useState ,useRef} from 'react';


export default function CreateAlbum(){
    const [formData,setformData] = useState({name : ''});
    const name = useRef();
    //handling the clear button
    function handleClear(){
        setformData({name : ""});
    }    
   

    // storing album in db
        async function handleSubmit(e){
        e.preventDefault();
    
       const docRef = doc(db,"albums",name.current.value);
       await setDoc(docRef,{
        name : formData.name,
        createdOn : new Date()
       });  
    //    console.log(formData.name)
    /* *****************************************************************/ 
      setformData({name:""});
    }
   
return (
    <>
    <form onSubmit={handleSubmit} className='album-form'>
    <h2>Create an Album</h2>
    <input type='text' placeholder='Album Name'
    value={formData.name}
    ref={name}
    className='album-name'
    onChange={(e)=> setformData({name: e.target.value})}
    required></input>
    <button onClick={handleClear} className='album-clr-btn'>Clear</button>
    <button className='album-crt-btn' >Create</button>
    </form >
    </>
)
}