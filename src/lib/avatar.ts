export function getAvatar(email: string, image?: string | null) {
  return image ?? `https://avatar.vercel.sh/${email}`;
}
