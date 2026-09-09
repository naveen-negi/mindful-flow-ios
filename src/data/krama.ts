/**
 * Haṭha krama — the content of the three-stage module.
 *
 * Every string here is copy, not logic. The rule the module follows: a claim
 * from the texts is always introduced as a claim ("what the texts hold out"),
 * with its citation, and never asserted as a fact about the body. What the
 * practitioner can actually check for themselves lives under "What you will
 * notice".
 */

export type DrillId = 'mula' | 'jalandhara' | 'uddiyana' | 'nabho';
export type PracticeId = DrillId | 'maha-mudra' | 'nadi';

export interface TextClaim {
  heading: string;
  body: string;
  citation: string;
}

export interface KeyPoint {
  label: string;
  note: string;
}

export interface GlossTerm {
  term: string;
  meaning: string;
}

export interface Gloss {
  /** Link text on the "why" screen that leads here. */
  link: string;
  title: string;
  before: KeyPoint;
  after: KeyPoint;
  body: string;
  terms: GlossTerm[];
}

/** Rounds of a held lock, counted by the shared drill screen. */
export interface RoundsPractice {
  kind: 'rounds';
  /** Call to action at the foot of the "how" screen. */
  cta: string;
  /** Word under the countdown while the lock is on. */
  holdWord: string;
  rounds: number;
  hold: number;
  rest: number;
  roundsHint: string;
  holdHint: string;
  restHint: string;
  /** One line under the arithmetic on the setup screen. */
  restRule: string;
  /** A held inhale opens the round: one low strike before the two. */
  inhaleCue: boolean;
  /** What to undo first if the practitioner stops mid-hold. */
  stopHint: string;
}

/** No counting — sit for a fixed spell, breathing freely. */
export interface SettlePractice {
  kind: 'settle';
  cta: string;
  seconds: number;
  holdWord: string;
  stopHint: string;
}

export type Practice = RoundsPractice | SettlePractice;

export interface Drill {
  id: DrillId;
  name: string;
  /** Short form used in the status line of the practice screen. */
  shortName: string;
  /** "Root lock · drill 1 of 4" */
  order: string;
  /** "root lock · 15 s holds" */
  hubKicker: string;
  hubBlurb: string;
  summary: string;
  claims: TextClaim[];
  noticeHeading: string;
  notice: string;
  /** Title of the "how" screen — the figure, not the practice. */
  howTitle: string;
  howKicker: string;
  keyPoints: KeyPoint[];
  steps: string[];
  /** The common error, named. */
  wrongHeading?: string;
  wrong?: string;
  practice: Practice;
  gloss: Gloss;
  /** Library entry, where the designed wording differs from the teaching screen. */
  reference?: { body: string; books: string };
  /** Uḍḍīyāna is closed until the safety check is cleared. */
  gated?: boolean;
}

