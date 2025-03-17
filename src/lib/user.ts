import prisma from "./prisma";

export async function getUserData(uid: string) {
  if (!uid) return null;

  try {
    return await prisma.sysUser.findFirst({
      where: { uid: uid },
      select: { fullname: true, role: true },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}