"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Image from 'next/image';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  function onSubmit(data: ContactFormValues) {
    console.log("Contact form data (mock):", data);
    // Mock submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
      variant: "default",
    });
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">Get In Touch</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We're here to help! Whether you have a question about our products, an order, or just want to chat about sports, feel free to reach out.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8 bg-card p-8 rounded-xl shadow-xl border">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h2>
          
          <div className="flex items-start gap-4">
            <MapPin className="h-8 w-8 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">Our Address</h3>
              <p className="text-muted-foreground">123 Sports Avenue, Suite 100<br />Anytown, USA 12345</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="h-8 w-8 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">Email Us</h3>
              <a href="mailto:support@kwikshop.com" className="text-muted-foreground hover:text-primary transition-colors">support@kwikshop.com</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="h-8 w-8 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">Call Us</h3>
              <a href="tel:+18001234567" className="text-muted-foreground hover:text-primary transition-colors">+1 (800) 123-4567</a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
            <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-sm text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-sm text-muted-foreground">Sunday: Closed</p>
          </div>
        </div>

        <div className="bg-card p-6 sm:p-8 rounded-xl shadow-xl border">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Send Us a Message</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="Your Name" {...field} className="py-3"/></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl><Input type="email" placeholder="you@example.com" {...field} className="py-3"/></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl><Input placeholder="Question about an order" {...field} className="py-3"/></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl><Textarea placeholder="Your message here..." {...field} className="min-h-[120px] py-3"/></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-colors py-3 text-base">
                <Send className="mr-2 h-5 w-5"/> Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>
       <div className="mt-16">
            <div className="relative aspect-[16/5] rounded-lg shadow-xl overflow-hidden">
                 <Image 
                    src="https://placehold.co/1200x375.png" 
                    alt="Map showing KwikShop Sports location" 
                    layout="fill" 
                    objectFit="cover"
                    data-ai-hint="city map location"
                />
            </div>
        </div>
    </div>
  );
}
