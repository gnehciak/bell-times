from duckduckgo_search import DDGS

def get_image_url(query):
    with DDGS() as ddgs:
        results = list(ddgs.images(query, max_results=1))
        if results:
            return results[0]['image']
    return None

import sys
if __name__ == "__main__":
    if len(sys.argv) > 1:
        print(get_image_url(sys.argv[1]))
