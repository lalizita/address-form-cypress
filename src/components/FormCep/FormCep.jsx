import React, { useState } from 'react';
import { Box, Flex } from 'rebass'
import {
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
} from '@rebass/forms';
import { Button } from 'rebass'
import axios from 'axios'
import { useFormik, FormikProvider, useField } from 'formik'
import * as Yup from 'yup'

const TextFieldFormik = (props) => {
  const [field, meta] = useField(props.name);

  return (
    <Input
      {...props}
      {...field}
    />
  );
};

const CepField = props => {
  const { setFieldValue } = props;

  const fetchCep = async (cep) => {
    const cepResult = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    const { logradouro, bairro } = cepResult.data
    setFieldValue('logradouro', logradouro)
    setFieldValue('bairro', bairro)
  }

  const handleCepField = value => {
    if (value.length === 8) fetchCep(value)
    console.log("FETCH")
    setFieldValue('cep', value)
  }

  return (
     <Input
     name="cep"
     onChange={e => {
       handleCepField(e.target.value)
       setFieldValue('cep', e.target.value);
      }}
      {...props}
      />
  )
}

const FormCep = () => {
  const initialAddress = {
    logradouro: '',
    bairro: ''
  }

  const formik = useFormik({
    initialValues: {
      cep: '',
      bairro: '',
      logradouro: '',
    },
    validationSchema:Yup.object().shape({
      cep: Yup.string().required('campo de cep obrigatório'),
      bairro: Yup.string().required('campo bairro obrigatório'),
      logradouro: Yup.string().required('campo logradouro obrigatório'),
    }),
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      localStorage.setItem('address', JSON.stringify(values))
    },
  });

  return (
    <FormikProvider value={formik}>
      <Box as='form' onSubmit={formik.handleSubmit} py={3} width='500px'>
        <Flex mx={-2} mb={3}>
          <Box width={1 / 2} px={2}>
            <Label htmlFor='cep'>Cep</Label>
            <CepField data-testid="cep" setFieldValue={formik.setFieldValue}/>
            <p>{formik.errors.cep}</p>
          </Box>
          <Box width={1 / 2} px={2}>
            <Label htmlFor='bairro'>Bairro</Label>
            <TextFieldFormik
              id='bairro'
              name='bairro'
              placeholder="bairro"
              data-testid="bairro"
            />
            <p data-testid="error-bairro">{formik.errors.bairro}</p>
          </Box>
          <Box width={1 / 2} px={2}>
            <Label htmlFor='logradouro'>Logradouro</Label>
            <TextFieldFormik
              id='logradouro'
              name='logradouro'
              placeholder="logradouro"
              data-testid="logradouro"
            />
            <p>{formik.errors.logradouro}</p>
          </Box>
        </Flex>
        <Flex>
          <Button type="submit" data-testid="submit-address">
            Enviar
          </Button>
        </Flex>
      </Box>
    </FormikProvider>
  );
};

export default FormCep;
