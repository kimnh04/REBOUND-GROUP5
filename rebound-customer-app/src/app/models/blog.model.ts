export interface Blog {
  Blog_ID: string;
  Blog_Title: string;
  Blog_Image: string;
  Blog_Date: string | Date;
  Blog_shortDescription: string;
  Blog_fullContent: string;
  Blog_Category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type BlogCategory = 'All' | 'Aftercare' | 'Service';