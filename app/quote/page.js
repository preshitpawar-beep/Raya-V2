export default function Quote() {
  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Get a Quote</h1>
      <form className="space-y-4">
        <input className="w-full p-3 border rounded" placeholder="Name" />
        <input className="w-full p-3 border rounded" placeholder="Email" />
        <input className="w-full p-3 border rounded" placeholder="Company" />
        <textarea className="w-full p-3 border rounded" placeholder="Message"></textarea>
        <button className="bg-primary px-6 py-3 rounded font-semibold">
          Submit
        </button>
      </form>
    </main>
  );
}