import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {withFormik, Form, Field} from 'formik'
import * as Yup from 'yup'
import StyleForm from './style'
import styled from "styled-components"


const Container = styled.div `

display: flex;
flex-direction: row;
justify-content: center;
margin-top: 2rem;

`

const FormStyle = styled(Form)`

display: flex;
flex-direction: column;
justify-content: center; 

`

const FieldStyle = styled(Field)`
margin-bottom: 2rem;

`


const UserForm = ({values, touched, errors, status}) => {
const [user, setUser] = useState([])
useEffect(() => {
    status && setUser(user => [...user, status])
}, [status])


    return(
        <div>
            <Container>
        <FormStyle>
        <FieldStyle type ="text" name ="name" placeholder ="Enter Name"/>
        {touched.name && errors.name && (
            <p>{errors.name}</p>
        )}

        <FieldStyle type="email" name ="email" placeholder ="Enter E-mail"/>
        {touched.email && errors.email && (
            <p>{errors.email}</p>
        )}
        <FieldStyle type="password" name="password" placeholder="Enter Password"/>
        {touched.password && errors.password && (
            <p>{errors.password}</p>
        )}
        <label>
            Terms of Service 
        <FieldStyle type="checkbox" name="termsOfService" checked={values.termsOfService}/>
        </label>

        <button type="submit">Submit</button>
        </FormStyle>
        
        {user.map(user => (
            <ul>
                <li>Name: {user.name}</li>
 
            </ul>
         ))}
         </Container>
         </div>
    );
}

const FormikUserForm = withFormik({
mapPropsToValues({name, email, password, termsOfService}) {
    return {
        name: name || '',
        email: email || '',
        password: password || '',
        termsOfService: termsOfService || false
    }
},
validationSchema: Yup.object().shape({
    name: Yup.string().required("Must Enter Name"),
    email: Yup.string().required("Must Enter Email"),
    password: Yup.string().required("Must Enter Password")
}),

handleSubmit(values, {setStatus}) {
axios.post('https://reqres.in/api/users', values)
  .then(res => { setStatus(res.data);})
  .catch(err => console.log(err.response))
}

})(UserForm)
export default FormikUserForm; 