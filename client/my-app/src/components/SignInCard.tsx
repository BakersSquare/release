import { Dialog, Intent } from "@blueprintjs/core";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import { serverURL } from "../App";
import { createToast } from "../utils/util";
import { secondaryValuesRegister, secondaryRegisterSchema, initialValuesRegister, initialRegisterSchema } from "../utils/yupUtil";

type Props = {
  isOpen: boolean,
  toggleSignIn: () => void
};


const register = async (values:any) => {
  const formData = new FormData();

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
      // Here is where we should put ToggleSignin. We'll have to get comfortable with redux in order to do it though.
      createToast("Thanks for joining us! Be on the alert as we develop additional features for you.", Intent.PRIMARY)
      return savedUser;
    }
    else{
      createToast("It seems there was a problem creating this account. You may have to log-in to an existing one!", Intent.WARNING)
    }
}

async function handleFormSubmit (values: any) {
  const res = await register(values);
  // Here is where we should toggle the props. We'll need redux to do that and close the form

  return res;
}

function SignInCard(props: Props) {


  return (
    <Dialog isOpen={props.isOpen} canOutsideClickClose={true} onClose={props.toggleSignIn} style={{padding:"2rem", display:"flex", alignItems:"center"}}
    className="open-popup" >
      {initialRegistration()}
      {/* {tellUsMore()} */}

      {/* Import and use formik for this form. It's reputable and classy. https://formik.org/ */}

      
    </Dialog>
  )
}

function tellUsMore(){

  return(
    <>
    <div>
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
                                {!values.resume ? (
                                    "Resume"
                                ) : (
                                  `${values.resume}`
                                )}
                              </div>
                          </div>

                        )}
                      </Dropzone>
                      <Dropzone accept={{'application/pdf': ['.pdf']}} multiple={false} onDrop={(acceptedFiles) => {
                        console.log(acceptedFiles[0]);
                        setFieldValue("Transcript", acceptedFiles[0])
                      }}>
                        {({getRootProps, getInputProps}) => (
                          <div className="dropzone-outline">

                              <div {...getRootProps()} className="register-drop-zone"
                              >
                                <input {...getInputProps()}/>
                                {!values.transcript ? (
                                    "Transcript"
                                ) : (
                                  `${values.transcript}`
                                )}
                              </div>
                          </div>
                        )}
                      </Dropzone>    
                    <button type="submit">Submit</button>
                  </form>
            )}
      </Formik>
      <text className="ignore-fields">No thanks, remind me later</text>
    </>
  )
}

function initialRegistration(){
  return (
    <>
    <div>
        <h2>Welcome to Re-Lease </h2>
        <hr/>
      </div>

      <Formik 
        onSubmit={(values, {resetForm}) => {
          handleFormSubmit(values);
          resetForm();
        }}
        initialValues={initialValuesRegister}
        validationSchema={initialRegisterSchema}
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

                            <input  placeholder="First name*" onBlur={handleBlur} onChange={handleChange} value={values.firstName} name="firstName" />
                            <input  placeholder="Last name*" onBlur={handleBlur} onChange={handleChange} value={values.lastName} name="lastName"/>                            
                            <input className={`alternate-field ${errors.email && touched.email ? "error" : ""}`} placeholder="E-mail*" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" type="email" />
                            <input className={`alternate-field ${errors.phoneNum && touched.phoneNum ? "error" : ""}`} placeholder="Phone number" onBlur={handleBlur} onChange={handleChange} value={values.phoneNum} name="phoneNum" />
                            <input className={`alternate-field ${errors.password && touched.password ? "error" : ""}`} placeholder="Password*" onBlur={handleBlur} onChange={handleChange} value={values.password} name="password" type="password" />

                          <button type="submit">Submit</button>
                  </form>

            )}
      </Formik>
      {/* <text className="ignore-fields">Have an account? Sign in</text> */}
    </>
  )
}

export default SignInCard;