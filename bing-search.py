import urllib.request
import urllib.parse
import re
import sys

def get_image_url(query):
    url = "https://html.duckduckgo.com/html/?q=" + urllib.parse.quote(query + " logo")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # DuckDuckGo image links usually have format <img src="//external-content.duckduckgo.com/iu/?u=URL"
        match = re.search(r'u=(https?%3A%2F%2F[^&]+)', html)
        if match:
            return urllib.parse.unquote(match.group(1))
    except Exception as e:
        print(f"Error: {e}")
    return None

if __name__ == "__main__":
    if len(sys.argv) > 1:
        query = sys.argv[1]
        img_url = get_image_url(query)
        if img_url:
            print(img_url)
        else:
            print("No image found.")
