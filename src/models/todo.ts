import { Status } from "@prisma/client";

export type TTodos = {
  id: number;
  title: string;
  content?: string;
  status: Status;
  userId: number;
  createdAt: Date;
};
