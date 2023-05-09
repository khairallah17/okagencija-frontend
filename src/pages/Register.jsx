import React from 'react'
import Layout from '../components/Layout'
import Form from '../components/Form/Form'
import { FormProvider } from '../context/FromContext'

const Register = () => {

  return (
    <Layout>
        <FormProvider>
            <Form></Form>
        </FormProvider>
    </Layout>
  )
}

export default Register