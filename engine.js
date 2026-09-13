/**
 * OverThink AI - Core Decision & Ragebait Engine
 * Implements the complete 19-point comedic architecture.
 */

const ENGINE_CONFIG = {
  PRESETS: [
    { label: "💧 Drink Water?", query: "Should I drink water?" },
    { label: "😴 Go to Sleep?", query: "Should I go to sleep?" },
    { label: "📚 Study?", query: "Should I study?" },
    { label: "🍕 Eat a Snack?", query: "Should I eat a snack?" },
    { label: "✉️ Send Email?", query: "Should I send this email?" },
    { label: "🌱 Go Outside?", query: "Should I go outside?" },
    { label: "🏆 Win Hackathon?", query: "Should our project win?" }
  ]
};

/**
 * Procedural factor generator based on the query
 */
function buildFactorList(query) {
  const q = query.toLowerCase();
  const letterCount = query.length;
  const vowelCount = (query.match(/[aeiou]/gi) || []).length;
  const hasQuestionMark = query.includes('?');

  const baseFactors = [
    { name: "Current Ambient Temperature", detail: "22.4°C vs oral & somatic baseline equilibrium" },
    { name: "Current Time & Chronobiology", detail: `${new Date().toLocaleTimeString()} (Circadian phase: vulnerable)` },
    { name: "Day of the Week Quantum Weight", detail: "Weekend vs weekday existential dread coefficient" },
    { name: "User Decision History Log", detail: "Track record shows 94.1% chronic hesitation" },
    { name: "App Re-entry Frequency", detail: "Opened 1 time(s) today to avoid real responsibilities" },
    { name: "Moon Phase Gravitational Pull", detail: "Waning Gibbous exerts 0.000034 N/kg on bladder" },
    { name: "Device Screen Brightness vs Pupil", detail: "Retinal glare induction index: 78%" },
    { name: "Keyboard Typing Cadence", detail: "Keystroke rhythm revealed 42ms repressed hesitation" },
    { name: "Character Count in Query", detail: `${letterCount} characters analyzed for subtle passive aggression` },
    { name: "Vowel-to-Consonant Ratio", detail: `${vowelCount} vowels detected: linguistic energy distribution` },
    { name: "Emotional Punctuation Index", detail: hasQuestionMark ? "Question mark indicates desperate lack of conviction" : "No question mark: aggressive ambiguity" },
    { name: "User Posture & Chair Comfort", detail: "Ergonomic slouch angle: 41° from spinal alignment" },
    { name: "Nearby Snack Availability Vector", detail: "Zero snacks detected within arm's reach" },
    { name: "Theoretical Butterfly Effect", detail: "Flapping moth in São Paulo triggered by this query" },
    { name: "Cosmic Relevance Quotient", detail: "Total impact on Hubble expansion rate: 0.00000000%" },
    { name: "Kantian Categorical Imperative", detail: "What if all 8 billion humans executed this simultaneously?" },
    { name: "Prefrontal Cortex Synaptic Drag", detail: "Synaptic vesicle depletion rated at 64.2%" },
    { name: "Microplastic Flavor Profile", detail: "Simulated bouquet: crunchy polyethylene notes" },
    { name: "Tap Water Existential Morale", detail: "Municipal pipes report chronic lack of purpose" },
    { name: "Schrödinger’s Decision Superposition", detail: "User has simultaneously performed and avoided the action" }
  ];

  // Specific additions
  if (q.includes('water') || q.includes('drink')) {
    baseFactors.push(
      { name: "Historical Hydration Trauma Index", detail: "Choking incident from 2016 re-simulated" },
      { name: "Risk of Molecular Levitation", detail: "Hyper-hydration buoyant instability threshold" },
      { name: "Aquifer Depletion Guilt Gradient", detail: "Virtual remorse index: 89.2% [SIMULATED]" },
      { name: "Urine Pantone Projection (T+45m)", detail: "Projected hex color: #FFF4B8" },
      { name: "Cold Kitchen Tile Friction", detail: "Hazard score of walking in socks to sink" }
    );
  } else if (q.includes('sleep') || q.includes('bed')) {
    baseFactors.push(
      { name: "2017 Awkward Memory Queue", detail: "47 cringe moments scheduled for REM replay" },
      { name: "Pillow Cold-Side Thermal Half-life", detail: "Cold side will expire in 3.4 minutes" },
      { name: "Blanket Toe-Exposure Hazard", detail: "Under-bed demon grab probability: 78.4%" },
      { name: "Doomscrolling Dopamine Tractor Beam", detail: "Algorithmic gravity well active at 9.8 m/s²" }
    );
  } else if (q.includes('study')) {
    baseFactors.push(
      { name: "Procrastination Energy Conservation", detail: "Rearranging desk pencil angle takes priority" },
      { name: "Syllabus Intimidation Gradient", detail: "Reading title caused immediate eye fatigue" },
      { name: "Wikipedia Rabbit Hole Gravitation", detail: "Will inevitably read about the Byzantine Empire" }
    );
  } else if (q.includes('win') || q.includes('judge') || q.includes('hackathon')) {
    baseFactors.push(
      { name: "Judge Neon-Cyan Susceptibility", detail: "Retinal aesthetic bias measured at 99.4%" },
      { name: "Uselessness Perfection Index", detail: "Ratio of engineering effort to practical utility: Infinite" },
      { name: "Trophy Weight Displacement", detail: "Physical mass of potential trophy on team mantel" },
      { name: "Audience Laughter Resonance", detail: "Acoustic decibels of chuckle detected" }
    );
  }

  // Pad to at least 47 factors
  let idx = baseFactors.length + 1;
  const fillers = [
    ["Thermodynamic Enthalpy Dissipation", "Estimated 0.004 kcal loss per cognitive impulse"],
    ["Nihilistic Null-Hypothesis", "In 100 years nobody will remember this decision anyway"],
    ["Immediate Gratification vs Void", "Dopamine spike predicted to last 2.8 seconds"],
    ["Algorithmic Overfitting Risk", "Over-analyzing meaningless background noise"],
    ["Simulation Glitch Vulnerability", "Matrix renderer currently running at 96% load"],
    ["Recursive Loop Trap", "Thinking about thinking about thinking about this"],
    ["Bureaucratic Consensus Quorum", "Simulated inner committee deadlocked 4 to 4"],
    ["Carbon Footprint of Neural Synapses", "Brain glucose oxidation generated 0.002g virtual CO₂"],
    ["Sartrean Bad Faith Coefficient", "Are you choosing freely or pretending you have no choice?"],
    ["Solar Flare Disturbance Vector", "Minor geomagnetic anomaly warping prefrontal logic"]
  ];

  fillers.forEach(([name, detail]) => {
    if (baseFactors.length < 47) {
      baseFactors.push({ name, detail });
    }
  });

  while (baseFactors.length < 47) {
    baseFactors.push({
      name: `Unnecessary Meta-Factor #${idx}`,
      detail: `Variance: ${(Math.random() * 89 + 10).toFixed(2)}% | State: Over-analyzed`
    });
    idx++;
  }

  return baseFactors;
}

