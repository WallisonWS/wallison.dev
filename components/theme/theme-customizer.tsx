"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const presetThemes = [
  {
    name: "Default",
    primary: "#3b82f6",
    secondary: "#10b981",
    accent: "#8b5cf6",
  },
  {
    name: "Sunset",
    primary: "#f97316",
    secondary: "#ea580c",
    accent: "#c2410c",
  },
  {
    name: "Forest",
    primary: "#059669",
    secondary: "#047857",
    accent: "#065f46",
  },
  {
    name: "Ocean",
    primary: "#0ea5e9",
    secondary: "#0284c7",
    accent: "#0369a1",
  },
]

export default function ThemeCustomizer({ open, onClose, theme, onThemeChange }) {
  const handlePresetChange = (preset) => {
    const selectedPreset = presetThemes.find((t) => t.name.toLowerCase() === preset)
    if (selectedPreset) {
      onThemeChange({
        ...theme,
        primary: selectedPreset.primary,
        secondary: selectedPreset.secondary,
        accent: selectedPreset.accent,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customize Theme</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Preset Themes</Label>
            <Tabs defaultValue="default" className="w-full" onValueChange={handlePresetChange}>
              <TabsList className="grid grid-cols-4 w-full">
                {presetThemes.map((preset) => (
                  <TabsTrigger
                    key={preset.name}
                    value={preset.name.toLowerCase()}
                    className="w-full"
                    style={{ backgroundColor: preset.primary }}
                  >
                    <span className="sr-only">{preset.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label>Primary Color</Label>
            <Input
              type="color"
              value={theme.primary}
              onChange={(e) => onThemeChange({ ...theme, primary: e.target.value })}
              className="w-full h-10"
            />
          </div>

          <div className="space-y-2">
            <Label>Secondary Color</Label>
            <Input
              type="color"
              value={theme.secondary}
              onChange={(e) => onThemeChange({ ...theme, secondary: e.target.value })}
              className="w-full h-10"
            />
          </div>

          <div className="space-y-2">
            <Label>Accent Color</Label>
            <Input
              type="color"
              value={theme.accent}
              onChange={(e) => onThemeChange({ ...theme, accent: e.target.value })}
              className="w-full h-10"
            />
          </div>

          <div className="space-y-2">
            <Label>Border Radius</Label>
            <Select value={theme.radius} onValueChange={(value) => onThemeChange({ ...theme, radius: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select border radius" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Square</SelectItem>
                <SelectItem value="0.25rem">Small</SelectItem>
                <SelectItem value="0.5rem">Medium</SelectItem>
                <SelectItem value="1rem">Large</SelectItem>
                <SelectItem value="9999px">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Animation Style</Label>
            <Select value={theme.animation} onValueChange={(value) => onThemeChange({ ...theme, animation: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select animation style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="smooth">Smooth</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

