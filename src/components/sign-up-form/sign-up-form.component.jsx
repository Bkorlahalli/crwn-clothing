import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFromFields={
    displayName: '',
    email: '',
    passowrd: '',
    confirmPassword: '',
}


const SignUpForm = ()=> {

    const [formFields,setFormFields]= useState(defaultFromFields);
    const { displayName,email,password,confirmPassword } = formFields;
   
    
    const resetFormFields = ()=> {
        setFormFields(defaultFromFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword ){
            alert("passwords does not match");
            return;
        }

    try{
        const {user} = await createAuthUserWithEmailAndPassword(email,password);
      
        await createUserDocumentFromAuth(user,{displayName});
        resetFormFields();
        console.log(await createAuthUserWithEmailAndPassword(email,password));
    } catch(error){
        if(error.code === 'auth/email-already-in-use'){
            alert('cannot create user,email already in use',error);
        }else{
            console.log('user creation encountered an error',error);
        }
    }
    };
    const handleChange = (event)=> {
        const {name,value} = event.target;

        setFormFields({...formFields,[name]: value})
    };

    return (
        <div className="sign-up-container">
            <h2>Don't Have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label='Display Name' type='text' required onChange={handleChange} name="displayName" value={displayName}/>

                
                <FormInput label='Email' type='email' required onChange={handleChange} name="email" value={email}/>

                
                <FormInput label='Password' type='password' required onChange={handleChange} name="password" value={password}/>

                
                <FormInput label='Confirm Password' type='password' required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <Button  type="submit">Sign up</Button>
            </form>
        </div>
    );
};
export default SignUpForm;