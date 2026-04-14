// ============================================================
// LAYOUT: MINIMAL
// ============================================================
// Clean white/light background, dark text, lots of breathing room.
// No gradients, no heavy visuals — just typography.
// Best for: LinkedIn, professional announcements
// ============================================================

function minimalLayout(request, sizeData, tokens) {

    const { width, height, safe_zone, font_scale } = sizeData;
  
    const headlineSize = Math.round(52 * font_scale);
    const subCopySize  = Math.round(24 * font_scale);
    const ctaSize      = Math.round(20 * font_scale);
  
    const headlineY = safe_zone.top + Math.round(height * 0.25);
    const subCopyY  = headlineY + headlineSize + Math.round(28 * font_scale);
    const ctaY      = height - safe_zone.bottom - Math.round(70 * font_scale);
    const logoY     = height - safe_zone.bottom - Math.round(40 * font_scale);
  
    return {
      layout_name: "minimal",
      canvas: { width, height },
  
      elements: [
        {
          type: "background",
          style: "solid",
          color: tokens.colors.light_background,
          covers: "full"
        },
        {
          type: "accent_bar",
          x: safe_zone.left,
          y: safe_zone.top,
          width: Math.round(60 * font_scale),
          height: Math.round(6 * font_scale),
          color: tokens.colors.accent_1
        },
        {
          type: "text",
          role: "headline",
          content: request.headline,
          x: safe_zone.left,
          y: headlineY,
          max_width: width - safe_zone.left - safe_zone.right,
          font_family: tokens.typography.headline_font,
          font_weight: "700",
          font_size: headlineSize,
          color: tokens.colors.headline_on_light,
          align: "left"
        },
        {
          type: "text",
          role: "sub_copy",
          content: request.sub_copy || "",
          x: safe_zone.left,
          y: subCopyY,
          max_width: width - safe_zone.left - safe_zone.right,
          font_family: tokens.typography.body_font,
          font_weight: "400",
          font_size: subCopySize,
          color: tokens.colors.body_text,
          align: "left"
        },
        {
          type: "cta_button",
          content: request.cta_text,
          x: safe_zone.left,
          y: ctaY,
          padding_x: Math.round(32 * font_scale),
          padding_y: Math.round(12 * font_scale),
          font_size: ctaSize,
          font_weight: "600",
          background_color: tokens.colors.dark_background,
          text_color: tokens.colors.light_background,
          border_radius: Math.round(4 * font_scale)
        },
        {
          type: "logo",
          x: width - safe_zone.right - sizeData.logo_max_width,
          y: logoY,
          max_width: sizeData.logo_max_width,
          src: "assets/jio-logo.png"
        }
      ]
    };
  }
  
  module.exports = { minimalLayout };