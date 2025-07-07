/**
 * Forms & Validation Utilities
 * Validación, formateo de inputs, manejo de formularios, etc.
 */

import { useState } from "react"

// Validadores comunes
export const validators = {
  // Validación de email
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) || "Email inválido"
  },

  // Validación de longitud mínima
  minLength: (min) => (value) => {
    return value.length >= min || `Mínimo ${min} caracteres`
  },

  // Validación de longitud máxima
  maxLength: (max) => (value) => {
    return value.length <= max || `Máximo ${max} caracteres`
  },

  // Campo requerido
  required: (value) => {
    return !!value || "Este campo es requerido"
  },

  // Validación de URL
  url: (value) => {
    try {
      new URL(value)
      return true
    } catch {
      return "URL inválida"
    }
  },

  // Validación de número
  number: (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value)) || "Debe ser un número"
  },

  // Validación de entero
  integer: (value) => {
    return Number.isInteger(Number(value)) || "Debe ser un número entero"
  },

  // Validación de contraseña
  password: (value) => {
    const hasUpperCase = /[A-Z]/.test(value)
    const hasLowerCase = /[a-z]/.test(value)
    const hasNumbers = /\d/.test(value)
    const hasMinLength = value.length >= 8

    if (!hasMinLength) return "Mínimo 8 caracteres"
    if (!hasUpperCase) return "Debe tener al menos una mayúscula"
    if (!hasLowerCase) return "Debe tener al menos una minúscula"
    if (!hasNumbers) return "Debe tener al menos un número"

    return true
  },

  // Validación de teléfono
  phone: (value) => {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/
    return phoneRegex.test(value) || "Teléfono inválido"
  },
}

// Formateadores de entrada
export const formatters = {
  // Formatear como número
  number: (value) => {
    return value.replace(/[^\d.-]/g, '')
  },

  // Formatear como entero
  integer: (value) => {
    return value.replace(/[^\d]/g, '')
  },

  // Formatear teléfono
  phone: (value) => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    return value
  },

  // Formatear moneda
  currency: (value) => {
    const number = parseFloat(value.replace(/[^\d.-]/g, ''))
    return isNaN(number) ? '' : number.toLocaleString('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })
  },

  // Formatear porcentaje
  percentage: (value) => {
    const number = parseFloat(value.replace(/[^\d.-]/g, ''))
    return isNaN(number) ? '' : `${number}%`
  },

  // Capitalizar primera letra
  capitalize: (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
  },

  // Formatear como slug
  slug: (value) => {
    return value
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  },
}

// Utilidades para manejo de formularios
export const formUtils = {
  // Validar un campo con múltiples validadores
  validateField: (value, validators) => {
    for (const validator of validators) {
      const result = validator(value)
      if (result !== true) {
        return result
      }
    }
    return true
  },

  // Validar un objeto completo
  validateForm: (data, schema) => {
    const errors = {}

    for (const [field, validators] of Object.entries(schema)) {
      const value = data[field]
      const result = formUtils.validateField(value, validators)

      if (result !== true) {
        errors[field] = result
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  },

  // Limpiar datos de formulario
  sanitizeForm: (data, sanitizers = {}) => {
    const sanitized = {}

    for (const [key, value] of Object.entries(data)) {
      const sanitizer = sanitizers[key]
      sanitized[key] = sanitizer ? sanitizer(value) : value
    }

    return sanitized
  },

  // Formatear datos para envío
  formatForSubmission: (data) => {
    const formatted = {}

    for (const [key, value] of Object.entries(data)) {
      // Remover espacios en blanco
      if (typeof value === 'string') {
        formatted[key] = value.trim()
      }
      // Convertir strings vacíos a null
      else if (value === '') {
        formatted[key] = null
      }
      else {
        formatted[key] = value
      }
    }

    return formatted
  },
}

// Hook personalizado para manejo de formularios
export function useFormState(initialState = {}, schema = {}) {
  const [data, setData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }))

    // Limpiar error cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const touchField = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const validateForm = () => {
    const result = formUtils.validateForm(data, schema)
    setErrors(result.errors)
    return result.isValid
  }

  const handleSubmit = async (onSubmit) => {
    setIsSubmitting(true)

    try {
      const isValid = validateForm()
      if (isValid) {
        const formattedData = formUtils.formatForSubmission(data)
        await onSubmit(formattedData)
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setData(initialState)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }

  return {
    data,
    errors,
    touched,
    isSubmitting,
    updateField,
    touchField,
    validateForm,
    handleSubmit,
    reset,
  }
}

// Configuraciones de campo comunes
export const fieldConfigs = {
  email: {
    type: 'email',
    validators: [validators.required, validators.email],
    placeholder: 'ejemplo@correo.com',
  },

  password: {
    type: 'password',
    validators: [validators.required, validators.password],
    placeholder: 'Contraseña segura',
  },

  phone: {
    type: 'tel',
    validators: [validators.required, validators.phone],
    formatter: formatters.phone,
    placeholder: '(123) 456-7890',
  },

  url: {
    type: 'url',
    validators: [validators.url],
    placeholder: 'https://ejemplo.com',
  },

  number: {
    type: 'number',
    validators: [validators.number],
    formatter: formatters.number,
  },

  currency: {
    type: 'text',
    validators: [validators.number],
    formatter: formatters.currency,
    placeholder: '€0,00',
  },
}