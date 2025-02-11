"use server";

import db from "@/lib/db";
import { Student } from "@prisma/client";
import { genSaltSync, hashSync } from "bcryptjs";

export async function register({ srn, name, password }: Student) {
  const stu = await db.student.findFirst({
    where: {
      srn,
    },
  });

  if (stu) {
    return 403;
  }

  await db.student.create({
    data: {
      srn,
      name,
      password: hashSync(password, genSaltSync()),
    },
  });

  return 200;
}
