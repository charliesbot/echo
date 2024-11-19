export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      crosspost_service_status: {
        Row: {
          attempt_count: number | null
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          external_id: string | null
          external_url: string | null
          last_attempt_at: string | null
          service: Database["public"]["Enums"]["social_service"]
          status: Database["public"]["Enums"]["crosspost_status"]
          tweet_id: string
        }
        Insert: {
          attempt_count?: number | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          external_id?: string | null
          external_url?: string | null
          last_attempt_at?: string | null
          service: Database["public"]["Enums"]["social_service"]
          status?: Database["public"]["Enums"]["crosspost_status"]
          tweet_id: string
        }
        Update: {
          attempt_count?: number | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          external_id?: string | null
          external_url?: string | null
          last_attempt_at?: string | null
          service?: Database["public"]["Enums"]["social_service"]
          status?: Database["public"]["Enums"]["crosspost_status"]
          tweet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crosspost_service_status_tweet_id_fkey"
            columns: ["tweet_id"]
            isOneToOne: false
            referencedRelation: "tweet_crosspost"
            referencedColumns: ["tweet_id"]
          },
        ]
      }
      sync_state: {
        Row: {
          id: number
          last_sync_at: string | null
          last_tweet_id: string
        }
        Insert: {
          id?: never
          last_sync_at?: string | null
          last_tweet_id: string
        }
        Update: {
          id?: never
          last_sync_at?: string | null
          last_tweet_id?: string
        }
        Relationships: []
      }
      tweet_crosspost: {
        Row: {
          attachments: Json | null
          created_at: string | null
          tweet_created_at: string
          tweet_id: string
          tweet_text: string
          twitter_user_id: string | null
        }
        Insert: {
          attachments?: Json | null
          created_at?: string | null
          tweet_created_at: string
          tweet_id: string
          tweet_text: string
          twitter_user_id?: string | null
        }
        Update: {
          attachments?: Json | null
          created_at?: string | null
          tweet_created_at?: string
          tweet_id?: string
          tweet_text?: string
          twitter_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tweet_crosspost_twitter_user_id_fkey"
            columns: ["twitter_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["twitter_id"]
          },
        ]
      }
      tweet_media: {
        Row: {
          created_at: string | null
          duration_ms: number | null
          media_key: string
          preview_image_url: string | null
          type: string
          url: string | null
        }
        Insert: {
          created_at?: string | null
          duration_ms?: number | null
          media_key: string
          preview_image_url?: string | null
          type: string
          url?: string | null
        }
        Update: {
          created_at?: string | null
          duration_ms?: number | null
          media_key?: string
          preview_image_url?: string | null
          type?: string
          url?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          name: string
          twitter_id: string
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          name: string
          twitter_id: string
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          name?: string
          twitter_id?: string
          updated_at?: string | null
          username?: string
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
      crosspost_status: "pending" | "completed" | "failed"
      social_service: "bluesky" | "mastodon" | "threads"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

