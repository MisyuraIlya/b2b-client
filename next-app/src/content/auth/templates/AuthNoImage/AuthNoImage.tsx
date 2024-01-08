"use client"
import dynamic from "next/dynamic";
import { FC } from "react";
import getComponent from "@/utils/getComponent";
import AuthTemplate from "../../AuthTemplate/AuthTemplate";
import { useAuthStore } from "../../context";
import { IPageComponents } from "@/types/page";

const LoginForm = dynamic(() => import('../../AuthForms/LoginForm'))
const SignUpForm = dynamic(() => import('../../AuthForms/SignUpForm'))
const ForgotPasswordForm = dynamic(() => import('../../AuthForms/ForgotPasswordForm'))
const CheckEmailForm = dynamic(() => import('../../AuthForms/CheckEmailForm'))
const forms = {
  LoginForm,
  ForgotPasswordForm,
  SignUpForm,
  CheckEmailForm
}

const AuthNoImage: FC<IPageComponents> = (props) => {
  const { form } = useAuthStore();
  const logoImage = props.contentReadies[0]?.media;
  const Form = getComponent(forms, form);
  return (
    <AuthTemplate
      logoImage={logoImage}
      form={<Form />}
    />
  )
}

export default AuthNoImage;