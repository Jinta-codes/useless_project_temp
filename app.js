/**
 * OverThink AI - Full-Body Robots, Dedicated Argument Screen & Accelerate Ragebait Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const audio = new OverThinkAudio();

  // DOM Elements
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioIcon = document.getElementById('audioIcon');
  const mainCard = document.getElementById('mainCard');
  const botWrapper = document.getElementById('botWrapper');
  const botFace = document.getElementById('botFace');
  const antennaOrb = document.getElementById('antennaOrb');
  const speechBubble = document.getElementById('speechBubble');
  const screenContent = document.getElementById('screenContent');

  // State
  let userQuestion = "Should I drink water?";
  let selectedTemperature = 28;
  let selectedWeather = "Sunny";
  let questionChain = [];
  let currentChainIndex = 0;
  let startTime = 0;
  let totalWastedSeconds = 43;
  let liveTimerInterval = null;


  
async function generateGeminiQuestions(userQuestion) {
  const prompt = `
You are "OverThink AI", a fake AI that dramatically overcomplicates simple decisions.

The user asked:
"${userQuestion}"

Generate EXACTLY 6 questions.

Rules:
- First 3 questions should be genuinely relevant.
- Last 3 should become increasingly absurd and funny.
- Keep every question under 15 words.
- Return ONLY a JSON array.

Example:
[
 "How thirsty are you?",
 "When did you last drink water?",
 "What's the temperature?",
 "How many pigeons are judging you?",
 "Would your chair approve?",
 "What is your relationship with Tuesdays?"
]
`;

  

try {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  );

  const data = await response.json();

  if (!data.candidates || !data.candidates.length) {
    throw new Error("No Gemini response");
  }

  let text = data.candidates[0].content.parts[0].text.trim();

  text = text.replace(/```json|```/g, "").trim();

  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");

  if (start !== -1 && end !== -1) {
    text = text.slice(start, end + 1);
  }

  return JSON.parse(text);
} catch (err) {
    console.error(err);

    return [
      "How important is this?",
      "When did you last think about it?",
      "What's the current temperature?",
      "How many pigeons are judging you?",
      "Would your chair approve?",
      "What is your relationship with Tuesdays?"
    ];
  }
}

  // Audio Toggle
  audioToggleBtn.addEventListener('click', () => {
    audio.init();
    const isMuted = audio.toggleMute();
    audioIcon.textContent = isMuted ? '🔇' : '🔊';
    audioToggleBtn.innerHTML = `<span id="audioIcon">${isMuted ? '🔇' : '🔊'}</span> SOUND`;
  });

  /**
   * Helper to format elapsed time mm:ss
   */
  function getElapsedFormatted() {
    if (!startTime) return "00:00";
    const sec = Math.floor((Date.now() - startTime) / 1000);
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  function getElapsedSeconds() {
    if (!startTime) return 43;
    return Math.max(30, Math.floor((Date.now() - startTime) / 1000));
  }

  /**
   * Full-Body Cartoon Robot SVG Generator
   * Features: Round head, digital face, ears, torso with colored chest plate,
   * TWO proper arms with poseable gestures, TWO legs, and roller wheels!
   */
  function buildFullRobotSVG({
    accentColor = '#f97316',
    antennaColor = '#38bdf8',
    faceContent = '',
    leftArmPose = 'down', // 'down' | 'point-right' | 'point-left' | 'up' | 'flail'
    rightArmPose = 'down', // 'down' | 'point-left' | 'point-right' | 'up' | 'flail'
    robotClass = ''
  } = {}) {
    // Left arm geometry
    let leftArmD = "M34 88 Q20 98 24 114";
    let leftHandX = 24, leftHandY = 114;
    if (leftArmPose === 'point-right') {
      leftArmD = "M34 88 Q48 94 62 90";
      leftHandX = 62; leftHandY = 90;
    } else if (leftArmPose === 'point-left') {
      leftArmD = "M34 88 Q18 82 8 74";
      leftHandX = 8; leftHandY = 74;
    } else if (leftArmPose === 'up') {
      leftArmD = "M34 88 Q16 70 20 52";
      leftHandX = 20; leftHandY = 52;
    }

    // Right arm geometry
    let rightArmD = "M96 88 Q110 98 106 114";
    let rightHandX = 106, rightHandY = 114;
    if (rightArmPose === 'point-left') {
      rightArmD = "M96 88 Q82 94 68 90";
      rightHandX = 68; rightHandY = 90;
    } else if (rightArmPose === 'point-right') {
      rightArmD = "M96 88 Q112 82 122 74";
      rightHandX = 122; rightHandY = 74;
    } else if (rightArmPose === 'up') {
      rightArmD = "M96 88 Q114 70 110 52";
      rightHandX = 110; rightHandY = 52;
    }

    return `
      <svg class="bot-svg ${robotClass}" viewBox="0 0 130 152" xmlns="http://www.w3.org/2000/svg">
        <!-- Antenna -->
        <line x1="65" y1="12" x2="65" y2="26" stroke="#27272a" stroke-width="3.5" stroke-linecap="round"/>
        <circle class="antenna-light" cx="65" cy="10" r="6" fill="${antennaColor}" stroke="#27272a" stroke-width="3"/>

        <!-- Ears / Bolts -->
        <rect x="18" y="44" width="7" height="15" rx="3.5" fill="#94a3b8" stroke="#27272a" stroke-width="2.5"/>
        <rect x="105" y="44" width="7" height="15" rx="3.5" fill="#94a3b8" stroke="#27272a" stroke-width="2.5"/>

        <!-- Head / Body (Squircle) -->
        <rect x="25" y="24" width="80" height="54" rx="20" fill="#fdfcf8" stroke="#27272a" stroke-width="3.5"/>

        <!-- Face Screen -->
        <rect x="33" y="32" width="64" height="38" rx="13" fill="#f1f5f9" stroke="#27272a" stroke-width="2.5"/>

        <!-- Facial Features -->
        <g class="bot-face-group">
          ${faceContent}
        </g>

        <!-- Torso -->
        <rect x="34" y="80" width="62" height="38" rx="12" fill="#fdfcf8" stroke="#27272a" stroke-width="3.5"/>

        <!-- Chest Plate Accent -->
        <path d="M42 86 L88 86 L84 102 L46 102 Z" fill="${accentColor}" stroke="#27272a" stroke-width="2"/>

        <!-- Left Arm -->
        <path d="${leftArmD}" stroke="#27272a" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <circle cx="${leftHandX}" cy="${leftHandY}" r="4.5" fill="#94a3b8" stroke="#27272a" stroke-width="2"/>

        <!-- Right Arm -->
        <path d="${rightArmD}" stroke="#27272a" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <circle cx="${rightHandX}" cy="${rightHandY}" r="4.5" fill="#94a3b8" stroke="#27272a" stroke-width="2"/>

        <!-- Legs -->
        <rect x="46" y="118" width="8" height="16" rx="4" fill="#94a3b8" stroke="#27272a" stroke-width="2.5"/>
        <rect x="76" y="118" width="8" height="16" rx="4" fill="#94a3b8" stroke="#27272a" stroke-width="2.5"/>

        <!-- Feet / Roller Wheels -->
        <g class="robot-wheels">
          <ellipse cx="50" cy="138" rx="9" ry="6" fill="#334155" stroke="#27272a" stroke-width="2.5"/>
          <ellipse cx="50" cy="138" rx="4" ry="2.5" fill="${accentColor}"/>

          <ellipse cx="80" cy="138" rx="9" ry="6" fill="#334155" stroke="#27272a" stroke-width="2.5"/>
          <ellipse cx="80" cy="138" rx="4" ry="2.5" fill="${accentColor}"/>
        </g>
      </svg>
    `;
  }

  /**
   * Sparkline Cartoon SVG Generator
   */
  function buildSparklineSVG(points, color = '#f97316') {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = (max - min) || 1;
    const width = 120;
    const height = 24;
    const step = width / (points.length - 1);

    const coords = points.map((p, i) => {
      const x = i * step;
      const y = height - ((p - min) / range) * (height - 6) - 3;
      return { x, y };
    });

    const pathD = coords.reduce((acc, pt, i) => {
      return i === 0 ? `M${pt.x.toFixed(1)},${pt.y.toFixed(1)}` : `${acc} L${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    }, "");

    const dots = coords.map(pt => `
      <circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="2.5" fill="${color}" stroke="#27272a" stroke-width="1"/>
    `).join('');

    return `
      <svg class="sparkline-svg" viewBox="0 0 120 28" xmlns="http://www.w3.org/2000/svg">
        <path d="${pathD}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        ${dots}
      </svg>
    `;
  }

  /**
   * OverThink Bot Expression Manager (14+ Expressions)
   */
  function setBotExpression(expression) {
    botWrapper.style.display = 'block';
    botWrapper.className = 'bot-container';
    antennaOrb.style.fill = '#38bdf8';

    switch (expression) {
      case 'happy': // 🙂
        botFace.innerHTML = `
          <circle cx="46" cy="61" r="5" fill="#27272a"/><circle cx="74" cy="61" r="5" fill="#27272a"/>
          <circle cx="48" cy="59" r="1.8" fill="#ffffff"/><circle cx="76" cy="59" r="1.8" fill="#ffffff"/>
          <path d="M53 72 Q60 78 67 72" stroke="#27272a" stroke-width="3" stroke-linecap="round" fill="none"/>
        `;
        break;

      case 'curious': // 👀
        botFace.innerHTML = `
          <circle cx="45" cy="61" r="7.5" fill="#27272a"/><circle cx="75" cy="61" r="7.5" fill="#27272a"/>
          <circle cx="47" cy="59" r="2.8" fill="#ffffff"/><circle cx="77" cy="59" r="2.8" fill="#ffffff"/>
          <circle cx="60" cy="73" r="3" fill="#27272a"/>
        `;
        break;

      case 'thinking': // 🤔
        botFace.innerHTML = `
          <path d="M38 51 Q46 47 52 52" stroke="#27272a" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <circle cx="47" cy="59" r="5.5" fill="#27272a"/><circle cx="75" cy="59" r="5.5" fill="#27272a"/>
          <circle cx="49" cy="57" r="1.8" fill="#ffffff"/><circle cx="77" cy="57" r="1.8" fill="#ffffff"/>
          <path d="M54 73 Q60 70 66 74" stroke="#27272a" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        `;
        break;

      case 'judging': // 😏
        botFace.innerHTML = `
          <path d="M38 52 Q45 47 52 51" stroke="#27272a" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <path d="M68 53 Q75 56 82 54" stroke="#27272a" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <circle cx="47" cy="62" r="5" fill="#27272a"/><circle cx="75" cy="62" r="5" fill="#27272a"/>
          <path d="M54 73 Q63 76 68 69" stroke="#27272a" stroke-width="3" stroke-linecap="round" fill="none"/>
        `;
        break;

      case 'tension':
      case 'panicked': // 😰
        antennaOrb.style.fill = '#ef4444';
        botFace.innerHTML = `
          <path d="M41 58 Q46 66 51 58 Q46 52 41 58" stroke="#27272a" stroke-width="2.5" fill="none"/>
          <path d="M69 58 Q74 66 79 58 Q74 52 69 58" stroke="#27272a" stroke-width="2.5" fill="none"/>
          <path d="M50 74 Q55 69 60 74 Q65 79 70 74" stroke="#27272a" stroke-width="3" stroke-linecap="round" fill="none"/>
          <path d="M88 44 C88 41, 92 37, 92 37 C92 37, 96 41, 96 44 C96 47, 93 49, 90 49 C88 49, 88 47, 88 44 Z" fill="#38bdf8"/>
        `;
        break;

      case 'angry': // 😡
        antennaOrb.style.fill = '#ef4444';
        botFace.innerHTML = `
          <line x1="38" y1="52" x2="52" y2="58" stroke="#27272a" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="82" y1="52" x2="68" y2="58" stroke="#27272a" stroke-width="3.5" stroke-linecap="round"/>
          <circle cx="46" cy="64" r="5" fill="#27272a"/><circle cx="74" cy="64" r="5" fill="#27272a"/>
          <rect x="52" y="71" width="16" height="5" rx="2" fill="#ef4444" stroke="#27272a" stroke-width="2"/>
        `;
        break;

      case 'deadpan':
      case 'disappointed': // 😐
        botFace.innerHTML = `
          <line x1="40" y1="61" x2="52" y2="61" stroke="#27272a" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="68" y1="61" x2="80" y2="61" stroke="#27272a" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="53" y1="73" x2="67" y2="73" stroke="#27272a" stroke-width="3" stroke-linecap="round"/>
        `;
        break;

      case 'suspicious': // 🤨
        botFace.innerHTML = `
          <path d="M38 48 Q45 42 52 47" stroke="#27272a" stroke-width="3" stroke-linecap="round" fill="none"/>
          <circle cx="46" cy="59" r="6.5" fill="#27272a"/>
          <line x1="68" y1="60" x2="80" y2="60" stroke="#27272a" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M54 74 Q60 70 66 73" stroke="#27272a" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        `;
        break;

      case 'done_with_you': // 😑
        botFace.innerHTML = `
          <line x1="38" y1="60" x2="54" y2="60" stroke="#27272a" stroke-width="4" stroke-linecap="round"/>
          <line x1="66" y1="60" x2="82" y2="60" stroke="#27272a" stroke-width="4" stroke-linecap="round"/>
          <line x1="54" y1="74" x2="66" y2="74" stroke="#27272a" stroke-width="2.5" stroke-linecap="round"/>
        `;
        break;

      case 'laughing': // 😂
        botFace.innerHTML = `
          <path d="M40 57 L50 64 M50 57 L40 64" stroke="#27272a" stroke-width="3" stroke-linecap="round"/>
          <path d="M70 57 L80 64 M80 57 L70 64" stroke="#27272a" stroke-width="3" stroke-linecap="round"/>
          <path d="M50 71 Q60 83 70 71 Z" fill="#27272a"/>
          <ellipse cx="60" cy="78" rx="4" ry="2" fill="#f43f5e"/>
        `;
        break;

      case 'smug':
      case 'satisfied': // 😎
        antennaOrb.style.fill = '#10b981';
        botFace.innerHTML = `
          <polygon points="36,53 55,53 52,67 39,67" fill="#18181b" stroke="#27272a" stroke-width="2"/>
          <polygon points="65,53 84,53 81,67 68,67" fill="#18181b" stroke="#27272a" stroke-width="2"/>
          <line x1="55" y1="57" x2="65" y2="57" stroke="#18181b" stroke-width="3"/>
          <path d="M40 57 L48 63" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M69 57 L77 63" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M55 75 Q63 79 69 71" stroke="#27272a" stroke-width="3" stroke-linecap="round" fill="none"/>
        `;
        break;

      case 'side_eye': // 😒
        botFace.innerHTML = `
          <circle cx="41" cy="61" r="5" fill="#27272a"/><circle cx="69" cy="61" r="5" fill="#27272a"/>
          <path d="M38 53 L52 56" stroke="#27272a" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M68 56 L82 53" stroke="#27272a" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="53" y1="73" x2="67" y2="73" stroke="#27272a" stroke-width="3" stroke-linecap="round"/>
        `;
        break;
    }
  }

  /**
   * Question Type Detection
   */
  function detectQuestionType(query) {
    const q = query.toLowerCase();
    if (q.includes('water') || q.includes('drink') || q.includes('hydrate') || q.includes('thirst')) return 'water';
    if (q.includes('study') || q.includes('exam') || q.includes('homework') || q.includes('read') || q.includes('learn')) return 'study';
    if (q.includes('sleep') || q.includes('bed') || q.includes('nap') || q.includes('tired') || q.includes('rest')) return 'sleep';
    if (q.includes('pizza') || q.includes('food') || q.includes('eat') || q.includes('order') || q.includes('dinner') || q.includes('snack')) return 'pizza';
    if (q.includes('text') || q.includes('message') || q.includes('friend') || q.includes('call') || q.includes('dm') || q.includes('send')) return 'text';
    if (q.includes('win') || q.includes('judge') || q.includes('hackathon') || q.includes('prize') || q.includes('project')) return 'hackathon';
    return 'general';
  }

  function generateQuestionSet(topic) {
    const topicQuestions = {
      water: [
        { speech: `"How much water have you had today?"`, options: ["0 ml (Practically desiccated)", "250 ml (One polite sip)", "A suspicious amount", "I only drink pure caffeine"] },
        { speech: `"How thirsty are you?"`, options: ["A lot", "A little", "Not at all", "Existentially parched"] },
        { speech: `"When was the last time you drank water?"`, options: ["Just now", "2 hours ago", "Yesterday", "In a past life"] },
        { type: "temp" }, { type: "weather" }
      ],
      study: [
        { speech: `"What subject are you supposed to study?"`, options: ["Math / Science", "Humanities", "Computer Science", "The study of procrastination"] },
        { speech: `"When is your exam?"`, options: ["Tomorrow morning (Crisis)", "In 3 days", "Next week", "Already failed in spirit"] },
        { speech: `"How much have you studied today?"`, options: ["0 hours", "12 minutes", "I opened the textbook once", "Negative hours"] },
        { speech: `"How much time do you have left?"`, options: ["Plenty of time", "Barely enough", "Panic mode initiated", "Time is a social construct"] }
      ],
      sleep: [
        { speech: `"What time is it currently?"`, options: ["Past bedtime", "Way too late", "Early morning", "Time has no meaning"] },
        { speech: `"How many hours did you sleep last night?"`, options: ["8 hours (Living in luxury)", "4 hours (Caffeine zombie)", "1 hour (Heroic)", "I blinked once"] },
        { speech: `"How tired are you right now?"`, options: ["Passing out", "Wired on caffeine", "Tired but doomscrolling", "Completely numb"] },
        { speech: `"Do you have anything important tomorrow?"`, options: ["Extremely important", "Normal day", "Nothing at all", "I'd rather not think about it"] }
      ],
      pizza: [
        { speech: `"Are you actually hungry?"`, options: ["Starving", "Just bored", "Cravings speaking", "My soul needs cheese"] },
        { speech: `"When did you last eat?"`, options: ["1 hour ago", "5 hours ago", "This morning", "I forgot"] },
        { speech: `"How many people are eating?"`, options: ["Just me (No judgment)", "2 people", "A whole group", "Me and my inner thoughts"] },
        { speech: `"What is your current budget?"`, options: ["Unlimited pizza wealth", "Reasonable", "Down to loose coins", "Financial regret"] }
      ],
      text: [
        { speech: `"When did you last talk to them?"`, options: ["Earlier today", "A week ago", "3 months ago", "In 2021"] },
        { speech: `"What do you want to say?"`, options: ["Something casual", "Something deeply awkward", "Just a meme", "An existential paragraph"] },
        { speech: `"How important is the message?"`, options: ["Life or death", "Mildly important", "Trivially unimportant", "Career-ending"] },
        { speech: `"How nervous are you about sending it?"`, options: ["0% chill", "50% sweating", "99% heart racing", "I've drafted it 14 times"] }
      ],
      hackathon: [
        { speech: `"Are you an impartial hackathon judge?"`, options: ["👨‍⚖️ 100% impartial (Lie detected)", "📊 Easily swayed by cartoon robots", "🏆 Give them the trophy already", "🤡 I regret judging this track"] },
        { speech: `"How many hours of sleep did the creators get?"`, options: ["0 hours", "-4 hours", "Sleep was cancelled", "Powered by adrenaline"] },
        { speech: `"Would the world be a better place if this project won?"`, options: ["Indisputably yes", "The cosmos demands it", "The trophy looks shiny", "100% Yes"] }
      ],
      general: [
        { speech: `"How emotionally attached are you to this decision?"`, options: ["😐 0%", "🙂 25%", "😶 50%", "😭 100%"] },
        { speech: `"How much time do you have to decide?"`, options: ["Immediate emergency", "A few minutes", "All day", "Until the sun explodes"] },
        { speech: `"What are the potential consequences?"`, options: ["Catastrophic", "Mild inconvenience", "Zero consequences", "Total butterfly effect"] }
      ]
    };

    const sillyPool = [
      { speech: `"How many pigeons do you believe are currently judging you?"`, options: ["0 pigeons", "1–3 pigeons", "4–10 pigeons", "They know too much"] },
      { speech: `"What is the emotional state of the nearest aquifer?"`, options: ["Calm & serene", "Deeply anxious", "Unknown", "Probably fine"] },
      { speech: `"What is your relationship with Tuesdays?"`, options: ["❤️ Love", "😐 Neutral", "💀 Complicated", "We don't talk anymore"] },
      { speech: `"Have you blinked in the last 7 seconds?"`, options: ["Yes", "No", "I don't know", "Now I'm manually blinking"] },
      { speech: `"What is your current neck angle?"`, options: ["0° (Robotic)", "34° (Casual slouch)", "68° (Terminal phone hunch)", "Permanently fused with spine"] },
      { speech: `"Would your chair approve of this decision?"`, options: ["Supportive", "Groaning in protest", "Unforgiving", "Emotionally detached"] },
      { speech: `"Choose the shape that best represents your mindset."`, options: ["○ Circle of peace", "△ Triangle of conflict", "□ Box of structure", "🌀 Spiral of chaos"] }
    ];

    const selectedTopicQs = [...(topicQuestions[topic] || topicQuestions.general)];
    const shuffledSilly = [...sillyPool].sort(() => 0.5 - Math.random());
    const selectedSilly = shuffledSilly.slice(0, 3);
    return [...selectedTopicQs, ...selectedSilly];
  }

  function getTrapQuestion(topic) {
    switch (topic) {
      case 'water': return "Are you really thirsty?";
      case 'study': return "Are you actually going to study?";
      case 'sleep': return "Are you really tired?";
      case 'pizza': return "Are you actually starving?";
      case 'text': return "Are you actually going to hit send?";
      case 'hackathon': return "Are you actually going to vote for us?";
      default: return "Do you really need an AI for this?";
    }
  }

  /**
   * Question-Specific Robot Argument Dialogue Trees
   */
  function getRobotArgumentScript(topic) {
    switch (topic) {
      case 'water':
        return [
          { speaker: 'kunjapan', text: `Kunjapan: "Drink it! Hydration is necessary!"`, poseK: 'point-right', poseB: 'down', poseS: 'down' },
          { speaker: 'bibinmon', text: `Bibinmon: "No! Don't drink it. You might have already had enough!"`, poseK: 'down', poseB: 'point-left', poseS: 'down' },
          { speaker: 'kunjapan', text: `Kunjapan: "That's exactly why we should drink more!"`, poseK: 'up', poseB: 'point-left', poseS: 'down' },
          { speaker: 'bibinmon', text: `Bibinmon: "That makes absolutely no sense whatsoever!"`, poseK: 'down', poseB: 'up', poseS: 'down' },
          { speaker: 'shibumon', text: `Shibumon: "Both of you are overthinking water. According to my highly advanced analysis..."`, poseK: 'down', poseB: 'down', poseS: 'point-right' },
          { speaker: 'shibumon', text: `Shibumon: "...I have no idea." 😂`, poseK: 'down', poseB: 'down', poseS: 'up' }
        ];

      case 'study':
        return [
          { speaker: 'kunjapan', text: `Kunjapan: "YES! Go study right now!"`, poseK: 'point-right', poseB: 'down', poseS: 'down' },
          { speaker: 'bibinmon', text: `Bibinmon: "No! You deserve a break. Rest is productivity!"`, poseK: 'down', poseB: 'point-left', poseS: 'down' },
          { speaker: 'kunjapan', text: `Kunjapan: "The exam is literally approaching!"`, poseK: 'up', poseB: 'point-left', poseS: 'down' },
          { speaker: 'bibinmon', text: `Bibinmon: "Panic studying has a 0.02% success rate!"`, poseK: 'down', poseB: 'up', poseS: 'down' },
          { speaker: 'shibumon', text: `Shibumon: "Study for five minutes, then spend three hours thinking about studying."`, poseK: 'down', poseB: 'down', poseS: 'up' }
        ];

      case 'sleep':
        return [
          { speaker: 'kunjapan', text: `Kunjapan: "Sleep! Your brain cells are begging for rest!"`, poseK: 'point-right', poseB: 'down', poseS: 'down' },
          { speaker: 'bibinmon', text: `Bibinmon: "No! It's way too early. Just one more video!"`, poseK: 'down', poseB: 'point-left', poseS: 'down' },
          { speaker: 'kunjapan', text: `Kunjapan: "You have dark circles under your eyelids!"`, poseK: 'up', poseB: 'down', poseS: 'down' },
          { speaker: 'bibinmon', text: `Bibinmon: "Sleep is for people without existential questions!"`, poseK: 'down', poseB: 'up', poseS: 'down' },
          { speaker: 'shibumon', text: `Shibumon: "You should sleep while thinking about whether you should sleep."`, poseK: 'down', poseB: 'down', poseS: 'up' }
        ];

      case 'pizza':
        return [
          { speaker: 'kunjapan', text: `Kunjapan: "Absolutely. Pizza is the only scientifically correct answer."`, poseK: 'point-right', poseB: 'down', poseS: 'down' },
          { speaker: 'bibinmon', text: `Bibinmon: "No! You literally have food in the fridge!"`, poseK: 'down', poseB: 'point-left', poseS: 'down' },
          { speaker: 'kunjapan', text: `Kunjapan: "The fridge food doesn't have melted mozzarella!"`, poseK: 'up', poseB: 'point-left', poseS: 'down' },
          { speaker: 'bibinmon', text: `Bibinmon: "Think of your financial future!"`, poseK: 'down', poseB: 'up', poseS: 'down' },
          { speaker: 'shibumon', text: `Shibumon: "Order pizza, but regret it 4 minutes before it arrives."`, poseK: 'down', poseB: 'down', poseS: 'up' }
        ];

      case 'text':
        return [
          { speaker: 'kunjapan', text: `Kunjapan: "Send it! Fortune favors the bold!"`, poseK: 'point-right', poseB: 'down', poseS: 'down' },
          { speaker: 'bibinmon', text: `Bibinmon: "Don't send it! You will cringe for the next 10 years!"`, poseK: 'down', poseB: 'point-left', poseS: 'down' },
          { speaker: 'kunjapan', text: `Kunjapan: "If you don't send it, you'll regret it forever!"`, poseK: 'up', poseB: 'down', poseS: 'down' },
          { speaker: 'bibinmon', text: `Bibinmon: "If you do send it, they will leave you on read!"`, poseK: 'down', poseB: 'up', poseS: 'down' },
          { speaker: 'shibumon', text: `Shibumon: "Draft a 14-paragraph emotional thesis, then delete it and reply 'k'."`, poseK: 'down', poseB: 'down', poseS: 'up' }
        ];

      case 'hackathon':
        return [
          { speaker: 'kunjapan', text: `Kunjapan: "100% 1st Place! The cartoon robots demand victory!"`, poseK: 'up', poseB: 'down', poseS: 'down' },
          { speaker: 'bibinmon', text: `Bibinmon: "No! What if the judges are strictly into corporate spreadsheets?!"`, poseK: 'down', poseB: 'point-left', poseS: 'down' },
          { speaker: 'kunjapan', text: `Kunjapan: "Have you seen our animated roller wheels?! Victory is inevitable!"`, poseK: 'point-right', poseB: 'down', poseS: 'down' },
          { speaker: 'bibinmon', text: `Bibinmon: "Judges fear our overthinking power!"`, poseK: 'down', poseB: 'up', poseS: 'down' },
          { speaker: 'shibumon', text: `Shibumon: "Award us the grand trophy, then spend 6 months overthinking why we won."`, poseK: 'down', poseB: 'down', poseS: 'up' }
        ];

      default:
        return [
          { speaker: 'kunjapan', text: `Kunjapan: "Do it! Action creates momentum!"`, poseK: 'point-right', poseB: 'down', poseS: 'down' },
          { speaker: 'bibinmon', text: `Bibinmon: "Don't do it! Regret is 99% guaranteed!"`, poseK: 'down', poseB: 'point-left', poseS: 'down' },
          { speaker: 'kunjapan', text: `Kunjapan: "Indecision is the greatest failure of human cognition!"`, poseK: 'up', poseB: 'down', poseS: 'down' },
          { speaker: 'bibinmon', text: `Bibinmon: "Rash action is even worse!"`, poseK: 'down', poseB: 'up', poseS: 'down' },
          { speaker: 'shibumon', text: `Shibumon: "Flip a coin, lose the coin, and spend the day looking for the coin."`, poseK: 'down', poseB: 'down', poseS: 'up' }
        ];
    }
  }

  /**
   * Screen 1: Welcome (with requested Malayalam comment)
   */
  function showWelcomeScreen() {
    setBotExpression('curious');
    speechBubble.innerHTML = `"Than ippo entinado<br>ingottu valinju keri vanne"`;

    screenContent.innerHTML = `
      <div style="font-size: 13px; color: var(--text-dim); margin-bottom: 6px;">
        OverThink AI: You had a simple question. We made it complicated.
      </div>
      <button id="btnStart" class="btn-primary">
        <span>START</span> <span>▶</span>
      </button>
    `;

    document.getElementById('btnStart').addEventListener('click', () => {
      audio.init();
      audio.playPop();
      showQuestionScreen();
    });
  }

  /**
   * Screen 2: Ask Question
   */
  function showQuestionScreen() {
    setBotExpression('curious');
    speechBubble.innerHTML = `"What's bothering you?"`;

    screenContent.innerHTML = `
      <input 
        type="text" 
        id="qInput" 
        class="input-rounded" 
        placeholder="e.g. Should I drink water?" 
        value="${userQuestion}" 
        autocomplete="off"
      >
      <div class="presets-wrap">
        <button class="preset-chip" data-q="Should I drink water?">💧 Drink water?</button>
        <button class="preset-chip" data-q="Should I study?">📚 Study?</button>
        <button class="preset-chip" data-q="Should I sleep?">😴 Sleep?</button>
        <button class="preset-chip" data-q="Should I order pizza?">🍕 Order pizza?</button>
        <button class="preset-chip" data-q="Should I text my friend?">📱 Text friend?</button>
        <button class="preset-chip gold" data-q="Should our project win?">🏆 Should our project win?</button>
      </div>
      <button id="btnOverthink" class="btn-primary" style="margin-top: 8px;">
        <span>OVERTHINK IT</span> <span>🤔</span>
      </button>
    `;

    const qInput = document.getElementById('qInput');
    qInput.focus();

    document.querySelectorAll('.preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        qInput.value = chip.getAttribute('data-q');
        audio.playBloop();
      });
    });

    
