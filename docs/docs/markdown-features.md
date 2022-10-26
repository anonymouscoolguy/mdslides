---
sidebar_position: 5
---

# Markdown Features

:::tip

This guide provides a general overview of most supported markdown features.
If you're unfamiliar with any features or would like deepen your knowledge, 
[markdownguide](https://www.markdownguide.org/)'s 
[Basic Syntax](https://www.markdownguide.org/basic-syntax/) and 
[Extended Syntax](https://www.markdownguide.org/extended-syntax/) are a great reference.

:::

## Headings

Headings are denoted by the `#` and have 4 different levels.

```md
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
```

<iframe src="/reveal.js-master/headings.html" height="300" width="100%"/>

## Emphasis

To make text italic use `*`, for bold use `**` and strikethrough `~~` around the text.

```md
### Emphasis

Normal

*Italic*

**Bold**

~~Strikethrough~~
```

<iframe src="/reveal.js-master/emphasis.html" height="300" width="100%"/>

## Code

To denote inline code enclose it with single backticks, `` `example` `` and multi-line code with triple backticks, `` ```example``` ``.

``````md
### Code

This is inline `code`.

```python
print("This is multi-line code!")

bbt = ["Sheldon", "Leonard", "Penny", "Howard", "Raj"]
for i in bbt:
    print(i)
```
``````

<iframe src="/reveal.js-master/code.html" height="300" width="100%"/>

### Individual lines

To step through individual lines use `[x|y-z]`.

``````md
### Step through lines

```python[1|3-5]
print("This is multi-line code!")

bbt = ["Sheldon", "Leonard", "Penny", "Howard", "Raj"]
for i in bbt:
    print(i)
```

---

### Show lines

Use `,` instead of `|` to show individual lines.

```python[1, 3]
print("Important!")
print("Not important!")
print("Important!")
```
``````

<iframe src="/reveal.js-master/individual-lines.html" height="300" width="100%"/>


## Lists

Ordered lists are denoted by a number followed by a period, while unordered list are denoted by a `-`.

```md
### Ordered list
1. Sheldon Cooper
2. Leonard Hofstadter
3. Penny

---

### Unordered list
- Howard Wolowitz
- Raj Koothrappali

---

### Combination
1. Sheldon Cooper
    - Amy Farrah Fowler
2. Leonard Hofstadter
    - Penny
```

<iframe src="/reveal.js-master/lists.html" height="300" width="100%"/>

## Tables

To create a table, use three or more hyphens `---` to create each column’s header, and use pipes `|` to separate each column.

```md
### Tables

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
```

<iframe src="/reveal.js-master/tables.html" height="300" width="100%"/>

## Blockquotes

A blockquote is denoted by `>` at the beginning of the paragraph.

```md
### Blockquote

> I'm The Most Non-Competitive. So I Win.
>
> -Peter Griffin

Normal text.
```

<iframe src="/reveal.js-master/blockquotes.html" height="300" width="100%"/>

## Horizontal Rules

To create an horizontal rule use three or more, `***` or `___`.

```md
### Horizontal Rules

Text 1
***
Text 2
___
Text3
```

<iframe src="/reveal.js-master/horizontal-rules.html" height="300" width="100%"/>

