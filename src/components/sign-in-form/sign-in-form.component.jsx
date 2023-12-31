import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import { signInwithGooglePopup,createUserDocumentFromAuth,signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

const defaultFromFields={
    email: '',
    passowrd: '',
}

const SignInForm = ()=> {

    const [formFields,setFormFields]= useState(defaultFromFields);
    const { email,password } = formFields;
  

    console.log(formFields);
    const resetFormFields = ()=> {
        setFormFields(defaultFromFields);
    }

    const signInWithGoogle = async () => {
       await signInwithGooglePopup();
        
     }
    const handleSubmit = async (event) => {
        event.preventDefault();
      
    try{
        const {user} = await signInAuthWithEmailAndPassword(email,password);
        

        resetFormFields();
       
    } catch(error){
        switch(error){
            case 'auth/wrong-password':
                alert('incorrect password for email');
                break;
            case 'auth/user-not-found':
                alert('no user associated with this email');
                break;
             default:
                console.log(error);       
        }
    }
    };
    const handleChange = (event)=> {
        const {name,value} = event.target;

        setFormFields({...formFields,[name]: value})
    };

    return (
        <div className="sign-up-container">
            <h2>Already Have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput 
                    label='Email' 
                    type='email' 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}/>

                
                <FormInput 
                    label='Password' 
                    type='password' 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}/>
                <div className='buttons-container'>
                <Button  type="submit">Sign In</Button>
                <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign-In</Button>
                </div>
                
            </form>
        </div>
    );
};
export default SignInForm;