export const DRILLS: Drill[] = [
  {
    id: 'mula',
    name: 'Mūla bandha',
    shortName: 'Mūla',
    order: 'Root lock · drill 1 of 4',
    hubKicker: 'root lock · 15 s holds',
    hubBlurb: 'Turns apāna upward to meet prāṇa — the union the texts build everything else on.',
    summary:
      'A light, sustained lift at the perineal body — the point between the anus and the urethra. Not a clench, and not the sphincters.',
    claims: [
      {
        heading: 'Apāna is turned upward',
        body: "Apāna's course is downward. Pressing the perineum turns it up to meet prāṇa, and the two are said to unite at the navel.",
        citation: 'Pradīpikā 3.64–65',
      },
      {
        heading: 'The fire at the navel is kindled',
        body: 'That union fans jāṭharāgni. The verse that follows makes the large claim plainly: the old body is said to become young again.',
        citation: 'Pradīpikā 3.66–67',
      },
    ],
    noticeHeading: 'What you will notice',
    notice:
      'Long before any of that: the lift stays small, and it holds without the buttocks or the breath joining in.',
    howTitle: 'Mūla bandha',
    howKicker: 'Root lock · the seat',
    keyPoints: [
      { label: 'Shoulders relaxed', note: 'nothing braced above the waist' },
      { label: 'Hands in mudrā', note: 'resting on the knees, wrists soft' },
      {
        label: 'Heel at the pelvic floor',
        note: 'the ring marks the perineal body — the lift starts there',
      },
    ],
    steps: [
      'Squeeze the anus on purpose. Notice where it is. Let it go.',
      'Stop the flow of urine mid-stream. Notice where that is. Let it go.',
      'Find the point between them, draw it up a millimetre, and keep breathing.',
    ],
    wrongHeading: 'If it feels like this, it is wrong',
    wrong:
      'Buttocks tightening, thighs drawing together, breath held, or a grip you cannot keep past five seconds.',
    practice: {
      kind: 'rounds',
      cta: 'Hold · five rounds',
      holdWord: 'holding',
      rounds: 5,
      hold: 15,
      rest: 20,
      roundsHint: 'four or five is plenty at first',
      holdHint: 'seconds, on a held inhale',
      restHint: 'seconds, breathing normally',
      restRule:
        'The rest is breathed, not held. If the next cue arrives before the breath has settled, let it pass and stop the sitting.',
      inhaleCue: true,
      stopHint: 'let the lift go first, then breathe out',
    },
    gloss: {
      link: 'What do these words actually mean?',
      title: 'Two currents, one meeting',
      before: { label: 'Without the lock', note: 'the lower current drains away' },
      after: {
        label: 'With the lock',
        note: 'it turns, and the two meet near the navel — felt as warmth',
      },
      body: 'Two currents: one rises from the chest, one sinks below the navel and mostly just leaves. Lift the small point between the legs and the lower one turns around — the two meet near the navel, felt as warmth. The books call that the fire, and say the heat wakes what sleeps at the base of the spine.',
      terms: [
        { term: 'Prāṇa', meaning: 'the current that rises.' },
        { term: 'Apāna', meaning: 'the one that sinks.' },
        { term: 'Mūla', meaning: 'root, the place you lift.' },
      ],
    },
  },
  {
    id: 'jalandhara',
    name: 'Jālandhara bandha',
    shortName: 'Jālandhara',
    order: 'Throat lock · drill 2 of 4',
    hubKicker: 'throat lock · 20 s holds',
    hubBlurb: 'The net that catches the nectar before the fire at the navel can burn it.',
    summary:
      'Sternum up, back of the neck long, then the chin into the notch. Done in that order it is a fold, not a squash.',
    claims: [
      {
        heading: 'The nectar is not spent',
        body: 'Amṛta is said to drip from the moon at the palate down toward the fire at the navel, where it is burned. Jālandhara is the net — jāla — that catches it.',
        citation: 'Pradīpikā 3.72–73',
      },
      {
        heading: 'The channels of the throat are bound',
        body: 'The net of nāḍīs in the neck is held closed, so prāṇa gathered by the retention cannot leak away upward.',
        citation: 'Pradīpikā 3.70–71',
      },
    ],
    noticeHeading: 'What you will notice',
    notice:
      'The held breath stops pressing into the ears and eyes, and the pulse eases while the chin is down.',
    howTitle: 'Jālandhara',
    howKicker: 'Throat lock · the position',
    keyPoints: [
      { label: 'Sternum lifted', note: 'the chest rises to the chin, not the chin to the chest' },
      { label: 'Back of the neck long', note: 'the crown keeps floating up' },
      { label: 'Chin in the notch', note: 'the marked hollow above the sternum' },
    ],
    steps: [
      'Lift the sternum from the chest, not by shrugging.',
      'Lengthen the back of the neck, crown floating up.',
      'Only now lower the chin. Tongue stays on the palate.',
    ],
    wrongHeading: 'If it feels like this, it is wrong',
    wrong:
      'Chin going first, upper back rounding, throat crushed instead of sealed, pressure behind the eyes.',
    practice: {
      kind: 'rounds',
      cta: 'Hold · four rounds',
      holdWord: 'holding',
      rounds: 4,
      hold: 20,
      rest: 20,
      roundsHint: 'four is a full sitting',
      holdHint: 'seconds, on a held inhale',
      restHint: 'seconds, breathing normally',
      restRule:
        'The rest is breathed, not held. If the next cue arrives before the breath has settled, let it pass and stop the sitting.',
      inhaleCue: true,
      stopHint: 'lift the head first, then breathe out',
    },
    gloss: {
      link: 'The moon, the fire and the net',
      title: 'The moon, the fire, the net',
      before: { label: 'Chin up', note: 'the moon drips, the fire below burns it off' },
      after: { label: 'Chin down', note: 'the net closes — nothing reaches the fire' },
      body: 'An old picture: a moon behind the roof of your mouth drips something sweet, and a fire at the navel burns whatever falls. Tuck the chin and a net closes across the throat, so the drip stays where it came from — and the same tuck keeps a long hold from pressing into your ears and eyes.',
      terms: [
        { term: 'Jāla', meaning: 'a net.' },
        { term: 'Amṛta', meaning: 'the sweet drip, literally the undying thing.' },
      ],
    },
  },
  {
    id: 'uddiyana',
    name: 'Uḍḍīyāna bandha',
    shortName: 'Uḍḍīyāna',
    order: 'Upward lock · drill 3 of 4',
    hubKicker: 'upward lock · empty lungs only',
    hubBlurb:
      'Named for the flight — prāṇa driven up the central channel. The lion to the elephant of death.',
    summary:
      'On empty lungs only. The abdominal wall is drawn back and up under the ribs by a vacuum, never by gripping.',
    claims: [
      {
        heading: 'The great bird flies up',
        body: 'The name comes from uḍḍīyate — it flies up. Prāṇa is made to rise through suṣumnā rather than settle.',
        citation: 'Pradīpikā 3.55–56',
      },
      {
        heading: 'The lion to the elephant of death',
        body: "That is the Pradīpikā's own image for it, and it calls this the best of the bandhas — one whose mastery brings release of itself.",
        citation: 'Pradīpikā 3.58–60',
      },
    ],
    noticeHeading: 'Conditions',
    notice: 'Empty stomach, and always after a full exhale. Never on a breath held in.',
    howTitle: 'Uḍḍīyāna',
    howKicker: 'Abdominal lock · the seat',
    keyPoints: [
      { label: 'Empty lungs', note: 'the whole exhale is out before anything lifts' },
      { label: 'Chin down', note: 'jālandhara is set first and stays' },
      {
        label: 'Abdomen soft',
        note: 'the ring marks where the wall draws back — the vacuum does it, not the muscles',
      },
    ],
    steps: [
      'Exhale completely, then squeeze the last of it out.',
      'Set jālandhara — chin down, throat sealed.',
      'Mock an inhalation with the glottis shut. Ribs lift, no air enters.',
      'Leave the abdomen soft and let the vacuum do it.',
    ],
    wrongHeading: 'Vacuum, not a contraction',
    wrong:
      'The vacuum draws the wall back and up on its own. Squeezing the abdomen in with the muscles is the common error — it is a different action and it does not lift.',
    practice: {
      kind: 'rounds',
      cta: 'Hold on empty · three rounds',
      holdWord: 'holding on empty',
      rounds: 5,
      hold: 8,
      rest: 30,
      roundsHint: 'three to five is plenty at first',
      holdHint: 'seconds, on empty lungs',
      restHint: 'seconds, breathing normally',
      restRule:
        'The rest is breathed, not held. If the next cue arrives before the breath has settled, let it pass and stop the sitting.',
      inhaleCue: false,
      stopHint: 'release the lock first, then breathe in',
    },
    gated: true,
    gloss: {
      link: 'What does “the great bird flies up” mean?',
      title: 'The bird that flies up',
      before: {
        label: 'Belly drawn back on empty',
        note: 'the hollow makes a lift through the centre of you',
      },
      after: {
        label: 'Coiled at the base',
        note: 'three and a half turns, straightening as the heat rises',
      },
      body: 'The name means flies up. Empty your lungs, draw the belly back under the ribs, and there is a real pull upward through the centre of you. The books say the energy coiled at the base of the spine takes that pull and travels up the middle channel, like a bird when your hand lets go.',
      terms: [
        { term: 'Uḍḍīyāna', meaning: 'flying up.' },
        { term: 'Suṣumnā', meaning: 'the middle channel.' },
        { term: 'Kuṇḍalinī', meaning: 'the coiled one.' },
      ],
    },
  },
  {
    id: 'nabho',
    name: 'Nabho mudrā',
    shortName: 'Nabho',
    order: 'Tongue seal · drill 4 of 4',
    hubKicker: 'tongue seal · held throughout',
    hubBlurb: 'The fold the texts call khecharī — the tongue resting in the void above the palate.',
    summary:
      'Tongue turned back, tip resting where the palate turns soft. Held through the other three locks and through the whole sitting.',
    claims: [
      {
        heading: 'Khecharī — moving in the void',
        body: 'The name means moving in space: the tongue turns into the hollow above the palate, and the mind is said to go with it.',
        citation: 'Pradīpikā 3.37–41',
      },
      {
        heading: 'The nectar is tasted',
        body: 'Soma runs from the lotus above and is drunk at the palate. Hunger, thirst, sloth and sleep are said not to arise.',
        citation: 'Pradīpikā 3.38–39 · Gheranda 3.27–29',
      },
    ],
    noticeHeading: 'Where this app stops',
    notice:
      'The old route also describes cutting under the tongue. We do not teach it. Talabya kriya gets you length over months, without a blade.',
    howTitle: 'Nabho mudrā',
    howKicker: 'Tongue seal · the section',
    keyPoints: [
      { label: 'Teeth apart', note: 'the jaw stays slack throughout' },
      { label: 'Tip at the soft palate', note: 'where the hard roof turns soft' },
      { label: 'Left alone', note: 'it stays there through the other locks' },
    ],
    steps: [
      'Teeth apart, jaw loose. Turn the tongue back along the hard palate.',
      'Rest the tip where the palate turns soft, and leave it.',
      'Keep it there through the other locks and the whole sitting.',
    ],
    wrongHeading: 'Expect this early on',
    wrong:
      'A lot of saliva in the first weeks. Nothing is wrong. Swallow between cycles, never inside a retention.',
    practice: {
      kind: 'settle',
      cta: 'Settle · one minute, breathing freely',
      seconds: 60,
      holdWord: 'settling',
      stopHint: 'let the tongue down and breathe normally',
    },
    reference: {
      body: 'Turn the tongue back so the tip rests where the palate turns soft, and leave it there. Teeth apart, jaw slack. Held through the other locks and through the whole sitting.',
      books:
        'Gheranda Samhitā 3.7 lists it on its own; Pradīpikā 3.37–41 treats the finished form, khecharī. The jaw stops working and the swallow reflex quietens. Expect saliva for a few weeks.',
    },
    gloss: {
      link: 'Why “moving in space”?',
      title: 'The lid on the jar',
      before: { label: 'Tongue at rest', note: 'open at the top — it leaves' },
      after: { label: 'Tongue turned back', note: 'closed — it stays and circles' },
      body: 'The body as a jar: mūla holds the bottom, the chin closes the throat, and the tongue turned back is the lid. The finished form is khecharī, moving in space — the tongue lifts into the hollow above the palate and the attention goes with it. What you notice first is quieter: with the tongue parked, there is less to fidget with.',
      terms: [
        { term: 'Nabho', meaning: 'sky.' },
        { term: 'Khecharī', meaning: 'moving in space.' },
      ],
    },
  },
];

