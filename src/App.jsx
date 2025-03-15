import Navbar  from "./component/Navbar";
import {FiSearch} from 'react-icons/fi'
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot} from "firebase/firestore";
import {db} from './config/firebase';
import ContactCard  from "./component/ContactCard";
//import { c } from "vite/dist/node/types.d-aGj9QkWt";
import Model from "./component/Model";
import AddData from "./component/AddData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { async } from "@firebase/util";
import NotContact from "./component/NotContact";




const App = () => {
   
  const [contacts, setContacts] = useState([]);

  const [isOpen, setOpen] = useState(false);
  
  const onOpen = () => {
    setOpen(true);
  }
  const onClose = () => {
    setOpen(false);
  }
   
  useEffect(() => {
    const getContacts = async () =>  {
      try{
       const contactsRef = collection(db, "contacts");
      

       onSnapshot(contactsRef, (snapshot) => {
        const contactList = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
         };
         });
         //console.log(contactsSnapshot);
         //console.log(contactList);
         setContacts(contactList);
         return contactList;
       });
       
      } 
      catch(error)
      {
        console.log(error);
      }
    }
    getContacts();
  }, []);
  
 const filterContacts =  (e) => {
  const value = e.target.value;
  //console.log(value);

      const contactsRef =  collection(db,'contacts');
      
      

       onSnapshot(contactsRef, (snapshot) => {
        const contactList = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
         };
         });
         
         const filteredContacts = contactList.filter((contact) => 
         contact.name.toLowerCase().includes(value.toLowerCase())
         );

         setContacts(filteredContacts);

        return filteredContacts;
        });
 };

 

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
      <Navbar/>
      
      <div className="flex gap-3 relative items-center ml-4 mr-3">
      <FiSearch className="absolute ml-1 text-2xl text-white"/>
      <input 
      onChange = {filterContacts}
      type="text"
      className="h-10 flex-grow rounded-md border
        border-white bg-transparent pl-9 text-white" >

      </input>
      <CiCirclePlus onClick={onOpen} className="cursor-pointer text-4xl text-white" />
      </div>
      <div className="mt-4 flex-col flex gap-3">
           { contacts.length == 0 ? (<NotContact/> ): (contacts.map((contact) => (
             <ContactCard key={contact.id} contact={contact}/>)
           ))}
      </div>
        <AddData isOpen={isOpen} onClose = {onClose}/>
        <ToastContainer position="bottom-center" />
      </div>
    </>
  )
};
export default App;