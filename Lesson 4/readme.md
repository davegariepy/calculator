1. css grid layout

- introduction to CSS Grid for 2D layouts
- display: grid turns an element into a grid container
- grid-template-columns: repeat(4, 1fr) creates 4 equal columns
- 1fr means "one fraction" of available space
- gap property adds space between grid items
- grid makes calculator layout much easier than flexbox

2. grid item positioning

- grid-column: span 2 makes a button take up 2 columns
- grid-row: span 2 makes a button take up 2 rows
- clear button spans 2 columns to be wider
- zero button spans 2 columns to be wider
- equals button spans 2 rows to be taller
- grid automatically places items in order

3. advanced css properties

- linear-gradient() creates smooth color transitions for backgrounds
- border-radius rounds corners of elements
- box-shadow adds depth and shadow effects
- transform: scale() makes elements bigger or smaller
- transition makes changes smooth over time
- these properties make the calculator look professional

4. flexbox for centering

- display: flex on body makes it a flex container
- justify-content: center centers horizontally
- align-items: center centers vertically
- min-height: 100vh makes body fill entire viewport height
- flexbox is perfect for centering elements

5. css pseudo-classes

- :hover applies styles when mouse is over element
- :active applies styles when element is being clicked
- creates interactive feedback for users
- transform: scale(1.05) on hover makes buttons grow slightly
- transform: scale(0.95) on active makes buttons shrink when clicked

6. responsive design basics

- setting fixed width: 320px for calculator
- word-wrap: break-word prevents long numbers from overflowing
- overflow-wrap: break-word wraps text that's too long
- mobile-friendly sizing with proper font sizes
- viewport meta tag makes it work on phones
