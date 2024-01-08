"use client"

import { notFound } from "next/navigation";
import Content from "@/content";
import { usePageStore } from "@/context/PageContext/PageContext";

export default function PageContent() {
  const { page } = usePageStore();
  if (!page) {
    return notFound();
  }
  
  return <Content data={page} />
}