/**
 * OpenRouter Provider Extension
 *
 * Registers OpenRouter as a provider with popular models.
 * API key is fetched from `passage show openrouter/key`.
 *
 * Usage: pi -e .pi/extensions/openrouter
 * Then use /model to select an openrouter model.
 */

import { execSync } from "child_process";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

function getApiKey(): string {
  try {
    return execSync("passage show openrouter/key", { encoding: "utf-8" }).trim();
  } catch (e) {
    throw new Error("Failed to get OpenRouter API key from passage. Run: passage insert openrouter/key");
  }
}

export default function (pi: ExtensionAPI) {
  const apiKey = getApiKey();

  pi.registerProvider("openrouter", {
    baseUrl: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
    api: "openai-completions",
    authHeader: true,

    models: [
      {
        id: "anthropic/claude-sonnet-4",
        name: "Claude Sonnet 4 (OpenRouter)",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 3, output: 15, cacheRead: 0.3, cacheWrite: 3.75 },
        contextWindow: 200000,
        maxTokens: 64000,
        compat: {
          supportsDeveloperRole: false,
          maxTokensField: "max_tokens",
        },
      },
      {
        id: "anthropic/claude-opus-4",
        name: "Claude Opus 4 (OpenRouter)",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 5, output: 25, cacheRead: 0.5, cacheWrite: 6.25 },
        contextWindow: 200000,
        maxTokens: 64000,
        compat: {
          supportsDeveloperRole: false,
          maxTokensField: "max_tokens",
        },
      },
      {
        id: "google/gemini-2.5-pro-preview",
        name: "Gemini 2.5 Pro (OpenRouter)",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 1.25, output: 10, cacheRead: 0.315, cacheWrite: 0 },
        contextWindow: 1048576,
        maxTokens: 65536,
        compat: {
          supportsDeveloperRole: false,
          maxTokensField: "max_tokens",
        },
      },
      {
        id: "google/gemini-2.5-flash-preview",
        name: "Gemini 2.5 Flash (OpenRouter)",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 0.15, output: 0.6, cacheRead: 0.0375, cacheWrite: 0 },
        contextWindow: 1048576,
        maxTokens: 65536,
        compat: {
          supportsDeveloperRole: false,
          maxTokensField: "max_tokens",
        },
      },
      {
        id: "openai/gpt-4.1",
        name: "GPT-4.1 (OpenRouter)",
        reasoning: false,
        input: ["text", "image"],
        cost: { input: 2, output: 8, cacheRead: 0.5, cacheWrite: 0 },
        contextWindow: 1047576,
        maxTokens: 32768,
        compat: {
          supportsDeveloperRole: true,
          maxTokensField: "max_tokens",
        },
      },
      {
        id: "openai/o3",
        name: "o3 (OpenRouter)",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 2, output: 8, cacheRead: 0.5, cacheWrite: 0 },
        contextWindow: 200000,
        maxTokens: 100000,
        compat: {
          supportsDeveloperRole: true,
          maxTokensField: "max_tokens",
        },
      },
      {
        id: "deepseek/deepseek-r1",
        name: "DeepSeek R1 (OpenRouter)",
        reasoning: true,
        input: ["text"],
        cost: { input: 0.55, output: 2.19, cacheRead: 0.14, cacheWrite: 0 },
        contextWindow: 163840,
        maxTokens: 65536,
        compat: {
          supportsDeveloperRole: false,
          maxTokensField: "max_tokens",
        },
      },
      {
        id: "meta-llama/llama-4-maverick",
        name: "Llama 4 Maverick (OpenRouter)",
        reasoning: false,
        input: ["text", "image"],
        cost: { input: 0.2, output: 0.6, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 1048576,
        maxTokens: 65536,
        compat: {
          supportsDeveloperRole: false,
          maxTokensField: "max_tokens",
        },
      },
    ],
  });
}
