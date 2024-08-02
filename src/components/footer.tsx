import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti";
import emailjs from "@emailjs/browser";

export function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');

    const templateParams = {
      from_name: formData.name,
      subject: formData.subject,
      email: formData.email,
      message: formData.message,
    };

    try {
      const publicID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID!;
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;

      emailjs.init(publicID);
      const response = await emailjs.send(serviceID, templateID, templateParams);

      if (response.status === 200) {
        setStatus('Message sent successfully!');
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Failed to send message. Please try again later.');
    }
  };

  return (
    <footer className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Get in Touch</h2>
            <p className="text-neutral-600 text-base md:text-lg lg:text-xl">
              Have a question or want to work together? Fill out the form and we'll get back to you as soon as possible.
            </p>
          </div>
          <form className="space-y-4 md:space-y-6 lg:space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" type="text" placeholder="Enter the subject of the mail" value={formData.subject} onChange={handleChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter your message" className="min-h-[120px]" value={formData.message} onChange={handleChange} />
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Send Message
            </Button>
            {status && <p>{status}</p>}
            {success && <Confetti />}
          </form>
        </div>
      </div>
    </footer>
  );
}
