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
      crosspost: {
        Row: {
          attempt_count: number | null
          completed_at: string | null
          created_at: string | null
          crosspost_id: string | null
          error_message: string | null
          id: number
          last_attempt_at: string | null
          parent_cid: string | null
          root_cid: string | null
          service: Database["public"]["Enums"]["social_service"]
          status: Database["public"]["Enums"]["crosspost_status"]
          tweet_id: string | null
          uri: string | null
        }
        Insert: {
          attempt_count?: number | null
          completed_at?: string | null
          created_at?: string | null
          crosspost_id?: string | null
          error_message?: string | null
          id?: never
          last_attempt_at?: string | null
          parent_cid?: string | null
          root_cid?: string | null
          service: Database["public"]["Enums"]["social_service"]
          status?: Database["public"]["Enums"]["crosspost_status"]
          tweet_id?: string | null
          uri?: string | null
        }
        Update: {
          attempt_count?: number | null
          completed_at?: string | null
          created_at?: string | null
          crosspost_id?: string | null
          error_message?: string | null
          id?: never
          last_attempt_at?: string | null
          parent_cid?: string | null
          root_cid?: string | null
          service?: Database["public"]["Enums"]["social_service"]
          status?: Database["public"]["Enums"]["crosspost_status"]
          tweet_id?: string | null
          uri?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crosspost_tweet_id_fkey"
            columns: ["tweet_id"]
            isOneToOne: false
            referencedRelation: "tweets"
            referencedColumns: ["tweet_id"]
          },
        ]
      }
      sync_state: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: number
          last_tweet_id: string
          started_at: string | null
          tweets_crossposted: number | null
          tweets_synced: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: never
          last_tweet_id: string
          started_at?: string | null
          tweets_crossposted?: number | null
          tweets_synced?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: never
          last_tweet_id?: string
          started_at?: string | null
          tweets_crossposted?: number | null
          tweets_synced?: number | null
        }
        Relationships: []
      }
      tweet_media: {
        Row: {
          created_at: string | null
          duration_ms: number | null
          id: number
          media_key: string
          preview_image_url: string | null
          tweet_id: string | null
          type: string
          url: string | null
        }
        Insert: {
          created_at?: string | null
          duration_ms?: number | null
          id?: never
          media_key: string
          preview_image_url?: string | null
          tweet_id?: string | null
          type: string
          url?: string | null
        }
        Update: {
          created_at?: string | null
          duration_ms?: number | null
          id?: never
          media_key?: string
          preview_image_url?: string | null
          tweet_id?: string | null
          type?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tweet_media_tweet_id_fkey"
            columns: ["tweet_id"]
            isOneToOne: false
            referencedRelation: "tweets"
            referencedColumns: ["tweet_id"]
          },
        ]
      }
      tweets: {
        Row: {
          created_at: string | null
          referenced_tweet_id: string | null
          tweet_created_at: string
          tweet_id: string
          tweet_text: string
          tweet_type: Database["public"]["Enums"]["tweet_type"] | null
        }
        Insert: {
          created_at?: string | null
          referenced_tweet_id?: string | null
          tweet_created_at: string
          tweet_id: string
          tweet_text: string
          tweet_type?: Database["public"]["Enums"]["tweet_type"] | null
        }
        Update: {
          created_at?: string | null
          referenced_tweet_id?: string | null
          tweet_created_at?: string
          tweet_id?: string
          tweet_text?: string
          tweet_type?: Database["public"]["Enums"]["tweet_type"] | null
        }
        Relationships: []
      }
      users: {
        Row: {
          access_jwt: string
          created_at: string | null
          id: string
          name: string
          refresh_jwt: string | null
          service: Database["public"]["Enums"]["social_service"]
          updated_at: string | null
          username: string
        }
        Insert: {
          access_jwt: string
          created_at?: string | null
          id: string
          name: string
          refresh_jwt?: string | null
          service: Database["public"]["Enums"]["social_service"]
          updated_at?: string | null
          username: string
        }
        Update: {
          access_jwt?: string
          created_at?: string | null
          id?: string
          name?: string
          refresh_jwt?: string | null
          service?: Database["public"]["Enums"]["social_service"]
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
      tweet_type: "tweet" | "replied_to" | "quoted" | "retweeted"
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

