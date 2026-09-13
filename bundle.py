import os

base_dir = r"C:\Users\Lechu\.gemini\antigravity\scratch\overthink-ai"
html_file = os.path.join(base_dir, "index.html")
css_file = os.path.join(base_dir, "style.css")
audio_file = os.path.join(base_dir, "audio.js")
app_file = os.path.join(base_dir, "app.js")
out_file = r"C:\Users\Lechu\.gemini\antigravity\brain\307583dc-0b1e-42f0-9c25-ec63daca0090\overthink_ai.html"

with open(html_file, "r", encoding="utf-8") as f:
    html = f.read()

with open(css_file, "r", encoding="utf-8") as f:
    css = f.read()

with open(audio_file, "r", encoding="utf-8") as f:
    audio = f.read()

with open(app_file, "r", encoding="utf-8") as f:
    app = f.read()

# Replace stylesheet link with inline <style>
html = html.replace('<link rel="stylesheet" href="style.css">', f'<style>\n{css}\n  </style>')

# Replace script tags with inline <script>
script_tags = (
    '<script src="audio.js"></script>\n  <script src="app.js"></script>'
)
inline_scripts = f'<script>\n{audio}\n\n{app}\n</script>'

if script_tags in html:
    html = html.replace(script_tags, inline_scripts)
else:
    # Handle windows CRLF if present
    script_tags_crlf = '<script src="audio.js"></script>\r\n  <script src="app.js"></script>'
    html = html.replace(script_tags_crlf, inline_scripts)

with open(out_file, "w", encoding="utf-8") as f:
    f.write(html)

print(f"Bundled successfully into {out_file}. Total size: {len(html)} characters.")
