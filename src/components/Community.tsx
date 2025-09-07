import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Star, 
  MessageCircle, 
  Shield, 
  Heart,
  TrendingUp,
  Award,
  MapPin
} from "lucide-react";

const Community = () => {
  const topContributors = [
    { name: "Priya S.", contributions: 45, badge: "Safety Champion", rating: 4.9, location: "Chandigarh" },
    { name: "Anjali K.", contributions: 38, badge: "Route Expert", rating: 4.8, location: "Mohali" },
    { name: "Ritu M.", contributions: 32, badge: "Community Helper", rating: 4.7, location: "Panchkula" },
    { name: "Sunita R.", contributions: 28, badge: "Safety Advocate", rating: 4.6, location: "Chandigarh" }
  ];

  const recentDiscussions = [
    {
      id: 1,
      title: "New women-only bus service on Route 45",
      author: "SafeTraveler",
      replies: 12,
      time: "2 hours ago",
      category: "Updates",
      helpful: 8,
      location: "Sector 17"
    },
    {
      id: 2,
      title: "Safety tips for late night commuters",
      author: "CommunityMod",
      replies: 24,
      time: "5 hours ago",
      category: "Safety Tips",
      helpful: 15,
      location: "General"
    },
    {
      id: 3,
      title: "Bus stop lighting improved after community reports",
      author: "LocalActivist",
      replies: 18,
      time: "1 day ago",
      category: "Success Story",
      helpful: 22,
      location: "Sector 22"
    }
  ];

  const safetyAlerts = [
    {
      type: "positive",
      message: "Route 23B safety score improved to 4.8/5 thanks to community feedback",
      time: "3 hours ago"
    },
    {
      type: "warning", 
      message: "Avoid Bus Stop 45C after 9 PM - poor lighting reported by community",
      time: "6 hours ago"
    },
    {
      type: "info",
      message: "Community patrol volunteers needed for weekend evening shifts",
      time: "1 day ago"
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Safety Tips": return "bg-safety-high text-safety-high-foreground";
      case "Updates": return "bg-primary text-primary-foreground";
      case "Success Story": return "bg-safety-medium text-safety-medium-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "positive": return "bg-safety-high/10 border-safety-high text-safety-high";
      case "warning": return "bg-warning/10 border-warning text-warning";
      case "info": return "bg-primary/10 border-primary text-primary";
      default: return "bg-muted/10 border-muted text-muted-foreground";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Community Hub
        </h1>
        <p className="text-muted-foreground">
          Connect with fellow commuters and share safety insights
        </p>
      </div>

      {/* Community Stats */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">1,247</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-safety-high">892</div>
              <div className="text-sm text-muted-foreground">Safety Reports</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-warning">156</div>
              <div className="text-sm text-muted-foreground">Routes Improved</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-safety-medium">98%</div>
              <div className="text-sm text-muted-foreground">Positive Impact</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Discussions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                Recent Discussions
              </div>
              <Button variant="outline" size="sm">New Post</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDiscussions.map((discussion) => (
              <div key={discussion.id} className="p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1">{discussion.title}</h3>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <span>by {discussion.author}</span>
                      <span>{discussion.time}</span>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {discussion.location}
                      </div>
                    </div>
                  </div>
                  <Badge className={getCategoryColor(discussion.category)}>
                    {discussion.category}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      {discussion.replies} replies
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-3 h-3 mr-1 text-emergency" />
                      {discussion.helpful} helpful
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Join Discussion</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Contributors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-warning" />
                Safety Champions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topContributors.map((contributor, index) => (
                <div key={contributor.name} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {getInitials(contributor.name)}
                      </AvatarFallback>
                    </Avatar>
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-warning rounded-full flex items-center justify-center">
                        <Award className="w-2 h-2 text-warning-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{contributor.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {contributor.location}
                    </div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {contributor.badge}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-xs">
                      <Star className="w-3 h-3 mr-1 text-warning fill-current" />
                      {contributor.rating}
                    </div>
                    <div className="text-xs text-muted-foreground">{contributor.contributions} posts</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Community Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-safety-high" />
                Community Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {safetyAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}
                >
                  <p className="text-sm font-medium mb-1">{alert.message}</p>
                  <p className="text-xs opacity-70">{alert.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Join Women-Only Groups */}
          <Card className="bg-gradient-to-br from-safety-high/10 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center text-safety-high">
                <Users className="w-5 h-5 mr-2" />
                Women-Only Groups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Connect with other women commuters in secure, private discussion groups
              </p>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Join Safety Circle
                </Button>
                <Button className="w-full" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Night Commuter Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;