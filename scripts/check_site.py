"""Check the Jekyll output used in DEV and production, without network calls."""

from html.parser import HTMLParser
from pathlib import Path
import re
import sys


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = set()
        self.links = []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag)
        if tag == "a":
            self.links.append(dict(attrs).get("href", ""))


def check_site(root):
    errors = []
    for name in ("index.html", "projetos.html", "blog.html", "style.css", "feed.xml", "sitemap.xml"):
        path = root / name
        if not path.is_file() or path.stat().st_size == 0:
            errors.append(f"Missing or empty output: {name}")

    pages = list(root.rglob("*.html"))
    for path in pages:
        content = path.read_text(encoding="utf-8")
        page = Page()
        page.feed(content)
        if not {"html", "head", "title", "body"}.issubset(page.tags):
            errors.append(f"Incomplete HTML document: {path.relative_to(root)}")
        if "{{" in content or "{%" in content:
            errors.append(f"Unprocessed Liquid template: {path.relative_to(root)}")

    # Each generated post must be discoverable from the blog listing.
    blog = root / "blog.html"
    if blog.is_file():
        page = Page()
        page.feed(blog.read_text(encoding="utf-8"))
        # Jekyll's current default post permalink contains /year/month/day/title.html.
        posts = [path for path in pages if re.search(r"/\d{4}/\d{2}/\d{2}/[^/]+\.html$", "/" + path.relative_to(root).as_posix())]
        if not posts:
            errors.append("No generated blog posts")
        for post in posts:
            url = "/" + post.relative_to(root).as_posix()
            if not any(link.endswith(url) for link in page.links):
                errors.append(f"Post missing from blog listing: {url}")

    for name in ("README.md", "AGENTS.md", "scripts", ".github"):
        if (root / name).exists():
            errors.append(f"Development files leaked into site: {name}")

    if errors:
        raise SystemExit("\n".join(errors))
    print(f"Validated {len(pages)} HTML pages, blog generation and site assets.")


if __name__ == "__main__":
    check_site(Path(sys.argv[1] if len(sys.argv) > 1 else "_site"))
