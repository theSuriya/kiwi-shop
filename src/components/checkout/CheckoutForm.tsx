"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, User, Home, Phone, ShieldCheck } from "lucide-react";
import { useState } from "react";

const checkoutFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format." }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry date must be MM/YY format." }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits." }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

interface CheckoutFormProps {
  productId?: string; // Optional: if checking out a specific product
}

export default function CheckoutForm({ productId }: CheckoutFormProps) {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      address: "",
      phoneNumber: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  function onSubmit(data: CheckoutFormValues) {
    console.log("Checkout data (mock):", data, "Product ID:", productId);
    // This is a mock submission. In a real app, you'd send this to a backend.
    setIsSubmitted(true);
    toast({
      title: "Order Submitted!",
      description: "Thank you for your purchase. Your order is being processed.",
      variant: "default",
      duration: 5000,
    });
    form.reset(); 
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 bg-card p-8 rounded-lg shadow-xl">
        <ShieldCheck className="mx-auto h-16 w-16 text-green-500 mb-6" />
        <h2 className="text-3xl font-bold text-primary mb-4">Thank You for Your Order!</h2>
        <p className="text-muted-foreground mb-6">
          Your order has been successfully submitted. A confirmation email will be sent to you shortly.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">Place Another Order</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-card p-6 sm:p-8 rounded-xl shadow-2xl border">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary">Secure Checkout</h2>
        <p className="text-muted-foreground mt-1">Please fill in your details to complete the purchase.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><User className="mr-2 h-4 w-4 text-muted-foreground" />Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} className="py-3"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><Home className="mr-2 h-4 w-4 text-muted-foreground" />Shipping Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="123 Main St, Anytown, USA" {...field} className="min-h-[100px] py-3"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><Phone className="mr-2 h-4 w-4 text-muted-foreground" />Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1234567890" {...field} className="py-3"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="pt-4">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center"><CreditCard className="mr-2 h-5 w-5 text-primary" />Payment Details (Mock)</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="0000 0000 0000 0000" {...field} className="py-3"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} className="py-3"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} className="py-3"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full mt-8 bg-accent text-accent-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors py-3 text-base">
            Complete Purchase
          </Button>
        </form>
      </Form>
    </div>
  );
}