export const drillById = (id: string): Drill | undefined => DRILLS.find((d) => d.id === id);

/** Mahā mudrā is not one of the four locks — it is the seal that uses them. */
export const MAHA_MUDRA = {
  id: 'maha-mudra' as const,
  name: 'Mahā mudrā',
  shortName: 'Mahā mudrā',
  kicker: 'The great seal · Pradīpikā 3.10–18',
  summary:
    'Not the seated one. Here the heel does the work of the root lock while the leg is long and the breath is held in.',
  keyPoints: [
    { label: 'The folded heel', note: 'pressed into the perineum — it holds the root for you' },
    { label: 'The long leg', note: 'knee straight, both hands to the big toe' },
  ] as KeyPoint[],
  steps: [
    'Left heel into the perineum, right leg long in front of you.',
    'Breathe in fully. Both hands catch the big toe; spine long, not rounded.',
    'Chin to the sternal notch, root lifted. Hold the breath in.',
    'Lift the head, release the root, then breathe out slowly.',
    'Change sides. Equal rounds left and right, always.',
  ],
  practice: {
    kind: 'rounds',
    cta: 'Practise — three each side',
    holdWord: 'holding',
    rounds: 3,
    hold: 12,
    rest: 20,
    roundsHint: 'each side, equal rounds always',
    holdHint: 'seconds, on a held inhale',
    restHint: 'seconds, breathing normally',
    restRule:
      'The rest is breathed, not held. Sides alternate — the cue tells you which heel is in.',
    inhaleCue: true,
    stopHint: 'lift the head first, then breathe out',
  } as RoundsPractice,
};

