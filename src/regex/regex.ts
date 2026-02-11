export const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇґҐєЄ\s'"-]+$/;

// Telegram: @ + 3–32 characters (letters, numbers, underscore)
export const telegramRegex = /^@[a-zA-Z0-9_]{3,32}$/;

// Instagram: @ + 3–30 characters (letters, numbers, underscore, dot)
export const instagramRegex = /^@[a-zA-Z0-9_.]{3,30}$/;