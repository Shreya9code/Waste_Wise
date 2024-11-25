import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Leaf, MapPin, Calendar, Target, Users, ChevronRight } from 'lucide-react'

export default function WasteManagementLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="w-1/2 h-full relative">
              <Image
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80"
                alt="Green leaf"
                fill
                style={{ objectFit: 'cover' }}
                className="brightness-75"
              />
            </div>
            <div className="w-1/2 h-full relative">
              <Image
                src="https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=1920&q=80"
                alt="Garbage pile"
                fill
                style={{ objectFit: 'cover' }}
                className="brightness-50"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-gray-900/70 z-10"></div>
          <div className="relative z-20 text-center px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Manage Waste, Live Sustainably</h1>
            <p className="text-xl mb-8 drop-shadow-md">Join the movement towards a cleaner, greener future</p>
            <Link
              href="/auth"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300"
            >
              Get Started
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="py-16 bg-green-100 bg-opacity-50 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=1920&q=80"
              alt="Recycling symbols"
              fill
              style={{ objectFit: 'cover' }}
              className="opacity-10"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              {[
                { icon: Leaf, title: 'Waste Logging', description: 'Track and manage your waste output', link: '/waste-tracking' },
                { icon: MapPin, title: 'Recycling Map', description: 'Find nearby recycling centers' },
                { icon: Calendar, title: 'Pickup Scheduling', description: 'Schedule waste pickups easily' },
                { icon: Target, title: 'Eco-Goals & Progress', description: 'Set and track your sustainability goals' },
                { icon: Users, title: 'Community Challenges', description: 'Participate in eco-friendly challenges' },
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300 w-full max-w-sm">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-green-500" />
                  <h3 className="text-xl font-semibold mb-2 text-green-800">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  {feature.link && (
                    <Link href={feature.link} className="text-green-500 hover:underline inline-flex items-center">
                      Try it now <ChevronRight className="ml-1 w-4 h-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learn & Take Action Section */}
        <section id="learn" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4 text-green-800">Learn & Take Action</h2>
            <p className="text-center text-gray-600 mb-12">
              Discover tips, videos, and insights on waste reduction, sustainable living, and regulations.
            </p>

            {/* Articles */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-green-700">Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: '10 Simple Ways to Reduce Plastic Waste at Home', preview: 'Learn easy steps to minimize your plastic footprint...', image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80' },
                  { title: 'How to Compost: A Beginner\'s Guide', preview: 'Start your composting journey with these simple tips...', image: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?auto=format&fit=crop&w=800&q=80' },
                  { title: 'Understanding Local Waste Disposal Rules', preview: 'Navigate your area\'s waste management regulations...', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80' },
                ].map((article, index) => (
                  <div key={index} className="bg-green-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={400}
                      height={200}
                      style={{ objectFit: 'cover' }}
                      className="w-full h-48"
                    />
                    <div className="p-6">
                      <h4 className="text-xl font-semibold mb-2 text-green-800">{article.title}</h4>
                      <p className="text-gray-600 mb-4">{article.preview}</p>
                      <Link href="#" className="text-green-500 hover:underline inline-flex items-center">
                        Read more <ChevronRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Videos */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-green-700">Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Recycling 101', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                  { title: 'How to Compost Your Kitchen Waste', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                  { title: 'Sustainable Living Tips', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                ].map((video, index) => (
                  <div key={index} className="bg-green-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        className="w-full h-full"
                        src={video.src}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-4">
                      <h4 className="text-xl font-semibold text-green-800">{video.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips & Infographics */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-green-700">Tips & Infographics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-xl font-semibold mb-4 text-green-800">Quick Tips</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Use reusable bags instead of plastic</li>
                    <li>Try a waste-free week challenge</li>
                    <li>Opt for products with minimal packaging</li>
                    <li>Start composting your food scraps</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-xl font-semibold mb-4 text-green-800">Waste Reduction Infographic</h4>
                  <Image
                    src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"
                    alt="Waste Reduction Infographic"
                    width={500}
                    height={300}
                    style={{ objectFit: 'cover' }}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Local Regulations */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-green-700">Local Regulations</h3>
              <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <h4 className="text-xl font-semibold mb-4 text-green-800">Common Questions</h4>
                <div className="space-y-4">
                  {[
                    { question: 'What can I recycle?', answer: 'Check with your local recycling center for a list of accepted materials. Generally, items like paper, cardboard, glass bottles, aluminum cans, and certain plastics are recyclable.' },
                    { question: 'How to dispose of e-waste?', answer: 'E-waste should be taken to designated collection points or recycling centers that specialize in electronic waste. Many electronics retailers also offer e-waste recycling programs.' },
                  ].map((item, index) => (
                    <details key={index} className="border-b border-green-200 pb-2">
                      <summary className="font-medium cursor-pointer text-green-700 hover:text-green-600">{item.question}</summary>
                      <p className="mt-2 text-gray-600">{item.answer}</p>
                    </details>
                  ))}
                </div>
                <Link href="#" className="mt-4 text-green-500 hover:underline inline-flex items-center">
                  View full regulations <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}