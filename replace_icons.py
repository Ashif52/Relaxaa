import os
import re

files = [f for f in os.listdir('.') if f.endswith('.html')]

# Clean search for search icon
search_pattern = r'<button class="nav-action-btn" id="searchToggle" aria-label="Search">\s*<svg[^>]*>.*?</svg>\s*</button>'
new_search = """<button class="nav-action-btn" id="searchToggle" aria-label="Search">
                    <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="8" cy="8" r="5"></circle>
                        <line x1="11.5" y1="11.5" x2="16" y2="16"></line>
                    </svg>
                </button>"""

# Clean search for cart icon
cart_pattern = r'<button class="nav-action-btn" id="cartToggle" aria-label="Cart">\s*<svg[^>]*>.*?</svg>\s*<span class="cart-badge" id="cartBadge">\d+</span>\s*</button>'
new_cart = """<button class="nav-action-btn" id="cartToggle" aria-label="Cart">
                    <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h12v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6z"></path>
                        <path d="M6 6V4a3 3 0 0 1 6 0v2"></path>
                    </svg>
                    <span class="cart-badge" id="cartBadge">0</span>
                </button>"""

for f_name in files:
    with open(f_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace search
    content = re.sub(search_pattern, new_search, content, flags=re.DOTALL)
    
    # Replace cart
    content = re.sub(cart_pattern, new_cart, content, flags=re.DOTALL)
    
    with open(f_name, 'w', encoding='utf-8') as f:
        f.write(content)

print("Finished: Icons replaced successfully!")
