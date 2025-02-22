export class CreatePostDto {
  socialPageId?: number;

  title: string;

  description?: string;

  color?: string;

  size?: string;

  heavyWeight: boolean;

  price: number;

  quantity?: number;

  discount?: number;
  inStock: boolean;

  totalProductsSold: number;

  imageUrl?: string;
}