/** Stage one. Equal count, no retention, four steps to a round. */
export const NADI = {
  id: 'nadi' as const,
  name: 'Nāḍī śodhana',
  eyebrow: 'Stage one · also nāḍī śuddhi',
  summary:
    'Śodhana is the cleansing, śuddhi the purity it leaves. The method is anuloma viloma — with the grain and against it.',
  channels: [
    { label: 'Iḍā, on the left', note: 'cooling, the moon side' },
    { label: 'Piṅgalā, on the right', note: 'heating, the sun side' },
  ] as KeyPoint[],
  susumna:
    'Between them, straight up the spine, suṣumnā — the channel all of this is clearing the way for.',
  signsHeading: 'Nāḍī śuddhi lakṣaṇa — the signs',
  signs:
    'The body light and lean, the complexion clear, the digestive fire strong, nāda audible, and retention long and effortless.',
  marker:
    'The plain marker most teachers use: both nostrils flowing evenly. Normally one dominates, and they swap roughly every ninety minutes — the svara cycle.',
  howEyebrow: 'The hand',
  howTitle: 'Nāsikāgra mudrā',
  hand: [
    { label: 'Thumb', note: 'presses your right nostril shut' },
    { label: 'Ring finger', note: 'reaches across to your left' },
  ] as KeyPoint[],
  handNote: 'Right hand. Index and middle fingers folded into the palm.',
  steps: [
    'Close the right. Breathe in through the left.',
    'Close the left. Breathe out through the right.',
    'Breathe in through the right.',
    'Close the right. Breathe out through the left. That is one round.',
  ],
  countNote: 'Equal in and out — 4:4 to begin. Ten to twenty rounds, built up slowly.',
  noRetention: 'No retention at all.',
  rounds: 12,
  seconds: 4,
  /** What the texts ask for before prāṇāyāma proper. */
  courseDays: 90,
};

