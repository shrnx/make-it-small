import React, { useState } from 'react'
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


function Login() {

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

  const handleLogin = async () => {
    setErrors([])
    try {
      const schema = Yup.object().shape({      // Yup is same as zod
        email: Yup.string().email("Invalid Email").required("Email is Required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is Required")
      });

      await schema.validate(formData, {abortEarly: false})    // abortEarly false means it wont crash if there is an error until all validations are checked

      // API Call

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
        <Error message={"some error"} />
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
          {false ? <BeatLoader size={10} color='#36d7b7' /> : "Login"}  {/* This loading component is from React-spinners */}
        </Button>
      </CardFooter>
    </Card>

  )
}

export default Login