-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  full_name TEXT,
  phone_number TEXT,
  gender TEXT CHECK (gender IN ('female', 'male', 'other', 'prefer_not_to_say')),
  emergency_contacts JSONB DEFAULT '[]'::jsonb,
  preferred_language TEXT DEFAULT 'english',
  safety_preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create buses table
CREATE TABLE public.buses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bus_number TEXT UNIQUE NOT NULL,
  route_id UUID,
  capacity INTEGER DEFAULT 50,
  current_occupancy INTEGER DEFAULT 0,
  driver_name TEXT,
  driver_phone TEXT,
  is_women_only BOOLEAN DEFAULT false,
  has_cctv BOOLEAN DEFAULT false,
  gps_enabled BOOLEAN DEFAULT true,
  current_location POINT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT CHECK (status IN ('active', 'inactive', 'maintenance')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create routes table
CREATE TABLE public.routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_number TEXT UNIQUE NOT NULL,
  route_name TEXT NOT NULL,
  start_point TEXT NOT NULL,
  end_point TEXT NOT NULL,
  distance_km DECIMAL(10,2),
  estimated_duration_minutes INTEGER,
  fare DECIMAL(10,2),
  is_operational BOOLEAN DEFAULT true,
  safety_score DECIMAL(3,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create stops table
CREATE TABLE public.stops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stop_name TEXT NOT NULL,
  location POINT NOT NULL,
  address TEXT,
  has_shelter BOOLEAN DEFAULT false,
  has_lighting BOOLEAN DEFAULT false,
  has_cctv BOOLEAN DEFAULT false,
  safety_score DECIMAL(3,2) DEFAULT 0.0,
  crowd_density TEXT CHECK (crowd_density IN ('low', 'medium', 'high')) DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create route_stops junction table
CREATE TABLE public.route_stops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID REFERENCES public.routes(id) ON DELETE CASCADE,
  stop_id UUID REFERENCES public.stops(id) ON DELETE CASCADE,
  stop_order INTEGER NOT NULL,
  arrival_time TIME,
  departure_time TIME,
  UNIQUE(route_id, stop_order),
  UNIQUE(route_id, stop_id)
);

-- Create safety_reports table
CREATE TABLE public.safety_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  incident_type TEXT NOT NULL CHECK (incident_type IN ('harassment', 'overcrowding', 'poor_lighting', 'unsafe_driving', 'theft', 'other')),
  description TEXT,
  location POINT,
  stop_id UUID REFERENCES public.stops(id),
  bus_id UUID REFERENCES public.buses(id),
  route_id UUID REFERENCES public.routes(id),
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('reported', 'investigating', 'resolved', 'closed')) DEFAULT 'reported',
  is_anonymous BOOLEAN DEFAULT true,
  reported_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create stop_safety_ratings table
CREATE TABLE public.stop_safety_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stop_id UUID REFERENCES public.stops(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comments TEXT,
  time_of_day TEXT CHECK (time_of_day IN ('morning', 'afternoon', 'evening', 'night')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, stop_id)
);

-- Create community_posts table
CREATE TABLE public.community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT CHECK (category IN ('general', 'safety_tips', 'route_info', 'women_only', 'feedback')) DEFAULT 'general',
  is_women_only BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create post_votes table
CREATE TABLE public.post_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE,
  vote_type TEXT CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Create sos_alerts table
CREATE TABLE public.sos_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  location POINT NOT NULL,
  alert_type TEXT CHECK (alert_type IN ('panic', 'harassment', 'medical', 'theft')) DEFAULT 'panic',
  message TEXT,
  is_resolved BOOLEAN DEFAULT false,
  emergency_contacts_notified BOOLEAN DEFAULT false,
  police_notified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create route_plans table
CREATE TABLE public.route_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  start_location POINT NOT NULL,
  end_location POINT NOT NULL,
  preferred_routes UUID[] DEFAULT ARRAY[]::UUID[],
  safety_priority BOOLEAN DEFAULT true,
  saved_name TEXT,
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.route_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safety_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stop_safety_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sos_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.route_plans ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policies for buses (public read access)
CREATE POLICY "Anyone can view buses" 
ON public.buses FOR SELECT 
USING (true);

-- Create policies for routes (public read access)
CREATE POLICY "Anyone can view routes" 
ON public.routes FOR SELECT 
USING (true);

-- Create policies for stops (public read access)
CREATE POLICY "Anyone can view stops" 
ON public.stops FOR SELECT 
USING (true);

-- Create policies for route_stops (public read access)
CREATE POLICY "Anyone can view route stops" 
ON public.route_stops FOR SELECT 
USING (true);

-- Create policies for safety_reports
CREATE POLICY "Users can view safety reports" 
ON public.safety_reports FOR SELECT 
USING (true);

CREATE POLICY "Users can create safety reports" 
ON public.safety_reports FOR INSERT 
WITH CHECK (auth.uid() = reporter_id OR reporter_id IS NULL);

CREATE POLICY "Users can update their own reports" 
ON public.safety_reports FOR UPDATE 
USING (auth.uid() = reporter_id);

-- Create policies for stop_safety_ratings
CREATE POLICY "Anyone can view stop ratings" 
ON public.stop_safety_ratings FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own ratings" 
ON public.stop_safety_ratings FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings" 
ON public.stop_safety_ratings FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for community_posts
CREATE POLICY "Anyone can view public posts" 
ON public.community_posts FOR SELECT 
USING (NOT is_women_only OR auth.uid() IS NOT NULL);

CREATE POLICY "Users can create posts" 
ON public.community_posts FOR INSERT 
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts" 
ON public.community_posts FOR UPDATE 
USING (auth.uid() = author_id);

-- Create policies for post_votes
CREATE POLICY "Anyone can view votes" 
ON public.post_votes FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own votes" 
ON public.post_votes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes" 
ON public.post_votes FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for sos_alerts
CREATE POLICY "Users can view their own SOS alerts" 
ON public.sos_alerts FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own SOS alerts" 
ON public.sos_alerts FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own SOS alerts" 
ON public.sos_alerts FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for route_plans
CREATE POLICY "Users can view their own route plans" 
ON public.route_plans FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own route plans" 
ON public.route_plans FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own route plans" 
ON public.route_plans FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own route plans" 
ON public.route_plans FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to handle updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_buses_updated_at
  BEFORE UPDATE ON public.buses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_routes_updated_at
  BEFORE UPDATE ON public.routes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_stops_updated_at
  BEFORE UPDATE ON public.stops
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_safety_reports_updated_at
  BEFORE UPDATE ON public.safety_reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_community_posts_updated_at
  BEFORE UPDATE ON public.community_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_route_plans_updated_at
  BEFORE UPDATE ON public.route_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_buses_route_id ON public.buses(route_id);
CREATE INDEX idx_buses_location ON public.buses USING GIST(current_location);
CREATE INDEX idx_stops_location ON public.stops USING GIST(location);
CREATE INDEX idx_safety_reports_location ON public.safety_reports USING GIST(location);
CREATE INDEX idx_safety_reports_created_at ON public.safety_reports(created_at);
CREATE INDEX idx_community_posts_created_at ON public.community_posts(created_at);
CREATE INDEX idx_sos_alerts_created_at ON public.sos_alerts(created_at);
CREATE INDEX idx_route_stops_route_id ON public.route_stops(route_id);
CREATE INDEX idx_route_stops_stop_id ON public.route_stops(stop_id);