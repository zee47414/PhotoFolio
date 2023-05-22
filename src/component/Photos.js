import CreatePhotos from "./CreatePhotos"
import {useState,useEffect} from 'react';
import { db } from "../FirebaseInit";
import {collection ,onSnapshot ,docs} from 'firebase/firestore'
import { useCollectionData } from "react-firebase-hooks/firestore";
export default function Photos(path,albumName){
    console.log("Photos"+albumName.albumName +" "+ path.path);
    const [form,setForm] = useState("add");
    const [photos ,setPhotos] = useState([]);
    const query = collection(db,"albums");
    const [docs,loading,error] = useCollectionData(query);
      
    useEffect(()=>{
      const unsub =  onSnapshot(collection(db,`albums/${path.path}/photos`),(snapShot)=>{
            const photos = snapShot.docs.map((doc) => {
                        return{
                            id: doc.id,
                            ...doc.data()
                        }
                    })
              
                    
                    setPhotos(photos);
                 
        })
        
    },[]);
    
   

    function handleBackBtn(){
        
    }

    return (
        <>
        {form === 'add' ?  "" :<CreatePhotos path = {path.path} /> }
        <div className="photos">
            <div className="header-photo">
                <div className="header-photos-left">
                <button className="photos-back-div"  >
                <img alt="back-button" className="photos-back-btn" src="https://cdn-icons-png.flaticon.com/512/2099/2099238.png"/>
                </button>
                 <h1>Image in {albumName.albumName}</h1>
                </div>
                <button className={form === "add" ? "add-btn-photos":"cnl-btn-photos"}
                onClick={()=>{
                    setForm(form === "add" ? "cancel":"add")
                }}
                >{form === "add" ? "Add Photo" : "Cancel"}</button>
            </div>
             <div className="photo-conatainer">
                {photos.map((photo)=>{
                return (
                    <>
                <div className="photo-list" key={Math.random()}>
                 <div className="each-photo">
                   <img src={photo.url} alt="photos in album" className="photo"/>
                  </div>            
                </div>
                 <div className="photo-title">{photo.title}</div>
                 </>
                )
                })}
         </div> 
        </div>
        </>
    )
}