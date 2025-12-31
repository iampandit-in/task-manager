import axios from "axios"

const SignUpUser = async (formData) => {
  const response = await axios.post("http://localhost:3000/api/user/signup", formData, {withCredentials: true}) 
  return response.data
}

const SignInUser = async (formData) => {
  const response = await axios.post("http://localhost:3000/api/user/signin", formData, {withCredentials: true}) 
  return response.data
}

const SignOutUser = async () => {
  const response = await axios.post("http://localhost:3000/api/user/signout", {withCredentials: true}) 
  return response.data
}

const getCurrentUser = async () => {
  const response = await axios.get("http://localhost:3000/api/user/get-current-user", {withCredentials: true}) 
  return response.data
}

const updateUser = async (formData) => {
  const response = await axios.put("http://localhost:3000/api/user/update-user", formData, {withCredentials: true}) 
  return response.data
}

const deleteUser = async () => {
  const response = await axios.delete("http://localhost:3000/api/user/delete-user", {withCredentials: true}) 
  return response.data
}

export {SignUpUser, SignInUser, SignOutUser, getCurrentUser, updateUser, deleteUser}