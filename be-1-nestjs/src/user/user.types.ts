import { UserIdentity } from "@/auth";

export interface UserResponse {
  identity: UserIdentity;
  data: any;
}