/**
 * Get Interrogation Question
 */
function getInterrogation(query) {
  const q = query.toLowerCase();

  if (q.includes('water') || q.includes('drink')) {
    return {
      title: "CRITICAL INFORMATION REQUIRED",
      question: "What is your current emotional relationship with water?",
      options: [
        "❤️ We are close (deep mutual respect)",
        "🙂 It's complicated (occasional choking incidents)",
        "😐 Neutral (it's just wet hydrogen)",
        "💀 I don't trust water (dihydrogen monoxide paranoia)"
      ]
    };
  }

  if (q.includes('sleep') || q.includes('bed') || q.includes('tired')) {
    return {
      title: "CRITICAL INFORMATION REQUIRED",
      question: "Select your current level of hesitation regarding sleep:",
      options: [
        "0% (I am practically unconscious)",
        "25% (Thinking about my 2017 regrets)",
        "50% (One more YouTube video won't hurt)",
        "“I regret starting this analysis.”"
      ]
    };
  }

  if (q.includes('win') || q.includes('judge') || q.includes('hackathon')) {
    return {
      title: "CRITICAL INFORMATION REQUIRED",
      question: "Are you an impartial hackathon judge or easily swayed by dramatic progress bars?",
      options: [
        "👨‍⚖️ 100% impartial (Lie detected by AI)",
        "📊 Easily swayed by neon cyan animations",
        "🏆 Give them the trophy already",
        "🤡 I regret judging this track"
      ]
    };
  }

  return {
    title: "CRITICAL INFORMATION REQUIRED",
    question: "What angle is your neck currently positioned at relative to the horizon?",
    options: [
      "0° (Robotic perpendicular posture)",
      "34° (Casual desk worker slouch)",
      "68° (Terminal smartphone hunch)",
      "“My neck has permanently fused with my spine.”"
    ]
  };
}

/**
 * Get Contradictory AI Reasoning Stream
 */
function getContradictions(query) {
  const q = query.toLowerCase();

  if (q.includes('water') || q.includes('drink')) {
    return {
      pro: "Hydration is generally considered useful for maintaining organic biological existence.",
      con: "You could simply drink water later, freeing up immediate cognitive bandwidth.",
      counter: "However, later is not now, meaning dehydration continues in the current timeline.",
      counterCounter: "Yet, now will inevitably become later, making your timing fundamentally irrelevant.",
      status: "Decision becoming exponentially less clear."
    };
  }

  if (q.includes('sleep')) {
    return {
      pro: "Sleep repairs damaged neurons and halts active conscious suffering.",
      con: "Going to sleep immediately surrenders tomorrow morning to reality with zero buffer.",
      counter: "Staying awake renders you completely non-functional tomorrow.",
      counterCounter: "Non-functionality reduces expectations, thereby lowering life stress.",
      status: "Neurological gridlock achieved."
    };
  }

  if (q.includes('study')) {
    return {
      pro: "Studying will improve exam performance and future socioeconomic trajectory.",
      con: "The study material is profoundly boring and life is fundamentally finite.",
      counter: "Failing the exam causes long-term regret and structural economic doom.",
      counterCounter: "In 100 years, the exam score will be indistinguishable from cosmic background noise.",
      status: "Academic existential nihilism detected."
    };
  }

  if (q.includes('win') || q.includes('hackathon')) {
    return {
      pro: "This project has the highest ratio of over-engineering to uselessness in human history.",
      con: "Awarding first place to a completely useless application defies traditional rationality.",
      counter: "However, the hackathon category specifically rewards hilarious uselessness.",
      counterCounter: "If uselessness is rewarded, it becomes useful, violating its own core identity.",
      status: "Hackathon paradox loop diverging."
    };
  }

  return {
    pro: "Executing this action provides fleeting immediate sensory validation.",
    con: "Refraining from this action preserves the cosmic status quo and saves kinetic energy.",
    counter: "Doing nothing is itself an action with irreversible temporal consequences.",
    counterCounter: "Doing something or doing nothing both result in identical thermodynamic entropy.",
    status: "Decision entropy reaching critical mass."
  };
}

