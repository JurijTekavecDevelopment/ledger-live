import { createCustomErrorClass } from "@ledgerhq/errors";
import { CustomErrorFunc } from "@ledgerhq/errors/lib/helpers";

export const ImageLoadFromGalleryError: CustomErrorFunc =
  createCustomErrorClass("ImageLoadFromGalleryError");

export const ImageDownloadError: CustomErrorFunc =
  createCustomErrorClass("ImageDownloadError");

export const ImageTooLargeError: CustomErrorFunc =
  createCustomErrorClass("ImageTooLargeError");

export const ImageMetadataLoadingError: CustomErrorFunc =
  createCustomErrorClass("ImageMetadataLoadingError");

export const ImageCropError: CustomErrorFunc =
  createCustomErrorClass("ImageCropError");

export const ImageResizeError: CustomErrorFunc =
  createCustomErrorClass("ImageResizeError");

export const ImagePreviewError: CustomErrorFunc =
  createCustomErrorClass("ImagePreviewError");

export const ImageProcessingError: CustomErrorFunc = createCustomErrorClass(
  "ImageProcessingError"
);
