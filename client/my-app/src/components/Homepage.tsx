import { Button, Classes } from "@blueprintjs/core";
import HomeOwner from '../assets/happy-homeowner.jpg'
import * as yup from "yup"
import { Formik } from "formik";
import { AppToaster, serverURL } from "../App";


const emailInterest = async (values:any) => {
  const formData = new FormData();

  for (let value in values) {
    formData.append(value, values[value]);
  }

  const backendResponse = await fetch(
    `${serverURL}/auth/emailInterest`,
    {
      method: "POST",
      body: formData
    }
  )

    const savedUser = await backendResponse.json();
    if(savedUser){
      // Here is where we should put ToggleSignin. We'll have to get comfortable with redux in order to do it though.
      AppToaster.show({
        message: "Thanks for signing up with us! Be on the lookout for future updates!",
        intent: "primary",
        timeout: 3000
      })
      return savedUser;
    }
    else{
      console.log("An error occured!")
    }
    // Then clear the form
}

const emailSchema = yup.object().shape({
  email: yup.string().email("invalid email format").required("required")
})
const initialEmailRegister = {
    email: "",
}

const handleFormSubmit = async (values:any) => {
  const res = await emailInterest(values)
  console.log(res);

}

function Homepage() {
  return (
      <div className="homepage">
         {/* https://ordinarycoders.com/blog/article/hero-banners */}
        <div className="hero"> 
        
        <div className="hero-image-content" style={{padding:"1rem"}}>
            <p>We find. You sign.</p>
            <h3 style={{marginBottom:"1rem"}}>Cut the BS out of finding student housing. Connect with interested homeowners today.</h3>
            <Formik 
              onSubmit={(values, {resetForm}) => {
                handleFormSubmit(values);
                resetForm();
              }}
              initialValues={initialEmailRegister}
              validationSchema={emailSchema}
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
                      <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem"}}>

                          <input placeholder="Join our mailing list and be first to know about new leases."
                          className={`${Classes.INPUT} email-input ${errors.email && touched.email ? "error" : ""}`} onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" type="email" />
                          <button className={Classes.BUTTON} type="submit" >Submit</button>

                      </form>

                )}
              </Formik>
          </div>
        </div>

        <div className="ribbon">
          <img alt="" src={HomeOwner}></img>
            <p>
              <h3>Stay in the loop</h3>
              Browse available leases now
              <Button intent="none" onClick={() => {
                    AppToaster.show({
                      message: "Feature in development. Join the email list to stay updated with the latest campus leases.",
                      intent: "warning",
                      timeout: 3000
                    })
              }}>See Leases</Button>
          </p>
        </div>
      </div>
  );
}

export default Homepage;