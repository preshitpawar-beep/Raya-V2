export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-16 p-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg">Raya</h3>
          <p className="text-sm mt-2">
            Custom branded promotional products for UK businesses.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/quote">Get a Quote</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm">sales@raya.co.uk</p>
          <p className="text-sm">United Kingdom</p>
        </div>
      </div>
      <p className="text-center text-xs mt-8">© 2025 Raya. All rights reserved.</p>
    </footer>
  );
}