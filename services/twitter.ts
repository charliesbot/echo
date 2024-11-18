import type { TwitterCookie } from "~/types/twitter";

export class TwitterService {
  private bearerToken: string;

  constructor() {}

  async getGuestToken() {
    try {
      const { data, error } = await useFetch(
        "https://api.twitter.com/1.1/guest/activate.json",
        {
          method: "POST",
        }
      );
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {}
    //   req, err := http.NewRequest("POST", "https://api.twitter.com/1.1/guest/activate.json", nil)
    // if err != nil {
    // 	return err
    // }
    // req.Header.Set("Authorization", "Bearer "+s.bearerToken)
    // resp, err := s.client.Do(req)
    // if err != nil {
    // 	return err
    // }
    // defer resp.Body.Close()
    // body, err := io.ReadAll(resp.Body)
    // if err != nil {
    // 	return err
    // }
    // if resp.StatusCode != http.StatusOK {
    // 	return fmt.Errorf("response status %s: %s", resp.Status, body)
    // }
    // var jsn map[string]interface{}
    // if err := json.Unmarshal(body, &jsn); err != nil {
    // 	return err
    // }
    // var ok bool
    // if s.guestToken, ok = jsn["guest_token"].(string); !ok {
    // 	return fmt.Errorf("guest_token not found")
    // }
    // s.guestCreatedAt = time.Now()
    // return nil
  }

  setBearerToken(token: string) {
    this.bearerToken = token;
  }
}
