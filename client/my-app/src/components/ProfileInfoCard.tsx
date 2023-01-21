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
  toggleProfile: () => void
};

function ProfileInfoCard(props: Props) {

  const userId = useSelector((state: AuthReduxState) => state.user)
  const token = useSelector((state: AuthReduxState) => state.token)
  const accountType = useSelector((state: AuthReduxState) => state.accountType)

  const dispatch = useDispatch()

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
          props.toggleProfile();    
        }
        else{
          createToast("It seems there was a problem uploading your documents. Currently, we only accept PDFs. Please contact us if you believe this to be a mistake!", Intent.WARNING)
        }
    } else{
        createToast("Something went wrong, it seems like we weren't able to find your account. Please contact us if you believe this to be a mistake!", Intent.WARNING)
        props.toggleProfile();
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
        props.toggleProfile();
        return savedHouse;
      }
      else{        
        createToast("It seems there was a problem creating this house. Please try adding another one later", Intent.WARNING)
      }
  }

  const handleFormSubmit = async (values: any) => {

    if(accountType == AccountType.STUDENT){
        await uploadFiles(values);
    } else{
        await uploadHouse(values);
    }  
  }
  
  function studentRegisterState(){
    return(
      <>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
          <h2>Want to update your profile?</h2>
          <h3>Let homeowners get to know you!</h3>
          <hr/>
      </div>
      <Formik 
          onSubmit={(values, {resetForm}) => {
            handleFormSubmit(values);
            resetForm();
          }}
          initialValues={secondaryValuesRegister}
          validationSchema={secondaryRegisterSchema}
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
          <h2>Have another house to lease?</h2>
          <h3>Let us help you look!</h3>
          <hr/>
      </div>
      <Formik 
          onSubmit={(values, {resetForm}) => {
            handleFormSubmit(values);
            resetForm();
          }}
          initialValues={homeValuesRegister}
          validationSchema={homeValuesSchema}
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

  return (
    <Dialog isOpen={props.isOpen} canOutsideClickClose={true} onClose={() => {
    props.toggleProfile();
  }} 
  style={{padding:"2rem", display:"flex", alignItems:"center"}}
    className="open-popup" >
      {(accountType == AccountType.STUDENT) ? studentRegisterState() : (
        homeownerRegisterState()
      ) }
    </Dialog>
  )
}

export default ProfileInfoCard;