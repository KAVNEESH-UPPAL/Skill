// ============================================================
// SIZE ENGINE — Jio Banner Generator
// ============================================================
// This file is like a lookup table.
// You give it a size name like "1080x1080"
// and it gives back everything the tool needs to know:
// width, height, aspect ratio, safe zones, font scaling, etc.
// ============================================================


// ----------------------------------------------------------
// STEP 1: Define all standard banner sizes
// ----------------------------------------------------------
// Think of this as a dictionary.
// Key = size name, Value = all the rules for that size.

const BANNER_SIZES = {

    "1200x628": {
      width: 1200,
      height: 628,
      aspect_ratio: "1.91:1",
      platform: "Facebook / LinkedIn Feed",
      category: "landscape",
      safe_zone: {
        top: 40,
        bottom: 40,
        left: 60,
        right: 60
      },
      font_scale: 1.0,       // this is the "normal" size — others scale from this
      logo_max_width: 160,
      notes: "Headline should be top-left or centre. CTA bottom-right or centre."
    },
  
    "1080x1080": {
      width: 1080,
      height: 1080,
      aspect_ratio: "1:1",
      platform: "Instagram Post",
      category: "square",
      safe_zone: {
        top: 60,
        bottom: 60,
        left: 60,
        right: 60
      },
      font_scale: 0.95,
      logo_max_width: 140,
      notes: "Centred layouts work best. Keep text away from edges."
    },
  
    "1080x1920": {
      width: 1080,
      height: 1920,
      aspect_ratio: "9:16",
      platform: "Instagram / WhatsApp Story",
      category: "portrait",
      safe_zone: {
        top: 120,     // extra top space — phone UI covers this area
        bottom: 180,  // extra bottom space — swipe-up UI covers this
        left: 60,
        right: 60
      },
      font_scale: 1.1,
      logo_max_width: 150,
      notes: "Content must sit in the MIDDLE zone. Top and bottom are covered by phone UI."
    },
  
    "728x90": {
      width: 728,
      height: 90,
      aspect_ratio: "8:1",
      platform: "Website Leaderboard Ad",
      category: "leaderboard",
      safe_zone: {
        top: 8,
        bottom: 8,
        left: 20,
        right: 20
      },
      font_scale: 0.45,   // very small banner — fonts must be much smaller
      logo_max_width: 60,
      notes: "Extremely horizontal. Logo left, headline centre, CTA right. Keep it simple."
    },
  
    "300x250": {
      width: 300,
      height: 250,
      aspect_ratio: "6:5",
      platform: "Medium Rectangle Ad",
      category: "rectangle",
      safe_zone: {
        top: 15,
        bottom: 15,
        left: 15,
        right: 15
      },
      font_scale: 0.5,
      logo_max_width: 70,
      notes: "Small but common. Hierarchy matters — big headline, small sub-copy, clear CTA."
    },
  
    "160x600": {
      width: 160,
      height: 600,
      aspect_ratio: "1:3.75",
      platform: "Wide Skyscraper Ad",
      category: "skyscraper",
      safe_zone: {
        top: 20,
        bottom: 20,
        left: 12,
        right: 12
      },
      font_scale: 0.4,   // very narrow — fonts must be tiny
      logo_max_width: 80,
      notes: "Very narrow and tall. Stack elements vertically. Keep text short."
    }
  
  };
  
  
  // ----------------------------------------------------------
  // STEP 2: Function to get a single size's data
  // ----------------------------------------------------------
  // You call this like: getSizeData("1080x1080")
  // It gives you back all the rules for that size.
  
  function getSizeData(sizeName) {
    const size = BANNER_SIZES[sizeName];
  
    if (!size) {
      console.error(`Size "${sizeName}" not found. Check your spelling.`);
      return null;
    }
  
    return size;
  }
  
  
  // ----------------------------------------------------------
  // STEP 3: Function to handle CUSTOM sizes
  // ----------------------------------------------------------
  // If someone wants an 800x400 banner, this function
  // figures out all the rules automatically.
  
  function getCustomSizeData(width, height) {
  
    // Basic validation — don't allow crazy sizes
    if (width < 50 || height < 50) {
      console.error("Size too small. Minimum is 50x50 pixels.");
      return null;
    }
  
    if (width > 5000 || height > 5000) {
      console.error("Size too large. Maximum is 5000x5000 pixels.");
      return null;
    }
  
    const ratio = width / height;
  
    // Figure out the category based on shape
    let category;
    if (ratio > 2) category = "leaderboard";
    else if (ratio > 1.2) category = "landscape";
    else if (ratio > 0.8) category = "square";
    else if (ratio > 0.4) category = "rectangle";
    else category = "skyscraper";
  
    // Auto-calculate safe zones (5% of each dimension)
    const safe_zone = {
      top: Math.round(height * 0.05),
      bottom: Math.round(height * 0.05),
      left: Math.round(width * 0.05),
      right: Math.round(width * 0.05)
    };
  
    // Auto-calculate font scale relative to 1200x628 baseline
    const font_scale = Math.min(width, height) / Math.min(1200, 628);
  
    return {
      width,
      height,
      aspect_ratio: `${ratio.toFixed(2)}:1`,
      platform: "Custom",
      category,
      safe_zone,
      font_scale: parseFloat(font_scale.toFixed(2)),
      logo_max_width: Math.round(width * 0.15),
      notes: "Custom size — layout auto-calculated."
    };
  }
  
  
  // ----------------------------------------------------------
  // STEP 4: Function to get MULTIPLE sizes at once
  // ----------------------------------------------------------
  // Handles when user picks "all_social" or passes an array
  
  function resolveSizes(input) {
  
    // Platform group shortcuts
    const SIZE_GROUPS = {
      "all_social":  ["1080x1080", "1080x1920", "1200x628"],
      "all_web":     ["728x90", "300x250", "160x600"],
      "all_formats": ["1200x628", "1080x1080", "1080x1920", "728x90", "300x250", "160x600"]
    };
  
    // If user passed a group name like "all_social"
    if (typeof input === "string" && SIZE_GROUPS[input]) {
      return SIZE_GROUPS[input].map(s => ({ name: s, ...getSizeData(s) }));
    }
  
    // If user passed an array like ["1080x1080", "1200x628"]
    if (Array.isArray(input)) {
      return input.map(s => ({ name: s, ...getSizeData(s) }));
    }
  
    console.error("Invalid input to resolveSizes. Pass a size name, group name, or array.");
    return [];
  }
  
  
  // ----------------------------------------------------------
  // STEP 5: Validation function
  // ----------------------------------------------------------
  // Checks if a banner request is valid before processing it.
  // Returns { valid: true } or { valid: false, errors: [...] }
  
  function validateBannerRequest(request) {
    const errors = [];
  
    // Check required fields
    if (!request.headline) errors.push("Missing: headline");
    if (!request.cta_text) errors.push("Missing: cta_text");
    if (!request.campaign_theme) errors.push("Missing: campaign_theme");
    if (!request.mood) errors.push("Missing: mood");
    if (!request.target_platform) errors.push("Missing: target_platform");
    if (!request.banner_sizes) errors.push("Missing: banner_sizes");
  
    // Check character limits
    if (request.headline && request.headline.length > 60) {
      errors.push("Headline too long — max 60 characters");
    }
  
    if (request.cta_text && request.cta_text.length > 25) {
      errors.push("CTA text too long — max 25 characters");
    }
  
    // Check custom size is provided if "custom" is selected
    if (
      Array.isArray(request.banner_sizes) &&
      request.banner_sizes.includes("custom") &&
      !request.custom_size
    ) {
      errors.push("You selected 'custom' size but didn't provide custom_size dimensions");
    }
  
    if (errors.length > 0) {
      return { valid: false, errors };
    }
  
    return { valid: true };
  }
  
  
  // ----------------------------------------------------------
  // STEP 6: Export everything so other files can use it
  // ----------------------------------------------------------
  
  module.exports = {
    BANNER_SIZES,
    getSizeData,
    getCustomSizeData,
    resolveSizes,
    validateBannerRequest
  };