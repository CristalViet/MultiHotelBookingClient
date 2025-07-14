"use client"
import { Bubble } from "@typebot.io/react";

export default function ChatbotPage() {
  return (
    <Bubble
      typebot="my-typebot-ymrb7fd"
      apiHost="http://8.219.233.156:8081"
      wsHost="http://8.219.233.156:8787"
      theme={{ button: { backgroundColor: "#000000" } }}
    />
  );
}