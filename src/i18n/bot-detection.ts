/**
 * Detect search-engine / social crawlers.
 * Geo redirects must NOT run for these — URL language wins for SEO.
 */
const BOT_UA_PATTERN =
  /googlebot|google-inspectiontool|bingbot|yandex(bot|images|favicon|mobile|metrika)?|yandex\.com\/bots|duckduckbot|baiduspider|facebookexternalhit|facebot|twitterbot|linkedinbot|slurp|applebot|semrushbot|ahrefsbot|mj12bot|dotbot|petalbot|bytespider|gptbot|claudebot|ccbot|ia_archiver|screaming frog|seznambot|qwantify/i;

export function isSearchBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) {
    return false;
  }

  return BOT_UA_PATTERN.test(userAgent);
}
