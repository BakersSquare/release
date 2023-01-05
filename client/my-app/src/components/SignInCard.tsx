import { H3, Dialog, Colors, Button } from "@blueprintjs/core";
import { Formik } from "formik";
import * as yup from "yup"
import { AppToaster } from "../App";

type Props = {
  isOpen: boolean,
  toggleSignIn: () => void
};

// Corroborate this with the data model
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  phoneNum: yup.string(),                                       // Consider adding regex to match phone numbers in the schema with string().match(/regexpression/)
  email: yup.string().email("invalid email format").required("required"),
  password: yup.string().required("required")
})

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required")
})

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  phoneNum: "",
  email: "",
  password: ""
}

const initialValuesLogin = {
  email: "",
  password: ""
}

const register = async (values:any) => {
  const formData = new FormData();

  for (let value in values) {
    formData.append(value, values[value]);
  }

  const backendResponse = await fetch(
    "http://localhost:3001/auth/register",
    {
      method: "POST",
      body: formData
    }
  )

    const savedUser = await backendResponse.json();
    if(savedUser){
      // Here is where we should put ToggleSignin. We'll have to get comfortable with redux in order to do it though.
      AppToaster.show({
        message: "Thanks for the joining us! Be on the alert as we develop additional features for you.",
        intent: "primary",
        timeout: 5000
      })
      return savedUser;
    }
    else{
      console.log("An error occured!")
    }
    // Then clear the form
}

async function handleFormSubmit (values: any) {
  const res = await register(values);
  console.log("here");
  console.log(res);
  // Here is where we should toggle the props. We'll need redux to do that and close the form

  return res;
}

function SignInCard(props: Props) {

  return (
    <Dialog isOpen={props.isOpen} canOutsideClickClose={true} onClose={props.toggleSignIn} style={{padding:"2rem", display:"flex", alignItems:"center"}}
    className="open-popup" >
      <div>
        <h3>Welcome to Re-Lease </h3>
        <hr/>
      </div>

      <Formik 
        onSubmit={(values, {resetForm}) => {
          handleFormSubmit(values);
          resetForm();
        }}
        initialValues={initialValuesRegister}
        validationSchema={registerSchema}
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

      {/* Import and use formik for this form. It's reputable and classy. https://formik.org/ */}

      
    </Dialog>
  )
}

export default SignInCard;