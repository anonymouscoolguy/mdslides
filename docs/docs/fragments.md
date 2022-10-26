---
sidebar_position: 3
---

# Fragments

Fragments are used to highlight or incrementally reveal individual elements on a slide. Every element with the class `fragment` will be stepped through before moving on to the next slide.

The default fragment style is to start out invisible and fade in. This style can be changed by appending a different class to the fragment. [^1]

```md
### Fragments

- Item 1 <!-- .element: class="fragment" -->
- Item 2 <!-- .element: class="fragment fade-out" -->
- Item 3 <!-- .element: class="fragment highlight-red" -->
- Item 4 <!-- .element: class="fragment fade-in-then-out" -->
- Item 5 <!-- .element: class="fragment fade-up" -->
```

<iframe src="/reveal.js-master/fragments.html" height="300" width="100%"/>

Fragment styles:

| Class Name              | Effect                                              |
| ----------------------- | --------------------------------------------------- |
| fade-out                | Start visible, fade out                             |
| fade-up                 | Slide up while fading in                            |
| fade-down               | Slide down while fading in                          |
| fade-left               | Slide left while fading in                          |
| fade-right              | Slide right while fading in                         |
| fade-in-then-out        | Fades in, then out on the next step                 |
| fade-in-then-semi-out   | Fades in, then to 50% on the next step              |
| grow                    | Scale up                                            |
| semi-fade-out           | Fade out to 50%                                     |
| shrink                  | Scale down                                          |
| strike                  | Strike through                                      |
| highlight-red           | Turn text red                                       |
| highlight-green         | Turn text green                                     |
| highlight-blue          | Turn text blue                                      |
| highlight-current-red   | Turn text red, then back to original on next step   |
| highlight-current-green | Turn text green, then back to original on next step |
| highlight-current-blue  | Turn text blue, then back to original on next step  |

## Fragment Order

The display order of fragments can be changed using the `data-fragment-index` attribute.

```md
### Fragment order

- Item 1 <!-- .element: class="fragment" data-fragment-index="3" -->
- Item 2 <!-- .element: class="fragment" data-fragment-index="1" -->
- Item 3 <!-- .element: class="fragment" data-fragment-index="2" -->
```

<iframe src="/reveal.js-master/fragment-order.html" height="300" width="100%"/>

[^1]: “Fragments.” reveal.js, revealjs.com/fragments. Accessed 26 Oct. 2022.
