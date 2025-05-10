"use client"

import { useState, useEffect, useRef, FormEvent } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Smile, Paperclip, Search, Users, Circle, Phone, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  getDoc,
  setDoc
} from "firebase/firestore"
import { firestore, auth } from "@/lib/firebase"
import { User, onAuthStateChanged } from "firebase/auth"

interface Message {
  id: string;
  sender: string;
  senderId: string;
  content: string;
  timestamp: any;
  isCurrentUser: boolean;
}

interface Chat {
  id: string;
  name: string;
  type: 'group' | 'direct';
  lastMessage?: string;
  time?: string;
  unread?: number;
  members?: number;
  online: boolean;
}

type MessagesType = {
  [key: string]: Message[];
};

export default function ChatPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<MessagesType>({});
  const [activeTab, setActiveTab] = useState("chats");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeChat, setActiveChat] = useState("eco-warriors");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setError(null);
    }, (authError) => {
      setError("Authentication error. Please sign in.");
      console.error("Auth error:", authError);
    });
    return () => unsubscribe();
  }, []);

  // Initialize Firebase listeners when activeChat changes
  useEffect(() => {
    if (!activeChat || !currentUser) return;

    const handleError = (error: any) => {
      if (error.code === 'permission-denied') {
        setError("You don't have permission to access this chat.");
      } else {
        setError("Error loading messages. Please try again.");
      }
      console.error("Firestore error:", error);
    };

    const q = query(
      collection(firestore, "chats", activeChat, "messages"),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const chatMessages = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            sender: data.senderName,
            senderId: data.senderId,
            content: data.content,
            timestamp: data.timestamp?.toDate(),
            isCurrentUser: data.senderId === currentUser?.uid
          };
        });

        setMessages((prev) => ({
          ...prev,
          [activeChat]: chatMessages
        }));

        setIsLoading(false);
        setError(null);
      },
      handleError
    );

    return () => unsubscribe();
  }, [activeChat, currentUser]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || !activeChat || !currentUser) return;

    try {
      // Check if chat exists
      const chatRef = doc(firestore, "chats", activeChat);
      const chatSnap = await getDoc(chatRef);

      if (!chatSnap.exists()) {
        // Create the chat document if it doesn't exist
        await setDoc(chatRef, {
          createdAt: serverTimestamp(),
          members: [currentUser.uid],
          type: activeChat.includes('-') ? 'group' : 'direct'
        });
      }

      // Add the message
      await addDoc(collection(firestore, "chats", activeChat, "messages"), {
        senderId: currentUser.uid,
        senderName: currentUser.displayName || "Anonymous",
        content: message,
        timestamp: serverTimestamp()
      });
      
      setMessage("");
      setError(null);
    } catch (error: any) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    }
  };

  // Format time for display
  const formatTime = (date: Date) => {
    if (!date) return "Just now";
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Mock data for chats with Indian names
  const chats = [
    {
      id: "eco-warriors",
      name: "Eco Warriors",
      type: "group",
      lastMessage: "Let's organize a beach cleanup this weekend!",
      time: "10:42 AM",
      unread: 3,
      members: 28,
      online: true,
    },
    {
      id: "zero-waste",
      name: "Zero Waste Living",
      type: "group",
      lastMessage: "Has anyone tried making their own cleaning products?",
      time: "Yesterday",
      unread: 0,
      members: 45,
      online: true,
    },
    {
      id: "priya-sharma",
      name: "Priya Sharma",
      type: "direct",
      lastMessage: "Thanks for the sustainability tips!",
      time: "Yesterday",
      unread: 0,
      online: true,
    },
    {
      id: "rahul-patel",
      name: "Rahul Patel",
      type: "direct",
      lastMessage: "I'll bring reusable bags to the community garden event.",
      time: "Monday",
      unread: 0,
      online: false,
    },
    {
      id: "ananya-gupta",
      name: "Ananya Gupta",
      type: "direct",
      lastMessage: "How did you reduce your carbon footprint so much?",
      time: "Apr 15",
      unread: 0,
      online: true,
    },
  ];

  // Mock data for contacts with Indian names
  const contacts = [
    {
      id: "priya-sharma",
      name: "Priya Sharma",
      status: "Reducing my plastic waste one day at a time",
      online: true,
    },
    {
      id: "rahul-patel",
      name: "Rahul Patel",
      status: "Community garden organizer",
      online: false,
    },
    {
      id: "ananya-gupta",
      name: "Ananya Gupta",
      status: "Passionate about renewable energy",
      online: true,
    },
    {
      id: "vikram-singh",
      name: "Vikram Singh",
      status: "Sustainable transportation advocate",
      online: true,
    },
    {
      id: "neha-reddy",
      name: "Neha Reddy",
      status: "Zero waste enthusiast",
      online: false,
    },
    {
      id: "arjun-kumar",
      name: "Arjun Kumar",
      status: "Climate activist",
      online: false,
    },
    {
      id: "meera-nair",
      name: "Meera Nair",
      status: "Vegan chef and blogger",
      online: true,
    },
  ];

  const getActiveChat = () => {
    return chats.find((chat) => chat.id === activeChat);
  };

  const getContact = (id: string) => {
    return contacts.find((contact) => contact.id === id) || {};
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 flex flex-col bg-gray-50">
        <div className="container px-4 md:px-6 py-6 flex-1 flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/dashboard" passHref legacyBehavior>
                <Button variant="ghost" size="icon" className="mr-2">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back to Dashboard</span>
                </Button>
              </Link>
              <h1 className="text-2xl font-bold tracking-tight">Community Chat</h1>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
              {!currentUser && (
                <Button 
                  variant="link" 
                  className="text-red-700 underline pl-2"
                  onClick={() => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())}
                >
                  Sign In
                </Button>
              )}
            </div>
          )}

          <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-[500px]">
            {/* Left sidebar */}
            <div className="w-full md:w-80 flex flex-col bg-white rounded-lg border shadow-sm">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    type="search" 
                    placeholder="Search conversations..." 
                    className="pl-8"
                    aria-label="Search conversations"
                  />
                </div>
              </div>

              <Tabs
                defaultValue="chats"
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex-1 flex flex-col"
              >
                <TabsList className="grid grid-cols-2 mx-4 mt-2">
                  <TabsTrigger value="chats">Chats</TabsTrigger>
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                </TabsList>

                <TabsContent value="chats" className="flex-1 p-0">
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="p-4 space-y-2">
                      {isLoading ? (
                        Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-2">
                              <Skeleton className="h-12 w-12 rounded-full" />
                              <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-full" />
                              </div>
                            </div>
                          ))
                      ) : (
                        chats.map((chat) => (
                          <button
                            key={chat.id}
                            className={`flex items-start gap-3 p-2 w-full text-left rounded-lg transition-colors ${
                              activeChat === chat.id ? "bg-emerald-50 hover:bg-emerald-100" : "hover:bg-gray-100"
                            }`}
                            onClick={() => setActiveChat(chat.id)}
                            aria-label={`Open chat with ${chat.name}`}
                          >
                            <div className="relative">
                              {chat.type === "group" ? (
                                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                  <Users className="h-6 w-6" />
                                </div>
                              ) : (
                                <Avatar>
                                  <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              )}
                              {chat.online && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-baseline">
                                <span className="font-medium truncate">{chat.name}</span>
                                <span className="text-xs text-gray-500">{chat.time}</span>
                              </div>
                              <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                              {chat.type === "group" && (
                                <div className="flex items-center mt-1">
                                  <Users className="h-3 w-3 text-gray-400 mr-1" />
                                  <span className="text-xs text-gray-400">{chat.members} members</span>
                                </div>
                              )}
                            </div>
                            {chat.unread > 0 && (
                              <Badge className="bg-emerald-500 hover:bg-emerald-600 ml-auto">
                                {chat.unread}
                              </Badge>
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="contacts" className="flex-1 p-0">
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="p-4 space-y-2">
                      {isLoading ? (
                        Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-2">
                              <Skeleton className="h-12 w-12 rounded-full" />
                              <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-full" />
                              </div>
                            </div>
                          ))
                      ) : (
                        contacts.map((contact) => (
                          <button
                            key={contact.id}
                            className={`flex items-start gap-3 p-2 w-full text-left rounded-lg transition-colors ${
                              activeChat === contact.id ? "bg-emerald-50 hover:bg-emerald-100" : "hover:bg-gray-100"
                            }`}
                            onClick={() => setActiveChat(contact.id)}
                            aria-label={`Open chat with ${contact.name}`}
                          >
                            <div className="relative">
                              <Avatar>
                                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              {contact.online && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-baseline">
                                <span className="font-medium truncate">{contact.name}</span>
                                <span className="text-xs text-gray-500">
                                  {contact.online ? "Online" : "Offline"}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 truncate">{contact.status}</p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col bg-white rounded-lg border shadow-sm overflow-hidden">
              {activeChat ? (
                <>
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getActiveChat()?.type === "group" ? (
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                          <Users className="h-5 w-5" />
                        </div>
                      ) : (
                        <Avatar>
                          <AvatarFallback>{getActiveChat()?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <h2 className="font-medium">{getActiveChat()?.name}</h2>
                        {getActiveChat()?.type === "group" ? (
                          <div className="flex items-center text-xs text-gray-500">
                            <Users className="h-3 w-3 mr-1" />
                            <span>{getActiveChat()?.members} members</span>
                            <Circle className="h-1 w-1 mx-1.5 text-gray-300" />
                            <span>{getActiveChat()?.online ? "Active now" : "Inactive"}</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-xs text-gray-500">
                            <span>{getActiveChat()?.online ? "Online" : "Offline"}</span>
                            {getActiveChat()?.online && (
                              <>
                                <Circle className="h-1 w-1 mx-1.5 text-gray-300" />
                                <span>Active now</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full" aria-label="Call">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full" aria-label="Video call">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full" aria-label="More options">
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
                          className="h-4 w-4"
                        >
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="19" cy="12" r="1"></circle>
                          <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {isLoading ? (
                        Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                              <div className="flex gap-3 max-w-[80%]">
                                {i % 2 === 0 && <Skeleton className="h-8 w-8 rounded-full shrink-0" />}
                                <div>
                                  <Skeleton className="h-3 w-24 mb-1" />
                                  <Skeleton className="h-16 w-64 rounded-lg" />
                                </div>
                              </div>
                            </div>
                          ))
                      ) : messages[activeChat] ? (
                        messages[activeChat].map((msg) => (
                          <div key={msg.id} className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}>
                            <div className="flex gap-3 max-w-[80%]">
                              {!msg.isCurrentUser && (
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                                </Avatar>
                              )}
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  {!msg.isCurrentUser && <span className="text-sm font-medium">{msg.sender}</span>}
                                  <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
                                </div>
                                <div
                                  className={`rounded-lg p-3 ${
                                    msg.isCurrentUser ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {msg.content}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-4">
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
                                className="h-8 w-8"
                              >
                                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                              </svg>
                            </div>
                            <h3 className="text-lg font-medium">Start a conversation</h3>
                            <p className="text-gray-500 mt-1">Send a message to connect with this person</p>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  <Separator />

                  <form onSubmit={handleSendMessage} className="p-4 flex gap-2">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full shrink-0"
                      aria-label="Attach file"
                    >
                      <Paperclip className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      aria-label="Type your message"
                      disabled={!currentUser}
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full shrink-0"
                      aria-label="Add emoji"
                    >
                      <Smile className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 rounded-full shrink-0"
                      size="icon"
                      disabled={message.trim() === "" || !currentUser}
                      aria-label="Send message"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-4">
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
                        className="h-8 w-8"
                      >
                        <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                        <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium">Select a conversation</h3>
                    <p className="text-gray-500 mt-1">Choose a chat from the list or start a new conversation</p>
                  </div>
                </div>
              )}
            </div>
          </div>
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