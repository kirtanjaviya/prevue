// Default ImgBB API key
const DEFAULT_IMGBB_KEY = "6d700a60d001b9ca9c2bfb1964584183";

// Upload image to ImgBB CDN
export const uploadImageToImgBB = async (file) => {
  if (!file) throw new Error("No image file provided");

  const apiKey = import.meta.env.VITE_IMGBB_API_KEY || DEFAULT_IMGBB_KEY;
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result && result.success && result.data) {
      return {
        url: result.data.url,
        displayUrl: result.data.display_url,
        deleteUrl: result.data.delete_url,
      };
    }

    throw new Error(result?.error?.message || "Failed to upload image to CDN");
  } catch (error) {
    console.error("ImgBB upload error:", error);
    throw error;
  }
};
