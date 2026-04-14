// ============================================================
// LAYOUT: HERO
// ============================================================
// This layout puts a BIG headline at the top,
// sub-copy in the middle, and CTA button at the bottom.
// Like a movie poster — one big bold statement.
// Best for: product launches, announcements
// ============================================================

function heroLayout(request, sizeData, tokens) {

    const { width, height, safe_zone, font_scale } = sizeData;
  
    // BASE FONT SIZES — scaled to banner size
    const headlineSize   = Math.round(64 * font_scale);
    const subCopySize    = Math.round(28 * font_scale);
    const ctaSize        = Math.round(24 * font_scale);
    const ctaPaddingX    = Math.round(40 * font_scale);
    const ctaPaddingY    = Math.round(16 * font_scale);
  
    // POSITIONS
    const headlineY  = safe_zone.top + Math.round(height * 0.12);
    const subCopyY   = headlineY + headlineSize + Math.round(30 * font_scale);
    const ctaY       = height - safe_zone.bottom - Math.round(80 * font_scale);
    const logoY      = safe_zone.top;
    const logoX      = safe_zone.left;
  
    return {
      layout_name: "hero",
      canvas: { width, height },
  
      elements: [
        {
          type: "background",
          style: "gradient",
          gradient: tokens.gradients.primary,
          covers: "full"
        },
        {
          type: "logo",
          x: logoX,
          y: logoY,
          max_width: sizeData.logo_max_width,
          src: "assets/jio-logo.png"
        },
        {
          type: "text",
          role: "headline",
          content: request.headline,
          x: safe_zone.left,
          y: headlineY,
          max_width: width - safe_zone.left - safe_zone.right,
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
          padding_x: ctaPaddingX,
          padding_y: ctaPaddingY,
          font_size: ctaSize,
          font_weight: "600",
          background_color: tokens.colors.cta_background,
          text_color: tokens.colors.cta_text,
          border_radius: Math.round(8 * font_scale)
        }
      ]
    };
  }
  
  module.exports = { heroLayout };