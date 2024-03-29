import { Checkbox, Dialog, Intent } from "@blueprintjs/core";
import { Formik } from "formik";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../App";
import { setLogin } from "../state";
import { AccountType, AuthReduxState } from "../utils/types";
import { createToast } from "../utils/util";
import { secondaryValuesRegister, secondaryRegisterSchema, initialValuesRegister, initialRegisterSchema, initialValuesLogin, loginSchema, homeValuesRegister, homeValuesSchema } from "../utils/yupUtil";

type Props = {
  isOpen: boolean,
  toggleSignIn: () => void
};

enum pageTypes {
  LOGIN="log-in",
  REGISTER="register",
  EXTENDED_STUDENT="extended-student",
  EXTENDED_HOMEOWNER="extended-homeowner"
}

function SignInCard(props: Props) {
  const [pageType, setPageType] = useState(pageTypes.LOGIN);
  const [isChecked, setChecked] = useState(false);

  const userId = useSelector((state: AuthReduxState) => state.user)
  const token = useSelector((state: AuthReduxState) => state.token)


  const isLogin = pageType === pageTypes.LOGIN;
  const isRegister = pageType === pageTypes.REGISTER;
  const isExtendedStudent = pageType === pageTypes.EXTENDED_STUDENT;
  const isExtendedOwner = pageType === pageTypes.EXTENDED_HOMEOWNER;
  const dispatch = useDispatch()

  function handlePageType(){
    switch(pageType){
      case pageTypes.LOGIN: setPageType(pageTypes.REGISTER); break;
      case pageTypes.REGISTER: setPageType(pageTypes.LOGIN); break;
      case pageTypes.EXTENDED_STUDENT: props.toggleSignIn(); setPageType(pageTypes.LOGIN); break;
      case pageTypes.EXTENDED_HOMEOWNER: props.toggleSignIn(); setPageType(pageTypes.LOGIN); break;
      default: setPageType(pageTypes.LOGIN); break;
    }
  }

  function toggleCheck(){
    setChecked(!isChecked);
  }

  const login = async (values: any) => {
    const backendResponse = await fetch(
      `${serverURL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(values)
      }
    );
      const loggedIn = await backendResponse.json();
      if(!loggedIn.error && !loggedIn.msg){
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
            accountType: loggedIn.accountType
          })
        )
        createToast(`Now logged in. Welcome back, ${loggedIn.user.firstName}.`, Intent.PRIMARY, 2000)
        props.toggleSignIn();
      } else {
        if(loggedIn.msg){
            createToast(`${loggedIn.msg}`, Intent.DANGER, 2000)
        } else {
          createToast("An error occured while communicating with our database. Please try again later", Intent.WARNING)
        }
      }
  
    
  }

  const register = async (values:any) => {
    const formData = new FormData();

    values['isHomeowner'] = isChecked;
    for (let value in values) {
      formData.append(value, values[value]);
    }
  
    const backendResponse = await fetch(
      `${serverURL}/auth/register`,
      {
        method: "POST",
        body: formData
      }
    )
  
      const savedUser = await backendResponse.json();
      if(!savedUser.error){
        // Thank the user for joining us
        createToast("Thanks for joining us! Be on the alert as we develop additional features for you.", Intent.PRIMARY)

        // Automatically sign in
        let loginData = {
          email: values.email,
          password: values.password
          }
        const backendResponse = await fetch(
          `${serverURL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(loginData)
          }
        );
          const loggedIn = await backendResponse.json();
          // If you log in, set the token
          if(!loggedIn.error && !loggedIn.msg){
            dispatch(
              setLogin({
                user: loggedIn.user,
                token: loggedIn.token,
                accountType: (isChecked ? AccountType.HOMEOWNER : AccountType.STUDENT)
              })
            )
            if(isChecked){
              setPageType(pageTypes.EXTENDED_HOMEOWNER);
            }  else{
              //Disabling the document uploading, thus allowing for free web-service deployment (or at least no disk-space payment) until necessary
              props.toggleSignIn(); 
              //setPageType(pageTypes.EXTENDED_STUDENT);
            }
          } 

        return savedUser;
      }
      else{        
        createToast("It seems there was a problem creating this account. You may have to log-in to an existing one!", Intent.WARNING)
      }
  }

  const uploadFiles = async (values: any) => {
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }

    if(userId){
      const uploadedFileResponse = await fetch(
        `${serverURL}/users/${userId._id}/uploadFiles`,
        {
          method: "PATCH",
          headers: {"Authorization": `Bearer ${token}`},
          body: formData
        } 
        )
        const didUpload = await uploadedFileResponse.json()
        if(!didUpload.error){
          // Thanks for uploading, {text decoration underline ->} 'Why do we ask this of you?' -> Develop short about page
          createToast(`Thanks for telling us a bit about yourself. We'll start connecting you with potential homeowners as we develop additional features!`, Intent.PRIMARY, 2000)
          props.toggleSignIn();    
        }
        else{
          createToast("It seems there was a problem uploading your documents. Currently, we only accept PDFs. Please contact us if you believe this to be a mistake!", Intent.WARNING)
        }
    } else{
        createToast("Something went wrong, it seems like we weren't able to find your account. Please contact us if you believe this to be a mistake!", Intent.WARNING)
        props.toggleSignIn();
    }
  }

  const uploadHouse = async (values: any) => {
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }
  
    const backendResponse = await fetch(
      `${serverURL}/house/${userId._id}/addHouse`,
      {
        method: "POST",
        headers: {"Authorization": `Bearer ${token}`},
        body: formData
      }
    )
  
      const savedHouse = await backendResponse.json();
      if(!savedHouse.error){
        createToast("Thanks for listing! Be on the alert for messages relating to a new lease.", Intent.PRIMARY)
        props.toggleSignIn();
        return savedHouse;
      }
      else{        
        createToast("It seems there was a problem creating this house. Please try adding another one later", Intent.WARNING)
      }
  }

  const handleFormSubmit = async (values: any) => {
    if(isLogin) {
      await login(values);
    } else if(isRegister){
        await register(values)
    } else if(isExtendedStudent){
        await uploadFiles(values);
    } else{
        // is HomeOwner form
        await uploadHouse(values);
    }  
  }

  function registerState(){
    
    return (
      <>
      <div>
          <h2>Welcome to Re-Lease! </h2>
          <hr/>
        </div>
  
        <Formik
          onSubmit={(values, {resetForm}) => {
            handleFormSubmit(values);
            resetForm();
          }}
          initialValues={initialValuesRegister}
          validationSchema={initialRegisterSchema}
          key={pageType}
          >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                    <form className="register-form" onSubmit={handleSubmit}>

                              <input  placeholder="First name*" className={errors.firstName && touched.firstName ? "error" : ""} onBlur={handleBlur} onChange={handleChange} value={values.firstName} name="firstName" />
                              <input  placeholder="Last name*" className={errors.lastName && touched.lastName ? "error" : ""}onBlur={handleBlur} onChange={handleChange} value={values.lastName} name="lastName"/>                            
                              <input className={`alternate-field ${errors.email && touched.email ? "error" : ""}`} placeholder="E-mail*" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" type="email" />
                              <input className={`alternate-field ${errors.phoneNum && touched.phoneNum ? "error" : ""}`} placeholder="Phone number" onBlur={handleBlur} onChange={handleChange} value={values.phoneNum} name="phoneNum" />
                              <input className={`alternate-field ${errors.password && touched.password ? "error" : ""}`} placeholder="Password*" onBlur={handleBlur} onChange={handleChange} value={values.password} name="password" type="password" />
  
                            <button type="submit">Submit</button>
                    </form>

              )}
        </Formik>
        <Checkbox style={{alignSelf:"flex-start", margin:".5rem"}}checked={isChecked} label="I am a homeowner" large={true} onChange={toggleCheck} />
      </>
    )
  }
  
  function studentRegisterState(){
    return(
      <>
      <div style={{display:"flex", flexDirection:"column"}}>
          <h2>Thanks for signing up with us!</h2>
          <h3>Now let homeowners get to know you!</h3>
          <hr/>
      </div>
      <Formik 
          onSubmit={(values, {resetForm}) => {
            handleFormSubmit(values);
            resetForm();
          }}
          initialValues={secondaryValuesRegister}
          validationSchema={secondaryRegisterSchema}
          key={pageType}
          >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                    <form className="register-form" onSubmit={handleSubmit}>
                        <Dropzone accept={{'application/pdf': ['.pdf']}} multiple={false} onDrop={(acceptedFiles) => {
                          setFieldValue("resume", acceptedFiles[0])
                        }}>
                          {({getRootProps, getInputProps}) => (
                            <div className="dropzone-outline">
  
                                <div {...getRootProps()} className="register-drop-zone"
                                >
                                  <input {...getInputProps()}/>
                                  {!values.resume.name ? (
                                      "Resume"
                                  ) : (
                                    `${values.resume.name}`
                                  )}
                                </div>
                            </div>
  
                          )}
                        </Dropzone>
                        <Dropzone accept={{'application/pdf': ['.pdf']}} multiple={false} onDrop={(acceptedFiles) => {
                          setFieldValue("transcript", acceptedFiles[0])
                        }}>
                          {({getRootProps, getInputProps}) => (
                            <div className="dropzone-outline">
  
                                <div {...getRootProps()} className="register-drop-zone"
                                >
                                  <input {...getInputProps()}/>
                                  {!values.transcript.name ? (
                                      "Transcript"
                                  ) : (
                                    `${values.transcript.name}`
                                  )}
                                </div>
                            </div>
                          )}
                        </Dropzone>    
                      <button type="submit">Submit</button>
                    </form>
              )}
        </Formik>
      </>
    )
  }

  function homeownerRegisterState(){
    return(
      <>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
          <h2>Thanks for signing up with us!</h2>
          <h3>Now tell us about this house...</h3>
          <hr/>
      </div>
      <Formik 
          onSubmit={(values, {resetForm}) => {
            handleFormSubmit(values);
            resetForm();
          }}
          initialValues={homeValuesRegister}
          validationSchema={homeValuesSchema}
          key={pageType}
          >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                <form className="register-form" onSubmit={handleSubmit}>
  
                  <input  placeholder="# Bed" onBlur={handleBlur} className={errors.numBedrooms && touched.numBedrooms ? "error" : ""} onChange={handleChange} value={values.numBedrooms} name="numBedrooms"/>                            
                  <input  placeholder="# Bath" onBlur={handleBlur} className={errors.numBathrooms && touched.numBathrooms ? "error" : ""} onChange={handleChange} value={values.numBathrooms} name="numBathrooms" />
                  <input className={`alternate-field ${errors.streetAddress && touched.streetAddress ? "error" : ""}`} placeholder="Street Address" onBlur={handleBlur} onChange={handleChange} value={values.streetAddress} name="streetAddress" />
                  <input className={`alternate-field ${errors.monthlyRent && touched.monthlyRent ? "error" : ""}`} placeholder="Monthly Rent ($)" onBlur={handleBlur} onChange={handleChange} value={values.monthlyRent} name="monthlyRent" />

              <button type="submit">Submit</button>
          </form>
              )}
        </Formik>
      </>
    )
  }

  function loginState(){
    return (
      <>
      <div>
          <h2>Welcome back to Re-Lease</h2>
          <hr/>
        </div>
  
        <Formik 
          onSubmit={(values, {resetForm}) => {
            handleFormSubmit(values);
            resetForm();
          }}
          initialValues={initialValuesLogin}
          validationSchema={loginSchema}
          key={pageType}
          >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                    <form className="register-form" onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column"}}>
                
                        <input className={`alternate-field ${errors.email && touched.email ? "error" : ""}`} placeholder="E-mail" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" type="email" />
                        <input className={`alternate-field ${errors.password && touched.password ? "error" : ""}`} placeholder="Password" onBlur={handleBlur} onChange={handleChange} value={values.password} name="password" type="password" />
  
                      <button type="submit">Submit</button>
                    </form>
  
              )}
        </Formik>
      </>
    )
  }


  return (
    <Dialog isOpen={props.isOpen} canOutsideClickClose={true} onClose={() => {
    setPageType(pageTypes.LOGIN);
    setChecked(false);
    props.toggleSignIn();
  }} 
  style={{padding:"2rem", display:"flex", alignItems:"center"}}
    className="open-popup" >
      {isLogin ? loginState() : (
        isRegister ? registerState() : (
          isExtendedOwner ? homeownerRegisterState() :
            studentRegisterState()
        )
      ) }
      <text onClick={() => {
       handlePageType(); 
      }}className="ignore-fields">
        {isLogin ? "New to Re-Lease? Create an account" 
        : ( isRegister ? "Have an account? Sign in" 
        : ( isChecked ? "No thanks, I'll post another time" 
        : "No thanks, remind me later"))}
      </text>


      
    </Dialog>
  )
}

export default SignInCard;