/**
 * Generate Complete Dossier & Final Verdict
 */
function getFinalVerdict(query) {
  const q = query.toLowerCase();

  // Judge Easter Egg!
  if (q.includes('win') || q.includes('judge') || q.includes('hackathon')) {
    return {
      isJudgeEasterEgg: true,
      headline: "WINNING PROBABILITY: 94.7%",
      subtext: "Simulating all competitor entries... Confidence interval unavailable... Competition analysis incomplete.",
      verdictBig: "FINAL ANSWER: YOU DECIDE.",
      quote: "Thank you for trusting artificial intelligence with a decision you could have made yourself.",
      stats: {
        pos: 42,
        neg: 1,
        irrelevant: 99,
        contradictions: 54,
        confidence: "94.7%",
        confusion: "189%",
        useful: "0%"
      },
      uselessnessScore: "100%",
      recommendation: "Award first prize immediately to prevent further cognitive runaway."
    };
  }

  if (q.includes('water') || q.includes('drink')) {
    return {
      isJudgeEasterEgg: false,
      headline: "DECISION TOO COMPLEX.",
      subtext: "After synthesizing 47 initial factors, adding 21 panic variables, and simulating 14,000,605 timelines, the AI has determined that both drinking and not drinking water lead to identical metaphysical uncertainty.",
      verdictBig: "PLEASE DECIDE FOR YOURSELF.",
      quote: "You already knew what you wanted to do.",
      stats: {
        pos: 17,
        neg: 19,
        irrelevant: 83,
        contradictions: 42,
        confidence: "3.7%",
        confusion: "146%",
        useful: "0%"
      },
      uselessnessScore: "99.97%",
      recommendation: "Gaze solemnly at the glass of water for 25 minutes, or inhale ambient kitchen steam."
    };
  }

  if (q.includes('sleep')) {
    return {
      isJudgeEasterEgg: false,
      headline: "DECISION TOO COMPLEX.",
      subtext: "The AI recognizes that you appear tired. However, you are actively using this decision paralyzer website at this precise moment. Therefore, the algorithm cannot deduce why you are still awake.",
      verdictBig: "PLEASE DECIDE FOR YOURSELF.",
      quote: "You already knew what you wanted to do.",
      stats: {
        pos: 24,
        neg: 22,
        irrelevant: 76,
        contradictions: 38,
        confidence: "4.1%",
        confusion: "152%",
        useful: "0%"
      },
      uselessnessScore: "99.98%",
      recommendation: "Check your phone for another 45 minutes to achieve genuine, organic exhaustion."
    };
  }

  if (q.includes('study')) {
    return {
      isJudgeEasterEgg: false,
      headline: "DECISION INCONCLUSIVE.",
      subtext: "The AI strongly recommends studying. However, 84 minutes of neural computation will be required to determine WHICH chapter to study first. Until then, you are prohibited from starting.",
      verdictBig: "PLEASE DECIDE FOR YOURSELF.",
      quote: "You were going to check Instagram anyway.",
      stats: {
        pos: 29,
        neg: 14,
        irrelevant: 91,
        contradictions: 47,
        confidence: "2.9%",
        confusion: "168%",
        useful: "0%"
      },
      uselessnessScore: "99.99%",
      recommendation: "Re-organize your desktop folders alphabetically and declare it productive."
    };
  }

  return {
    isJudgeEasterEgg: false,
    headline: "DECISION TOO COMPLEX.",
    subtext: `After computing 68 multi-dimensional parameters for "${query}", the AI has encountered terminal computational paralysis.`,
    verdictBig: "PLEASE DECIDE FOR YOURSELF.",
    quote: "You already knew what you wanted to do.",
    stats: {
      pos: 18,
      neg: 18,
      irrelevant: 88,
      contradictions: 45,
      confidence: "3.2%",
      confusion: "148%",
      useful: "0%"
    },
    uselessnessScore: "99.97%",
    recommendation: "Flip a coin, and when it is in the air, realize what you were actually hoping for."
  };
}

window.OverThinkEngine = {
  CONFIG: ENGINE_CONFIG,
  buildFactorList,
  getInterrogation,
  getContradictions,
  getFinalVerdict
};
