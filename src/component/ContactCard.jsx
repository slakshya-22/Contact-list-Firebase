import { RiUserVoiceLine } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import {db} from '../config/firebase';
import {deleteDoc,doc} from 'firebase/firestore';
import { useState } from "react";
import AddData from "./AddData";
import {toast}  from  'react-toastify';
 
const ContactCard = ({ contact }) => {
  const deleteContact = async(id) => {
   try {
      await deleteDoc(doc(db, "contacts" ,id))
      toast.success("contac deleted succesfully");
    }
    catch(error){
      console.log(error);
    }
  }

  const [isOpen, setOpen] = useState(false);
  
  const onOpen = () => {
    setOpen(true);
  }
  const onClose = () => {
    setOpen(false);
  }
  return (
    <>
      <div 
    key = {contact.id}
    className="flex items-center justify-between rounded-lg bg-yellow p-2"
    >
   <div className=" flex gap-7">
     <RiUserVoiceLine className="text-4xl text-orange cursor-pointer" />
     <div className="">
       <h2 className="font-medium">{contact.name}</h2>
       <p className="text-sm">{contact.email}</p>
     </div>
    </div>
    <div className="flex text-3xl gap-3">
     <FiEdit3 onClick={onOpen} className="cursor-pointer"/>
     <FaTrash  onClick={() => deleteContact(contact.id)} className="text-orange cursor-pointer"/>
    </div>
    </div>
    <AddData  contact={contact}  isUpdate isOpen={isOpen} onClose={onClose}/>
    </>

 );
}
export default ContactCard;