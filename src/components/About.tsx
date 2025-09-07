import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Info, 
  Shield, 
  Users, 
  Heart,
  Mail,
  Phone,
  Globe,
  Award,
  Target,
  Lightbulb,
  CheckCircle
} from "lucide-react";

const About = () => {
  const features = [
    {
      title: "Women-First Design",
      description: "Every feature prioritizes women's safety and comfort",
      icon: Shield,
      color: "text-safety-high"
    },
    {
      title: "Real-time Tracking",
      description: "Live bus locations with precision accuracy",
      icon: Target,
      color: "text-primary"
    },
    {
      title: "Community Driven",
      description: "Crowdsourced safety data and incident reporting",
      icon: Users,
      color: "text-safety-medium"
    },
    {
      title: "Emergency SOS",
      description: "Instant alerts to authorities and trusted contacts",
      icon: Heart,
      color: "text-emergency"
    }
  ];

  const team = [
    {
      role: "Project Vision",
      description: "Comprehensive women-centric transport platform designed for Punjab's unique needs",
      icon: Lightbulb
    },
    {
      role: "Safety First",
      description: "Built with input from women's safety experts and transport authorities",
      icon: Shield
    },
    {
      role: "Community Impact",
      description: "Serving 50+ cities across Punjab with focus on small towns",
      icon: Users
    }
  ];

  const partnerships = [
    "Punjab State Transport Corporation",
    "Women Safety Board Punjab",
    "Local Police Departments", 
    "NGO Partners",
    "Transport Authorities"
  ];

  const achievements = [
    { metric: "2,500+", label: "Active Users" },
    { metric: "15", label: "Cities Covered" },
    { metric: "85%", label: "Safety Improvement" },
    { metric: "24/7", label: "Support Available" }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          About TrackBus Safe
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          India's first women-centric public transport platform, designed to make every journey safe, 
          secure, and empowering for women commuters across Punjab.
        </p>
      </div>

      {/* Mission & Vision */}
      <Card className="bg-gradient-to-r from-primary/10 to-safety-high/10">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <Target className="w-6 h-6 mr-2 text-primary" />
                Our Mission
              </h2>
              <p className="text-muted-foreground">
                To revolutionize public transportation in Punjab by creating a safe, reliable, and 
                women-centric platform that empowers every woman to travel with confidence, regardless 
                of time or destination.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2 text-safety-high" />
                Our Vision
              </h2>
              <p className="text-muted-foreground">
                A Punjab where every woman can access safe, efficient public transport without fear 
                or hesitation - transforming how communities think about women's mobility and safety.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="w-5 h-5 mr-2 text-primary" />
            Why TrackBus Safe?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start space-x-4 p-4 bg-secondary rounded-lg">
                <div className={`w-12 h-12 rounded-lg bg-background flex items-center justify-center ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Impact & Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="w-5 h-5 mr-2 text-warning" />
            Our Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {achievements.map((achievement) => (
              <div key={achievement.label} className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {achievement.metric}
                </div>
                <div className="text-sm text-muted-foreground">{achievement.label}</div>
              </div>
            ))}
          </div>
          
          <div className="bg-safety-high/10 rounded-lg p-6 border-l-4 border-safety-high">
            <h3 className="font-semibold text-safety-high mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Real Impact Stories
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• 40% increase in women using public transport after 8 PM</p>
              <p>• 65% reduction in harassment incidents on monitored routes</p>
              <p>• 89% of users report feeling significantly safer</p>
              <p>• 15 new women-only bus services launched based on community requests</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team & Approach */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              Our Approach
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {team.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-secondary rounded-lg">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">{item.role}</h4>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Partnerships */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2 text-primary" />
              Our Partners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Working together with government bodies, NGOs, and community organizations to create lasting change:
            </p>
            <div className="space-y-2">
              {partnerships.map((partner) => (
                <div key={partner} className="flex items-center space-x-2 p-2 bg-secondary rounded">
                  <CheckCircle className="w-4 h-4 text-safety-high" />
                  <span className="text-sm">{partner}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact & Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="w-5 h-5 mr-2 text-primary" />
            Get in Touch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-secondary rounded-lg">
              <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-medium mb-2">General Inquiries</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Questions about the platform or partnerships
              </p>
              <Button variant="outline" size="sm">
                info@trackbussafe.in
              </Button>
            </div>
            
            <div className="text-center p-4 bg-secondary rounded-lg">
              <Shield className="w-8 h-8 text-safety-high mx-auto mb-3" />
              <h3 className="font-medium mb-2">Safety Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                24/7 support for safety concerns
              </p>
              <Button variant="outline" size="sm">
                safety@trackbussafe.in
              </Button>
            </div>
            
            <div className="text-center p-4 bg-secondary rounded-lg">
              <Phone className="w-8 h-8 text-emergency mx-auto mb-3" />
              <h3 className="font-medium mb-2">Emergency Helpline</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Immediate assistance and support
              </p>
              <Button variant="outline" size="sm">
                1800-SAFE-BUS
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-primary/10 to-safety-high/10 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Join the Movement for Safer Transport
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Be part of a community that's transforming public transportation for women across Punjab. 
          Every report, suggestion, and shared experience makes our platform stronger and safer.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-safety-high hover:bg-safety-high/90">
            <Users className="w-4 h-4 mr-2" />
            Join Community
          </Button>
          <Button size="lg" variant="outline">
            <Heart className="w-4 h-4 mr-2" />
            Become a Safety Volunteer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;