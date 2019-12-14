import React, { useState } from 'react';
import { Field } from './Field';

export function Form() {
  const [formData, setFormData] = useState({
    NAME: '',
    EMAIL: '',
    WHATS_APP: ''
  });

  function handleChange({ target }) {
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert(JSON.stringify(formData, null, 0));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field label="Nome" name="NAME" onChange={handleChange} />
      <Field label="E-Mail" name="EMAIL" onChange={handleChange} />
      <Field label="WhatsApp" name="WHATS_APP" onChange={handleChange} />

      <button type="submit">Enviar</button>
    </form>
  );
}
