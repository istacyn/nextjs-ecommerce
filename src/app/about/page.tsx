import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Zuri - About us",
}

export default function About() {
  return (
    <article className="flex min-h-screen flex-col items-center">
      <section
        className="hero min-h-screen"
        style={{ backgroundImage: `url("/images/about-1.png")` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-[#5C3A1D]">
          <div className="max-w-md">
            <h1 className="mb-20 text-5xl font-bold">
              Zuri
            </h1>
            <h2>WHO WE ARE AND WHAT WE DO</h2>
          </div>
        </div>
      </section>

      <section className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src="/images/about-2.png"
            alt="About Image"
            width={400}
            height={800}
            className="w-full max-w-sm rounded-lg shadow-2xl"
          />
          <div className="text-[#808080]">
            <h3 className="text-5xl font-bold">Unveiling Elegance: Crafting Timeless Stories in Gold</h3>
            <p className="py-6">
            Welcome to a realm where brilliance meets sophistication, where each piece of gold jewelry tells a story of timeless elegance. We are not just purveyors of gold; we are curators of moments, creators of cherished memories. This is not merely about jewelry; it&apos;s about a statement, a reflection of the modern woman&apos;s extraordinary journey.
            </p>
          </div>
          <Image
            src="/images/about-3.png"
            alt="About Image"
            width={200}
            height={400}
            className="w-full max-w-sm rounded-lg shadow-2xl"
          />
        </div>
      </section>

      <section className="hero min-h-screen bg-secondary">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src="/images/about-4.png"
            alt="About Image"
            width={200}
            height={400}
            className="w-full max-w-sm rounded-lg shadow-2xl"
          />
          <div className="text-[#808080]">
            <h3 className="text-5xl font-bold">Elevate Every Moment</h3>
            <p className="py-6">
            At Zuri, our mission is clear: to bring unparalleled beauty into the lives of the modern woman. We aspire to elevate every moment, turning the ordinary into the extraordinary.<br /><br />Our journey began with a passion for turning precious metals into something more than just ornaments. It started with a dream to create pieces that transcend generations, narrating tales of love, resilience, and triumph. The heart of our business lies in the belief that every piece of jewelry should encapsulate not just beauty but also emotions.<br /><br />As you explore our collection, envision the stories waiting to be told through our meticulously crafted gold jewelry. Embrace the essence of timeless elegance and make each moment unforgettable. Your journey to extraordinary adornment begins here – <Link href="/shop" className=" text-red-600">Shop Now.</Link> Elevate your story with Zuri.
            </p>
          </div>
          <Image
            src="/images/about-5.png"
            alt="About Image"
            width={500}
            height={900}
            className="w-full max-w-sm rounded-lg shadow-2xl"
          />
        </div>
      </section>
    </article>
  )
}
