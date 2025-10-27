// Individual validation functions
const hasMinLength = (password: string): boolean => {
  return password.length >= 10
}

const hasUppercase = (password: string): boolean => {
  return /[A-Z]/.test(password)
}

const hasLowercase = (password: string): boolean => {
  return /[a-z]/.test(password)
}

const hasDigit = (password: string): boolean => {
  return /\d/.test(password)
}

const hasSpecialChar = (password: string): boolean => {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
}

const hasNoSpaces = (password: string): boolean => {
  return password.length > 0 ? !password.includes(' ') : false
}

export const isValidPassword = (password: string): boolean => {
  const validators = [
    hasMinLength,
    hasNoSpaces,
    hasUppercase,
    hasLowercase,
    hasDigit,
    hasSpecialChar
  ]

  return validators.every(validator => validator(password))
}

export const getPasswordRequirements = (password: string) => {
  const requirements = [
    {
      label: 'Mínimo de 10 caracteres',
      validator: (password: string) => hasMinLength(password)
    },
    {
      label: 'Pelo menos 1 letra maiúscula (A-Z)',
      validator: hasUppercase
    },
    {
      label: 'Pelo menos 1 letra minúscula (a-z)',
      validator: hasLowercase
    },
    {
      label: 'Pelo menos 1 número (0-9)',
      validator: hasDigit
    },
    {
      label: 'Pelo menos 1 caractere especial (@-$)',
      validator: hasSpecialChar
    },
    {
      label: 'Sem espaços',
      validator: hasNoSpaces
    }
  ]

  return requirements.map(({ label, validator }) => ({
    label,
    isValid: validator(password)
  }))
}
