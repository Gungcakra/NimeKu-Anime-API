export const extractIframeSrc = (html) => {
    const match = html.match(/<iframe[^>]+src="([^"]+)"/i);
    return match ? match[1].trim() : null;
  };