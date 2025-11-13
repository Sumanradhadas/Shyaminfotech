# Design Guidelines: Shri Shyam Infotech Website

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern educational platforms like Coursera, Udemy, and Lambda School, combined with professional service sites. Focus on trust-building through established credibility (17+ years) while maintaining accessibility for diverse age groups seeking computer training.

## Color System
- **Primary Navy Blue (#0A1F44)**: Headers, navigation, primary buttons, section backgrounds
- **Accent Orange (#FF6B35)**: CTAs, highlights, hover states, icons, progress indicators
- **Success Green (#28A745)**: Success messages, certification badges, achievement indicators
- **White (#FFFFFF)**: Main backgrounds, text on dark sections, cards
- **Neutral Gray (#F8F9FA)**: Alternate section backgrounds, borders, subtle elements
- Use navy blue and white as dominant pair, with orange for energy and green for validation/trust signals

## Typography
- **Headings**: Inter or Poppins (600-700 weight) - modern, professional
- **Body**: Inter or Open Sans (400-500 weight) - excellent readability
- **Hierarchy**: H1 (3.5rem), H2 (2.5rem), H3 (1.75rem), Body (1rem), Small (0.875rem)
- Tight letter-spacing for headings (-0.02em), normal for body

## Layout System
- **Container**: max-w-7xl with px-6
- **Spacing Scale**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32 (e.g., p-6, mt-12, py-20)
- **Sections**: py-16 to py-24 for desktop, py-12 for mobile
- **Cards**: p-6 to p-8 with rounded-xl borders
- **Grid Systems**: 3-column for courses (lg:grid-cols-3), 2-column for features (md:grid-cols-2)

## Page-Specific Designs

### Home Page
- **Hero**: Full-width with large background image showing modern computer lab/students learning. Overlay with navy blue gradient (opacity 85%). Center-aligned content with main headline "Empowering Careers Through Technology Education", subheadline "17+ Years of Excellence in Patna", orange CTA button "Explore Courses" with glow effect
- **Highlights Bar**: 4-column stats grid (Students Trained, Courses Offered, Years of Experience, Placement Rate) with animated counters, white text on navy background
- **Featured Courses**: 3-column card grid with course icons, brief descriptions, duration, orange "Learn More" buttons
- **AI Assistant**: Floating button (bottom-right, orange circular with chat icon) that expands into chat popup with navy header

### Courses Page
- Large course cards (stacked vertically) with left-aligned image/icon, right-aligned content
- Each card includes: Course name, duration badge, key highlights (bulleted), syllabus accordion, orange "Enroll Now" button
- Alternating card layouts (image left/right) for visual rhythm

### Why Choose Us
- Hero section with "Why Choose Shri Shyam Infotech" headline
- 2x2 grid of feature cards: Experienced Faculty, Practical Learning, Placement Assistance, Flexible Batches
- Each card: icon (orange), headline, descriptive paragraph, supporting stats
- Large testimonial section with student photos and quotes in card carousel

### Certificate Verification
- Clean, centered form with navy header "Verify Your Certificate"
- Two-tab interface: ADCA | DCA
- Input fields for Certificate Number and Student Name with green verification button
- Results display as downloadable card with certificate details and green "Download PDF" button

### Admission & Fees
- Step-by-step enrollment process (numbered cards 1-4 with connecting lines)
- Prominent fee structure table (navy headers, white rows)
- Dual CTA buttons: "Apply Now" (orange, primary) and "Book Free Demo" (outlined orange, secondary)

### Contact Page
- Split layout: Left side form (Name, Email, Phone, Course Interest, Message), Right side info block
- Info block: Address with map pin icon, phone with clickable tel: link, WhatsApp with green button, email, working hours
- Embedded Google Maps below (full-width, rounded corners)

## Component Library

### Navigation
- Sticky header with white background, subtle shadow on scroll
- Logo left, nav links center (Home, Courses, Why Us, Certificates, Admission, Contact), orange "Enroll Now" button right
- Mobile: Hamburger menu with slide-in drawer (navy background)

### Buttons
- Primary: Orange background, white text, rounded-lg, hover glow effect (shadow-lg shadow-orange-500/50)
- Secondary: Orange border, orange text, hover fills with orange
- Ghost: Transparent with orange text, subtle hover background
- Floating (AI): Circular orange with pulse animation

### Cards
- White background, rounded-xl, shadow-md
- Hover: lift effect (translateY(-4px)) and increased shadow
- Course cards: Image top, content bottom with padding-6
- Feature cards: Icon top-left, centered text layout

### Forms
- Input fields: border-2 border-gray-300, focus:border-orange-500, rounded-lg, p-3
- Labels: text-sm font-medium text-gray-700
- Submit buttons: Full orange primary button style

### AI Assistant Popup
- Modal overlay (semi-transparent navy)
- Chat window: white background, rounded-2xl, max-w-md
- Header: Navy background with "Course Assistant" and close button
- Messages: User messages (orange bubble right), AI messages (gray bubble left)
- Input: Bottom-pinned with send button

## Animations & Interactions
- **Page Transitions**: Fade-in (300ms) using Framer Motion
- **Scroll Animations**: Elements fade-up as they enter viewport (stagger by 100ms for grids)
- **Buttons**: Glow effect on hover (shadow transition), scale(1.02) on active
- **Cards**: Lift on hover (translateY(-4px), 200ms ease)
- **Stats Counters**: Animated count-up when visible
- **AI Button**: Continuous pulse animation (scale 1 to 1.1, 2s infinite)
- **Micro-interactions**: Icon bounce on hover, form field highlight on focus
- Keep animations subtle and professional - avoid excessive motion

## Images
- **Hero Image**: Modern computer classroom with students on computers, bright and professional, 1920x800px minimum
- **Course Icons/Images**: Representative graphics for each course (computer screen for ADCA/DCA, calculator for Tally, government emblem for Kushal Yuva)
- **Why Choose Us**: Faculty photo, students in practical lab, placement handshake, flexible schedule icon
- **Contact**: Professional office exterior or reception area

## Accessibility
- Maintain WCAG AA contrast ratios (navy on white, white on navy, orange buttons with white text)
- Focus states: 2px orange outline on all interactive elements
- Semantic HTML with proper heading hierarchy
- ARIA labels for icon buttons and navigation
- Form labels properly associated with inputs