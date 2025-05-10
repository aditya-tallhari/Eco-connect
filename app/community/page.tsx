"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, MessageSquare, ThumbsUp, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import DashboardHeader from "@/components/dashboard-header"
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  serverTimestamp, 
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore"
import { firestore, auth } from "@/lib/firebase"
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth"

interface CommunityPost {
  id: string;
  name: string;
  userId: string;
  time: Date;
  content: string;
  likes: string[];
  comments: Comment[];
}

interface Comment {
  id: string;
  userId: string;
  name: string;
  content: string;
  time: Date;
}

interface CommunityGroupProps {
  name: string;
  members: number;
  description: string;
}

interface CommunityEventProps {
  name: string;
  date: string;
  location: string;
  description: string;
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [newPostContent, setNewPostContent] = useState("")
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null)
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setError(null)
    }, (authError) => {
      setError("Authentication error. Please sign in.")
      console.error("Auth error:", authError)
    })

    const q = query(
      collection(firestore, "communityPosts"),
      orderBy("time", "desc")
    )

    const unsubscribePosts = onSnapshot(q, 
      (snapshot) => {
        const postsData = snapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            name: data.name,
            userId: data.userId,
            time: data.time?.toDate(),
            content: data.content,
            likes: data.likes || [],
            comments: data.comments || []
          }
        })
        setPosts(postsData)
        setLoadingPosts(false)
        setError(null)
      },
      (firestoreError) => {
        console.error("Firestore error:", firestoreError)
        setError("Error loading posts. Please try again.")
        setLoadingPosts(false)
      }
    )

    return () => {
      unsubscribeAuth()
      unsubscribePosts()
    }
  }, [])

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPostContent.trim()) {
      setError("Post content cannot be empty")
      return
    }
    if (!currentUser) {
      setError("You need to be signed in to post")
      return
    }

    try {
      await addDoc(collection(firestore, "communityPosts"), {
        name: currentUser.displayName || "Anonymous",
        userId: currentUser.uid,
        content: newPostContent,
        time: serverTimestamp(),
        likes: [],
        comments: []
      })
      setNewPostContent("")
      setError(null)
    } catch (error) {
      console.error("Error adding post:", error)
      setError("Failed to create post. Please try again.")
    }
  }

  const handleLike = async (postId: string) => {
    if (!currentUser) {
      setError("You need to be signed in to like posts")
      return
    }

    const postRef = doc(firestore, "communityPosts", postId)
    const post = posts.find(p => p.id === postId)

    if (!post) return

    try {
      if (post.likes.includes(currentUser.uid)) {
        await updateDoc(postRef, {
          likes: arrayRemove(currentUser.uid)
        })
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(currentUser.uid)
        })
      }
      setError(null)
    } catch (error) {
      console.error("Error updating like:", error)
      setError("Failed to update like. Please try again.")
    }
  }

  const formatTime = (date: Date) => {
    if (!date) return "Just now"
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 48) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  // Mock data for groups and events
  const groups = [
    {
      name: "Zero Waste India",
      members: 2145,
      description: "Learn how to go zero-waste in your home and community across India."
    },
    {
      name: "Urban Gardening Mumbai",
      members: 1342,
      description: "Organic gardening on balconies, terraces, and community spaces in Mumbai."
    }
  ]

  const events = [
    {
      name: "Yamuna River Cleanup",
      date: "May 15, 2025",
      location: "Delhi",
      description: "Join us to clean up the Yamuna riverbank and raise awareness about water pollution."
    },
    {
      name: "Eco-Friendly Living Workshop",
      date: "May 22, 2025",
      location: "Bangalore",
      description: "Practical workshop on composting, water conservation, and zero-waste living."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 py-6 bg-gray-50">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/dashboard" passHref>
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Community</h1>
            <p className="text-gray-500">Connect with like-minded eco warriors</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
              {/* {!currentUser && (
                // <Button 
                //   variant="link" 
                //   className="text-red-700 underline pl-2"
                //   onClick={() => auth.signInWithPopup(new auth.GoogleAuthProvider())}
                // >
                //   Sign In
                // </Button>
              )} */}
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Share Your Thoughts</CardTitle>
                  <CardDescription>Post an update to the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePostSubmit}>
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {currentUser?.displayName?.charAt(0) || <User className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-3">
                        <Textarea 
                          placeholder="What's on your mind?" 
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          disabled={!currentUser}
                        />
                        <div className="flex justify-end">
                          <Button 
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-700"
                            disabled={!newPostContent.trim() || !currentUser}
                          >
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {loadingPosts ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Card key={`skeleton-${i}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-[120px]" />
                            <Skeleton className="h-3 w-[80px]" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-3/5" />
                      </CardContent>
                      <CardFooter className="border-t pt-3 flex justify-between">
                        <Skeleton className="h-9 w-20" />
                        <Skeleton className="h-9 w-20" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <Card key={post.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback>{post.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{post.name}</CardTitle>
                            <CardDescription>{formatTime(post.time)}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">{post.content}</p>
                      </CardContent>
                      <CardFooter className="border-t pt-3 flex justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={post.likes.includes(currentUser?.uid || "") ? "text-emerald-600" : ""} 
                          onClick={() => handleLike(post.id)}
                          disabled={!currentUser}
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          {post.likes.length}
                        </Button>
                        <Button variant="ghost" size="sm" disabled={!currentUser}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {post.comments.length}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-6 text-center">
                    <p className="text-gray-500">No posts yet. Be the first to share!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="groups" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {groups.map((group, index) => (
                  <CommunityGroup
                    key={`group-${index}`}
                    name={group.name}
                    members={group.members}
                    description={group.description}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {events.map((event, index) => (
                  <CommunityEvent
                    key={`event-${index}`}
                    name={event.name}
                    date={event.date}
                    location={event.location}
                    description={event.description}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t bg-white py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500">© 2025 EcoConnect. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function CommunityGroup({ name, members, description }: CommunityGroupProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{members} members</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{description}</p>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">Join Group</Button>
      </CardFooter>
    </Card>
  )
}

function CommunityEvent({ name, date, location, description }: CommunityEventProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {date} • {location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{description}</p>
      </CardContent>
      <CardFooter className="border-t pt-4 flex gap-2">
        <Button className="bg-emerald-600 hover:bg-emerald-700 flex-1">RSVP</Button>
        <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
          More Info
        </Button>
      </CardFooter>
    </Card>
  )
}