import { H3, Colors } from "@blueprintjs/core";
import { Formik } from "formik";
import * as yup from "yup"
import { AppToaster, serverURL } from "../App";

const contactForm = async (values:any) => {
  const formData = new FormData();

  for (let value in values) {
    formData.append(value, values[value]);
  }

  const backendResponse = await fetch(
    `${serverURL}/contactForm`,
    {
      method: "POST",
      body: formData
    }
  )

    const form = await backendResponse.json();
    if(!form.error){
      // Here is where we should put ToggleSignin. We'll have to get comfortable with redux in order to do it though.
      AppToaster.show({
        message: "Thanks for the inquiry! We'll get back to you as soon as possible.",
        intent: "primary",
        timeout: 5000
      })
      return form;
    }
    else{
      AppToaster.show({
        message: "There was an error submitting your form, please try again later.",
        intent: "danger",
        timeout: 5000
      })
    }
    // Then clear the form
}

const handleFormSubmit = async (values:any) => {
  await contactForm(values)
}

const contactFormSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email format").required("required"),
  subject: yup.string().max(40).required("Please provide a subject to your inquiry"),
  phoneNum: yup.string(),                                       // Consider adding regex to match phone numbers in the schema with string().match(/regexpression/)
  message: yup.string().max(280).required("Let us know how we can help!")
})

const initialValuesContactForm = {
  name: "",
  email: "",
  subject: "",
  phoneNum: "",
  message: ""
}


function Contact() {

  return (
    <div style={{padding: "1rem"}}>
      <H3>CONTACT US</H3>
      <p>Have a question or concern? Send us a question and we'll get back to you as soon as possible.</p>

      <Formik 
              onSubmit={(values, {resetForm}) => {
                handleFormSubmit(values);
                resetForm();
              }}
              initialValues={initialValuesContactForm}
              validationSchema={contactFormSchema}
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
                      <form className="contact-form" onSubmit={handleSubmit}>
                        <label>
                          Name *
                        </label>
                        <input className={`${errors.name && touched.name ? "error" : ""}`} placeholder="" onBlur={handleBlur} onChange={handleChange} value={values.name} name="name"/>
                        <label>
                          Email *
                        </label>
                        <input className={`${errors.email && touched.email ? "error" : ""}`} placeholder="" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email"/>
                        <label>
                          Phone Number
                        </label>
                        <input className={`${errors.phoneNum && touched.phoneNum ? "error" : ""}`} placeholder="XXX-XXX-XXXX" onBlur={handleBlur} onChange={handleChange} value={values.phoneNum} name="phoneNum"/>
                        <label>
                          Subject *
                        </label>
                        <input className={`${errors.subject && touched.subject ? "error" : ""}`} placeholder="" onBlur={handleBlur} onChange={handleChange} value={values.subject} name="subject"/>
                        <label>
                          Message *
                        </label>
                        <textarea className={`${errors.message && touched.message ? "error" : ""}`} rows={6} placeholder="What can we help you with?" onBlur={handleBlur} onChange={handleChange} value={values.message} name="message"/>
                      <button type="submit" className="submit-button" style={{background:Colors.BLUE3, color:Colors.WHITE}}>Submit</button>
                    </form>
                )}
              </Formik>


    </div>
  )
}

export default Contact;