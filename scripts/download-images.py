"""Download food images locally so they never 404."""
import os
import urllib.request

BASE = os.path.join(os.path.dirname(__file__), "..", "public", "images")

# Verified working Unsplash URLs (tested via HEAD request)
DOWNLOADS: dict[str, str] = {
    # Cafes
    "cafes/cafe-1.jpg": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&h=600&q=85",
    "cafes/cafe-2.jpg": "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&h=600&q=85",
    "cafes/cafe-3.jpg": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&h=600&q=85",
    "cafes/cafe-4.jpg": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&h=600&q=85",
    "cafes/cafe-5.jpg": "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&h=600&q=85",
    # Menu
    "menu/m-1.jpg": "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-2.jpg": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-3.jpg": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-4.jpg": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-5.jpg": "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-6.jpg": "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-7.jpg": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-8.jpg": "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-9.jpg": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-10.jpg": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-11.jpg": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-12.jpg": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-13.jpg": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-14.jpg": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-15.jpg": "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-16.jpg": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-17.jpg": "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&h=600&q=85",
    "menu/m-18.jpg": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&h=600&q=85",
    # Rewards (reuse menu photos)
    "rewards/r-1.jpg": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&h=600&q=85",
    "rewards/r-2.jpg": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&h=600&q=85",
    "rewards/r-3.jpg": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&h=600&q=85",
    "rewards/r-4.jpg": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&h=600&q=85",
    "rewards/r-5.jpg": "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&h=600&q=85",
    "rewards/r-6.jpg": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&h=600&q=85",
    # Promos
    "promos/p-1.jpg": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&h=400&q=85",
    "promos/p-2.jpg": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&h=400&q=85",
    # Misc
    "logo.jpg": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&h=400&q=85",
    "avatar.jpg": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=85",
}

def main():
    for rel_path, url in DOWNLOADS.items():
        dest = os.path.join(BASE, rel_path)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        print(f"Downloading {rel_path}...")
        urllib.request.urlretrieve(url, dest)
        print(f"  OK ({os.path.getsize(dest)} bytes)")

if __name__ == "__main__":
    main()
