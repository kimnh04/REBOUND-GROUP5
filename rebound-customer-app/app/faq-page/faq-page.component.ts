import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface FAQ {
  question: string;
  answer: string;
  category: string;
  isExpanded: boolean;
}

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent {
  faqs: FAQ[] = [
    // Delivery Category
    {
      question: 'Is there an express delivery service?',
      answer: 'Yes, we offer express delivery services with varying delivery times depending on location.',
      category: 'Delivery',
      isExpanded: false
    },
    {
      question: 'What is the estimated delivery time?',
      answer: `Delivery times fluctuate based on location: expect deliveries within 2-4 hours for city addresses, 1-2 days for suburban areas, and 2-3 days for other locations.`,
      category: 'Delivery',
      isExpanded: false
    },
    {
      question: 'Can I change my delivery address after placing an order?',
      answer: 'Yes, you can modify your delivery address within 2 hours of order confirmation.',
      category: 'Delivery',
      isExpanded: false
    },
    {
      question: 'Do you provide same-day delivery?',
      answer: 'Same-day delivery is available for select locations and products. Please check availability during checkout.',
      category: 'Delivery',
      isExpanded: false
    },
    {
      question: 'What happens if I miss my delivery?',
      answer: 'Our delivery agent will contact you. If unreachable, re-delivery will be scheduled for the next day.',
      category: 'Delivery',
      isExpanded: false
    },

    // Order Category
    {
      question: 'How can I track my order?',
      answer: 'You will receive an email and SMS with tracking details once your order is confirmed.',
      category: 'Order',
      isExpanded: false
    },
    {
      question: 'Can I cancel my order after confirmation?',
      answer: 'Yes, but only within the first 1 hour after placing the order.',
      category: 'Order',
      isExpanded: false
    },
    {
      question: 'What should I do if I receive a wrong item?',
      answer: 'Please contact our support team within 24 hours for a replacement or refund.',
      category: 'Order',
      isExpanded: false
    },
    {
      question: 'Is it possible to modify my order after checkout?',
      answer: 'Order modifications are allowed within 30 minutes of placing the order.',
      category: 'Order',
      isExpanded: false
    },
    {
      question: 'Why was my order delayed?',
      answer: 'Delays can occur due to weather conditions, high demand, or logistics issues.',
      category: 'Order',
      isExpanded: false
    },

    // Pricing Category
    {
      question: 'How is the delivery cost calculated?',
      answer: 'Delivery cost depends on location, package weight, and current fuel prices.',
      category: 'Pricing',
      isExpanded: false
    },
    {
      question: 'Are there any hidden charges?',
      answer: 'No, all applicable charges are displayed during checkout.',
      category: 'Pricing',
      isExpanded: false
    },
    {
      question: 'Do you offer discounts for bulk orders?',
      answer: 'Yes, we have special pricing for bulk orders. Contact our sales team for details.',
      category: 'Pricing',
      isExpanded: false
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept credit/debit cards, PayPal, and online banking.',
      category: 'Pricing',
      isExpanded: false
    },
    {
      question: 'Can I pay on delivery?',
      answer: 'Cash on delivery is available for select locations.',
      category: 'Pricing',
      isExpanded: false
    },

    // Service Category
    {
      question: 'Do you deliver on weekends?',
      answer: 'Yes, weekend delivery is available. Check the available time slots at checkout.',
      category: 'Service',
      isExpanded: false
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 14-day return policy for unused and undamaged items.',
      category: 'Service',
      isExpanded: false
    },
    {
      question: 'Do you provide installation services?',
      answer: 'Yes, installation services are available for select products.',
      category: 'Service',
      isExpanded: false
    },
    {
      question: 'Can I schedule a specific delivery time?',
      answer: 'Yes, you can select your preferred delivery time during checkout.',
      category: 'Service',
      isExpanded: false
    },
    {
      question: 'Is customer support available 24/7?',
      answer: 'Yes, our support team is available 24/7 via phone, chat, and email.',
      category: 'Service',
      isExpanded: false
    }
  ];

  toggleFAQ(faq: FAQ) {
    faq.isExpanded = !faq.isExpanded;
  }

  getCategories(): string[] {
    return [...new Set(this.faqs.map(faq => faq.category))];
  }

  getFaqsByCategory(category: string): FAQ[] {
    return this.faqs.filter(faq => faq.category === category);
  }
}