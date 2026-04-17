"use server";

export async function getUrl() {
  return process.env.WEB_SITE_URL;
}
