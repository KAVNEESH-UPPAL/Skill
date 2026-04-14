// ============================================================
// LAYOUT: CENTERED
// ============================================================
// Everything is perfectly centred on the banner.
// Clean, premium, symmetric.
// Best for: Instagram posts, premium campaigns
// ============================================================

function centeredLayout(request, sizeData, tokens) {

    const { width, height, safe_zone, font_scale } = sizeData;
  
    const headlineSize = Math.round(60 * font_scale);
    const subCopySize  = Math.round(26 * font_scale);
    const ctaSize      = Math.round(22 * font_scale);
  
    // Everything is centred horizontally
    const centerX = Math.round(width / 2);
  
    // Vertically stack elements around the middle
    const totalContentHeight = headlineSize + 30 + subCopySize + 50 + 60;
    const startY = Math.round((height - totalContentHeight) / 2);
  
    const headlineY = startY;
    const subCopyY  = headlineY + headlineSize + Math.round(24 * font_scale);
    const ctaY      = subCopyY + subCopySize + Math.round(40 * font_scale);
    const logoY     = safe_zone.top;
  
    return {
      layout_name: "centered",
      canvas: { width, height },
  
      elements: [
        {
          type: "background",
          style: "gradient",
          gradient: tokens.gradients.secondary,
          covers: "full"
        },
        {
          type: "logo",
          x: centerX,
          y: logoY,
          max_width: sizeData.logo_max_width,
          src: "assets/jio-logo.png",
          align: "center"
        },
        {
          type: "text",
          role: "headline",
          content: request.headline,
          x: centerX,
          y: headlineY,
          max_width: width - (safe_zone.left * 2),
          font_family: tokens.typography.headline_font,
          font_weight: "800",
          font_size: headlineSize,
          color: tokens.colors.headline_on_dark,
          align: "center"
        },
        {
          type: "text",
          role: "sub_copy",
          content: request.sub_copy || "",
          x: centerX,
          y: subCopyY,
          max_width: width - (safe_zone.left * 2.5),
          font_family: tokens.typography.body_font,
          font_weight: "400",
          font_size: subCopySize,
          color: tokens.colors.body_text,
          align: "center"
        },
        {
          type: "cta_button",
          content: request.cta_text,
          x: centerX,
          y: ctaY,
          padding_x: Math.round(44 * font_scale),
          padding_y: Math.round(16 * font_scale),
          font_size: ctaSize,
          font_weight: "600",
          background_color: tokens.colors.cta_background,
          text_color: tokens.colors.cta_text,
          border_radius: Math.round(30 * font_scale),
          align: "center"
        }
      ]
    };
  }
  
  module.exports = { centeredLayout };