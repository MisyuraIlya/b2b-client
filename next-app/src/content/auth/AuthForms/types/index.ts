import { Control, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'
export type EmailForm = {
  email?: string
}

export type PasswordForm = {
  password?: string
  password_confirm?: string
}

export type AgreementsForm = {
  agreements?: boolean
}
export type AuthFormFields = EmailForm & PasswordForm & AgreementsForm

export interface AuthFormProps {
  control: Control<AuthFormFields>
  handleSubmit: UseFormHandleSubmit<AuthFormFields>
  onSubmit: SubmitHandler<AuthFormFields>
  loading?: boolean
}

export type ExternalIdForm = {
  external_id?: string
}

export type PhoneNumberForm = {
  phone_number?: string
}

export type CodeForm = {
  code?: string
}

export type ActivationFormFields = ExternalIdForm &
  PhoneNumberForm &
  EmailForm &
  CodeForm
