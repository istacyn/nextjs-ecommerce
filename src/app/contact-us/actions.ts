"use server";

import { prisma } from '@/lib/db/prisma';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
  }

export async function submitFormData(formData: FormData) {
    try {
      await prisma.contact.create({
        data: formData,
      });
  
      console.log('Form submitted successfully!');
      // Handle any success message or redirection if needed
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error and display appropriate message to the user
      throw error; // Re-throw the error for further handling if needed
    }
  }
