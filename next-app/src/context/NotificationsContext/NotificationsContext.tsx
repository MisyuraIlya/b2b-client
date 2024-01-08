"use client";
import { SnackbarProvider } from 'notistack';
import Success from '@/components/Notifications/Success';
import { IChildren } from "@/types/layout";

export default function NotificationsContext({ children }: IChildren) {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      Components={{
        success: Success
      }}
    >
      {children}
    </SnackbarProvider>
  );
}