/** The path screen — three stages in the order the texts give them. */
export const STAGES = [
  {
    n: 1,
    title: 'Nāḍī śodhana',
    badge: 'start here',
    body: 'Alternate nostrils, equal count, no retention. Three months morning and evening is what the Haṭhapradīpikā asks before prāṇāyāma proper.',
    to: '/krama/nadi',
  },
  {
    n: 2,
    title: 'Prāṇāyāma · 1:4:2',
    body: 'Sahita kumbhaka, the practice you already run. Ratios belong here, not in stage one.',
    to: '/',
  },
  {
    n: 3,
    title: 'Bandha & mudrā',
    body: 'A separate, more advanced practice. It opens when a 1:4:2 hold is comfortable, and it is never mixed into the breath timer.',
    to: '/bandha',
  },
];

export const PATH_WHY = {
  heading: 'Why this order',
  body: 'Prāṇa cannot enter suṣumnā while the channels are blocked, and forcing retention into blocked nāḍīs is what the texts warn about.',
  footnote:
    'Before all three, if you need them: the ṣaṭkarma — dhauti, basti, neti, trāṭaka, nauli, kapālabhāti',
};

/** Where the three locks sit on the body, root first. */
export const SITES = [
  { id: 'jalandhara', label: 'Jālandhara bandha', note: 'at the throat — the chin seals the notch' },
  {
    id: 'uddiyana',
    label: 'Uḍḍīyāna bandha',
    note: 'at the abdomen — the wall draws back toward the spine',
  },
  { id: 'mula', label: 'Mūla bandha', note: 'at the pelvic floor — the lift runs upward' },
] as const;

export const SITES_NOTE =
  'Root first, throat last. Uḍḍīyāna belongs only to the empty-lung hold — the other two ride the held inhale.';

/** The five cues, learned with the eyes open so they can be obeyed with them shut. */
export const CUES = [
  { id: 'breatheIn', name: 'Breathe in, fully', sound: 'one low strike' },
  { id: 'setLock', name: 'Chin down, root up', sound: 'two quick strikes' },
  { id: 'stillHolding', name: 'Still holding', sound: 'the rim ringing, fading out', quiet: 'no buzz' },
  { id: 'release', name: 'Let go, lift the head', sound: 'a soft roll, rising' },
  { id: 'stop', name: 'Stop now', sound: 'no bowl · three fast buzzes' },
] as const;

export const SOUNDS_INTRO =
  'Five cues, each with its own sound and its own buzz. Learn them here, then practise with the screen dark.';
export const SOUNDS_FOOTNOTE =
  'With vibration off, a face-down sitting will not start — the app says so instead of failing quietly.';

export const SIT = {
  heading: 'Ready to sit',
  listenHeading: 'From here on, listen',
  listen:
    'Put the phone face down on your knee or the floor. The bowl and the vibration carry the round — one strike to breathe in, two to set the chin and root, a soft roll to let them go.',
  rehearse: 'rehearse the cues',
  begin: 'Begin — three bowl strikes',
  footnote: 'Screen stays awake but dims. One tap anywhere ends the sitting and keeps the log.',
};

