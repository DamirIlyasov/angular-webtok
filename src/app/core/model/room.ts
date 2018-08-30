export interface Room {
  api_key: string;
  host: {
    id: string;
    username: string;
  };
  id: string;
  session_id: string;
  title: string;
  token: string;
}

export interface StreamUrlResponse {
  broadcast_url: string;
}

export interface SubscribersResponse {
  subscribers: Subscriber[];
}

export interface Subscriber {
  user: {
    id: string;
    username: string;
  };
}
