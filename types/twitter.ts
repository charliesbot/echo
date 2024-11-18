export interface TwitterError {
  code: number;
  message: string;
}

export interface FlowResponse {
  errors?: TwitterError[];
  flow_token: string;
  status: string;
  subtasks: Array<{
    subtask_id: string;
    open_account?: {
      oauth_token: string;
      oauth_token_secret: string;
    };
  }>;
}

export interface LoginRequest {
  username: string;
  password: string;
  confirmation?: string;
}

export interface TwitterAuthResponse {
  success: boolean;
  isAuthenticated: boolean;
  error?: string;
}

export interface TwitterCookie {
  name: string;
  value: string;
  options?: {
    domain?: string;
    expires?: Date;
    httpOnly?: boolean;
    path?: string;
    secure?: boolean;
  };
}
