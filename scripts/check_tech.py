import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        page = await b.new_page(viewport={"width":1920,"height":900})
        await page.goto("http://localhost:3000", wait_until="networkidle", timeout=60000)
        await page.wait_for_timeout(3000)
        el = await page.query_selector('[data-testid="section-tech"]')
        box = await el.bounding_box()
        await page.evaluate(f"window.scrollTo(0, {int(box['y'])})")
        await page.wait_for_timeout(2500)
        cats = await page.evaluate("document.querySelectorAll('[data-testid^=tech-category-]').length")
        icons = await page.evaluate("""(() => {
          const imgs = [...document.querySelectorAll('[data-testid^=tech-category-] img')]
          return { total: imgs.length, loaded: imgs.filter(i => i.complete && i.naturalWidth > 0).length,
                   failed: imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.alt) }
        })()""")
        print("categories:", cats)
        print("icons:", icons)
        await page.screenshot(path="/app/scripts/tech_section.jpeg", quality=30, type="jpeg")
        await b.close()

asyncio.run(main())
