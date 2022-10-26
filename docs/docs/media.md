---
sidebar_position: 4
---

# Media

You can easily add HTML media attributes such as `img`, `video`, `audio` and `iframe`.

:::info

Slides.md automatically converts `src=` to `data-src=`, so that Reveal.js [lazy loads](https://revealjs.com/media/#lazy-loading) any media files.

:::

## Images, Videos and Audios

```md
### Image

<img height="300" data-src="https://assets.entrepreneur.com/content/3x2/2000/20160702102308-Untitled-5.jpeg" />

---

### Video

<video width="320" height="240" controls>
  <source data-src="http://techslides.com/demos/sample-videos/small.mp4">
</video>

---

### Audio

<audio controls>
  <source data-src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3">
</audio>
```

<iframe src="/reveal.js-master/media.html" height="300" width="100%"/>

## Iframes

:::note Fun fact

Embedding `iframes` into presentations was the reason this project was born. The idea of embedding a code editor into a presentation was pretty cool!

:::

```md
# Iframes

---

### Trinket

<iframe data-src="https://trinket.io/embed/python/6a2f39e54a" width="100%"
height="356" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen>
</iframe>

---

### YouTube

<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player"
frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>

---

### And more!
```

<iframe src="/reveal.js-master/iframes.html" height="300" width="100%"/>
