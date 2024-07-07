export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      checklist_item_responses: {
        Row: {
          checklist_item_id: string | null
          checklist_response_id: string | null
          created_at: string | null
          id: string
          response: boolean
        }
        Insert: {
          checklist_item_id?: string | null
          checklist_response_id?: string | null
          created_at?: string | null
          id?: string
          response: boolean
        }
        Update: {
          checklist_item_id?: string | null
          checklist_response_id?: string | null
          created_at?: string | null
          id?: string
          response?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "checklist_item_responses_checklist_item_id_fkey"
            columns: ["checklist_item_id"]
            isOneToOne: false
            referencedRelation: "checklist_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklist_item_responses_checklist_response_id_fkey"
            columns: ["checklist_response_id"]
            isOneToOne: false
            referencedRelation: "checklist_responses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklist_item_responses_checklist_response_id_fkey"
            columns: ["checklist_response_id"]
            isOneToOne: false
            referencedRelation: "user_class_checklist_results_view"
            referencedColumns: ["response_id"]
          },
        ]
      }
      checklist_items: {
        Row: {
          checklist_id: string | null
          created_at: string | null
          description: string
          id: string
          order_num: number
          updated_at: string | null
        }
        Insert: {
          checklist_id?: string | null
          created_at?: string | null
          description: string
          id?: string
          order_num: number
          updated_at?: string | null
        }
        Update: {
          checklist_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          order_num?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_items_checklist_id_fkey"
            columns: ["checklist_id"]
            isOneToOne: false
            referencedRelation: "checklists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklist_items_checklist_id_fkey"
            columns: ["checklist_id"]
            isOneToOne: false
            referencedRelation: "student_class_checklist_results"
            referencedColumns: ["checklist_id"]
          },
          {
            foreignKeyName: "checklist_items_checklist_id_fkey"
            columns: ["checklist_id"]
            isOneToOne: false
            referencedRelation: "user_class_checklist_results_view"
            referencedColumns: ["checklist_id"]
          },
        ]
      }
      checklist_responses: {
        Row: {
          checklist_id: string | null
          created_at: string | null
          evaluated_id: string | null
          evaluator_id: string | null
          id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          checklist_id?: string | null
          created_at?: string | null
          evaluated_id?: string | null
          evaluator_id?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          checklist_id?: string | null
          created_at?: string | null
          evaluated_id?: string | null
          evaluator_id?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_responses_checklist_id_fkey"
            columns: ["checklist_id"]
            isOneToOne: false
            referencedRelation: "checklists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklist_responses_checklist_id_fkey"
            columns: ["checklist_id"]
            isOneToOne: false
            referencedRelation: "student_class_checklist_results"
            referencedColumns: ["checklist_id"]
          },
          {
            foreignKeyName: "checklist_responses_checklist_id_fkey"
            columns: ["checklist_id"]
            isOneToOne: false
            referencedRelation: "user_class_checklist_results_view"
            referencedColumns: ["checklist_id"]
          },
          {
            foreignKeyName: "checklist_responses_evaluated_id_fkey"
            columns: ["evaluated_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklist_responses_evaluator_id_fkey"
            columns: ["evaluator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      checklists: {
        Row: {
          checklist_type: string
          class_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_public: boolean | null
          scheduled_at: string | null
          status: Database["public"]["Enums"]["checklist_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          checklist_type: string
          class_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["checklist_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          checklist_type?: string
          class_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["checklist_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checklists_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklists_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      class_invite_codes: {
        Row: {
          class_id: string | null
          code: string
          created_at: string | null
          created_by: string | null
          expires_at: string
          id: string
          max_count: number | null
          use_count: number | null
        }
        Insert: {
          class_id?: string | null
          code: string
          created_at?: string | null
          created_by?: string | null
          expires_at: string
          id?: string
          max_count?: number | null
          use_count?: number | null
        }
        Update: {
          class_id?: string | null
          code?: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string
          id?: string
          max_count?: number | null
          use_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "class_invite_codes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_invite_codes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      class_members: {
        Row: {
          class_id: string
          created_at: string | null
          id: string
          is_primary: boolean | null
          profile_id: string
          student_number: number | null
          updated_at: string | null
        }
        Insert: {
          class_id: string
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          profile_id: string
          student_number?: number | null
          updated_at?: string | null
        }
        Update: {
          class_id?: string
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          profile_id?: string
          student_number?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "school_members_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "school_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          class_number: number
          closed_at: string | null
          created_at: string | null
          created_by: string | null
          grade: number
          id: string
          school: string | null
          updated_at: string | null
          year: number
        }
        Insert: {
          class_number: number
          closed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          grade: number
          id?: string
          school?: string | null
          updated_at?: string | null
          year: number
        }
        Update: {
          class_number?: number
          closed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          grade?: number
          id?: string
          school?: string | null
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "classes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      parent_invite_codes: {
        Row: {
          code: string
          created_at: string | null
          expires_at: string
          id: string
          is_used: boolean | null
          student_id: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          expires_at: string
          id?: string
          is_used?: boolean | null
          student_id?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          is_used?: boolean | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parent_invite_codes_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          id: string
          name: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          id: string
          name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          id?: string
          name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      student_checklist_items: {
        Row: {
          checklist_item_id: string | null
          completed_at: string | null
          created_at: string | null
          id: string
          is_completed: boolean | null
          student_checklist_id: string | null
          updated_at: string | null
        }
        Insert: {
          checklist_item_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          student_checklist_id?: string | null
          updated_at?: string | null
        }
        Update: {
          checklist_item_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          student_checklist_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_checklist_items_checklist_item_id_fkey"
            columns: ["checklist_item_id"]
            isOneToOne: false
            referencedRelation: "checklist_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_checklist_items_student_checklist_id_fkey"
            columns: ["student_checklist_id"]
            isOneToOne: false
            referencedRelation: "student_checklists"
            referencedColumns: ["id"]
          },
        ]
      }
      student_checklists: {
        Row: {
          class_id: string | null
          created_at: string | null
          id: string
          status: Database["public"]["Enums"]["checklist_status"] | null
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["checklist_status"] | null
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["checklist_status"] | null
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_checklists_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_checklists_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_parents: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean | null
          parent_id: string | null
          relationship: string | null
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          is_primary?: boolean | null
          parent_id?: string | null
          relationship?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          parent_id?: string | null
          relationship?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_parents_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_parents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_streaks: {
        Row: {
          current_streak: number
          id: string
          last_completed_date: string | null
          longest_streak: number
          profile_id: string | null
        }
        Insert: {
          current_streak?: number
          id?: string
          last_completed_date?: string | null
          longest_streak?: number
          profile_id?: string | null
        }
        Update: {
          current_streak?: number
          id?: string
          last_completed_date?: string | null
          longest_streak?: number
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_streaks_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ui_components: {
        Row: {
          component_data: Json
          component_order: number
          component_type: string
          created_at: string
          id: string
          screen_name: string
          updated_at: string
        }
        Insert: {
          component_data: Json
          component_order: number
          component_type: string
          created_at?: string
          id?: string
          screen_name: string
          updated_at?: string
        }
        Update: {
          component_data?: Json
          component_order?: number
          component_type?: string
          created_at?: string
          id?: string
          screen_name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      class_self_checklist_achievement: {
        Row: {
          achievement_rate: number | null
          check_date: string | null
          class_id: string | null
          completed_items: number | null
          student_id: string | null
          total_items: number | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_responses_evaluated_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklists_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      student_checklist_achievement: {
        Row: {
          achievement_rate: number | null
          completed_checklists: number | null
          student_id: string | null
          total_checklists: number | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_responses_evaluated_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_class_checklist_results: {
        Row: {
          achievement_rate: number | null
          checklist_created_at: string | null
          checklist_description: string | null
          checklist_id: string | null
          checklist_scheduled_at: string | null
          checklist_title: string | null
          class_id: string | null
          completed_items: number | null
          evaluator_id: string | null
          evaluator_name: string | null
          response_created_at: string | null
          response_status: string | null
          student_id: string | null
          total_items: number | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_responses_evaluated_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklist_responses_evaluator_id_fkey"
            columns: ["evaluator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklists_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      student_dashboard: {
        Row: {
          achievement_rate: number | null
          completed_checklists: number | null
          streak_days: number | null
          student_id: string | null
          total_checklists: number | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_responses_evaluated_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_class_checklist_results_view: {
        Row: {
          checklist_created_at: string | null
          checklist_creator_id: string | null
          checklist_description: string | null
          checklist_id: string | null
          checklist_title: string | null
          checklist_type: string | null
          class_id: string | null
          completed_items: number | null
          completion_percentage: number | null
          evaluated_id: string | null
          evaluator_id: string | null
          items: Json | null
          response_created_at: string | null
          response_id: string | null
          response_status: string | null
          scheduled_at: string | null
          total_items: number | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_responses_evaluated_id_fkey"
            columns: ["evaluated_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklist_responses_evaluator_id_fkey"
            columns: ["evaluator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklists_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklists_created_by_fkey"
            columns: ["checklist_creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      create_and_set_primary_class: {
        Args: {
          p_school: string
          p_grade: number
          p_class_number: number
          p_year: number
        }
        Returns: undefined
      }
      create_checklist_with_items: {
        Args: {
          p_class_id: string
          p_title: string
          p_description: string
          p_is_public: boolean
          p_scheduled_at: string
          p_items: Json
          p_checklist_type: string
        }
        Returns: Json
      }
      create_parent_invite_code: {
        Args: {
          p_student_id: string
        }
        Returns: string
      }
      generate_invite_code: {
        Args: {
          p_class_id: string
        }
        Returns: {
          id: string
          code: string
          class_id: string
          created_by: string
          expires_at: string
          use_count: number
          max_count: number
        }[]
      }
      generate_random_code: {
        Args: {
          length: number
        }
        Returns: string
      }
      get_class_daily_checklist_completion_rates: {
        Args: {
          p_student_id: string
          p_class_id: string
          p_days?: number
        }
        Returns: {
          date: string
          completion_rate: number
        }[]
      }
      get_daily_completed_checklists: {
        Args: {
          p_student_id: string
          p_days?: number
        }
        Returns: {
          date: string
          completed_count: number
        }[]
      }
      get_streak_days: {
        Args: {
          student_id: string
        }
        Returns: number
      }
      get_user_classes: {
        Args: Record<PropertyKey, never>
        Returns: {
          school: string
          grade: number
          class_number: number
          teacher_name: string
          class_id: string
        }[]
      }
      join_class_with_invite_code: {
        Args: {
          p_invite_code: string
          p_student_number: number
        }
        Returns: Json
      }
      update_student_checklist_response: {
        Args: {
          p_checklist_id: string
          p_evaluated_id: string
          p_item_responses: Json
        }
        Returns: Json
      }
    }
    Enums: {
      checklist_status: "draft" | "active" | "completed"
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
