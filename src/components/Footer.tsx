export default function Footer() {
  return (
    <footer className="w-full text-center py-4">
      <p className="text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} TravelApp. All rights reserved.
      </p>
    </footer>
  );
}
