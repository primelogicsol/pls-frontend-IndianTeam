import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FixBlogNavigation } from "@/components/fix-blog-navigation"

export const metadata: Metadata = {
  title: "Blog | Custom Admin Dashboard",
  description: "Latest insights, news, and updates from our team",
}

// Mock blog data - in a real application, this would come from a database or CMS
const blogPosts = [
  {
    id: 1,
    title: "The Future of Content Management Systems",
    excerpt:
      "Exploring the latest trends and innovations in CMS technology and how they're shaping the digital landscape.",
    date: "April 2, 2025",
    author: "Jane Smith",
    category: "Technology",
    image: "/placeholder.svg?height=400&width=600",
    slug: "future-of-cms",
  },
  {
    id: 2,
    title: "Optimizing Your Website for Performance",
    excerpt:
      "Learn the best practices for improving your website's speed, responsiveness, and overall user experience.",
    date: "March 28, 2025",
    author: "John Doe",
    category: "Web Development",
    image: "/placeholder.svg?height=400&width=600",
    slug: "optimizing-website-performance",
  },
  {
    id: 3,
    title: "The Role of AI in Modern Web Applications",
    excerpt:
      "How artificial intelligence is transforming web development and creating new possibilities for user interaction.",
    date: "March 15, 2025",
    author: "Alex Johnson",
    category: "Artificial Intelligence",
    image: "/placeholder.svg?height=400&width=600",
    slug: "ai-in-web-applications",
  },
  {
    id: 4,
    title: "Building Accessible Websites: A Comprehensive Guide",
    excerpt: "Why accessibility matters and how to ensure your websites are usable by everyone, regardless of ability.",
    date: "March 10, 2025",
    author: "Sarah Williams",
    category: "Accessibility",
    image: "/placeholder.svg?height=400&width=600",
    slug: "building-accessible-websites",
  },
  {
    id: 5,
    title: "The Evolution of JavaScript Frameworks",
    excerpt:
      "A look at how JavaScript frameworks have evolved over time and what the future might hold for web development.",
    date: "February 28, 2025",
    author: "Michael Chen",
    category: "JavaScript",
    image: "/placeholder.svg?height=400&width=600",
    slug: "evolution-of-javascript-frameworks",
  },
  {
    id: 6,
    title: "Responsive Design Best Practices for 2025",
    excerpt:
      "Stay ahead of the curve with these responsive design techniques that ensure your website looks great on any device.",
    date: "February 15, 2025",
    author: "Emily Rodriguez",
    category: "Design",
    image: "/placeholder.svg?height=400&width=600",
    slug: "responsive-design-best-practices",
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Admin-only component to fix navigation */}
      <FixBlogNavigation />

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Blog</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Insights, news, and updates from our team of experts. Stay informed about the latest trends and best
          practices.
        </p>
      </div>

      {/* Featured Image */}
      <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Blog featured image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#003087] text-white-foreground px-3 py-1 rounded-full text-white text-sm font-medium mb-4">
              Featured
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Transforming Digital Experiences Through Innovation
            </h2>
            <p className="text-white/90 text-lg mb-6">
              Discover how our team is pushing the boundaries of what's possible in digital content management and web
              development.
            </p>
            <Button className="bg-[#FF6B35] text-white" variant="secondary" size="lg">
              Read More
            </Button>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-muted rounded-xl p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Welcome to Our Knowledge Hub</h2>
          <p className="text-muted-foreground mb-6">
            Our blog is dedicated to sharing valuable insights, industry trends, and expert advice to help you navigate
            the ever-evolving digital landscape. Whether you're a developer, designer, or business owner, you'll find
            content that inspires and informs.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-[#003087]">
            <Button variant="outline">Technology</Button>
            <Button variant="outline">Design</Button>
            <Button variant="outline">Development</Button>
            <Button variant="outline">Business</Button>
            <Button variant="outline">Tutorials</Button>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden flex flex-col h-full">
            <div className="relative h-48 w-full">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">{post.date}</span>
                <span className="text-xs bg-muted px-2 py-1 rounded-full">{post.category}</span>
              </div>
              <CardTitle className="line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-0">
              <div className="flex justify-between items-center w-full">
                <span className="text-sm font-medium">By {post.author}</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="bg-[#003087] text-primary-foreground rounded-xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6">
            Stay up to date with our latest articles, news, and insights. We'll deliver them straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md flex-1 text-foreground"
              aria-label="Email address"
            />
            <Button className="bg-[#FF6B35] text-white" variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
