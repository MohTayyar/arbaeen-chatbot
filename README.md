# Arbaeen Pilgrim Assistant Chatbot

A web-based conversational AI chatbot designed to assist pilgrims during the Arbaeen walk from Najaf to Karbala, Iraq.

## Live Application

https://arbaeen-chatbot.vercel.app

## About the Project

Arbaeen is one of the largest annual human gatherings on earth, drawing an estimated 20 to 25 million pilgrims to Karbala each year. This chatbot helps pilgrims by answering questions in three core areas:

- Mawkib station locations along the route
- First aid guidance for heat exhaustion, dehydration, and foot blisters
- Route and distance information from Najaf to Karbala

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React.js with Vite |
| AI Model | Llama 3.1 8B Instant |
| AI API | Groq (free tier) |
| Hosting | Vercel |
| Version Control | Git and GitHub |

## Project Context

This project was developed as part of the Advanced Online Business course at the University of Tehran, Farabi College, following an agile methodology with four sprints over six weeks.

**Student:** Mohammed Razzaq Mohsen Al-Tayyar  
**Student ID:** 220704109

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file and add your Groq API key: `VITE_GROQ_API_KEY=your_key_here`
4. Run `npm run dev`
EOF