export default function Footer() {
  return (
    <footer className="absolute w-full mt-16 border-t border-gray-200 py-5 text-center">
      <p className="text-gray-500">
        BMAPS by {" "}
        <a
          className="font-medium underline transition-colors"
          href="https://www.rebosolution.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ReBO Solutions
        </a>
      </p>
    </footer>
  );
}
