import { Control } from "react-hook-form"
import { MuiStyle } from "@/types/mui"
import { ActivationFormFields, AuthFormFields } from "../../types"

export type CommonControllerProps = {
  label: string | React.ReactNode
  control: Control<AuthFormFields>
  required?: boolean;
  sx?: MuiStyle
}

type InputController = CommonControllerProps & {
  placeholder: string
}

export type PasswordControllerProps = CommonControllerProps & InputController & {
  confirmPassword?: boolean
}

export type EmailControllerProps = InputController