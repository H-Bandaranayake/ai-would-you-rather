import { Question } from "./types";

// A large hand-written SFW pool for university-fair play.
// Questions are designed with two interesting trade-offs rather than a clear good/bad answer.
export const FALLBACK_QUESTIONS: Question[] = [
  {
    category: "absurd daily life",
    optionA: {
      text: "Have a door that opens only when you tell a joke",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "Have a window that opens only when you sing",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Have socks that always match but never feel the same",
      traits: ["comfort", "logic"],
    },
    optionB: {
      text: "Have shoes that feel the same but never match",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Have your alarm choose a new funny sound every day",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Have your alarm choose a new song every day",
      traits: ["comfort", "social"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Have a backpack that is always perfectly organized",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "Have a backpack that always contains one random useful item",
      traits: ["chaos", "vibes"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Have every elevator ride include a random sound effect",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Have every staircase play a random song as you climb",
      traits: ["social", "comfort"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Have your shadow wear a tiny hat",
      traits: ["vibes", "chaos"],
    },
    optionB: {
      text: "Have your reflection wear a different hat",
      traits: ["social", "vibes"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Have your chair gently spin whenever you sit down",
      traits: ["chaos", "comfort"],
    },
    optionB: {
      text: "Have your desk gently move whenever you stand up",
      traits: ["vibes", "logic"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Have a fridge light that changes color with your mood",
      traits: ["vibes", "comfort"],
    },
    optionB: {
      text: "Have a room light that changes color with the weather",
      traits: ["logic", "chaos"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Have every pen you use write in a random color",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Have every pencil you use draw a tiny star at the end",
      traits: ["vibes", "vibes"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Have your pillow change shape every night",
      traits: ["comfort", "chaos"],
    },
    optionB: {
      text: "Have your blanket change pattern every night",
      traits: ["vibes", "longterm"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Have your backpack say 'good luck' when you leave home",
      traits: ["social", "vibes"],
    },
    optionB: {
      text: "Have your shoes say 'welcome back' when you return",
      traits: ["comfort", "chaos"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Have every cup you use be a different shape",
      traits: ["vibes", "chaos"],
    },
    optionB: {
      text: "Have every plate you use be a different pattern",
      traits: ["comfort", "vibes"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Have your keys make a tiny bell sound when you find them",
      traits: ["vibes", "comfort"],
    },
    optionB: {
      text: "Have your phone play a tiny drumroll when you find it",
      traits: ["chaos", "social"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Have your room smell like rain every morning",
      traits: ["comfort", "vibes"],
    },
    optionB: {
      text: "Have your room smell like fresh bread every evening",
      traits: ["comfort", "longterm"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Have your backpack always feel light but hold the same items",
      traits: ["comfort", "logic"],
    },
    optionB: {
      text: "Have your backpack always feel heavy but hold one surprise item",
      traits: ["chaos", "vibes"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Teleport anywhere but only to places you have seen",
      traits: ["power", "logic"],
    },
    optionB: {
      text: "Fly anywhere but only at bicycle speed",
      traits: ["comfort", "longterm"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Talk to animals but they can only ask questions",
      traits: ["social", "chaos"],
    },
    optionB: {
      text: "Talk to plants but they can only tell stories",
      traits: ["peace", "vibes"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Pause time for 30 seconds once a day",
      traits: ["power", "shortterm"],
    },
    optionB: {
      text: "Replay the last 30 seconds once a day",
      traits: ["logic", "shortterm"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Always know where north is",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "Always know how far away your destination is",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Make any drawing move for one minute",
      traits: ["vibes", "chaos"],
    },
    optionB: {
      text: "Make any photo play its sounds for one minute",
      traits: ["vibes", "social"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Understand every language but speak only one",
      traits: ["logic", "social"],
    },
    optionB: {
      text: "Speak every language but read only one",
      traits: ["social", "logic"],
    },
  },
  {
    category: "superpowers",
    optionA: { text: "Make small objects float", traits: ["power", "vibes"] },
    optionB: {
      text: "Make small objects move in perfect circles",
      traits: ["power", "logic"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Remember every face you see",
      traits: ["social", "logic"],
    },
    optionB: {
      text: "Remember every place you visit",
      traits: ["vibes", "longterm"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Always know the best route but never the fastest route",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "Always know the fastest route but never the prettiest route",
      traits: ["logic", "vibes"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Change the color of anything you touch for one hour",
      traits: ["vibes", "chaos"],
    },
    optionB: {
      text: "Change the shape of anything you touch for one hour",
      traits: ["vibes", "logic"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Make rain fall only in a small circle",
      traits: ["chaos", "power"],
    },
    optionB: {
      text: "Make sunshine appear only in a small circle",
      traits: ["comfort", "power"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Understand machines but only when they are turned off",
      traits: ["logic", "chaos"],
    },
    optionB: {
      text: "Understand computers but only when they are connected to the internet",
      traits: ["logic", "logic"],
    },
  },
  {
    category: "superpowers",
    optionA: { text: "Grow a tiny tree instantly", traits: ["peace", "vibes"] },
    optionB: {
      text: "Grow a tiny flower instantly",
      traits: ["comfort", "vibes"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Make any book appear in your hand",
      traits: ["logic", "power"],
    },
    optionB: {
      text: "Make any song appear in your mind",
      traits: ["vibes", "comfort"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Always find the thing you lost within ten minutes",
      traits: ["logic", "shortterm"],
    },
    optionB: {
      text: "Always remember where you last put it",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Have unlimited phone storage but slow charging",
      traits: ["comfort", "longterm"],
    },
    optionB: {
      text: "Have fast charging but limited phone storage",
      traits: ["logic", "shortterm"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Have perfect Wi-Fi but only in one room",
      traits: ["comfort", "solitary"],
    },
    optionB: {
      text: "Have average Wi-Fi that works everywhere",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Have a phone that never needs updates but looks old",
      traits: ["comfort", "longterm"],
    },
    optionB: {
      text: "Have a phone that always gets new features but changes its layout",
      traits: ["chaos", "vibes"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Have autocorrect suggest a funny word once a day",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "Have autocorrect add one emoji to every message",
      traits: ["vibes", "social"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Have headphones that make music sound extra clear",
      traits: ["comfort", "vibes"],
    },
    optionB: {
      text: "Have speakers that make voices extra clear",
      traits: ["logic", "social"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Have your laptop boot instantly but shut down slowly",
      traits: ["shortterm", "comfort"],
    },
    optionB: {
      text: "Have your laptop shut down instantly but boot slowly",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Have every app use the same simple design",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "Have every app use a completely different design",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Have a search engine that gives one perfect answer",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "Have a search engine that gives five unusual answers",
      traits: ["vibes", "vibes"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Have your phone battery show exact minutes remaining",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "Have it show only three levels: low, medium, high",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Have your camera take perfect landscapes",
      traits: ["vibes", "vibes"],
    },
    optionB: {
      text: "Have your camera take perfect portraits",
      traits: ["social", "comfort"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Have a keyboard that predicts your next sentence",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "Have a keyboard that suggests three different sentence styles",
      traits: ["vibes", "social"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Have one giant screen for everything",
      traits: ["comfort", "solitary"],
    },
    optionB: {
      text: "Have three small screens for different tasks",
      traits: ["logic", "chaos"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Have your notifications arrive in batches every hour",
      traits: ["peace", "logic"],
    },
    optionB: {
      text: "Have them arrive instantly but quietly",
      traits: ["shortterm", "social"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Have your maps show the shortest route",
      traits: ["logic", "shortterm"],
    },
    optionB: {
      text: "Have your maps show the most interesting route",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Have your laptop keyboard light match your typing speed",
      traits: ["vibes", "logic"],
    },
    optionB: {
      text: "Have it match the time of day",
      traits: ["comfort", "chaos"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Visit any past day for one hour",
      traits: ["shortterm", "vibes"],
    },
    optionB: {
      text: "Visit any future day for one hour",
      traits: ["longterm", "logic"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "See one minute into the future whenever you want",
      traits: ["shortterm", "logic"],
    },
    optionB: {
      text: "See one year into the future once a year",
      traits: ["longterm", "vibes"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Send one photo to your past self",
      traits: ["vibes", "shortterm"],
    },
    optionB: {
      text: "Receive one photo from your future self",
      traits: ["vibes", "longterm"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Relive a favorite meal from the past",
      traits: ["comfort", "vibes"],
    },
    optionB: {
      text: "Preview a meal you will eat in the future",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Spend a day in the past with modern knowledge",
      traits: ["logic", "chaos"],
    },
    optionB: {
      text: "Spend a day in the future with no modern devices",
      traits: ["vibes", "solitary"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Pause your own time for ten minutes",
      traits: ["power", "comfort"],
    },
    optionB: {
      text: "Speed up your own time for ten minutes",
      traits: ["power", "shortterm"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Know exactly what happened yesterday",
      traits: ["logic", "shortterm"],
    },
    optionB: {
      text: "Know exactly what will happen tomorrow",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Meet your younger self for five minutes",
      traits: ["vibes", "shortterm"],
    },
    optionB: {
      text: "Meet your older self for five minutes",
      traits: ["longterm", "logic"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Keep one memory from the future",
      traits: ["longterm", "logic"],
    },
    optionB: {
      text: "Keep one memory from the past that you forgot",
      traits: ["comfort", "vibes"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Visit any historical place but cannot take photos",
      traits: ["vibes", "solitary"],
    },
    optionB: {
      text: "Visit any future place but can only take one photo",
      traits: ["longterm", "vibes"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Repeat one hour whenever you want",
      traits: ["shortterm", "power"],
    },
    optionB: {
      text: "Skip one boring hour whenever you want",
      traits: ["comfort", "shortterm"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Know the exact time of one future event",
      traits: ["logic", "longterm"],
    },
    optionB: {
      text: "Know the exact place of one future event",
      traits: ["logic", "vibes"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Watch one future movie before it is released",
      traits: ["vibes", "shortterm"],
    },
    optionB: {
      text: "Listen to one future song before it is released",
      traits: ["vibes", "social"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Visit your past school for one day",
      traits: ["comfort", "vibes"],
    },
    optionB: {
      text: "Visit your future university for one day",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Change one small choice from yesterday",
      traits: ["shortterm", "logic"],
    },
    optionB: {
      text: "Make one small choice for tomorrow in advance",
      traits: ["longterm", "power"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A dog that finds your missing socks",
      traits: ["comfort", "chaos"],
    },
    optionB: {
      text: "A cat that finds your missing pens",
      traits: ["logic", "vibes"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A parrot that tells one funny joke each morning",
      traits: ["social", "vibes"],
    },
    optionB: {
      text: "A crow that brings one interesting object each evening",
      traits: ["chaos", "logic"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A turtle that reminds you to slow down",
      traits: ["peace", "comfort"],
    },
    optionB: {
      text: "A rabbit that reminds you to move faster",
      traits: ["chaos", "shortterm"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "An owl that helps you study at night",
      traits: ["logic", "solitary"],
    },
    optionB: {
      text: "A squirrel that helps you organize your desk",
      traits: ["logic", "chaos"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A dolphin that guides you on water trips",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "An eagle that guides you on mountain trips",
      traits: ["chaos", "solitary"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A penguin that brings you a tiny gift each day",
      traits: ["comfort", "social"],
    },
    optionB: {
      text: "A fox that tells you a new story each day",
      traits: ["vibes", "vibes"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A bee that helps your garden grow",
      traits: ["peace", "longterm"],
    },
    optionB: {
      text: "A butterfly that helps you find flowers",
      traits: ["vibes", "vibes"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A hamster that reminds you about tasks",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "A rabbit that reminds you about breaks",
      traits: ["comfort", "chaos"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A crow that remembers every place you visit",
      traits: ["logic", "vibes"],
    },
    optionB: {
      text: "A dolphin that remembers every person you meet",
      traits: ["social", "longterm"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A cat that chooses your study music",
      traits: ["vibes", "comfort"],
    },
    optionB: {
      text: "A dog that chooses your study snacks",
      traits: ["social", "chaos"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A parrot that translates animal sounds",
      traits: ["social", "logic"],
    },
    optionB: {
      text: "An owl that translates bird sounds",
      traits: ["logic", "vibes"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A goat that always finds the safest path",
      traits: ["logic", "chaos"],
    },
    optionB: {
      text: "A deer that always finds the quietest path",
      traits: ["peace", "vibes"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A tiny elephant that remembers every birthday",
      traits: ["social", "longterm"],
    },
    optionB: {
      text: "A tiny giraffe that remembers every appointment",
      traits: ["logic", "comfort"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A frog that predicts rain ten minutes early",
      traits: ["logic", "shortterm"],
    },
    optionB: {
      text: "A lizard that predicts sunshine ten minutes early",
      traits: ["vibes", "comfort"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A squirrel that hides useful items for you",
      traits: ["chaos", "logic"],
    },
    optionB: {
      text: "A raccoon that collects interesting items for you",
      traits: ["vibes", "logic"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Have every meal taste slightly different each time",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Have every meal look slightly different each time",
      traits: ["vibes", "vibes"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Have perfect breakfast every morning",
      traits: ["comfort", "longterm"],
    },
    optionB: {
      text: "Have perfect dinner every evening",
      traits: ["comfort", "vibes"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Have your favorite meal served hot",
      traits: ["comfort", "vibes"],
    },
    optionB: {
      text: "Have your favorite dessert served cold",
      traits: ["comfort", "chaos"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Have a mystery snack in your bag every day",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Have a mystery drink in your fridge every day",
      traits: ["comfort", "logic"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Have every sandwich cut into a new shape",
      traits: ["vibes", "vibes"],
    },
    optionB: {
      text: "Have every pizza cut into a new shape",
      traits: ["vibes", "social"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Have unlimited rice dishes but no noodles",
      traits: ["comfort", "logic"],
    },
    optionB: {
      text: "Have unlimited noodles but no rice dishes",
      traits: ["vibes", "comfort"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Have every fruit be extra crunchy",
      traits: ["vibes", "comfort"],
    },
    optionB: {
      text: "Have every fruit be extra juicy",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Have tea always be the perfect temperature",
      traits: ["comfort", "logic"],
    },
    optionB: {
      text: "Have coffee always be the perfect temperature",
      traits: ["comfort", "vibes"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Have a dessert that changes flavor every bite",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Have a drink that changes flavor every sip",
      traits: ["chaos", "vibes"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Have every meal come with a tiny surprise",
      traits: ["vibes", "chaos"],
    },
    optionB: {
      text: "Have every meal come with a tiny puzzle",
      traits: ["logic", "logic"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Have breakfast at sunrise every day",
      traits: ["peace", "longterm"],
    },
    optionB: {
      text: "Have dinner under the stars every day",
      traits: ["vibes", "social"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Have your food arranged by color",
      traits: ["logic", "vibes"],
    },
    optionB: {
      text: "Have your food arranged by shape",
      traits: ["vibes", "logic"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Have every soup taste like a different spice",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Have every sandwich use a different sauce",
      traits: ["vibes", "comfort"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Have one huge meal each day",
      traits: ["comfort", "shortterm"],
    },
    optionB: {
      text: "Have several small meals throughout the day",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Have your favorite snack always available but slightly different",
      traits: ["comfort", "chaos"],
    },
    optionB: {
      text: "Have it exactly the same but only once a week",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "social situations",
    optionA: {
      text: "Always have a great story ready",
      traits: ["social", "vibes"],
    },
    optionB: {
      text: "Always have a great question ready",
      traits: ["social", "logic"],
    },
  },
  {
    category: "social situations",
    optionA: {
      text: "Be the person who starts every conversation",
      traits: ["social", "power"],
    },
    optionB: {
      text: "Be the person who keeps every conversation going",
      traits: ["social", "comfort"],
    },
  },
  {
    category: "social situations",
    optionA: {
      text: "Always know one interesting fact",
      traits: ["logic", "vibes"],
    },
    optionB: {
      text: "Always know one funny observation",
      traits: ["social", "vibes"],
    },
  },
  {
    category: "social situations",
    optionA: {
      text: "Have a group chat that is always active",
      traits: ["social", "chaos"],
    },
    optionB: {
      text: "Have a group chat that only sends important messages",
      traits: ["logic", "peace"],
    },
  },
  {
    category: "social situations",
    optionA: {
      text: "Give the first presentation of the day",
      traits: ["shortterm", "power"],
    },
    optionB: {
      text: "Give the last presentation of the day",
      traits: ["longterm", "comfort"],
    },
  },
  {
    category: "social situations",
    optionA: {
      text: "Always get the perfect seat in a group",
      traits: ["comfort", "logic"],
    },
    optionB: {
      text: "Always get the perfect time to speak",
      traits: ["social", "power"],
    },
  },
  {
    category: "social situations",
    optionA: {
      text: "Meet someone who shares your hobbies",
      traits: ["comfort", "social"],
    },
    optionB: {
      text: "Meet someone who introduces you to new hobbies",
      traits: ["logic", "chaos"],
    },
  },
  {
    category: "social situations",
    optionA: {
      text: "Have friends who plan everything",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "Have friends who decide everything at the last minute",
      traits: ["chaos", "vibes"],
    },
  },
  {
    category: "social situations",
    optionA: {
      text: "Always remember people's names",
      traits: ["logic", "social"],
    },
    optionB: {
      text: "Always remember people's favorite things",
      traits: ["social", "longterm"],
    },
  },
  {
    category: "social situations",
    optionA: {
      text: "Be great at starting jokes",
      traits: ["vibes", "social"],
    },
    optionB: {
      text: "Be great at finishing jokes",
      traits: ["vibes", "social"],
    },
  },
  {
    category: "social situations",
    optionA: {
      text: "Always have a quiet place in a busy event",
      traits: ["peace", "solitary"],
    },
    optionB: {
      text: "Always have a lively place in a quiet event",
      traits: ["social", "chaos"],
    },
  },
  {
    category: "social situations",
    optionA: {
      text: "Talk to a stranger who has traveled everywhere",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "Talk to a stranger who has built many things",
      traits: ["vibes", "logic"],
    },
  },
  {
    category: "social situations",
    optionA: {
      text: "Always get invited to small gatherings",
      traits: ["comfort", "social"],
    },
    optionB: {
      text: "Always get invited to large events",
      traits: ["social", "chaos"],
    },
  },
  {
    category: "social situations",
    optionA: {
      text: "Be the person who remembers birthdays",
      traits: ["longterm", "social"],
    },
    optionB: {
      text: "Be the person who remembers funny moments",
      traits: ["vibes", "social"],
    },
  },
  {
    category: "social situations",
    optionA: {
      text: "Have one close teammate for every project",
      traits: ["comfort", "longterm"],
    },
    optionB: {
      text: "Have a new teammate for every project",
      traits: ["chaos", "social"],
    },
  },
  {
    category: "travel and adventure",
    optionA: {
      text: "Travel by train through mountains",
      traits: ["peace", "chaos"],
    },
    optionB: {
      text: "Travel by bus along the coast",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "travel and adventure",
    optionA: {
      text: "Visit a famous city you have never seen",
      traits: ["social", "logic"],
    },
    optionB: {
      text: "Visit a quiet town nobody in your group knows",
      traits: ["peace", "vibes"],
    },
  },
  {
    category: "travel and adventure",
    optionA: {
      text: "Have a trip with a detailed plan",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "Have a trip with only the first day planned",
      traits: ["chaos", "vibes"],
    },
  },
  {
    category: "travel and adventure",
    optionA: {
      text: "Explore a huge library in another country",
      traits: ["logic", "peace"],
    },
    optionB: {
      text: "Explore a huge science museum in another country",
      traits: ["logic", "vibes"],
    },
  },
  {
    category: "travel and adventure",
    optionA: {
      text: "Watch sunrise from a mountain",
      traits: ["chaos", "peace"],
    },
    optionB: {
      text: "Watch sunset beside a lake",
      traits: ["comfort", "vibes"],
    },
  },
  {
    category: "travel and adventure",
    optionA: {
      text: "Take a trip with one small backpack",
      traits: ["comfort", "shortterm"],
    },
    optionB: {
      text: "Take a trip with one large suitcase",
      traits: ["comfort", "longterm"],
    },
  },
  {
    category: "travel and adventure",
    optionA: {
      text: "Visit a place famous for food",
      traits: ["vibes", "social"],
    },
    optionB: {
      text: "Visit a place famous for nature",
      traits: ["peace", "chaos"],
    },
  },
  {
    category: "travel and adventure",
    optionA: {
      text: "Take a road trip with a perfect playlist",
      traits: ["comfort", "vibes"],
    },
    optionB: {
      text: "Take a road trip with no planned playlist",
      traits: ["chaos", "social"],
    },
  },
  {
    category: "travel and adventure",
    optionA: {
      text: "Always know the best local food spot",
      traits: ["logic", "social"],
    },
    optionB: {
      text: "Always know the best local view",
      traits: ["vibes", "vibes"],
    },
  },
  {
    category: "travel and adventure",
    optionA: { text: "Explore an old castle", traits: ["logic", "vibes"] },
    optionB: {
      text: "Explore a futuristic city",
      traits: ["longterm", "logic"],
    },
  },
  {
    category: "travel and adventure",
    optionA: {
      text: "Spend a day exploring alone",
      traits: ["solitary", "peace"],
    },
    optionB: {
      text: "Spend a day exploring with a small group",
      traits: ["social", "chaos"],
    },
  },
  {
    category: "travel and adventure",
    optionA: {
      text: "Travel only in cool weather",
      traits: ["comfort", "longterm"],
    },
    optionB: {
      text: "Travel only in warm weather",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "travel and adventure",
    optionA: {
      text: "Always find a hidden café while traveling",
      traits: ["vibes", "vibes"],
    },
    optionB: {
      text: "Always find a hidden viewpoint while traveling",
      traits: ["chaos", "peace"],
    },
  },
  {
    category: "travel and adventure",
    optionA: { text: "Take photos of every trip", traits: ["vibes", "social"] },
    optionB: {
      text: "Keep a written journal of every trip",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "travel and adventure",
    optionA: {
      text: "Visit the same place every year",
      traits: ["comfort", "longterm"],
    },
    optionB: {
      text: "Visit a new place every year",
      traits: ["chaos", "logic"],
    },
  },
  {
    category: "campus life",
    optionA: {
      text: "Have a class that starts early but ends early",
      traits: ["shortterm", "logic"],
    },
    optionB: {
      text: "Have a class that starts late but ends late",
      traits: ["comfort", "longterm"],
    },
  },
  {
    category: "campus life",
    optionA: {
      text: "Always get the seat near the window",
      traits: ["comfort", "vibes"],
    },
    optionB: {
      text: "Always get the seat near the door",
      traits: ["logic", "social"],
    },
  },
  {
    category: "campus life",
    optionA: {
      text: "Have a campus café with endless new snacks",
      traits: ["vibes", "social"],
    },
    optionB: {
      text: "Have a campus library with endless new books",
      traits: ["logic", "solitary"],
    },
  },
  {
    category: "campus life",
    optionA: {
      text: "Work on projects with your closest friends",
      traits: ["comfort", "social"],
    },
    optionB: {
      text: "Work on projects with people from different subjects",
      traits: ["logic", "logic"],
    },
  },
  {
    category: "campus life",
    optionA: {
      text: "Have every lecture recorded",
      traits: ["comfort", "longterm"],
    },
    optionB: {
      text: "Have every lecture turned into a short visual summary",
      traits: ["logic", "vibes"],
    },
  },
  {
    category: "campus life",
    optionA: {
      text: "Always find an empty study room",
      traits: ["solitary", "comfort"],
    },
    optionB: {
      text: "Always find a quiet outdoor study spot",
      traits: ["peace", "vibes"],
    },
  },
  {
    category: "campus life",
    optionA: {
      text: "Have a timetable with free mornings",
      traits: ["comfort", "shortterm"],
    },
    optionB: {
      text: "Have a timetable with free afternoons",
      traits: ["comfort", "longterm"],
    },
  },
  {
    category: "campus life",
    optionA: {
      text: "Present a project with slides",
      traits: ["logic", "vibes"],
    },
    optionB: {
      text: "Present a project with a live demo",
      traits: ["social", "chaos"],
    },
  },
  {
    category: "campus life",
    optionA: {
      text: "Have a campus event every weekend",
      traits: ["social", "chaos"],
    },
    optionB: {
      text: "Have one large campus event each month",
      traits: ["social", "longterm"],
    },
  },
  {
    category: "campus life",
    optionA: {
      text: "Always have a charged laptop on campus",
      traits: ["comfort", "logic"],
    },
    optionB: {
      text: "Always have a fast internet connection on campus",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "campus life",
    optionA: {
      text: "Study in complete silence",
      traits: ["solitary", "logic"],
    },
    optionB: {
      text: "Study with quiet background music",
      traits: ["vibes", "comfort"],
    },
  },
  {
    category: "campus life",
    optionA: {
      text: "Have every assignment explained with examples",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "Have every assignment explained with diagrams",
      traits: ["vibes", "vibes"],
    },
  },
  {
    category: "campus life",
    optionA: {
      text: "Join a club based on your main skill",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "Join a club based on a skill you want to learn",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "campus life",
    optionA: {
      text: "Have a study partner who asks questions",
      traits: ["social", "logic"],
    },
    optionB: {
      text: "Have a study partner who explains ideas",
      traits: ["social", "comfort"],
    },
  },
  {
    category: "campus life",
    optionA: {
      text: "Get a surprise topic for a presentation",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Choose your own presentation topic",
      traits: ["logic", "comfort"],
    },
  },
  {
    category: "vibes",
    optionA: {
      text: "Be able to draw anything from memory",
      traits: ["vibes", "logic"],
    },
    optionB: {
      text: "Be able to describe anything so clearly it can be drawn",
      traits: ["social", "vibes"],
    },
  },
  {
    category: "vibes",
    optionA: {
      text: "Write a great story in one hour",
      traits: ["logic", "vibes"],
    },
    optionB: {
      text: "Make a great short film in one hour",
      traits: ["social", "vibes"],
    },
  },
  {
    category: "vibes",
    optionA: {
      text: "Have unlimited ideas but limited time",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Have plenty of time but fewer ideas",
      traits: ["comfort", "longterm"],
    },
  },
  {
    category: "vibes",
    optionA: {
      text: "Make music that matches any mood",
      traits: ["vibes", "vibes"],
    },
    optionB: {
      text: "Make art that matches any mood",
      traits: ["social", "vibes"],
    },
  },
  {
    category: "vibes",
    optionA: {
      text: "Create a new invention every month",
      traits: ["logic", "longterm"],
    },
    optionB: {
      text: "Create a new story every week",
      traits: ["vibes", "shortterm"],
    },
  },
  {
    category: "vibes",
    optionA: {
      text: "Always find the perfect title",
      traits: ["logic", "vibes"],
    },
    optionB: {
      text: "Always find the perfect opening line",
      traits: ["vibes", "social"],
    },
  },
  {
    category: "vibes",
    optionA: {
      text: "Have a notebook that fills itself with ideas",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Have a camera that captures your best ideas as images",
      traits: ["vibes", "logic"],
    },
  },
  {
    category: "vibes",
    optionA: {
      text: "Make any boring topic funny",
      traits: ["social", "vibes"],
    },
    optionB: {
      text: "Make any difficult topic simple",
      traits: ["logic", "comfort"],
    },
  },
  {
    category: "vibes",
    optionA: { text: "Design a video game world", traits: ["chaos", "vibes"] },
    optionB: {
      text: "Design a futuristic city",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "vibes",
    optionA: { text: "Be great at photography", traits: ["vibes", "vibes"] },
    optionB: { text: "Be great at video editing", traits: ["logic", "vibes"] },
  },
  {
    category: "vibes",
    optionA: {
      text: "Have a room where every wall can be drawn on",
      traits: ["vibes", "chaos"],
    },
    optionB: {
      text: "Have a desk where every surface can be rearranged",
      traits: ["logic", "comfort"],
    },
  },
  {
    category: "vibes",
    optionA: {
      text: "Create a logo for every idea you have",
      traits: ["vibes", "vibes"],
    },
    optionB: {
      text: "Create a name for every idea you have",
      traits: ["logic", "social"],
    },
  },
  {
    category: "vibes",
    optionA: {
      text: "Make a tiny robot companion",
      traits: ["logic", "vibes"],
    },
    optionB: {
      text: "Make a tiny flying camera companion",
      traits: ["vibes", "power"],
    },
  },
  {
    category: "vibes",
    optionA: {
      text: "Turn your dreams into short stories",
      traits: ["vibes", "vibes"],
    },
    optionB: {
      text: "Turn your daydreams into short animations",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "vibes",
    optionA: {
      text: "Always get inspired by music",
      traits: ["vibes", "vibes"],
    },
    optionB: {
      text: "Always get inspired by places",
      traits: ["vibes", "vibes"],
    },
  },
  {
    category: "nature and science",
    optionA: {
      text: "Have a garden that blooms in every season",
      traits: ["peace", "longterm"],
    },
    optionB: {
      text: "Have a small pond that always has new wildlife",
      traits: ["vibes", "vibes"],
    },
  },
  {
    category: "nature and science",
    optionA: {
      text: "Watch the stars from a quiet hill",
      traits: ["peace", "vibes"],
    },
    optionB: {
      text: "Watch clouds from a quiet beach",
      traits: ["comfort", "peace"],
    },
  },
  {
    category: "nature and science",
    optionA: {
      text: "Understand how every machine works",
      traits: ["logic", "logic"],
    },
    optionB: {
      text: "Understand how every animal communicates",
      traits: ["peace", "social"],
    },
  },
  {
    category: "nature and science",
    optionA: {
      text: "Explore a deep cave with a guide",
      traits: ["chaos", "solitary"],
    },
    optionB: {
      text: "Explore a rainforest with a guide",
      traits: ["chaos", "social"],
    },
  },
  {
    category: "nature and science",
    optionA: {
      text: "See a meteor shower once a year",
      traits: ["vibes", "longterm"],
    },
    optionB: {
      text: "See a rare rainbow once a year",
      traits: ["vibes", "shortterm"],
    },
  },
  {
    category: "nature and science",
    optionA: {
      text: "Have a telescope that shows distant planets",
      traits: ["logic", "logic"],
    },
    optionB: {
      text: "Have binoculars that show tiny details nearby",
      traits: ["vibes", "vibes"],
    },
  },
  {
    category: "nature and science",
    optionA: {
      text: "Know the name of every tree you see",
      traits: ["logic", "peace"],
    },
    optionB: {
      text: "Know the name of every bird you see",
      traits: ["logic", "vibes"],
    },
  },
  {
    category: "nature and science",
    optionA: {
      text: "Visit a science lab after hours with a guide",
      traits: ["logic", "logic"],
    },
    optionB: {
      text: "Visit an observatory after hours with a guide",
      traits: ["vibes", "vibes"],
    },
  },
  {
    category: "nature and science",
    optionA: {
      text: "Always find a quiet waterfall",
      traits: ["peace", "chaos"],
    },
    optionB: {
      text: "Always find a quiet forest path",
      traits: ["peace", "vibes"],
    },
  },
  {
    category: "nature and science",
    optionA: {
      text: "Have a tiny weather station at home",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "Have a tiny star map on your wall",
      traits: ["vibes", "logic"],
    },
  },
  {
    category: "nature and science",
    optionA: {
      text: "See the ocean from a high cliff",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "See a mountain range from a high viewpoint",
      traits: ["peace", "vibes"],
    },
  },
  {
    category: "nature and science",
    optionA: {
      text: "Grow herbs in a small indoor garden",
      traits: ["comfort", "longterm"],
    },
    optionB: {
      text: "Grow flowers in a small balcony garden",
      traits: ["vibes", "peace"],
    },
  },
  {
    category: "nature and science",
    optionA: {
      text: "Learn one new science fact every morning",
      traits: ["logic", "shortterm"],
    },
    optionB: {
      text: "Learn one new nature fact every evening",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "nature and science",
    optionA: {
      text: "Have a pet-friendly garden full of birds",
      traits: ["social", "peace"],
    },
    optionB: {
      text: "Have a quiet garden full of butterflies",
      traits: ["peace", "vibes"],
    },
  },
  {
    category: "nature and science",
    optionA: {
      text: "Build a simple weather sensor",
      traits: ["logic", "logic"],
    },
    optionB: {
      text: "Build a simple plant sensor",
      traits: ["logic", "peace"],
    },
  },
  {
    category: "entertainment",
    optionA: {
      text: "Watch a movie you have never heard of",
      traits: ["chaos", "logic"],
    },
    optionB: {
      text: "Watch a movie you already know you enjoy",
      traits: ["comfort", "vibes"],
    },
  },
  {
    category: "entertainment",
    optionA: {
      text: "Play a game with a huge world",
      traits: ["vibes", "vibes"],
    },
    optionB: {
      text: "Play a game with a very clever story",
      traits: ["logic", "vibes"],
    },
  },
  {
    category: "entertainment",
    optionA: {
      text: "Listen to one album all day",
      traits: ["comfort", "longterm"],
    },
    optionB: {
      text: "Listen to a new playlist every hour",
      traits: ["chaos", "vibes"],
    },
  },
  {
    category: "entertainment",
    optionA: {
      text: "Have a personal cinema room",
      traits: ["comfort", "solitary"],
    },
    optionB: {
      text: "Have a personal gaming room",
      traits: ["vibes", "social"],
    },
  },
  {
    category: "entertainment",
    optionA: {
      text: "Read a book with an unexpected ending",
      traits: ["chaos", "logic"],
    },
    optionB: {
      text: "Read a book with a beautiful beginning",
      traits: ["vibes", "comfort"],
    },
  },
  {
    category: "entertainment",
    optionA: {
      text: "Watch live sports from the front row",
      traits: ["social", "vibes"],
    },
    optionB: {
      text: "Watch a live concert from the front row",
      traits: ["social", "vibes"],
    },
  },
  {
    category: "entertainment",
    optionA: {
      text: "Play board games every Friday",
      traits: ["social", "logic"],
    },
    optionB: {
      text: "Play video games every Friday",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "entertainment",
    optionA: {
      text: "Have unlimited documentaries",
      traits: ["logic", "logic"],
    },
    optionB: {
      text: "Have unlimited fictional stories",
      traits: ["vibes", "vibes"],
    },
  },
  {
    category: "entertainment",
    optionA: { text: "Watch one long movie", traits: ["comfort", "longterm"] },
    optionB: {
      text: "Watch three short movies",
      traits: ["chaos", "shortterm"],
    },
  },
  {
    category: "entertainment",
    optionA: {
      text: "Have a playlist for every activity",
      traits: ["logic", "vibes"],
    },
    optionB: {
      text: "Have one playlist that works for everything",
      traits: ["comfort", "chaos"],
    },
  },
  {
    category: "entertainment",
    optionA: {
      text: "Always discover a new favorite song",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Always rediscover an old favorite song",
      traits: ["comfort", "longterm"],
    },
  },
  {
    category: "entertainment",
    optionA: {
      text: "Play a game where every choice changes the story",
      traits: ["logic", "power"],
    },
    optionB: {
      text: "Play a game where the world changes randomly",
      traits: ["chaos", "vibes"],
    },
  },
  {
    category: "entertainment",
    optionA: {
      text: "Have a comedy show made about your daily life",
      traits: ["social", "vibes"],
    },
    optionB: {
      text: "Have an animated show based on your dreams",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "entertainment",
    optionA: {
      text: "Always know a movie's release date",
      traits: ["logic", "shortterm"],
    },
    optionB: {
      text: "Always know a game's release date",
      traits: ["logic", "vibes"],
    },
  },
  {
    category: "entertainment",
    optionA: {
      text: "Have one perfect playlist for studying",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "Have one perfect playlist for traveling",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "future and technology",
    optionA: {
      text: "Live in a smart home that talks to you",
      traits: ["social", "logic"],
    },
    optionB: {
      text: "Live in a smart home that never speaks but predicts your needs",
      traits: ["comfort", "logic"],
    },
  },
  {
    category: "future and technology",
    optionA: {
      text: "Use a robot assistant for chores",
      traits: ["comfort", "logic"],
    },
    optionB: {
      text: "Use a robot assistant for studying",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "future and technology",
    optionA: {
      text: "Have glasses that show useful information",
      traits: ["logic", "logic"],
    },
    optionB: {
      text: "Have a watch that shows useful information",
      traits: ["comfort", "shortterm"],
    },
  },
  {
    category: "future and technology",
    optionA: {
      text: "Travel in a self-driving car",
      traits: ["comfort", "logic"],
    },
    optionB: {
      text: "Travel in a self-driving train",
      traits: ["longterm", "vibes"],
    },
  },
  {
    category: "future and technology",
    optionA: {
      text: "Have a robot that cooks new meals",
      traits: ["comfort", "chaos"],
    },
    optionB: {
      text: "Have a robot that organizes your room",
      traits: ["logic", "comfort"],
    },
  },
  {
    category: "future and technology",
    optionA: {
      text: "Use a virtual reality classroom",
      traits: ["vibes", "vibes"],
    },
    optionB: {
      text: "Use a mixed reality classroom",
      traits: ["logic", "logic"],
    },
  },
  {
    category: "future and technology",
    optionA: {
      text: "Have instant 3D printing for small objects",
      traits: ["vibes", "power"],
    },
    optionB: {
      text: "Have instant digital delivery for any file",
      traits: ["logic", "logic"],
    },
  },
  {
    category: "future and technology",
    optionA: {
      text: "Have a personal AI that remembers your tasks",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "Have a personal AI that remembers your ideas",
      traits: ["vibes", "longterm"],
    },
  },
  {
    category: "future and technology",
    optionA: {
      text: "See a detailed map of the whole world in your room",
      traits: ["vibes", "logic"],
    },
    optionB: {
      text: "See a detailed map of the night sky in your room",
      traits: ["vibes", "logic"],
    },
  },
  {
    category: "future and technology",
    optionA: {
      text: "Have a tiny home robot pet",
      traits: ["comfort", "social"],
    },
    optionB: { text: "Have a tiny drone pet", traits: ["logic", "vibes"] },
  },
  {
    category: "future and technology",
    optionA: {
      text: "Have a desk that changes height automatically",
      traits: ["comfort", "logic"],
    },
    optionB: {
      text: "Have a chair that changes shape automatically",
      traits: ["comfort", "chaos"],
    },
  },
  {
    category: "future and technology",
    optionA: {
      text: "Have instant translation through your earbuds",
      traits: ["social", "logic"],
    },
    optionB: {
      text: "Have instant directions through your glasses",
      traits: ["logic", "vibes"],
    },
  },
  {
    category: "future and technology",
    optionA: {
      text: "Use a computer controlled by hand gestures",
      traits: ["logic", "vibes"],
    },
    optionB: {
      text: "Use a computer controlled by voice",
      traits: ["social", "logic"],
    },
  },
  {
    category: "future and technology",
    optionA: {
      text: "Have a smart notebook that organizes your notes",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "Have a smart pen that explains your notes",
      traits: ["logic", "social"],
    },
  },
  {
    category: "future and technology",
    optionA: {
      text: "Have a digital twin that handles simple tasks",
      traits: ["power", "logic"],
    },
    optionB: {
      text: "Have a virtual assistant that plans your day",
      traits: ["logic", "comfort"],
    },
  },
];

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function questionKey(question: Question): string {
  return [question.optionA.text, question.optionB.text]
    .map((text) => text.trim().toLowerCase())
    .sort()
    .join("|");
}

export function pickFallbackQuestions(
  count = 15,
  excludedKeys: string[] = [],
): Question[] {
  const picked: Question[] = [];
  const categories = new Map<string, number>();
  const excluded = new Set(excludedKeys);

  for (const question of shuffle(FALLBACK_QUESTIONS)) {
    const categoryCount = categories.get(question.category) || 0;
    const key = questionKey(question);
    if (
      categoryCount >= 2 ||
      excluded.has(key) ||
      picked.some((item) => questionKey(item) === key)
    ) {
      continue;
    }
    picked.push(question);
    categories.set(question.category, categoryCount + 1);
    if (picked.length === count) break;
  }

  return picked;
}
