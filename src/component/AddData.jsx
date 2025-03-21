import { Field, Formik,Form,ErrorMessage} from 'formik'
import Model from './Model'
import {db} from '../config/firebase'
import {addDoc,collection,updateDoc,doc} from 'firebase/firestore'
import {toast} from 'react-toastify';
import * as Yup from 'yup';

const contactSchemaValidation = Yup.object().shape({
  
  name : Yup.string().required("Name is required"),
  email : Yup.string().email("Invalis Email").required("Email is reuired"),
});



const AddData = ({isOpen,onClose,isUpdate,contact}) => {
  
  const addContact = async (contact) => {
     try{
      const contactRef = collection(db, "contacts")
     await addDoc(contactRef,contact);
     onClose();
     toast.success("contact added succesfully");
     }
     catch(error)
     {
      console.log(error);
     }
  };
  const updateContact = async (contact, id) => {
    try{
     const contactRef = doc(db, "contacts", id)
    await updateDoc(contactRef,contact)
    onClose();
    toast.success("contact added succesfully");
    }
    catch(error)
    {
     console.log(error);
    }
 };
    return (
        <>
           <Model isOpen = {isOpen} onClose = {onClose}>
            <Formik
            validationSchema={contactSchemaValidation}
             initialValues={isUpdate 
             ?{
               name: contact.name,
               email: contact.email,
             }
             :{
              name: "",
              email: "",
             }}
             onSubmit = {(values) => {  
             console.log(values);
             isUpdate ? updateContact(values, contact.id):
             addContact(values);
             }}>
                <Form className="flex flex-col gap-4">
                  <div className='flex flex-col gap-1'>
                     <label htmlFor='name'>Name </label>
                       <Field name="name" className="h-10 border"></Field>
                       <div className='text-xs text-red-500'>
                        <ErrorMessage  name='name'/>
                       </div>
                  </div>
                  <div className='flex flex-col gap-1'>
                     <label htmlFor='email'>email </label>
                       <Field name="email" className="h-10 border"></Field>
                       <div className='text-xs text-red-500'>
                        <ErrorMessage  name='name'/>
                       </div>
                  </div>
                 <button className='self-end border bg-orange px-3 py-1.5' >
                   {isUpdate ? "update" : "add"} contact
                 </button>
                </Form>
            </Formik>
           </Model>
           
        </>
    )
}
export default AddData;