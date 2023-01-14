import * as yup from "yup"

// Corroborate this with the data model


export const initialValuesLogin = {
  email: "",
  password: ""
}


export const initialValuesRegister = {
  firstName: "",
  lastName: "",
  phoneNum: "",
  email: "",
  password: ""
}

export const secondaryValuesRegister = {
  resume: {
    fileName: "",
    filePath: ""
  },
  transcript: {
    fileName: "",
    filePath: ""
  },
  profilePic: {
    fileName: "",
    filePath: ""
  }
}

export const homeValuesRegister = {
  streetAddress: "",
  numBedrooms: "",
  numBathrooms: "",
  monthlyRent: "",
}

// Phone nums should follow this regex \d{3}-\d{3}-\d{4}
export const homeValuesSchema = yup.object().shape({
  streetAddress: yup.string().required("A street address is required"),
  numBedrooms: yup.number().min(1).required("Bedrooms are required"),
  numBathrooms: yup.number().min(1).required("Bathrooms are required"),
  monthlyRent: yup.number().required("A monthly rent is required")
})

export const loginSchema = yup.object().shape({
  email: yup.string().required("An email is required"),
  password: yup.string().required("Please input a password")
})

let phoneNumRegEx = new RegExp(/\d{3}-\d{3}-\d{4}|\d\d{3}\d{3}\d{4}|\d{10}|\(\d{3}\)-\d{3}-\d{4}|\d\(\d{3}\)\d{3}-\d{4}|\(\d{3}\)\d{3}-\d{4}|\d{3}-\d{3}-\d{4}/);

export const initialRegisterSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  phoneNum: yup.string().matches(phoneNumRegEx, "Please enter a phone # in the form of XXX-XXX-XXXX"),
  email: yup.string().email("invalid email format").required("required"),
  password: yup.string().required("required")
})

export const secondaryRegisterSchema = yup.object().shape({
  resume: yup.object().shape({
    fileName: yup.string().required(),
    filePath: yup.string().required(),
  }),
  transcript: yup.object().shape({
    fileName: yup.string().required(),
    filePath: yup.string().required(),
  })
})