import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import Section from "@/components/Section";
import Image from "next/image";
import classNames from "classnames";
import Logo from '../../../public/logo.svg';
import Link from "next/link";
import Button from "@/components/Button";
import Next13ProgressBar from "next13-progressbar";
import Providers from "@/components/Providers";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digispot Shop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={classNames(montserrat.className, 'flex flex-col items-center')}>
        <Providers>
          <Section
            className="flex justify-between py-6"
          >
            <Link href="/">
              <Image
                src={Logo}
                alt="Digispot Shop"
                style={{
                  filter: "brightness(0)"
                }}
                className="h-10"
              />
            </Link>
            <Link
              href="/dashboard/new-product"
            >
              <Button>
                Create a product
              </Button>
            </Link>
          </Section>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
