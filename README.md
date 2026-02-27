# 🐾 ollieNotes

> A fast, keyboard-driven note-taking system for the terminal — named after the goodest boy, Ollie. 🐕

ollieNotes is a lightweight note system built entirely from bash scripts and the [Micro](https://github.com/zyedidia/micro) editor. Notes are plain Markdown files with YAML frontmatter, stored locally and automatically synced to a private GitHub repository every time you save.

No Electron. No subscription. No cloud account. Just you, your terminal, and Ollie's unconditional support.

---

## ✨ Features

- **Instant capture** — one command opens a fresh note, cursor ready on the title line
- **Auto-naming** — the file is named from the `# H1` heading when you close the editor
- **`#hashtag` parsing** — write tags inline in your note body; they're automatically extracted into YAML frontmatter
- **Fuzzy search** — browse, preview, and open notes with an fzf picker (live markdown preview via `bat`)
- **GitHub sync** — every save silently commits and pushes to a private GitHub repo in the background
- **Smart history** — re-saves of the same note within 5 minutes amend the last commit instead of creating noise
- **Offline resilient** — failed pushes are queued and retried automatically on the next save
- **Conflict safe** — pull conflicts abort cleanly, your local note is never overwritten
- **Desktop notifications** — sync errors surface via `notify-send`, not silent log rot

---

## 📋 Prerequisites

| Tool | Purpose | Install |
|------|---------|---------|
| [micro](https://github.com/zyedidia/micro) | Terminal editor | `curl https://getmic.ro \| bash` |
| [fzf](https://github.com/junegunn/fzf) | Fuzzy note picker | `brew install fzf` / `apt install fzf` |
| [bat](https://github.com/sharkdp/bat) | Note preview in picker | `brew install bat` / `apt install bat` |
| [gh](https://cli.github.com) | GitHub sync setup | `brew install gh` / `apt install gh` |
| git | Version control | Usually pre-installed |
| notify-send | Desktop notifications | `apt install libnotify-bin` (optional) |

A floating-window-capable WM (i3, Sway, Hyprland, etc.) is recommended so notes open as a focused popup.

---

## 🚀 Installation

**1. Clone the repo**
```bash
git clone https://github.com/HugoFMesquita/ollieNotes.git
cd ollieNotes
```

**2. Add `bin/` to your PATH**
```bash
# in your ~/.bashrc or ~/.zshrc
export PATH="$HOME/Projects/personal/note-taking/bin:$PATH"
```

**3. Set up GitHub sync** *(one-time)*
```bash
note-setup-github
```
This initialises `~/Notes` as a git repo, creates a private GitHub repository, and pushes your first commit.

---

## 🎮 Usage

### Create a new note
```bash
note
```
The editor opens with a scaffold. Type your `# Title` and note body, then hit **Ctrl+S** to save, close, and sync — all at once.

### Open an existing note
```bash
note-open
```
A fuzzy picker lists all notes sorted by last edit, with a live markdown preview on the right. Hit **Enter** to open.

| Picker keybinding | Action |
|-------------------|--------|
| `Enter` | Open selected note |
| `Ctrl+D` | Delete selected note (with confirmation) |
| `Esc` | Quit without opening |

### Check sync status
```bash
note-sync-status
```
Shows git repo health, last commit, unpushed commits, retry queue, and recent sync log lines.

---

## 📝 Note format

Every note is a plain Markdown file with YAML frontmatter:

```markdown
---
tags: [productivity, bash]
created: 2026-02-27 Thu 15:00
updated: 2026-02-27 Thu 16:30
---

# My Note Title

Write anything here. Use #hashtags inline and they'll be
automatically moved to the frontmatter tags on save.
```

Notes live in `~/Notes/` and are named from the `# H1` heading (slugified). A note titled `# My Shopping List` becomes `my-shopping-list.md`.

---

## ☁️ How GitHub sync works

```
Ctrl+S
  │
  ├─ micro saves file & exits
  │
  ├─ note-parse-tags   → extracts #hashtags into frontmatter
  ├─ rename file       → slugified H1 heading
  │
  └─ note-sync &       → runs in background (you're free instantly)
         │
         ├─ git add
         ├─ git commit  (or --amend if same file, saved < 5 min ago)
         ├─ git pull --rebase
         └─ git push    (queued & retried if offline)
```

**Amend logic** keeps history clean — editing a note multiple times in one session produces one commit, not ten.

**Offline queue** — if a push fails, the file is added to `~/.notes-sync-queue`. On your next save, the queue is flushed before the new commit is pushed.

---

## 📁 Project structure

```
ollieNotes/
├── bin/
│   ├── note                  # Create a new note
│   ├── note-open             # Browse & open existing notes
│   ├── note-delete           # Delete a note (used inside picker)
│   ├── note-parse-tags       # Extract #hashtags into frontmatter
│   ├── note-sync             # Background GitHub sync engine
│   ├── note-sync-status      # Sync health check utility
│   └── note-setup-github     # One-time GitHub setup
│
└── config/micro/
    ├── bindings.json          # Ctrl+S → Save+Quit
    ├── settings.json          # Editor preferences
    ├── colorschemes/          # Catppuccin themes
    └── plug/notes/notes.lua  # Micro plugin (keybindings)
```

---

## 🐾 Why "ollieNotes"?

Named after Ollie — a very good dog who supervised the entire development of this project from his spot on the couch, and whose enthusiasm for fetch is the direct inspiration for this app's approach to saving notes quickly and without fuss.

---

## 📄 License

MIT — do whatever you want with it. Ollie would want that.
