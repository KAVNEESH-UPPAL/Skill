// ============================================================
// LAYOUT: SPLIT
// ============================================================
// Banner is divided into LEFT and RIGHT halves.
// Left = text content, Right = visual/colour block
// Like a magazine spread — text on one side, image on other.
// Best for: festive campaigns, offers
// ============================================================

function splitLayout(request, sizeData, tokens) {

    const { width, height, safe_zone, font_scale } = sizeData;
  
    const headlineSize = Math.round(56 * font_scale);
    const subCopySize  = Math.round(24 * font_scale);
    const ctaSize      = Math.round(22 * font_scale);
  
    // LEFT HALF boundaries
    const leftWidth  = Math.round(width * 0.55);
    const rightStart = leftWidth;
    const rightWidth = width - leftWidth;
  
    const headlineY = safe_zone.top + Math.round(height * 0.15);
    const subCopyY  = headlineY + headlineSize + Math.round(24 * font_scale);
    const ctaY      = height - safe_zone.bottom - Math.round(70 * font_scale);
  
    return {
      layout_name: "split",
      canvas: { width, height },
  
      elements: [
        {
          type: "background",
          style: "solid",
          color: tokens.colors.dark_background,
          covers: "full"
        },
        {
          type: "background",
          style: "gradient",
          gradient: tokens.gradients.primary,
          x: rightStart,
          y: 0,
          width: rightWidth,
          height: height
        },
        {
          type: "divider_line",
          x: leftWidth,
          y: 0,
          height: height,
          color: tokens.colors.accent_1,
          thickness: Math.round(3 * font_scale)
        },
        {
          type: "logo",
          x: safe_zone.left,
          y: safe_zone.top,
          max_width: sizeData.logo_max_width,
          src: "assets/jio-logo.png"
        },
        {
          type: "text",
          role: "headline",
          content: request.headline,
          x: safe_zone.left,
          y: headlineY,
          max_width: leftWidth - safe_zone.left - 20,
          font_family: tokens.typography.headline_font,
          font_weight: "800",
          font_size: headlineSize,
          color: tokens.colors.headline_on_dark,
          align: "left"
        },
        {
          type: "text",
          role: "sub_copy",
          content: request.sub_copy || "",
          x: safe_zone.left,
          y: subCopyY,
          max_width: leftWidth - safe_zone.left - 20,
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
          padding_x: Math.round(36 * font_scale),
          padding_y: Math.round(14 * font_scale),
          font_size: ctaSize,
          font_weight: "600",
          background_color: tokens.colors.accent_1,
          text_color: tokens.colors.cta_text,
          border_radius: Math.round(6 * font_scale)
        }
      ]
    };
  }
  
  module.exports = { splitLayout };