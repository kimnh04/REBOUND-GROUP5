import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../retrieve-blog.service';
import { Blog, BlogCategory } from '../models/blog.model';
import { Subject, takeUntil, finalize, catchError } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit, OnDestroy {
  blogPosts: Blog[] = [];
  selectedPost: Blog | null = null;
  loading = false;
  error: string | null = null;
  categories: BlogCategory[] = ['All', 'Aftercare', 'Service'];
  selectedCategory: BlogCategory = 'All';
  private destroy$ = new Subject<void>();

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs(category: BlogCategory = 'All') {
    this.loading = true;
    this.error = null;
    this.selectedCategory = category;

    const request = category === 'All'
      ? this.blogService.getAllBlogs()
      : this.blogService.getBlogsByCategory(category);

    request.pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        this.error = 'Failed to load blogs. Please try again later.';
        console.error('Error loading blogs:', error);
        return [];
      }),
      finalize(() => this.loading = false)
    ).subscribe(blogs => {
      if (blogs && blogs.length > 0) {
        this.blogPosts = blogs.sort((a, b) =>
          new Date(b.Blog_Date).getTime() - new Date(a.Blog_Date).getTime()
        );
      } else {
        this.error = 'No blogs found';
      }
    });
  }

  selectPost(post: Blog): void {
    if (!post) return;
    this.loading = true;
    this.error = null;
    
    this.blogService.getBlogById(post.Blog_ID).pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        console.error('❌ Error details:', error);
        this.error = error.message;
        this.loading = false;
        this.selectedPost = null;
        return [];
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (fullPost: Blog) => {
        if (fullPost) {
          this.selectedPost = fullPost;
          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        }
      },
      error: (error) => {
        this.error = 'Failed to load blog details';
        console.error('Error loading blog:', error);
      }
    });
  }

  backToBlogList() {
    this.selectedPost = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  formatContent(content: string): string {
    return content ? content.replace(/\n/g, '<br>') : '';
  }

  formatDate(date: string | Date): string {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}