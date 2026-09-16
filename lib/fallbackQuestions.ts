import { Question } from "./types";

// A hand-written pool used whenever the live API call fails, is too slow,
// or the venue wifi drops -- so the booth never stalls mid-session.
export const FALLBACK_QUESTIONS: Question[] = [
  {
    category: "absurd daily life",
    optionA: { text: "Fight one horse-sized duck", traits: ["chaos", "power"] },
    optionB: {
      text: "Fight 100 duck-sized horses",
      traits: ["chaos", "social"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Read minds, but everyone hears your thoughts too",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "Turn invisible, but only when no one needs you",
      traits: ["comfort", "solitary"],
    },
  },
  {
    category: "social embarrassment",
    optionA: { text: "Always speak in rhymes", traits: ["chaos", "social"] },
    optionB: {
      text: "Always narrate your own actions out loud",
      traits: ["chaos", "solitary"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Your phone reads texts aloud at full volume, always",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Autocorrect changes one word in everything you type, forever",
      traits: ["comfort", "logic"],
    },
  },
  {
    category: "money",
    optionA: {
      text: "Double your money, but it vanishes in 24 hours",
      traits: ["shortterm", "chaos"],
    },
    optionB: {
      text: "Half your money, but it multiplies slowly forever",
      traits: ["longterm", "comfort"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Relive today on a loop until you get it right",
      traits: ["longterm", "logic"],
    },
    optionB: {
      text: "Skip straight to next Friday, no memory of the gap",
      traits: ["shortterm", "vibes"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A pigeon that gives brutally honest advice",
      traits: ["logic", "social"],
    },
    optionB: {
      text: "A cat that only meows in compliments you don't believe",
      traits: ["vibes", "solitary"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Every meal is delicious but a mystery ingredient",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Every meal is bland but exactly what your body needs",
      traits: ["comfort", "logic"],
    },
  },
  {
    category: "power vs peace",
    optionA: {
      text: "Be quietly right about everything, forever unacknowledged",
      traits: ["peace", "logic"],
    },
    optionB: {
      text: "Be loudly wrong sometimes, but always the one people ask",
      traits: ["power", "social"],
    },
  },
  {
    category: "daily life",
    optionA: {
      text: "Nap for 20 years, wake up unchanged",
      traits: ["solitary", "comfort"],
    },
    optionB: {
      text: "Stay awake 20 years straight, gain nothing but stories",
      traits: ["social", "chaos"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Teleport anywhere, but arrive slightly on fire",
      traits: ["chaos", "shortterm"],
    },
    optionB: {
      text: "Walk anywhere instantly, but only backwards",
      traits: ["comfort", "longterm"],
    },
  },
  {
    category: "money",
    optionA: {
      text: "Win any argument, but only about the weather",
      traits: ["logic", "peace"],
    },
    optionB: {
      text: "Win the lottery, but must announce it every time you enter a room",
      traits: ["power", "social"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Sneeze glitter every time you're nervous",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Hiccup bubbles whenever you're happy",
      traits: ["comfort", "social"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Your socks are always slightly wet",
      traits: ["chaos", "solitary"],
    },
    optionB: {
      text: "Your shoes always feel brand new",
      traits: ["comfort", "logic"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Every door you open plays a random sound effect",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Every light switch you touch dims slightly",
      traits: ["logic", "solitary"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "Your pillow is always cold on both sides",
      traits: ["comfort", "peace"],
    },
    optionB: {
      text: "Your blanket is always the perfect weight",
      traits: ["comfort", "longterm"],
    },
  },
  {
    category: "absurd daily life",
    optionA: {
      text: "You always find exact change in your pockets",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "You always find a forgotten snack in your bag",
      traits: ["chaos", "vibes"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Pause time, but only for as long as you hold your breath",
      traits: ["power", "shortterm"],
    },
    optionB: {
      text: "Rewind conversations by ten seconds, but only once per day",
      traits: ["logic", "social"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Speak to animals, but they only want to gossip",
      traits: ["social", "chaos"],
    },
    optionB: {
      text: "Understand plants, but they only complain about the weather",
      traits: ["peace", "vibes"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Fly, but only at walking speed",
      traits: ["comfort", "longterm"],
    },
    optionB: {
      text: "Run at lightning speed, but only in circles",
      traits: ["chaos", "shortterm"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Heal any wound, but you feel the pain twice",
      traits: ["power", "logic"],
    },
    optionB: {
      text: "Never feel pain, but you never know when you're hurt",
      traits: ["comfort", "chaos"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Summon any object, but it arrives slightly used",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Create any food, but it's always room temperature",
      traits: ["comfort", "logic"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Read any book in one minute, but forget it in an hour",
      traits: ["shortterm", "logic"],
    },
    optionB: {
      text: "Remember everything you read, but only while standing",
      traits: ["longterm", "solitary"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Breathe underwater, but only in fresh water",
      traits: ["power", "logic"],
    },
    optionB: {
      text: "Survive any temperature, but you always feel mildly uncomfortable",
      traits: ["comfort", "chaos"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Talk to ghosts, but they're terrible at advice",
      traits: ["social", "chaos"],
    },
    optionB: {
      text: "See the future, but only five seconds ahead",
      traits: ["logic", "shortterm"],
    },
  },
  {
    category: "social embarrassment",
    optionA: {
      text: "Every time you laugh, you snort once",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "Every time you cry, you hiccup",
      traits: ["vibes", "solitary"],
    },
  },
  {
    category: "social embarrassment",
    optionA: {
      text: "You always wave at people who aren't waving at you",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "You always say 'you too' when it doesn't apply",
      traits: ["vibes", "logic"],
    },
  },
  {
    category: "social embarrassment",
    optionA: {
      text: "Your stomach growls every time someone says your name",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "You blush every time someone makes eye contact",
      traits: ["comfort", "solitary"],
    },
  },
  {
    category: "social embarrassment",
    optionA: {
      text: "You accidentally rhyme when you're nervous",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "You accidentally speak in a whisper when you're excited",
      traits: ["solitary", "logic"],
    },
  },
  {
    category: "social embarrassment",
    optionA: {
      text: "You always mispronounce one word in every sentence",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "You always forget names immediately after hearing them",
      traits: ["solitary", "vibes"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Your phone battery dies at the worst possible moment, always",
      traits: ["chaos", "shortterm"],
    },
    optionB: {
      text: "Your phone never dies, but it's always at 1%",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Every photo you take has a stranger's thumb in it",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Every video you record has perfect lighting",
      traits: ["comfort", "logic"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Your headphones only work in one ear at a time",
      traits: ["chaos", "solitary"],
    },
    optionB: {
      text: "Your headphones always play the perfect song for the moment",
      traits: ["vibes", "comfort"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Your maps app always routes you through one wrong turn",
      traits: ["chaos", "shortterm"],
    },
    optionB: {
      text: "Your maps app always finds free parking",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Your alarms always go off one minute late",
      traits: ["chaos", "shortterm"],
    },
    optionB: {
      text: "Your alarms always wake you up perfectly rested",
      traits: ["comfort", "longterm"],
    },
  },
  {
    category: "money",
    optionA: {
      text: "Find a penny every day, but it's always heads down",
      traits: ["vibes", "shortterm"],
    },
    optionB: {
      text: "Find a dollar every week, but you must give it away",
      traits: ["social", "longterm"],
    },
  },
  {
    category: "money",
    optionA: {
      text: "Every purchase comes with a surprise small gift",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Every purchase is exactly 10% off, always",
      traits: ["logic", "comfort"],
    },
  },
  {
    category: "money",
    optionA: {
      text: "Your wallet always has exact change for anything",
      traits: ["logic", "peace"],
    },
    optionB: {
      text: "Your wallet always has a forgotten gift card",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "money",
    optionA: {
      text: "You win every raffle, but the prizes are always weird",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "You never win anything, but you always get a consolation cookie",
      traits: ["comfort", "peace"],
    },
  },
  {
    category: "money",
    optionA: {
      text: "Your bank account rounds up every purchase to the next dollar",
      traits: ["logic", "longterm"],
    },
    optionB: {
      text: "Your bank account rounds down every deposit to the nearest ten",
      traits: ["chaos", "shortterm"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Visit any year, but only for exactly one hour",
      traits: ["shortterm", "chaos"],
    },
    optionB: {
      text: "Visit any year, but you can't touch anything",
      traits: ["solitary", "logic"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Relive your best day once a year",
      traits: ["comfort", "longterm"],
    },
    optionB: {
      text: "Skip your worst day once a year",
      traits: ["peace", "shortterm"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Send a message to your past self, but only one word",
      traits: ["logic", "longterm"],
    },
    optionB: {
      text: "Receive a message from your future self, but it's always a riddle",
      traits: ["chaos", "vibes"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Pause time for everyone but yourself, but only for one minute",
      traits: ["power", "shortterm"],
    },
    optionB: {
      text: "Slow time for yourself, but everyone else speeds up",
      traits: ["chaos", "solitary"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Always arrive exactly on time, but you can never be early",
      traits: ["logic", "comfort"],
    },
    optionB: {
      text: "Always arrive exactly when you're needed, but never when expected",
      traits: ["vibes", "social"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A turtle that gives slow but excellent advice",
      traits: ["logic", "peace"],
    },
    optionB: {
      text: "A rabbit that gives fast but terrible advice",
      traits: ["chaos", "shortterm"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A parrot that repeats only your most embarrassing sentences",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "A goldfish that remembers everything you tell it",
      traits: ["comfort", "logic"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A dog that fetches your lost items, but chews them first",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "A cat that finds your lost items, but hides them again",
      traits: ["solitary", "chaos"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "An owl that gives wisdom, but only at 3 AM",
      traits: ["logic", "solitary"],
    },
    optionB: {
      text: "A rooster that wakes you up, but always one hour early",
      traits: ["chaos", "shortterm"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A bee that makes tiny amounts of perfect honey",
      traits: ["comfort", "longterm"],
    },
    optionB: {
      text: "A butterfly that follows you everywhere, silently judging",
      traits: ["vibes", "solitary"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Every drink is perfectly refreshing, but always lukewarm",
      traits: ["comfort", "chaos"],
    },
    optionB: {
      text: "Every drink is perfectly iced, but always slightly flat",
      traits: ["vibes", "logic"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Every fruit you eat is perfectly ripe, but only for one bite",
      traits: ["shortterm", "vibes"],
    },
    optionB: {
      text: "Every vegetable you eat tastes like dessert",
      traits: ["comfort", "chaos"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Every meal you cook is delicious, but you can't taste it",
      traits: ["logic", "solitary"],
    },
    optionB: {
      text: "Every meal you cook is bland, but everyone else loves it",
      traits: ["social", "comfort"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "You can eat anything, but it always tastes like chicken",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "You can eat nothing, but you never feel hungry",
      traits: ["peace", "solitary"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Your leftovers always taste better the next day",
      traits: ["comfort", "longterm"],
    },
    optionB: {
      text: "Your leftovers always disappear from the fridge",
      traits: ["chaos", "shortterm"],
    },
  },
  {
    category: "power vs peace",
    optionA: {
      text: "Be the smartest person in every room, but no one believes you",
      traits: ["logic", "solitary"],
    },
    optionB: {
      text: "Be the funniest person in every room, but no one remembers your jokes",
      traits: ["social", "vibes"],
    },
  },
  {
    category: "power vs peace",
    optionA: {
      text: "Always know the right thing to say, but only after the moment passes",
      traits: ["logic", "shortterm"],
    },
    optionB: {
      text: "Always know the wrong thing to say, but say it at the perfect time",
      traits: ["chaos", "social"],
    },
  },
  {
    category: "power vs peace",
    optionA: {
      text: "Be invisible in every crowd, but always feel seen by one person",
      traits: ["solitary", "comfort"],
    },
    optionB: {
      text: "Be the center of attention, but always feel alone",
      traits: ["social", "chaos"],
    },
  },
  {
    category: "power vs peace",
    optionA: {
      text: "Win every game, but no one wants to play with you",
      traits: ["power", "solitary"],
    },
    optionB: {
      text: "Lose every game, but everyone wants you on their team",
      traits: ["social", "comfort"],
    },
  },
  {
    category: "power vs peace",
    optionA: {
      text: "Always be right, but always be ignored",
      traits: ["logic", "solitary"],
    },
    optionB: {
      text: "Always be wrong, but always be loved",
      traits: ["social", "peace"],
    },
  },
  {
    category: "daily life",
    optionA: {
      text: "Never wait in line again, but you always arrive last",
      traits: ["logic", "shortterm"],
    },
    optionB: {
      text: "Always wait in line, but you always get the best seat",
      traits: ["comfort", "longterm"],
    },
  },
  {
    category: "daily life",
    optionA: {
      text: "Your coffee is always the perfect temperature, but never enough",
      traits: ["comfort", "shortterm"],
    },
    optionB: {
      text: "Your coffee is always too hot, but there's always more",
      traits: ["chaos", "longterm"],
    },
  },
  {
    category: "daily life",
    optionA: {
      text: "You always find a parking spot, but it's always far away",
      traits: ["logic", "longterm"],
    },
    optionB: {
      text: "You always find a parking spot, but it's always taken when you return",
      traits: ["chaos", "shortterm"],
    },
  },
  {
    category: "daily life",
    optionA: {
      text: "Your laundry is always folded, but never put away",
      traits: ["comfort", "chaos"],
    },
    optionB: {
      text: "Your laundry is always put away, but never folded",
      traits: ["logic", "vibes"],
    },
  },
  {
    category: "daily life",
    optionA: {
      text: "Your house is always clean, but you can never find anything",
      traits: ["logic", "solitary"],
    },
    optionB: {
      text: "Your house is always messy, but you know where everything is",
      traits: ["chaos", "comfort"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Grow plants instantly, but they only last one day",
      traits: ["shortterm", "vibes"],
    },
    optionB: {
      text: "Grow plants slowly, but they never die",
      traits: ["longterm", "comfort"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Control the weather, but only indoors",
      traits: ["chaos", "logic"],
    },
    optionB: {
      text: "Predict the weather perfectly, but only for yesterday",
      traits: ["logic", "shortterm"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Talk to machines, but they only speak in error codes",
      traits: ["logic", "chaos"],
    },
    optionB: {
      text: "Machines talk to you, but only to complain",
      traits: ["social", "vibes"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Never get lost, but you always take the scenic route",
      traits: ["comfort", "longterm"],
    },
    optionB: {
      text: "Always get lost, but you always find something interesting",
      traits: ["chaos", "vibes"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Remember every dream, but they're all boring",
      traits: ["logic", "solitary"],
    },
    optionB: {
      text: "Forget every dream, but they're all amazing",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Snap your fingers to clean any room, but it takes all day",
      traits: ["logic", "longterm"],
    },
    optionB: {
      text: "Snap your fingers to make a mess, but it cleans itself overnight",
      traits: ["chaos", "comfort"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Whistle to summon any bird, but they only want crumbs",
      traits: ["social", "vibes"],
    },
    optionB: {
      text: "Whistle to calm any animal, but they follow you home",
      traits: ["comfort", "chaos"],
    },
  },
  {
    category: "social embarrassment",
    optionA: {
      text: "You always sneeze in threes, loudly",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "You always yawn when someone else yawns, uncontrollably",
      traits: ["vibes", "social"],
    },
  },
  {
    category: "social embarrassment",
    optionA: {
      text: "You always laugh at the wrong moment in serious conversations",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "You always cry at commercials, but only happy ones",
      traits: ["comfort", "vibes"],
    },
  },
  {
    category: "social embarrassment",
    optionA: {
      text: "You always trip on nothing, but catch yourself gracefully",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "You always drop things, but catch them before they hit the ground",
      traits: ["logic", "chaos"],
    },
  },
  {
    category: "social embarrassment",
    optionA: {
      text: "You always forget the punchline to every joke you tell",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "You always remember the punchline, but forget the setup",
      traits: ["logic", "solitary"],
    },
  },
  {
    category: "social embarrassment",
    optionA: {
      text: "You always clap at the wrong time",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "You always stand when you should sit, and sit when you should stand",
      traits: ["vibes", "solitary"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Your autocorrect always changes 'love' to 'live'",
      traits: ["vibes", "chaos"],
    },
    optionB: {
      text: "Your autocorrect always changes 'sorry' to 'sorcery'",
      traits: ["chaos", "logic"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Your phone always screenshots at the worst moment",
      traits: ["chaos", "shortterm"],
    },
    optionB: {
      text: "Your phone always records audio of you singing badly",
      traits: ["vibes", "solitary"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Your emails always send one second before you finish editing",
      traits: ["chaos", "shortterm"],
    },
    optionB: {
      text: "Your emails always arrive one day late, but perfectly written",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Your phone always rings at full volume in quiet places",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "Your phone always silences itself when you need it most",
      traits: ["solitary", "chaos"],
    },
  },
  {
    category: "tech chaos",
    optionA: {
      text: "Your browser always opens one tab you didn't want",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Your browser always closes one tab you needed",
      traits: ["logic", "shortterm"],
    },
  },
  {
    category: "money",
    optionA: {
      text: "Every coin you pick up is from a different country",
      traits: ["vibes", "chaos"],
    },
    optionB: {
      text: "Every bill you find is perfectly crisp and new",
      traits: ["comfort", "logic"],
    },
  },
  {
    category: "money",
    optionA: {
      text: "You always win free food, but only for things you're allergic to",
      traits: ["chaos", "shortterm"],
    },
    optionB: {
      text: "You always win free drinks, but only when you're not thirsty",
      traits: ["vibes", "logic"],
    },
  },
  {
    category: "money",
    optionA: {
      text: "Your subscriptions always renew at the worst time",
      traits: ["chaos", "shortterm"],
    },
    optionB: {
      text: "Your subscriptions always cancel themselves when you forget",
      traits: ["comfort", "logic"],
    },
  },
  {
    category: "money",
    optionA: {
      text: "You always find money in old jackets, but it's always foreign",
      traits: ["vibes", "chaos"],
    },
    optionB: {
      text: "You always find gift cards, but they're always expired",
      traits: ["logic", "shortterm"],
    },
  },
  {
    category: "money",
    optionA: {
      text: "Your taxes always balance perfectly, but you never understand why",
      traits: ["logic", "peace"],
    },
    optionB: {
      text: "Your taxes always need one more document, forever",
      traits: ["chaos", "longterm"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Visit your childhood home, but only for five minutes",
      traits: ["shortterm", "comfort"],
    },
    optionB: {
      text: "Visit your future home, but only see the outside",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Change one thing in the past, but forget what you changed",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Keep one thing the same, but never know which thing",
      traits: ["logic", "solitary"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Meet your past self, but they're always disappointed",
      traits: ["chaos", "solitary"],
    },
    optionB: {
      text: "Meet your future self, but they're always in a hurry",
      traits: ["vibes", "longterm"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Live the same day twice, but only the boring parts",
      traits: ["logic", "shortterm"],
    },
    optionB: {
      text: "Live the same day twice, but only the best parts",
      traits: ["comfort", "vibes"],
    },
  },
  {
    category: "time travel",
    optionA: {
      text: "Always know what time it is, but never what day",
      traits: ["logic", "shortterm"],
    },
    optionB: {
      text: "Always know what day it is, but never what time",
      traits: ["vibes", "longterm"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A squirrel that organizes your things, but in wrong places",
      traits: ["chaos", "logic"],
    },
    optionB: {
      text: "A raccoon that finds treasures, but they're always trash",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A hummingbird that hovers near you, always slightly too close",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "A tortoise that follows you, always exactly ten steps behind",
      traits: ["comfort", "longterm"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A snake that gives fashion advice, but only about hats",
      traits: ["vibes", "social"],
    },
    optionB: {
      text: "A lizard that predicts rain, but only after it starts",
      traits: ["logic", "shortterm"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A crow that brings you shiny things, but always at 4 AM",
      traits: ["chaos", "shortterm"],
    },
    optionB: {
      text: "A dove that brings you peace, but only in noisy places",
      traits: ["peace", "vibes"],
    },
  },
  {
    category: "animal sidekick",
    optionA: {
      text: "A fox that solves your problems, but creates new ones",
      traits: ["chaos", "logic"],
    },
    optionB: {
      text: "A deer that listens to your problems, but never responds",
      traits: ["solitary", "comfort"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Every soup you eat is the perfect temperature, but too salty",
      traits: ["comfort", "chaos"],
    },
    optionB: {
      text: "Every soup you eat is perfectly seasoned, but too hot",
      traits: ["logic", "shortterm"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Every sandwich you make is perfectly balanced, but falls apart",
      traits: ["logic", "chaos"],
    },
    optionB: {
      text: "Every sandwich you make stays together, but tastes bland",
      traits: ["comfort", "vibes"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Every pizza you order arrives perfectly, but cold",
      traits: ["chaos", "shortterm"],
    },
    optionB: {
      text: "Every pizza you order arrives hot, but wrong toppings",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Every dessert you eat has zero calories, but tastes like nothing",
      traits: ["logic", "solitary"],
    },
    optionB: {
      text: "Every dessert you eat tastes amazing, but you must share it",
      traits: ["social", "comfort"],
    },
  },
  {
    category: "food chaos",
    optionA: {
      text: "Every breakfast you make is perfect, but only at dinner time",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Every dinner you make is perfect, but only as leftovers",
      traits: ["longterm", "comfort"],
    },
  },
  {
    category: "power vs peace",
    optionA: {
      text: "Be the strongest person in the room, but always alone",
      traits: ["power", "solitary"],
    },
    optionB: {
      text: "Be the weakest person in the room, but always surrounded by friends",
      traits: ["social", "comfort"],
    },
  },
  {
    category: "power vs peace",
    optionA: {
      text: "Always have the last word, but never be heard",
      traits: ["logic", "solitary"],
    },
    optionB: {
      text: "Never have the last word, but always be remembered",
      traits: ["social", "vibes"],
    },
  },
  {
    category: "power vs peace",
    optionA: {
      text: "Be the first to know everything, but unable to tell anyone",
      traits: ["logic", "solitary"],
    },
    optionB: {
      text: "Be the last to know anything, but always asked for advice",
      traits: ["social", "chaos"],
    },
  },
  {
    category: "power vs peace",
    optionA: {
      text: "Win every argument, but lose every friend",
      traits: ["power", "solitary"],
    },
    optionB: {
      text: "Lose every argument, but keep every friend",
      traits: ["social", "peace"],
    },
  },
  {
    category: "power vs peace",
    optionA: {
      text: "Be right all the time, but always alone in your rightness",
      traits: ["logic", "solitary"],
    },
    optionB: {
      text: "Be wrong all the time, but always in good company",
      traits: ["social", "comfort"],
    },
  },
  {
    category: "daily life",
    optionA: {
      text: "Your phone always has perfect signal, but never any battery",
      traits: ["logic", "shortterm"],
    },
    optionB: {
      text: "Your phone always has full battery, but never any signal",
      traits: ["chaos", "longterm"],
    },
  },
  {
    category: "daily life",
    optionA: {
      text: "Your keys are always exactly where you left them, but you forget where",
      traits: ["logic", "chaos"],
    },
    optionB: {
      text: "Your keys are never where you left them, but always findable",
      traits: ["vibes", "comfort"],
    },
  },
  {
    category: "daily life",
    optionA: {
      text: "Your umbrella always works, but only in light drizzle",
      traits: ["logic", "shortterm"],
    },
    optionB: {
      text: "Your umbrella never works, but you never get wet",
      traits: ["comfort", "chaos"],
    },
  },
  {
    category: "daily life",
    optionA: {
      text: "Your favorite song always plays, but only in your head",
      traits: ["solitary", "vibes"],
    },
    optionB: {
      text: "Your favorite song never plays, but everyone else hears it",
      traits: ["social", "chaos"],
    },
  },
  {
    category: "daily life",
    optionA: {
      text: "You always sleep perfectly, but only for four hours",
      traits: ["comfort", "shortterm"],
    },
    optionB: {
      text: "You always sleep poorly, but wake up fully rested",
      traits: ["chaos", "longterm"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Speak every language, but with a terrible accent",
      traits: ["social", "chaos"],
    },
    optionB: {
      text: "Speak no languages, but understand everything",
      traits: ["logic", "solitary"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Draw anything into existence, but it's always slightly off",
      traits: ["chaos", "vibes"],
    },
    optionB: {
      text: "Erase anything from existence, but it always comes back",
      traits: ["logic", "longterm"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Control fire, but only birthday candles",
      traits: ["power", "shortterm"],
    },
    optionB: {
      text: "Control water, but only in a glass",
      traits: ["logic", "comfort"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Walk through walls, but only when no one is watching",
      traits: ["solitary", "chaos"],
    },
    optionB: {
      text: "Walk through walls, but only when someone is watching",
      traits: ["social", "power"],
    },
  },
  {
    category: "superpowers",
    optionA: {
      text: "Never need sleep, but always feel tired",
      traits: ["longterm", "chaos"],
    },
    optionB: {
      text: "Sleep for a full day, but only once a month",
      traits: ["comfort", "shortterm"],
    },
  },
  {
    category: "social embarrassment",
    optionA: {
      text: "You always wave back at people who weren't waving at you",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "You always nod at people who weren't nodding at you",
      traits: ["vibes", "solitary"],
    },
  },
  {
    category: "social embarrassment",
    optionA: {
      text: "You always say 'nice to meet you' to people you've met before",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "You always say 'see you later' to people you'll never see again",
      traits: ["vibes", "solitary"],
    },
  },
  {
    category: "social embarrassment",
    optionA: {
      text: "You always forget the question while answering it",
      traits: ["chaos", "logic"],
    },
    optionB: {
      text: "You always answer the previous question perfectly",
      traits: ["logic", "shortterm"],
    },
  },
  {
    category: "social embarrassment",
    optionA: {
      text: "You always laugh at your own jokes before the punchline",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "You always ruin the punchline by laughing too early",
      traits: ["vibes", "chaos"],
    },
  },
  {
    category: "social embarrassment",
    optionA: {
      text: "You always high-five people who go for a handshake",
      traits: ["chaos", "social"],
    },
    optionB: {
      text: "You always handshake people who go for a high-five",
      traits: ["logic", "vibes"],
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
