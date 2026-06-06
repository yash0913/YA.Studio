import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WhatsApp AI Receptionist for Salons | Artisan AI",
  description: "Automate your salon bookings 24/7. Never miss a client inquiry, check availability, collect details, and secure appointments directly on WhatsApp.",
};

export default function SalonReceptionistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
