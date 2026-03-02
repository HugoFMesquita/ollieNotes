-- notes.lua — keybinding plugin for the note-taking workflow
-- Ctrl+Alt+O   →  open/browse notes via note-open (fzf picker)
-- Ctrl+Alt+N   →  create a new note via note
-- Ctrl+Alt+P   →  preview current note in browser via grip

local micro = import("micro")
local shell = import("micro/shell")
local config = import("micro/config")

-- Resolve the bin/ directory relative to this plugin file's config home
local function binDir()
  return config.ConfigDir .. "/../../bin"
end

function init()
  config.MakeCommand("openNote",    openNote,    config.NoComplete)
  config.MakeCommand("newNote",     newNote,     config.NoComplete)
  config.MakeCommand("previewNote", previewNote, config.NoComplete)

  config.TryBindKey("CtrlAltO",   "command:openNote",    true)
  config.TryBindKey("CtrlAltN",   "command:newNote",     true)
  config.TryBindKey("CtrlAltP",   "command:previewNote", true)
end

function openNote(bp)
  local bin = binDir() .. "/note-open"
  shell.RunInteractiveShell(bin, true, false)
end

function newNote(bp)
  local bin = binDir() .. "/note"
  shell.RunInteractiveShell(bin, true, false)
end

function previewNote(bp)
  local bin = binDir() .. "/note-preview"
  local filepath = bp.Buf.AbsPath
  -- nohup + redirects + & fully detach the preview from micro's terminal
  os.execute("nohup " .. bin .. " '" .. filepath .. "' >/dev/null 2>&1 &")
  micro.InfoBar():Message("Opening preview…")
end
