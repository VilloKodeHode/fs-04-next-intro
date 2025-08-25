// app/components/atom/NavItem.jsx
// This component renders a navigation button using Next.js Link for client-side navigation.
// Props:
//   text: The label to display on the button
//   href: The path to navigate to when clicked
import Link from "next/link";

export const NavItem = ({ text, href }) => {
  // Renders a styled button inside a Next.js Link for navigation
  return (
    <Link href={href}>
      <button className="px-4 py-2 cursor-pointer hover:scale:105 hover:bg-primary transition bg-slate-800 rounded-full">
        {text}
      </button>
    </Link>
  );
};
