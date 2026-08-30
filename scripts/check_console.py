import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        page = await b.new_page(viewport={"width":1920,"height":900})
        errs = []
        page.on("console", lambda m: errs.append(f"{m.type}: {m.text[:200]}") if m.type in ("error","warning") else None)
        page.on("pageerror", lambda e: errs.append(f"pageerror: {str(e)[:200]}"))
        await page.goto("http://localhost:3000", wait_until="networkidle", timeout=60000)
        await page.wait_for_timeout(4000)
        for e in errs[:10]:
            print(e)
        print("total:", len(errs))
        await b.close()

asyncio.run(main())
