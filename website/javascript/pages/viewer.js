function removeYamlHeader(mdString) {
}

async function loadDocumentFromQuery() {
  console.log("Printing")
  const viewer = document.getElementById('viewer');

  const params = new URLSearchParams(window.location.search);
  const title = params.get('q');

  const fileName = `/posts/${title}.md`;

  const response = await fetch(fileName);

  const markdown = await response.text();

  viewer.innerHTML = marked.parse(markdown.replace(/^---[\s\S]*?---\s*/, ''))
}

window.addEventListener('DOMContentLoaded', loadDocumentFromQuery);

