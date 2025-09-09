export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string
          booking_status: string | null
          bus_id: string | null
          created_at: string | null
          fare_amount: number
          id: string
          payment_status: string | null
          qr_code_data: string | null
          route_id: string | null
          seat_number: number | null
          travel_date: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          booking_date: string
          booking_status?: string | null
          bus_id?: string | null
          created_at?: string | null
          fare_amount: number
          id?: string
          payment_status?: string | null
          qr_code_data?: string | null
          route_id?: string | null
          seat_number?: number | null
          travel_date: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          booking_date?: string
          booking_status?: string | null
          bus_id?: string | null
          created_at?: string | null
          fare_amount?: number
          id?: string
          payment_status?: string | null
          qr_code_data?: string | null
          route_id?: string | null
          seat_number?: number | null
          travel_date?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_bus_id_fkey"
            columns: ["bus_id"]
            isOneToOne: false
            referencedRelation: "buses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
        ]
      }
      buses: {
        Row: {
          bus_number: string
          capacity: number | null
          created_at: string | null
          current_location: unknown | null
          current_occupancy: number | null
          driver_name: string | null
          driver_phone: string | null
          gps_enabled: boolean | null
          has_cctv: boolean | null
          id: string
          is_women_only: boolean | null
          last_updated: string | null
          route_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          bus_number: string
          capacity?: number | null
          created_at?: string | null
          current_location?: unknown | null
          current_occupancy?: number | null
          driver_name?: string | null
          driver_phone?: string | null
          gps_enabled?: boolean | null
          has_cctv?: boolean | null
          id?: string
          is_women_only?: boolean | null
          last_updated?: string | null
          route_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          bus_number?: string
          capacity?: number | null
          created_at?: string | null
          current_location?: unknown | null
          current_occupancy?: number | null
          driver_name?: string | null
          driver_phone?: string | null
          gps_enabled?: boolean | null
          has_cctv?: boolean | null
          id?: string
          is_women_only?: boolean | null
          last_updated?: string | null
          route_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          author_id: string | null
          category: string | null
          content: string
          created_at: string | null
          downvotes: number | null
          id: string
          is_pinned: boolean | null
          is_women_only: boolean | null
          tags: string[] | null
          title: string
          updated_at: string | null
          upvotes: number | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          downvotes?: number | null
          id?: string
          is_pinned?: boolean | null
          is_women_only?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          upvotes?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          downvotes?: number | null
          id?: string
          is_pinned?: boolean | null
          is_women_only?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          upvotes?: number | null
        }
        Relationships: []
      }
      post_votes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string | null
          user_id: string | null
          vote_type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
          vote_type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
          vote_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          emergency_contacts: Json | null
          full_name: string | null
          gender: string | null
          id: string
          phone_number: string | null
          preferred_language: string | null
          role: string | null
          safety_preferences: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          emergency_contacts?: Json | null
          full_name?: string | null
          gender?: string | null
          id?: string
          phone_number?: string | null
          preferred_language?: string | null
          role?: string | null
          safety_preferences?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          emergency_contacts?: Json | null
          full_name?: string | null
          gender?: string | null
          id?: string
          phone_number?: string | null
          preferred_language?: string | null
          role?: string | null
          safety_preferences?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      route_plans: {
        Row: {
          created_at: string | null
          end_location: unknown
          id: string
          is_favorite: boolean | null
          preferred_routes: string[] | null
          safety_priority: boolean | null
          saved_name: string | null
          start_location: unknown
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_location: unknown
          id?: string
          is_favorite?: boolean | null
          preferred_routes?: string[] | null
          safety_priority?: boolean | null
          saved_name?: string | null
          start_location: unknown
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_location?: unknown
          id?: string
          is_favorite?: boolean | null
          preferred_routes?: string[] | null
          safety_priority?: boolean | null
          saved_name?: string | null
          start_location?: unknown
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      route_stops: {
        Row: {
          arrival_time: string | null
          departure_time: string | null
          id: string
          route_id: string | null
          stop_id: string | null
          stop_order: number
        }
        Insert: {
          arrival_time?: string | null
          departure_time?: string | null
          id?: string
          route_id?: string | null
          stop_id?: string | null
          stop_order: number
        }
        Update: {
          arrival_time?: string | null
          departure_time?: string | null
          id?: string
          route_id?: string | null
          stop_id?: string | null
          stop_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "route_stops_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "route_stops_stop_id_fkey"
            columns: ["stop_id"]
            isOneToOne: false
            referencedRelation: "stops"
            referencedColumns: ["id"]
          },
        ]
      }
      routes: {
        Row: {
          created_at: string | null
          distance_km: number | null
          end_point: string
          estimated_duration_minutes: number | null
          fare: number | null
          id: string
          is_operational: boolean | null
          route_name: string
          route_number: string
          safety_score: number | null
          start_point: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          distance_km?: number | null
          end_point: string
          estimated_duration_minutes?: number | null
          fare?: number | null
          id?: string
          is_operational?: boolean | null
          route_name: string
          route_number: string
          safety_score?: number | null
          start_point: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          distance_km?: number | null
          end_point?: string
          estimated_duration_minutes?: number | null
          fare?: number | null
          id?: string
          is_operational?: boolean | null
          route_name?: string
          route_number?: string
          safety_score?: number | null
          start_point?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      safety_reports: {
        Row: {
          bus_id: string | null
          created_at: string | null
          description: string | null
          id: string
          incident_type: string
          is_anonymous: boolean | null
          location: unknown | null
          reported_at: string | null
          reporter_id: string | null
          resolved_at: string | null
          route_id: string | null
          severity: string | null
          status: string | null
          stop_id: string | null
          updated_at: string | null
        }
        Insert: {
          bus_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          incident_type: string
          is_anonymous?: boolean | null
          location?: unknown | null
          reported_at?: string | null
          reporter_id?: string | null
          resolved_at?: string | null
          route_id?: string | null
          severity?: string | null
          status?: string | null
          stop_id?: string | null
          updated_at?: string | null
        }
        Update: {
          bus_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          incident_type?: string
          is_anonymous?: boolean | null
          location?: unknown | null
          reported_at?: string | null
          reporter_id?: string | null
          resolved_at?: string | null
          route_id?: string | null
          severity?: string | null
          status?: string | null
          stop_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "safety_reports_bus_id_fkey"
            columns: ["bus_id"]
            isOneToOne: false
            referencedRelation: "buses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_reports_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_reports_stop_id_fkey"
            columns: ["stop_id"]
            isOneToOne: false
            referencedRelation: "stops"
            referencedColumns: ["id"]
          },
        ]
      }
      sos_alerts: {
        Row: {
          alert_type: string | null
          created_at: string | null
          emergency_contacts_notified: boolean | null
          id: string
          is_resolved: boolean | null
          location: unknown
          message: string | null
          police_notified: boolean | null
          resolved_at: string | null
          user_id: string | null
        }
        Insert: {
          alert_type?: string | null
          created_at?: string | null
          emergency_contacts_notified?: boolean | null
          id?: string
          is_resolved?: boolean | null
          location: unknown
          message?: string | null
          police_notified?: boolean | null
          resolved_at?: string | null
          user_id?: string | null
        }
        Update: {
          alert_type?: string | null
          created_at?: string | null
          emergency_contacts_notified?: boolean | null
          id?: string
          is_resolved?: boolean | null
          location?: unknown
          message?: string | null
          police_notified?: boolean | null
          resolved_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      stop_safety_ratings: {
        Row: {
          comments: string | null
          created_at: string | null
          id: string
          rating: number | null
          stop_id: string | null
          time_of_day: string | null
          user_id: string | null
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          stop_id?: string | null
          time_of_day?: string | null
          user_id?: string | null
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          stop_id?: string | null
          time_of_day?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stop_safety_ratings_stop_id_fkey"
            columns: ["stop_id"]
            isOneToOne: false
            referencedRelation: "stops"
            referencedColumns: ["id"]
          },
        ]
      }
      stops: {
        Row: {
          address: string | null
          created_at: string | null
          crowd_density: string | null
          has_cctv: boolean | null
          has_lighting: boolean | null
          has_shelter: boolean | null
          id: string
          location: unknown
          safety_score: number | null
          stop_name: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          crowd_density?: string | null
          has_cctv?: boolean | null
          has_lighting?: boolean | null
          has_shelter?: boolean | null
          id?: string
          location: unknown
          safety_score?: number | null
          stop_name: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          crowd_density?: string | null
          has_cctv?: boolean | null
          has_lighting?: boolean | null
          has_shelter?: boolean | null
          id?: string
          location?: unknown
          safety_score?: number | null
          stop_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
