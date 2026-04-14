// ============================================================
// TEMPLATES INDEX
// ============================================================
// This is the switchboard. It knows all layouts and
// picks the best one based on the campaign mood and size.
// ============================================================

const { heroLayout }     = require('./layouts/layout-hero');
const { splitLayout }    = require('./layouts/layout-split');
const { centeredLayout } = require('./layouts/layout-centered');
const { minimalLayout }  = require('./layouts/layout-minimal');

// Which moods prefer which layouts
const MOOD_TO_LAYOUT = {
  energetic: ["hero", "split"],
  urgent:    ["hero", "split"],
  festive:   ["split", "centered"],
  fun:       ["centered", "split"],
  premium:   ["centered", "minimal"],
  calm:      ["minimal", "centered"]
};

// Which categories prefer which layouts
const CATEGORY_TO_LAYOUT = {
  landscape:   ["hero", "split", "centered", "minimal"],
  square:      ["centered", "hero", "split", "minimal"],
  portrait:    ["hero", "centered", "split", "minimal"],
  leaderboard: ["minimal", "hero"],   // very wide — keep it simple
  rectangle:   ["hero", "centered"],
  skyscraper:  ["hero", "minimal"]    // very narrow — keep it simple
};

function getLayout(layoutName, request, sizeData, tokens) {
  switch (layoutName) {
    case "hero":     return heroLayout(request, sizeData, tokens);
    case "split":    return splitLayout(request, sizeData, tokens);
    case "centered": return centeredLayout(request, sizeData, tokens);
    case "minimal":  return minimalLayout(request, sizeData, tokens);
    default:
      console.warn(`Unknown layout: ${layoutName}, falling back to hero`);
      return heroLayout(request, sizeData, tokens);
  }
}

// Pick 3-4 different layouts for a request
// so the user gets real visual variety
function pickLayoutsForRequest(request, sizeData) {
  const mood     = request.mood || "energetic";
  const category = sizeData.category || "landscape";

  const moodLayouts     = MOOD_TO_LAYOUT[mood]     || ["hero", "centered"];
  const categoryLayouts = CATEGORY_TO_LAYOUT[category] || ["hero", "centered", "split", "minimal"];

  // Combine both lists, remove duplicates, take first 4
  const combined = [...new Set([...moodLayouts, ...categoryLayouts])];
  return combined.slice(0, 4);
}

module.exports = { getLayout, pickLayoutsForRequest };