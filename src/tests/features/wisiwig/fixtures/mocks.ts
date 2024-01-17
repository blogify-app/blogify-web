export const safe1 = () => {
  return (
    "# Blogify web\n" +
    "A blogging app for students.\n" +
    "## Why ?\n" +
    " * It is **PRETTY**\n" +
    " * ... Why not?\n" +
    "```js\n" +
    'console.log("C\'mon ... Why not??")\n' +
    "```"
  );
};

export const safe1_rendered = () => {
  return (
    "<h1>Blogify web</h1>\n" +
    "<p>A blogging app for students.</p>\n" +
    "<h2>Why ?</h2>\n" +
    "<ul>\n" +
    "<li>It is <strong>PRETTY</strong></li>\n" +
    "<li>... Why not?</li>\n" +
    "</ul>\n" +
    '<pre class="language-js">\n' +
    '<code class="language-js">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"C\'mon ... Why not??"</span><span class="token punctuation">)</span>\n' +
    "</code>" +
    "</pre>"
  );
};

export const unsafe1 = () => {
  return (
    "# Blogify web\n" +
    "A blogging app for students.\n" +
    // XSS
    '<script>alert("hacked")</script>'
  );
};

export const unsafe1_unsanitized = () => {
  return (
    "<h1>Blogify web</h1>\n" +
    "<p>A blogging app for students.</p>\n" +
    '<script type="text/javascript" defer>document.body.remove()</script>'
  );
};

export const unsafe1_sanitized = () => {
  return "<h1>Blogify web</h1>\n" + "<p>A blogging app for students.</p>\n";
};
