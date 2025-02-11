"use server";

import db from "@/lib/db";
import { Student } from "@prisma/client";
import { compareSync } from "bcryptjs";

export async function login(srn: string, password: string) {
  const stu = await db.student.findFirst({
    where: {
      srn,
    },
  });

  if (!stu) {
    return 404;
  }

  if (!compareSync(password, stu.password)) {
    return 401;
  }

  return 200;
}
