import { models, model, Schema, Document } from "mongoose";
interface ITour extends Document {
  name?: string;
  slug?: string;
  category?: string;
  difficulty?: string;
  guideName?: string;
  languages?: string[];
  duration?: string;
  price?: number;
  location?: string;
  latitude?: number;
  longitude?: number;
  rating?: number;
  description?: string;
  highlights?: string[];
  images?: string[];
}
const tourSchema = new Schema<ITour>({
  name: { type: String, required: true },
  slug: String,
  category: String,
  difficulty: String,
  guideName: String,
  languages: [String],
  duration: String,
  price: Number,
  location: String,
  latitude: Number,
  longitude: Number,
  rating: Number,
  description: String,
  highlights: [String],
  images: [String],
});
const Tour = models.Tour || model<ITour>("Tour", tourSchema);
export default Tour;
