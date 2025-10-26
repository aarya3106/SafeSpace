import { communityPosts } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Community Forum</h1>
        <p className="text-muted-foreground">A place to talk, listen, and support each other. You are not alone.</p>
      </div>

      <div className="flex items-center justify-between gap-2">
          <Input placeholder="Search posts..." className="max-w-sm"/>
           <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Tags</SelectItem>
                    <SelectItem value="Anxiety">Anxiety</SelectItem>
                    <SelectItem value="Exams">Exams</SelectItem>
                    <SelectItem value="Sleep">Sleep</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                    <SelectItem value="Friends">Friends</SelectItem>
                </SelectContent>
            </Select>
          <Button>New Post</Button>
      </div>

      <div className="space-y-4">
        {communityPosts.map(post => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>by {post.author} • {post.timestamp}</CardDescription>
                  </div>
                  <Badge variant="outline">{post.tag}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.content}</p>
            </CardContent>
            <CardFooter className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" /> 
                    <span>15</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                    <MessageCircle className="h-4 w-4" /> 
                    <span>{post.replies} Replies</span>
                </Button>
                 <Button variant="ghost" size="sm" className="ml-auto">
                    View Post
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
