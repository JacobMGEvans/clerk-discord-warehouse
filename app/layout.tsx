import "../styles/root.css";

const metas = {
  title: "Next.js with-xata",
  description: "Run Next.js with Xata with this awesome template",
  image:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/og.jpg"
      : "https://nextjs-with-xata.vercel.app/og.jpg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