/**
 * The six questions that open uḍḍīyāna. Every one is answered no by someone the
 * drill is safe for; a single yes keeps it closed. The check is a gate, not
 * advice — it never tells anyone they are well.
 */
export interface GateQuestion {
  id: string;
  question: string;
  /** Why this one is asked, in plain words. */
  because: string;
}

export const GATE_QUESTIONS: GateQuestion[] = [
  {
    id: 'pregnancy',
    question: 'Are you pregnant, or in the first days of a period?',
    because: 'The lock draws the abdominal wall hard under the ribs.',
  },
  {
    id: 'pressure',
    question: 'Do you have high blood pressure, or a heart condition?',
    because: 'A hold on empty lungs changes the pressure in the chest.',
  },
  {
    id: 'abdomen',
    question: 'A hernia, an ulcer, or abdominal surgery in the last six months?',
    because: 'The same draw pulls on everything in the abdomen.',
  },
  {
    id: 'eyes',
    question: 'Glaucoma, or raised pressure in the eyes?',
    because: 'Retention presses upward as well as down.',
  },
  {
    id: 'food',
    question: 'Have you eaten in the last three hours?',
    because: 'The texts and every teacher ask for an empty stomach.',
  },
  {
    id: 'unwell',
    question: 'Unwell today — fever, dizziness, or a headache?',
    because: 'Not a reason to stop for good, only to sit this one out.',
  },
];

export const GATE_COPY = {
  eyebrow: 'Uḍḍīyāna bandha',
  title: 'Six questions',
  intro:
    'Answered once, kept on this phone. Any yes and the drill stays closed — nothing else in the app changes.',
  cleared: 'The drill is open.',
  clearedNote:
    'Empty stomach, always after a full exhale, never on a breath held in. You can retake this any time.',
  blocked: 'This one stays closed',
  blockedNote:
    'The other three locks are open and lose nothing by it. Retake the check whenever the answer changes.',
  retake: 'Retake the check',
};

/**
 * Manuscript plates. Nothing is hotlinked: a plate shows only when its file has
 * been bundled into public/plates, and the caption line travels with it either
 * way.
 */
export interface Plate {
  id: string;
  title: string;
  body: string;
  source: string;
  file: string;
  to?: string;
}

export const PLATES: Plate[] = [
  {
    id: 'maha-mudra',
    title: 'Mahā mudrā',
    body: 'One heel at the perineum, the other leg long, hands to the toe, chin down on a held inhale.',
    source: 'Joga Pradīpikā, 1830 · British Library Add. 24099 · public domain',
    file: '/plates/maha-mudra.jpg',
    to: '/bandha/maha-mudra',
  },
  {
    id: 'viparita',
    title: 'Viparīta karaṇī',
    body: 'The inversion that trains the same chin-to-sternum position as jālandhara. It sits in the preparation sequence for that reason.',
    source: 'Joga Pradīpikā, 1830 · British Library Add. 24099 · public domain',
    file: '/plates/viparita-karani.jpg',
  },
  {
    id: 'khecari',
    title: 'Khecarī, in stages',
    body: 'A sectioned drawing of the tongue turning back to the soft palate — the clearest picture of what nabho mudrā is doing.',
    source: 'Wikimedia Commons · CC0, released to the public domain',
    file: '/plates/khecari.jpg',
  },
];

export const PLATES_COPY = {
  intro: 'Painted from the manuscripts themselves. Tap a plate to see the folio full-screen.',
  note:
    'Every plate carries its manuscript, date, holding library and licence. A missing plate keeps its caption — the file simply has not been bundled yet.',
  aboutHeading: 'About the plates',
  about:
    'These three are free to use: two painted folios from the 1830 illustrated Joga Pradīpikā (British Library Add. 24099, public domain) and one CC0 sectioned drawing of the tongue fold.',
  more:
    'Worth digging through for more, all downloadable from the holding institutions: Bahr al-Hayāt (c. 1602, Chester Beatty — its folio of the yogin in khecarī is exactly on point), the Sritattvanidhi plates, and the Nath yogin paintings at the Wellcome Collection.',
  shipping:
    'Files are bundled with the app rather than hotlinked, and the caption line stays with each one.',
};

export const REFERENCE_INTRO =
  'Each lock as the books have it, and as it is done. Four entries, then the plates.';
