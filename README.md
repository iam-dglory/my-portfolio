# Netflix-Style Portfolio

A sleek, modern portfolio website inspired by Netflix's UI/UX design.

## Features

- Netflix-inspired navigation with transparent-to-solid scroll effect
- Cinematic hero section with gradient background
- Horizontal scrolling project carousel
- Skills showcase with interactive cards
- Smooth animations and transitions
- Fully responsive design
- Mouse drag scrolling support

## Customization Guide

### 1. Personal Information

Edit `index.html` to update:

- **Your Name**: Line 54 - Replace "Your Name"
- **Title/Role**: Line 55 - Update your professional title
- **Description**: Lines 56-60 - Write your personal bio
- **Email**: Line 163 - Add your email
- **LinkedIn**: Line 167 - Add your LinkedIn profile
- **GitHub**: Line 171 - Add your GitHub username

### 2. Projects

Each project card (Lines 76-125) includes:
- **Title**: Update the `<h3>` tag
- **Description**: Update the `<p>` tag
- **Technologies**: Update the `<span>` tags in project-tags
- **Gradient**: Change the `background` style with your preferred gradient

To add more projects, copy a project-card div and paste it in the carousel.

### 3. Skills

Edit skill cards (Lines 135-157) to add your technologies:
- **Icon**: Use emojis or replace with icon libraries
- **Skill Name**: Update the `<h3>` tag
- **Level**: Update the `<p>` tag (Beginner/Intermediate/Advanced)

### 4. Colors

In `styles.css`, customize the color scheme:

```css
:root {
    --netflix-red: #e50914;     /* Primary accent color */
    --netflix-black: #141414;   /* Background color */
    --netflix-dark: #000000;    /* Footer background */
    --netflix-gray: #808080;    /* Text secondary */
    --netflix-light-gray: #e5e5e5; /* Text primary */
}
```

### 5. Navigation Menu

Update navigation items in `index.html` (Lines 19-25) to add/remove sections.

## How to Use

1. Open `index.html` in a web browser to view your portfolio
2. All files must be in the same directory
3. No server required - runs entirely client-side

## File Structure

```
netflix-portfolio/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # Interactive features
└── README.md       # This file
```

## Features Breakdown

### Navigation
- Fixed navbar with scroll effect
- Smooth scrolling to sections
- "Hire Me" CTA button

### Hero Section
- Large title and description
- Two CTA buttons (View Projects, More Info)
- Animated gradient background

### Projects Carousel
- Horizontal scrolling cards
- Hover effects with project details
- Technology tags
- Navigation arrows (appear on hover)

### Skills Section
- Interactive skill cards
- Hover animations
- Categorized by proficiency level

### Responsive Design
- Mobile-friendly navigation
- Stacked layouts on small screens
- Touch-friendly carousels

## Tips

- Use high-quality project screenshots as backgrounds instead of gradients
- Add your actual project links to make cards clickable
- Consider adding a contact form in the Contact section
- Add social media icons for better connectivity
- Host on GitHub Pages, Netlify, or Vercel for free deployment

## Browser Support

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

Enjoy your Netflix-style portfolio!
