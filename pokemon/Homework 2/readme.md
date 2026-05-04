# Homework 2: Show the Pokémon's name on the page

In Homework 1 you fetched data from the Pokémon API and printed it to the console with `console.log`. The console is great for developers, but real users don't open the console — they need to see things on the page.

## Your task

Display the Pokémon's name on the screen.

The data you got back from the API has lots of fields. The one you want is `data.name`.

## What you need to learn

Three new things, in this order:

1. **`document.createElement`** — makes a brand new HTML element in JavaScript.
   ```js
   const box = document.createElement("div");
   ```
   At this point the `<div>` exists, but it's not on the page yet. It's just sitting in a variable.

2. **`textContent`** — sets the text inside an element.
   ```js
   box.textContent = "hello";
   ```

3. **`document.body.appendChild`** — puts the element onto the page, inside `<body>`.
   ```js
   document.body.appendChild(box);
   ```

That's it. Three lines.

## Steps

1. Open `script.js`. The fetch code from Homework 1 is already there.
2. Right after `console.log(data)`, follow the three TODOs.
3. Open `index.html` in your browser. You should see the Pokémon's name on the page.

## Hint

The URL fetches `ditto`, so you should see the word **ditto** show up.

## Stuck?

There's a `solution/` folder with the finished version. Try it yourself first — peeking too early means you don't get the practice.
