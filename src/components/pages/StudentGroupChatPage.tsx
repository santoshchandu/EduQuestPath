import { useState } from "react";
import { Send, Paperclip, Smile, Search, Users, Phone, Video, MoreVertical } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

interface StudentGroupChatPageProps {
  user: any;
}

const chatGroups = [
  { id: 1, name: "Computer Science - Batch 2021", members: 45, unread: 3, lastMessage: "Tomorrow's assignment deadline", time: "2m ago" },
  { id: 2, name: "Data Structures Study Group", members: 12, unread: 0, lastMessage: "Let's meet at library", time: "1h ago" },
  { id: 3, name: "Project Team - Alpha", members: 5, unread: 1, lastMessage: "Code review completed", time: "3h ago" },
  { id: 4, name: "Semester 6 - General", members: 78, unread: 0, lastMessage: "Exam schedule updated", time: "5h ago" },
];

const initialMessages = [
  { id: 1, sender: "Priya Reddy", message: "Hey everyone! Did anyone complete the DSA assignment?", time: "10:30 AM", isCurrentUser: false },
  { id: 2, sender: "You", message: "Yes, I finished it yesterday. The binary tree implementation was tricky.", time: "10:32 AM", isCurrentUser: true },
  { id: 3, sender: "Rohan Kumar", message: "Can someone share the approach for the last question?", time: "10:35 AM", isCurrentUser: false },
  { id: 4, sender: "Sneha Patel", message: "I'm attaching my notes from yesterday's lecture", time: "10:40 AM", isCurrentUser: false },
  { id: 5, sender: "You", message: "Thanks Sneha! That's really helpful.", time: "10:42 AM", isCurrentUser: true },
  { id: 6, sender: "Arjun Verma", message: "Don't forget we have a project meeting tomorrow at 2 PM", time: "11:15 AM", isCurrentUser: false },
];

const onlineMembers = [
  { name: "Priya Reddy", avatar: "PR", status: "online" },
  { name: "Rohan Kumar", avatar: "RK", status: "online" },
  { name: "Sneha Patel", avatar: "SP", status: "away" },
  { name: "Arjun Verma", avatar: "AV", status: "online" },
  { name: "Kavya Iyer", avatar: "KI", status: "offline" },
];

export function StudentGroupChatPage({ user }: StudentGroupChatPageProps) {
  const [selectedGroup, setSelectedGroup] = useState(chatGroups[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMsg = {
        id: messages.length + 1,
        sender: "You",
        message: newMessage.trim(),
        time: currentTime,
        isCurrentUser: true
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-primary">Group Chat</h1>
            <p className="text-dark-secondary mt-2">Connect and collaborate with your classmates</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              {onlineMembers.filter(m => m.status === 'online').length} Online
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex">
        {/* Groups Sidebar */}
        <div className="w-80 bg-dark-card border-r border-dark-color flex flex-col">
          <div className="p-6 border-b border-dark-color">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-secondary w-4 h-4" />
              <Input
                placeholder="Search groups..."
                className="pl-10 bg-dark-bg border-dark-color text-dark-primary"
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {chatGroups.map((group) => (
                <div
                  key={group.id}
                  onClick={() => setSelectedGroup(group)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedGroup.id === group.id ? 'bg-dark-hover border border-dark-cta' : 'hover:bg-dark-hover'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-dark-primary text-sm">{group.name}</h4>
                        {group.unread > 0 && (
                          <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {group.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-dark-secondary mt-1">{group.lastMessage}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-dark-secondary">{group.members} members</span>
                        <span className="text-xs text-dark-secondary">{group.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-dark-card border-b border-dark-color p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark-primary">{selectedGroup.name}</h3>
                  <p className="text-sm text-dark-secondary">{selectedGroup.members} members</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" className="dark-button-secondary">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" className="dark-button-secondary">
                  <Video className="w-4 h-4" />
                </Button>
                <Button size="sm" className="dark-button-secondary">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${message.isCurrentUser ? 'order-2' : 'order-1'}`}>
                    {!message.isCurrentUser && (
                      <p className="text-xs text-dark-secondary mb-1">{message.sender}</p>
                    )}
                    <div
                      className={`p-3 rounded-lg ${
                        message.isCurrentUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-dark-hover text-dark-primary'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                    </div>
                    <p className="text-xs text-dark-secondary mt-1 text-right">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="bg-dark-card border-t border-dark-color p-4">
            <div className="flex items-center space-x-4">
              <Button size="sm" className="dark-button-secondary">
                <Paperclip className="w-4 h-4" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-dark-bg border-dark-color text-dark-primary pr-12"
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 dark-button-secondary"
                >
                  <Smile className="w-4 h-4" />
                </Button>
              </div>
              <Button onClick={handleSendMessage} className="dark-button-primary">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Members Sidebar */}
        <div className="w-60 bg-dark-card border-l border-dark-color">
          <div className="p-4 border-b border-dark-color">
            <h4 className="font-semibold text-dark-primary">Members ({selectedGroup.members})</h4>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {onlineMembers.map((member, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">{member.avatar}</span>
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-dark-card ${
                        member.status === 'online' ? 'bg-green-500' :
                        member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-dark-primary">{member.name}</p>
                    <p className="text-xs text-dark-secondary capitalize">{member.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </main>
    </>
  );
}