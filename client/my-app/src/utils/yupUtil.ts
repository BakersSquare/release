import * as yup from "yup"

// Corroborate this with the data model
export const initialRegisterSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  phoneNum: yup.string(),                                       // Consider adding regex to match phone numbers in the schema with string().match(/regexpression/)
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

// const loginSchema = yup.object().shape({
//   email: yup.string().email("invalid email").required("required"),
//   password: yup.string().required("required")
// })
// const initialValuesLogin = {
//   email: "",
//   password: ""
// }
