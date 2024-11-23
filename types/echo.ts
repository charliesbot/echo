import type { Database } from "./database";

export type CrosspostsGetResponse = {
  tweets: Database["public"]["Tables"]["crosspost"]["Row"][];
};
