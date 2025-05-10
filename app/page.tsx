import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, ChevronRight, Leaf, Users, BarChart3, Globe, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-semibold">EcoConnect</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Features
            </Link>
            <Link href="#impact" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Impact
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block">
              <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                Log In
              </Button>
            </Link>
            <Link href="/sign">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white via-emerald-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-emerald-100 text-emerald-900">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-600 mr-1"></span>
                  Join 10,000+ eco-conscious individuals
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Make a Positive Impact on Our Planet
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Track your carbon footprint, connect with like-minded individuals, and discover actionable ways to
                    live more sustainably.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                      Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#learn-more">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="inline-block h-8 w-8 rounded-full border-2 border-white bg-emerald-100 overflow-hidden"
                      >
                        <Image
                          src={`/avatar.png?height=32&width=32&text=${i}`}
                          width={32}
                          height={32}
                          alt={`User ${i}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-gray-500">
                    <span className="font-medium text-gray-900">4.9/5</span> from over 1,200 reviews
                  </div>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 right-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 -left-20 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <Image
                    src="/img1.jpg?height=550&width=550&text=EcoConnect"
                    width={550}
                    height={550}
                    alt="EcoConnect Hero"
                    className="rounded-lg object-cover shadow-2xl"
                    priority
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 w-48">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Leaf className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Carbon Saved</div>
                        <div className="text-2xl font-bold">1.2M kg</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="impact" className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-emerald-100 text-emerald-900">
                  Our Impact
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Making a Difference Together
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who are already making a positive impact on our planet
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">10K+</div>
                <div className="text-sm text-gray-500">Active Users</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">1.2M</div>
                <div className="text-sm text-gray-500">kg CO₂ Saved</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">50K+</div>
                <div className="text-sm text-gray-500">Trees Planted</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">12+</div>
                <div className="text-sm text-gray-500">Active Community</div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-emerald-100 text-emerald-900">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Everything You Need</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive tools to help you understand and reduce your environmental impact
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold">Carbon Footprint Tracking</h3>
                    <p className="text-gray-500">
                      Calculate and monitor your carbon footprint with our comprehensive calculator. Get personalized
                      recommendations to reduce your impact.
                    </p>
                    <Link href="/login" className="text-emerald-600 font-medium inline-flex items-center">
                      Learn more <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Users className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold">Community Connection</h3>
                    <p className="text-gray-500">
                      Connect with like-minded individuals, join groups, and participate in events focused on
                      sustainability and environmental action.
                    </p>
                    <Link href="/login" className="text-emerald-600 font-medium inline-flex items-center">
                      Learn more <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold">Sustainability Tips</h3>
                    <p className="text-gray-500">
                      Access a curated database of actionable sustainability tips and guides to help you make
                      eco-friendly choices in your daily life.
                    </p>
                    <Link href="/login" className="text-emerald-600 font-medium inline-flex items-center">
                      Learn more <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Award className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold">Eco Challenges</h3>
                    <p className="text-gray-500">
                      Participate in weekly and monthly challenges designed to help you build sustainable habits and
                      reduce your environmental impact.
                    </p>
                    <Link href="/login" className="text-emerald-600 font-medium inline-flex items-center">
                      Learn more <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold">Impact Tracking</h3>
                    <p className="text-gray-500">
                      Visualize your environmental impact over time and see how your actions contribute to a healthier
                      planet with detailed analytics.
                    </p>
                    <Link href="/login" className="text-emerald-600 font-medium inline-flex items-center">
                      Learn more <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-emerald-600"
                      >
                        <path d="M12 2v8"></path>
                        <path d="m4.93 10.93 1.41 1.41"></path>
                        <path d="M2 18h2"></path>
                        <path d="M20 18h2"></path>
                        <path d="m19.07 10.93-1.41 1.41"></path>
                        <path d="M22 22H2"></path>
                        <path d="m8 22 4-10 4 10"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Resource Library</h3>
                    <p className="text-gray-500">
                      Access a comprehensive library of articles, guides, and resources to deepen your understanding of
                      environmental issues.
                    </p>
                    <Link href="/login" className="text-emerald-600 font-medium inline-flex items-center">
                      Learn more <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-emerald-100 text-emerald-900">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from people who have transformed their relationship with the environment
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 overflow-hidden">
                        <Image
                          src="/avatar.png?height=40&width=40&text=SJ"
                          width={40}
                          height={40}
                          alt="Aditya"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">Aditya</div>
                        <div className="text-sm text-gray-500"></div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 italic">
                      "EcoConnect has completely changed how I think about my environmental impact. The carbon
                      calculator was eye-opening, and the community support has been incredible."
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 overflow-hidden">
                        <Image
                          src="/avatar2.png?height=40&width=40&text=MC"
                          width={40}
                          height={40}
                          alt="Michael Chen"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">Vaibhav</div>
                        <div className="text-sm text-gray-500"> </div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 italic">
                      "I've reduced my carbon footprint by 40% since joining EcoConnect. The weekly challenges keep me
                      motivated, and I've connected with amazing people in my community."
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 overflow-hidden">
                        <Image
                          src="/avatar3.png?height=40&width=40&text=EW"
                          width={40}
                          height={40}
                          alt="Emma Wilson"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">Sanket</div>
                        <div className="text-sm text-gray-500"></div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 italic">
                      "The sustainability tips have been a game-changer for my family. We've implemented so many small
                      changes that have made a big difference. Thank you, EcoConnect!"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="mx-auto lg:mx-0 relative">
                <Image
                  src="/img3.jpg?height=400&width=400&text=About+Us"
                  width={400}
                  height={400}
                  alt="About EcoConnect"
                  className="rounded-lg object-cover shadow-xl"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-emerald-100 text-emerald-900">
                  Our Mission
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About EcoConnect</h2>
                  <p className="text-gray-500 md:text-xl/relaxed">
                    EcoConnect was founded with a simple mission: to make sustainable living accessible to everyone. We
                    believe that small changes, when made collectively, can have a significant impact on our planet.
                  </p>
                  <p className="text-gray-500 md:text-xl/relaxed">
                    Our platform provides tools and resources to help you understand your environmental impact and make
                    informed decisions about your lifestyle.
                  </p>
                </div>
                <div className="space-y-2">
                  
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                    <span className="text-gray-700">Partnered with leading environmental organizations</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                    <span className="text-gray-700">Committed to transparency and scientific accuracy</span>
                  </div>
                </div>
                <div>
                  <Link href="/dashboard">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Join Our Mission</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="partners" className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-emerald-100 text-emerald-900">
                  Our Partners
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Trusted by Organizations Worldwide</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We collaborate with leading environmental organizations and businesses
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center mt-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center justify-center">
                  <Image
                    src={`/new.jpg?height=60&width=120&text=Partner+${i}`}
                    width={120}
                    height={60}
                    alt={`Partner ${i}`}
                    className="h-12 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-emerald-100 text-emerald-900">
                  Stay Connected
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Newsletter</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed">
                  Get the latest sustainability tips, eco-challenges, and updates delivered to your inbox
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-md space-y-4 mt-8">
              <form className="flex flex-col sm:flex-row gap-2">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 sm:w-auto">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-center text-gray-500">
                By subscribing, you agree to our{" "}
                <Link href="#" className="underline underline-offset-2 hover:text-emerald-600">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="#" className="underline underline-offset-2 hover:text-emerald-600">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-emerald-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Make a Difference?</h2>
                <p className="max-w-[600px] text-emerald-50 md:text-xl/relaxed">
                  Join thousands of eco-conscious individuals on their sustainability journey
                </p>
              </div>
              <Link href="/login">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12 px-4 md:px-6">
          <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 md:w-1/3">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-emerald-600" />
              <span className="text-xl font-semibold">EcoConnect</span>
            </div>
            <p className="text-sm text-gray-500">
              Making sustainable living accessible to everyone. Join our community and start your journey toward a
              greener future.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="md:ml-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="grid gap-2">
              <h3 className="text-sm font-medium">Company</h3>
              <nav className="grid gap-2">
                <Link href="#about" className="text-sm text-gray-500 hover:text-emerald-600">
                  About
                </Link>
                <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600">
                  Careers
                </Link>
                <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600">
                  Press
                </Link>
                <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600">
                  Impact
                </Link>
              </nav>
            </div>
            
            <div className="grid gap-2">
              <h3 className="text-sm font-medium">Features</h3>
              <nav className="grid gap-2">
                <Link href="/login" className="text-sm text-gray-500 hover:text-emerald-600">
                  Carbon Calculator
                </Link>
                <Link href="/login" className="text-sm text-gray-500 hover:text-emerald-600">
                  Community
                </Link>
                <Link href="/login" className="text-sm text-gray-500 hover:text-emerald-600">
                  Sustainability Tips
                </Link>
                <Link href="/login" className="text-sm text-gray-500 hover:text-emerald-600">
                  Dashboard
                </Link>
              </nav>
            </div>
            <div className="grid gap-2">
              <h3 className="text-sm font-medium">Legal</h3>
              <nav className="grid gap-2">
                <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600">
                  Terms of Service
                </Link>
                <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600">
                  Cookie Policy
                </Link>
                <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600">
                  Data Processing
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} EcoConnect. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-xs text-gray-500 hover:text-emerald-600">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-emerald-600">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-emerald-600">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
