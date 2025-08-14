import { S3Client, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

// Configure AWS S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const generatePresignedUrl = async (key: string, expiresIn: number = 3600): Promise<string> => {
  try {
    if (!key) {
      throw new Error("Key is required");
    }

    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    return presignedUrl;
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw error;
  }
};

export const generateBulkPresignedUrls = async (
  keys: string[], 
  expiresIn: number = 3600
): Promise<{[key: string]: string}> => {
  try {
    const presignedUrls: {[key: string]: string} = {};
    
    for (const key of keys) {
      if (key) {
        try {
          const presignedUrl = await generatePresignedUrl(key, expiresIn);
          presignedUrls[key] = presignedUrl;
        } catch (error) {
          console.error(`Error generating presigned URL for key ${key}:`, error);
          // Continue with other keys even if one fails
        }
      }
    }

    return presignedUrls;
  } catch (error) {
    console.error("Error generating bulk presigned URLs:", error);
    throw error;
  }
};

export const addPresignedUrlsToMovie = async (movie: any): Promise<any> => {
  try {
    const movieObj = movie.toObject ? movie.toObject() : movie;
    
    if (movieObj.image) {
      movieObj.imageUrl = await generatePresignedUrl(movieObj.image);
    } else {
      movieObj.imageUrl = movieObj.image;
    }
    
    if (movieObj.coverImage) {
      movieObj.coverImageUrl = await generatePresignedUrl(movieObj.coverImage);
    } else {
      movieObj.coverImageUrl = movieObj.coverImage;
    }
    
    return movieObj;
  } catch (error) {
    console.error("Error adding presigned URLs to movie:", error);
    return movie.toObject ? movie.toObject() : movie;
  }
};

export const addPresignedUrlsToMovies = async (movies: any[]): Promise<any[]> => {
  try {
    const moviesWithUrls = await Promise.all(
      movies.map(movie => addPresignedUrlsToMovie(movie))
    );
    return moviesWithUrls;
  } catch (error) {
    console.error("Error adding presigned URLs to movies:", error);
    return movies;
  }
};

export const deleteImageFromS3 = async (movie: any): Promise<void> => {
  try {
    const key = movie.image || movie.coverImage;
    
    if (!key) {
      throw new Error("Key is required");
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error("Error deleting image from S3:", error);
    throw error;
  }
}