const submitQuestion = async () => {
  const val = qInput.value.trim();
  if (!val) return;

  userQuestion = val;
  startTime = Date.now();
  audio.playPop();

  setBotExpression("thinking");
  speechBubble.innerHTML = `"Interesting.<br>Unfortunately, this is more complicated than I expected."`;

  screenContent.innerHTML = `
    <div style="font-size:14px;color:var(--text-dim);padding:20px 0;">
      Identifying unnecessary variables...
    </div>
  `;

  setTimeout(async () => {
    const topic = detectQuestionType(userQuestion);

    // Get personalized questions from Gemini
    // Get your original flow first (keeps all existing features)
questionChain = generateQuestionSet(topic);

// Get Gemini's personalized opening questions
const geminiQuestions = await generateGeminiQuestions(userQuestion);

// Replace ONLY the normal question cards with Gemini questions
let geminiIndex = 0;

questionChain = questionChain.map(item => {
  if (item.type || geminiIndex >= geminiQuestions.length) {
    return item; // Keep temperature, weather and other special cards
  }

  return {
    speech: `"${geminiQuestions[geminiIndex++]}"`,
    options: item.options // Keep your funny answer choices
  };
});

currentChainIndex = 0;
showNextQuestion();

    currentChainIndex = 0;
    showNextQuestion();
  }, 1400);
};

    document.getElementById('btnOverthink').addEventListener('click', submitQuestion);
    qInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitQuestion(); });
  }

  function showNextQuestion() {
    if (currentChainIndex >= questionChain.length) {
      showTelemetryScreen();
      return;
    }
    const item = questionChain[currentChainIndex];
    if (item.type === 'temp') { showTemperatureCard(); return; }
    if (item.type === 'weather') { showWeatherCard(); return; }

    const exprs = ['thinking', 'judging', 'suspicious', 'curious'];
    setBotExpression(exprs[currentChainIndex % exprs.length]);
    speechBubble.innerHTML = item.speech;

    screenContent.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
        ${item.options.map((opt, i) => `
          <button class="btn-choice opt-choice-btn" data-opt="${opt}" data-idx="${i}">
            <span>${opt}</span>
            <span>▶</span>
          </button>
        `).join('')}
      </div>
      <div style="font-size: 11px; color: var(--text-dim); margin-top: 4px;">
        Question ${currentChainIndex + 1} of ${questionChain.length}
      </div>
    `;

    document.querySelectorAll('.opt-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        if (idx === 0) audio.playPop();
        else if (idx === 1) audio.playBloop();
        else if (idx === 2) audio.playBoing();
        else audio.playBonk();

        currentChainIndex++;
        showNextQuestion();
      });
    });
  }

  function showTemperatureCard() {
    setBotExpression('thinking');
    speechBubble.innerHTML = `"What is the current temperature?"`;
    screenContent.innerHTML = `
      <div class="slider-container">
        <div id="tempDisplay" class="slider-val-tag">${selectedTemperature}°C</div>
        <input type="range" id="tempSlider" class="cartoon-range" min="10" max="45" value="${selectedTemperature}">
        <div style="font-size: 12px; color: var(--text-dim); margin-top: 4px;">(Essential for thermal decision parity)</div>
      </div>
      <button id="btnConfirmTemp" class="btn-primary" style="margin-top: 10px;"><span>CONFIRM</span></button>
    `;
    const tempSlider = document.getElementById('tempSlider');
    const tempDisplay = document.getElementById('tempDisplay');
    tempSlider.addEventListener('input', () => {
      selectedTemperature = tempSlider.value;
      tempDisplay.textContent = `${selectedTemperature}°C`;
    });
    document.getElementById('btnConfirmTemp').addEventListener('click', () => {
      audio.playPop(); currentChainIndex++; showNextQuestion();
    });
  }

  function showWeatherCard() {
    setBotExpression('thinking');
    speechBubble.innerHTML = `"What is the weather like?"`;
    const weatherOptions = [
      { label: "☀️ Sunny", val: "Sunny" }, { label: "🌧️ Rainy", val: "Rainy" },
      { label: "☁️ Cloudy", val: "Cloudy" }, { label: "🌪️ Concerning", val: "Concerning" }
    ];
    screenContent.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
        ${weatherOptions.map(o => `
          <button class="btn-choice weather-btn" data-val="${o.val}"><span>${o.label}</span><span>▶</span></button>
        `).join('')}
      </div>
    `;
    document.querySelectorAll('.weather-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedWeather = btn.getAttribute('data-val');
        audio.playPop(); currentChainIndex++; showNextQuestion();
      });
    });
  }

  /**
   * Screen 4: Telemetry Analysis (Completely Separate Screen)
   * Focuses on:
   * - Decision Complexity, AI Confidence, User Confusion, Uselessness with animated sparklines
   * - Live Total Time Wasted ticker
   * - Agonizingly slow progress bar (67% -> 99.5%)
   * - [ ↻ ] Refresh Button ragebait
   * - [ ⚡ ACCELERATE ] Ragebait Button (falls backward!)
   */
  function showTelemetryScreen() {
    botWrapper.style.display = 'none';
    speechBubble.innerHTML = `"ANALYSING TELEMETRY..."`;

    // Metric Data Points
    const complexityPts = [40, 53, 67, 82, 91, 99];
    const confidencePts = [72, 51, 38, 24, 17, 8];
    const confusionPts = [23, 48, 79, 112, 143, 167];
    const uselessnessPts = [61, 73, 84, 92, 99, 100];

    let currentProgress = 67.0;
    const progressMilestones = [78.0, 89.3, 94.0, 97.0, 98.7, 99.3, 99.5];
    let milestoneIdx = 0;
    let slowInterval = null;

    screenContent.innerHTML = `
      <!-- Total Time Wasted Ticker -->
      <div class="time-wasted-chip">
        <span>⏱️ TOTAL TIME WASTED:</span>
        <span id="liveTimerDisplay">${getElapsedFormatted()}</span>
      </div>

      <!-- Cartoon Sparkline Charts Grid -->
      <div class="sparkline-grid">
        <div class="sparkline-card">
          <div class="sparkline-head">
            <span class="sparkline-title">Complexity</span>
            <span class="sparkline-val" style="color: var(--accent-orange);">99%</span>
          </div>
          ${buildSparklineSVG(complexityPts, '#f97316')}
        </div>

        <div class="sparkline-card">
          <div class="sparkline-head">
            <span class="sparkline-title">AI Confidence</span>
            <span class="sparkline-val" style="color: var(--accent-red);">8%</span>
          </div>
          ${buildSparklineSVG(confidencePts, '#ef4444')}
        </div>

        <div class="sparkline-card">
          <div class="sparkline-head">
            <span class="sparkline-title">Confusion</span>
            <span class="sparkline-val" style="color: var(--accent-red);">167%</span>
          </div>
          ${buildSparklineSVG(confusionPts, '#dc2626')}
        </div>

        <div class="sparkline-card">
          <div class="sparkline-head">
            <span class="sparkline-title">Uselessness</span>
            <span class="sparkline-val" style="color: var(--accent-green);">100%</span>
          </div>
          ${buildSparklineSVG(uselessnessPts, '#10b981')}
        </div>
      </div>

      <!-- Slow Progress Meter with Refresh & Accelerate Buttons -->
      <div class="slow-progress-card">
        <div class="slow-progress-head">
          <span style="font-size: 11px; font-weight: 800; color: var(--text-dim); text-transform: uppercase;">ANALYSIS PROGRESS</span>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span id="slowPercentTag" class="slow-percent-tag">67.0%</span>
            <button id="btnRefresh" class="refresh-btn" title="Refresh Analysis">↻</button>
          </div>
        </div>

        <div class="slow-track">
          <div id="slowFill" class="slow-fill" style="width: 67%;"></div>
        </div>

        <!-- Accelerate Ragebait Button -->
        <button id="btnAccelerate" class="btn-accelerate">
          <span>⚡ ACCELERATE PROCESS</span>
        </button>

        <div id="progressNotice" style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">
          Deep neural deliberation in progress...
        </div>
      </div>

      <div class="simulated-tag">[SIMULATED QUANTUM TELEMETRY]</div>
    `;

    const liveTimerDisplay = document.getElementById('liveTimerDisplay');
    const slowFill = document.getElementById('slowFill');
    const slowPercentTag = document.getElementById('slowPercentTag');
    const btnRefresh = document.getElementById('btnRefresh');
    const btnAccelerate = document.getElementById('btnAccelerate');
    const progressNotice = document.getElementById('progressNotice');

    // Live Timer Interval
    clearInterval(liveTimerInterval);
    liveTimerInterval = setInterval(() => {
      if (liveTimerDisplay) liveTimerDisplay.textContent = getElapsedFormatted();
    }, 1000);

    // Refresh Button Ragebait: "Nice Try I'll take my own damn time."
    btnRefresh.addEventListener('click', () => {
      audio.playErrorBuzz();
      mainCard.classList.add('card-shake');
      setTimeout(() => mainCard.classList.remove('card-shake'), 400);

      progressNotice.innerHTML = `<strong style="color: var(--accent-red);">“Nice Try I'll take my own damn time.” 😡</strong>`;
      audio.playBonk();
    });

    // Accelerate Button Ragebait: Sends progress backward!
    btnAccelerate.addEventListener('click', () => {
      audio.playAccelerateFail();
      mainCard.classList.add('card-shake');
      setTimeout(() => mainCard.classList.remove('card-shake'), 450);

      // Drop progress backward to randomized 58% - 74%
      currentProgress = Math.floor(Math.random() * 16) + 58;
      slowFill.style.width = `${currentProgress}%`;
      slowPercentTag.textContent = `${currentProgress.toFixed(1)}%`;
      milestoneIdx = 0; // Reset milestones

      progressNotice.innerHTML = `
        <div class="accelerate-banner">
          “You wanted it faster?”<br>
          <strong>“Acceleration successful. Unfortunately, backwards.” ⚡⏪</strong>
        </div>
      `;
    });

    // Slow progress stepping
    slowInterval = setInterval(() => {
      if (milestoneIdx < progressMilestones.length) {
        currentProgress = progressMilestones[milestoneIdx];
        slowFill.style.width = `${currentProgress}%`;
        slowPercentTag.textContent = `${currentProgress.toFixed(1)}%`;
        milestoneIdx++;
        audio.playBloop();
      } else {
        clearInterval(slowInterval);
        // Agonizing pause at 99.5%
        setTimeout(() => {
          showRobotArgumentScreen();
        }, 1600);
      }
    }, 1100);
  }

  /**
   * Screen 5: SEPARATE Dedicated Robot Argument Screen
   * Features Kunjapan, Bibinmon, and Shibumon debating the user's specific question!
   */
  function showRobotArgumentScreen() {
    botWrapper.style.display = 'none';
    speechBubble.innerHTML = `"DELIBERATION CONFLICT DETECTED"`;

    const topic = detectQuestionType(userQuestion);
    const argumentScript = getRobotArgumentScript(topic);
    let scriptIdx = 0;

    // Mini robot default facial expressions
    const faces = {
      kunjapan: `<line x1="38" y1="52" x2="52" y2="58" stroke="#27272a" stroke-width="3"/><line x1="82" y1="52" x2="68" y2="58" stroke="#27272a" stroke-width="3"/><circle cx="46" cy="63" r="5" fill="#27272a"/><circle cx="74" cy="63" r="5" fill="#27272a"/><line x1="53" y1="73" x2="67" y2="73" stroke="#27272a" stroke-width="2.5"/>`,
      bibinmon: `<circle cx="45" cy="59" r="6" fill="#27272a"/><circle cx="75" cy="59" r="6" fill="#27272a"/><path d="M50 71 Q60 66 70 71" stroke="#27272a" stroke-width="2.5" fill="none"/><line x1="38" y1="50" x2="50" y2="54" stroke="#27272a" stroke-width="2.5"/><line x1="82" y1="50" x2="70" y2="54" stroke="#27272a" stroke-width="2.5"/>`,
      shibumon: `<circle cx="45" cy="60" r="6.5" fill="#27272a"/><circle cx="75" cy="60" r="6.5" fill="#27272a"/><path d="M54 73 Q62 76 68 70" stroke="#27272a" stroke-width="2.5" fill="none"/>`
    };

    function renderStage(line) {
      const activeSpeaker = line.speaker;

      screenContent.innerHTML = `
        <!-- Dedicated Argument Stage -->
        <div class="argument-stage">
          <!-- Active Argument Dialogue Bubble -->
          <div id="argBubble" class="argument-bubble">
            ${line.text}
          </div>

          <!-- Kunjapan (Confident) -->
          <div class="robot-slot ${activeSpeaker === 'kunjapan' ? 'active-speaker kunjapan-argue' : ''}">
            <span class="name-badge badge-kunjapan">🤖 Kunjapan</span>
            ${buildFullRobotSVG({
              accentColor: '#f97316',
              antennaColor: '#38bdf8',
              faceContent: faces.kunjapan,
              leftArmPose: line.poseK === 'up' ? 'up' : 'down',
              rightArmPose: line.poseK === 'point-right' ? 'point-right' : 'down'
            })}
          </div>

          <!-- Bibinmon (Disagrees) -->
          <div class="robot-slot ${activeSpeaker === 'bibinmon' ? 'active-speaker bibinmon-argue' : ''}">
            <span class="name-badge badge-bibinmon">🤖 Bibinmon</span>
            ${buildFullRobotSVG({
              accentColor: '#ef4444',
              antennaColor: '#fbbf24',
              faceContent: faces.bibinmon,
              leftArmPose: line.poseB === 'point-left' ? 'point-left' : (line.poseB === 'up' ? 'up' : 'down'),
              rightArmPose: line.poseB === 'up' ? 'up' : 'down'
            })}
          </div>

          <!-- Shibumon (Chaotic Expert) -->
          <div class="robot-slot ${activeSpeaker === 'shibumon' ? 'active-speaker shibumon-argue' : ''}">
            <span class="name-badge badge-shibumon">🤖 Shibumon</span>
            ${buildFullRobotSVG({
              accentColor: '#10b981',
              antennaColor: '#a855f7',
              faceContent: faces.shibumon,
              leftArmPose: line.poseS === 'up' ? 'up' : 'down',
              rightArmPose: line.poseS === 'point-right' ? 'point-right' : (line.poseS === 'up' ? 'up' : 'down')
            })}
          </div>
        </div>

        <div style="font-size: 12px; color: var(--text-dim); margin-top: 4px;">
          (The Council of OverThinkers is completely deadlocked)
        </div>
      `;
    }

    // Step through the dialogue script
    renderStage(argumentScript[0]);
    audio.playRobotChatter();

    const scriptTimer = setInterval(() => {
      scriptIdx++;
      if (scriptIdx < argumentScript.length) {
        renderStage(argumentScript[scriptIdx]);
        audio.playRobotChatter();
      } else {
        clearInterval(scriptTimer);
        setTimeout(() => {
          showTrapQuestion();
        }, 1800);
      }
    }, 1400);
  }

  /**
   * Screen 6: Trap Question with Runaway YES Button
   */
  function showTrapQuestion() {
    botWrapper.style.display = 'block';
    setBotExpression('thinking');
    const topic = detectQuestionType(userQuestion);
    const trapPrompt = getTrapQuestion(topic);

    speechBubble.innerHTML = `"Wait... one final question."<br><span style="font-size: 20px; color: var(--accent-red);">${trapPrompt}</span>`;

    screenContent.innerHTML = `
      <div id="trapArena" class="trap-arena">
        <button id="btnYesRunaway" class="btn-yes-runaway">YES</button>
        <button id="btnNoStationary" class="btn-no-stationary">NO</button>
      </div>
      <div style="font-size: 11px; color: var(--text-dim);">Please answer honestly to finalize conclusion.</div>
    `;

    const arena = document.getElementById('trapArena');
    const btnYes = document.getElementById('btnYesRunaway');
    const btnNo = document.getElementById('btnNoStationary');

    btnYes.style.left = `40px`;
    btnYes.style.top = `25px`;

    const moveYesButton = () => {
      audio.playWhoosh();
      const arenaRect = arena.getBoundingClientRect();
      const btnRect = btnYes.getBoundingClientRect();
      const maxX = arenaRect.width - btnRect.width - 20;
      const maxY = arenaRect.height - btnRect.height - 20;
      let newX = Math.floor(Math.random() * maxX);
      let newY = Math.floor(Math.random() * maxY);
      btnYes.style.left = `${Math.max(10, newX)}px`;
      btnYes.style.top = `${Math.max(10, newY)}px`;
    };

    btnYes.addEventListener('pointerenter', moveYesButton);
    btnYes.addEventListener('mouseover', moveYesButton);
    btnYes.addEventListener('touchstart', (e) => { e.preventDefault(); moveYesButton(); });
    btnYes.addEventListener('click', (e) => { e.preventDefault(); moveYesButton(); });

    btnNo.addEventListener('click', () => {
      audio.playSadTrombone();
      handleNoChoice();
    });
  }

  /**
   * Deadpan Reaction & Transition to Reanalysis
   */
  function handleNoChoice() {
    setBotExpression('deadpan');
    speechBubble.innerHTML = `"Then why did you ask me in the first place?"`;
    screenContent.innerHTML = `<div style="font-size: 14px; color: var(--text-dim); padding: 30px 0;">(Silence. Profound, heavy silence.)</div>`;

    setTimeout(() => {
      setBotExpression('thinking');
      speechBubble.innerHTML = `"Maybe... okay fine.<br>I'll look into the question again."`;
      setTimeout(() => showReanalysisScreen(), 1800);
    }, 1800);
  }

  /**
   * Screen 8: Reanalysis with Telemetry, Sparklines & Accelerate Trap
   */
  function showReanalysisScreen() {
    botWrapper.style.display = 'none';
    speechBubble.innerHTML = `"REANALYSING...<br>Questioning everything."`;

    const complexityPts = [82, 88, 91, 95, 98, 99];
    const confidencePts = [17, 14, 11, 9, 8, 6];
    const confusionPts = [143, 150, 158, 162, 167, 172];
    const uselessnessPts = [99, 99, 100, 100, 100, 100];

    let reProgress = 72.0;
    const reMilestones = [82.0, 89.0, 94.5, 97.8, 99.1, 99.5];
    let reMileIdx = 0;

    screenContent.innerHTML = `
      <!-- Total Time Wasted Ticker -->
      <div class="time-wasted-chip">
        <span>⏱️ TOTAL TIME WASTED:</span>
        <span id="reLiveTimerDisplay">${getElapsedFormatted()}</span>
      </div>

      <!-- Sparkline Grid -->
      <div class="sparkline-grid">
        <div class="sparkline-card">
          <div class="sparkline-head">
            <span class="sparkline-title">Complexity</span>
            <span class="sparkline-val" style="color: var(--accent-orange);">99%</span>
          </div>
          ${buildSparklineSVG(complexityPts, '#f97316')}
        </div>

        <div class="sparkline-card">
          <div class="sparkline-head">
            <span class="sparkline-title">AI Confidence</span>
            <span class="sparkline-val" style="color: var(--accent-red);">6%</span>
          </div>
          ${buildSparklineSVG(confidencePts, '#ef4444')}
        </div>

        <div class="sparkline-card">
          <div class="sparkline-head">
            <span class="sparkline-title">Confusion</span>
            <span class="sparkline-val" style="color: var(--accent-red);">172%</span>
          </div>
          ${buildSparklineSVG(confusionPts, '#dc2626')}
        </div>

        <div class="sparkline-card">
          <div class="sparkline-head">
            <span class="sparkline-title">Uselessness</span>
            <span class="sparkline-val" style="color: var(--accent-green);">100%</span>
          </div>
          ${buildSparklineSVG(uselessnessPts, '#10b981')}
        </div>
      </div>

      <!-- Slow Progress Meter with Accelerate Button -->
      <div class="slow-progress-card">
        <div class="slow-progress-head">
          <span style="font-size: 11px; font-weight: 800; color: var(--text-dim); text-transform: uppercase;">REANALYSIS PROGRESS</span>
          <span id="rePercentTag" class="slow-percent-tag">72.0%</span>
        </div>

        <div class="slow-track">
          <div id="reFill" class="slow-fill" style="width: 72%;"></div>
        </div>

        <!-- Accelerate Ragebait Button -->
        <button id="btnAccelerateRe" class="btn-accelerate">
          <span>⚡ ACCELERATE PROCESS</span>
        </button>

        <div id="reTicker" class="reanalysis-ticker">Reconsidering previous conclusions...</div>
      </div>
    `;

    const reLiveTimerDisplay = document.getElementById('reLiveTimerDisplay');
    const reFill = document.getElementById('reFill');
    const rePercentTag = document.getElementById('rePercentTag');
    const btnAccelerateRe = document.getElementById('btnAccelerateRe');
    const reTicker = document.getElementById('reTicker');

    // Live Timer Interval
    clearInterval(liveTimerInterval);
    liveTimerInterval = setInterval(() => {
      if (reLiveTimerDisplay) reLiveTimerDisplay.textContent = getElapsedFormatted();
    }, 1000);

    const reMessages = [
      "Reconsidering previous conclusions...",
      "Questioning the questioning...",
      "Consulting the nearest aquifer...",
      "Calculating existential futility...",
      "This was definitely a mistake."
    ];

    let rIdx = 0;
    const reTickInterval = setInterval(() => {
      rIdx++;
      if (rIdx < reMessages.length) {
        reTicker.textContent = reMessages[rIdx];
        audio.playBloop();
      }
    }, 1000);

    // Accelerate Button in Reanalysis
    btnAccelerateRe.addEventListener('click', () => {
      audio.playAccelerateFail();
      mainCard.classList.add('card-shake');
      setTimeout(() => mainCard.classList.remove('card-shake'), 450);

      reProgress = Math.floor(Math.random() * 16) + 60;
      reFill.style.width = `${reProgress}%`;
      rePercentTag.textContent = `${reProgress.toFixed(1)}%`;
      reMileIdx = 0;

      reTicker.innerHTML = `<strong>“Acceleration successful. Unfortunately, backwards.” ⚡⏪</strong>`;
    });

    const reSlowInterval = setInterval(() => {
      if (reMileIdx < reMilestones.length) {
        reProgress = reMilestones[reMileIdx];
        reFill.style.width = `${reProgress}%`;
        rePercentTag.textContent = `${reProgress.toFixed(1)}%`;
        reMileIdx++;
        audio.playBloop();
      } else {
        clearInterval(reSlowInterval);
        clearInterval(reTickInterval);
        setTimeout(() => {
          showVerdictStage1();
        }, 1400);
      }
    }, 1000);
  }

  /**
   * Final Stage 1: First show "YOU DECIDE"
   */
  function showVerdictStage1() {
    botWrapper.style.display = 'block';
    setBotExpression('smug');
    speechBubble.innerHTML = `"VERDICT READY"`;

    screenContent.innerHTML = `
      <div class="verdict-box">
        <div class="verdict-tag">VERDICT</div>
        <div class="verdict-title">YOU DECIDE.</div>
      </div>
      <div style="font-size: 13px; color: var(--text-dim); margin-top: 6px;">
        Calculating final statement...
      </div>
    `;

    // Pause for dramatic effect, then Kunjapan, Bibinmon, and Shibumon run in!
    setTimeout(() => {
      showRobotsRunInAndThrowLetter();
    }, 1800);
  }

  /**
   * Final Stage 2 & 3: Robots Run in, Mock, and Throw Envelope
   */
  function showRobotsRunInAndThrowLetter() {
    totalWastedSeconds = getElapsedSeconds();

    botWrapper.style.display = 'none';
    speechBubble.innerHTML = `"HAHA! We did all that for nothing!"`;

    screenContent.innerHTML = `
      <!-- Three Laughing Robots Running in (Kunjapan, Bibinmon, Shibumon) -->
      <div class="argument-stage" style="min-height: 180px; padding-top: 20px;">
        <div class="robot-slot">
          <span class="name-badge badge-kunjapan">Kunjapan: "${totalWastedSeconds}s!"</span>
          ${buildFullRobotSVG({
            accentColor: '#f97316',
            faceContent: `<path d="M40 57 L50 64 M50 57 L40 64" stroke="#27272a" stroke-width="3"/><path d="M70 57 L80 64 M80 57 L70 64" stroke="#27272a" stroke-width="3"/><path d="M50 71 Q60 83 70 71 Z" fill="#27272a"/>`,
            leftArmPose: 'up',
            rightArmPose: 'up',
            robotClass: 'kunjapan-argue'
          })}
        </div>

        <div class="robot-slot">
          <span class="name-badge badge-bibinmon">Bibinmon: "For THAT?!"</span>
          ${buildFullRobotSVG({
            accentColor: '#ef4444',
            faceContent: `<path d="M40 57 L50 64 M50 57 L40 64" stroke="#27272a" stroke-width="3"/><path d="M70 57 L80 64 M80 57 L70 64" stroke="#27272a" stroke-width="3"/><path d="M50 71 Q60 83 70 71 Z" fill="#27272a"/>`,
            leftArmPose: 'up',
            rightArmPose: 'up',
            robotClass: 'bibinmon-argue'
          })}
        </div>

        <div class="robot-slot">
          <span class="name-badge badge-shibumon">Shibumon: "Worth it."</span>
          ${buildFullRobotSVG({
            accentColor: '#10b981',
            faceContent: `<polygon points="36,53 55,53 52,67 39,67" fill="#18181b" stroke="#27272a" stroke-width="2"/><polygon points="65,53 84,53 81,67 68,67" fill="#18181b" stroke="#27272a" stroke-width="2"/><path d="M55 75 Q63 79 69 71" stroke="#27272a" stroke-width="3" fill="none"/>`,
            leftArmPose: 'point-right',
            rightArmPose: 'up',
            robotClass: 'shibumon-argue'
          })}
        </div>
      </div>

      <!-- Closed Letter Flying in -->
      <div id="letterContainer" style="padding: 16px 0;">
        <div class="envelope-flying">✉️</div>
      </div>
      <div id="letterCaption" style="font-size: 13px; font-weight: 700; color: var(--text-dim);">
        A closed letter has been thrown at you...
      </div>
    `;

    audio.playLetterThrow();

    // Dramatic pause, then letter dramatically opens into parchment scroll!
    setTimeout(() => {
      openLetterFinale();
    }, 1800);
  }

  /**
   * Final Stage 4 & 5: Dramatic Letter Opening & Congratulations
   */
  function openLetterFinale() {
    audio.playLetterOpenFanfare();
    speechBubble.innerHTML = `"Worth every second." 😎`;

    screenContent.innerHTML = `
      <!-- Three Satisfied Robots on Top -->
      <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 2px;">
        <div style="width: 85px;">
          ${buildFullRobotSVG({
            accentColor: '#f97316',
            faceContent: `<path d="M40 57 L50 64 M50 57 L40 64" stroke="#27272a" stroke-width="3"/><path d="M70 57 L80 64 M80 57 L70 64" stroke="#27272a" stroke-width="3"/><path d="M50 71 Q60 83 70 71 Z" fill="#27272a"/>`,
            leftArmPose: 'up',
            rightArmPose: 'down'
          })}
        </div>
        <div style="width: 85px;">
          ${buildFullRobotSVG({
            accentColor: '#ef4444',
            faceContent: `<polygon points="36,53 55,53 52,67 39,67" fill="#18181b" stroke="#27272a" stroke-width="2"/><polygon points="65,53 84,53 81,67 68,67" fill="#18181b" stroke="#27272a" stroke-width="2"/><path d="M55 75 Q63 79 69 71" stroke="#27272a" stroke-width="3" fill="none"/>`,
            leftArmPose: 'down',
            rightArmPose: 'down'
          })}
        </div>
        <div style="width: 85px;">
          ${buildFullRobotSVG({
            accentColor: '#10b981',
            faceContent: `<polygon points="36,53 55,53 52,68 39,68" fill="#18181b" stroke="#27272a" stroke-width="2"/><polygon points="65,53 84,53 81,68 68,68" fill="#18181b" stroke="#27272a" stroke-width="2"/><path d="M55 75 Q63 79 69 71" stroke="#27272a" stroke-width="3" fill="none"/>`,
            leftArmPose: 'down',
            rightArmPose: 'up'
          })}
        </div>
      </div>

      <!-- Unrolled Scroll -->
      <div class="scroll-unroll">
        <div class="congrats-header">✨ CONGRATULATIONS! ✨</div>
        <div class="congrats-punchline">
          You just wasted
          <span class="congrats-highlight">${totalWastedSeconds} seconds</span>
          on something that could have been completed in
          <span style="font-size: 22px; color: var(--accent-orange); font-weight: 900; display: block; margin-top: 4px;">3 seconds.</span>
        </div>
      </div>

      <button id="btnAgain" class="btn-primary" style="margin-top: 8px;">
        <span>AGAIN</span> <span>🔄</span>
      </button>
    `;

    document.getElementById('btnAgain').addEventListener('click', () => {
      audio.playPop();
      botWrapper.style.display = 'block';
      showQuestionScreen();
    });
  }

  // Start with Welcome screen
  showWelcomeScreen();
});
