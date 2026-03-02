# Task List

## Pending Validation

- [ ] **Verify Alt-key micro bindings work with swapped modifiers**
  - Sway has `xkb_options altwin:swap_lalt_lwin` (physical left Alt ↔ left Super)
  - Changed micro bindings from `CtrlAlt-` to `Alt-` prefix so they bypass sway's `$mod` grab
  - Test inside a note in micro:
    - `Alt+P` → should open markdown preview in browser via grip
    - `Alt+O` → should open note browser (fzf picker)
    - `Alt+N` → should create a new note
  - If `Alt-` still doesn't work, fall back to `F-key` bindings (F6 confirmed working)
