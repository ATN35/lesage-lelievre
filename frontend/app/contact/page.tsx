import Map from "../components/MapBox";

export default function Contact() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Contact & Localisation</h1>
      <p className="text-center text-gray-600 mt-2">Nos chambres funéraires</p>

      <div className="mt-6">
        <Map />
      </div>
    </div>
  );
}
