import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './Error'
import * as Yup from 'yup'
import useFetch from '@/hooks/Use-Fetch'
import {login} from "../db/apiAuth"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { URLstate } from "../Context.jsx"


function Login() {

  const navigate = useNavigate();
  let [searchParams] = useSearchParams(); // There can be a case where user will have already pasted link for shorten before login

  const longLink = searchParams.get("createNew"); // From here we will get the original longLink pasted by User

  const { fetchUser } = URLstate()

  const [errors, setErrors] = useState([])

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value     // For email we will put the email value and for password the password value
    }))
  }

  const {data, error, loading, fn:fnLogin} = useFetch(login, formData)   // This login is from custom hook useFetch
                          // I just renamed the fn -> fnLogin

  useEffect(() => {
    console.log(data)
    if(error === null && data) {      // Then we will route user to dashboard page
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`) // If there is longLink write longLink after createNew
    }
  }, [data, error])

  const handleLogin = async () => {
    setErrors([])
    try {
      const schema = Yup.object().shape({      // Yup is same as zod
        email: Yup.string().email("Invalid Email").required("Email is Required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is Required")
      });

      await schema.validate(formData, {abortEarly: false})    // abortEarly false means it wont crash if there is an error until all validations are checked

      // API Call
      await fnLogin();
      // This will give formData(email & password) then go inside the login, then provide it to supabase and if there is error, will throw error else will return data.

    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {  // Inner here is referencing error from Yup
        newErrors[err.path] = err.message;
      })

      setErrors(newErrors);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>to your account if you already have one</CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">  {/* space-y-1 adds margin top and bottom. */}
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>
          {loading ? <BeatLoader size={10} color='#36d7b7' /> : "Login"}  {/* This loading component is from React-spinners */}
        </Button>
      </CardFooter>
    </Card>

  )
}

export default Login