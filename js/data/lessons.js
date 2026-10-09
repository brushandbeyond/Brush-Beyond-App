// Brush & Beyond lesson catalog.
//
// This mirrors the real class list at brushbeyond.net/classes and the
// @Brush-And-Beyond-2025 YouTube channel. Where a real YouTube video was
// confirmed, `videoId` is filled in; otherwise it is left `null` and the
// lesson page shows a friendly "video coming soon" placeholder instead of
// guessing a link.
//
// To add or fix content: edit this file only — everything else (filters,
// cards, pages) reads from it automatically.
//
// Fields:
//   id           unique slug, used in the URL
//   title        lesson title
//   type         'history' | 'tutorial'
//   artist       primary artist / subject
//   era          art historical era or movement
//   difficulty   1-5, see js/data/difficulty.js
//   premium      true = gated behind Brush & Beyond Premium (extensive/deep-dive)
//   duration     display string, only set when known for certain
//   videoId      YouTube video id for the lesson's main video, or null.
//                For history lessons this is the only video source. For
//                tutorials it's a fallback, used only when `videoFile`
//                (below) isn't set — history lessons always stay on YouTube.
//   videoFile    tutorials only — path to your own uploaded clip (e.g.
//                'assets/tutorials/frida-kahlo-draw/main.mp4'), played
//                instead of the YouTube embed above when set. See README.
//   thumbnail    optional path to a custom image (e.g. 'assets/thumbnails/foo.jpg')
//                that overrides the auto-generated YouTube thumbnail. Handy
//                for lessons where videoId is still null. See README.
//   description  short kid-friendly summary shown on cards and up top
//   funFact      optional one-line "did you know" for history lessons —
//                this is where most of the extra written detail lives
//   materials    optional string[] of supplies, for tutorials
//   steps        optional array of { title, instructions, videoId, videoFile } —
//                when present, the lesson page shows a Khan-Academy-style
//                "Step 1 of N" flow with a Next Step button instead of one
//                single video. Each step's `videoId` / `videoFile` follow
//                the same fallback rule as the top-level fields above —
//                see README.
//   badgeIcon    optional path to custom badge artwork (e.g.
//                'assets/badges/frida-kahlo-draw.png'), shown on the
//                profile page once a kid earns that lesson's badge. Falls
//                back to a plain 🏛/🎨 icon if not set — see README.

const LESSONS = [
  // ---------------------------------------------------------------- Frida Kahlo
  {
    id: 'frida-kahlo-story',
    title: "Frida Kahlo — Painting Her Story",
    type: 'history',
    artist: 'Frida Kahlo',
    era: 'Modern Art (20th Century Mexico)',
    difficulty: 2,
    premium: false,
    videoId: 'RUOGYKEq6cE',
    description:
      'Meet Frida Kahlo and discover how she turned her own life story into bold, unforgettable self-portraits.',
    funFact:
      'Frida Kahlo painted more than 30 self-portraits in her lifetime — more than almost any other artist in history.',
  },
  {
    id: 'frida-kahlo-draw',
    title: 'Frida Kahlo — Self-Portrait Activity',
    type: 'tutorial',
    artist: 'Frida Kahlo',
    era: 'Modern Art (20th Century Mexico)',
    difficulty: 3,
    premium: false,
    videoId: '2MYJj8s_WdU',
    videoFile: null,
    duration: '7:16',
    description:
      'Paint your own Frida Kahlo-inspired self-portrait — flower crown, roses, and a dreamlike surreal twist.',
    materials: [
      'Acrylic paint',
      'Two paintbrushes (one large, one small)',
      'Water',
      'Watercolor paper',
      'A paint palette',
    ],
    steps: [
      {
        title: 'Sketch Yourself',
        instructions:
          'In pencil, draw your head, hair, neck, and part of your body in the center of the page. Add a flower crown, a necklace, earrings, some leaves in the background, and a small bird or animal on your shoulder — Frida often included animals like monkeys or cats in her self-portraits.',
        videoId: '2MYJj8s_WdU',
        videoFile: null,
      },
      {
        title: 'Paint Your Face, Hair, and Roses',
        instructions:
          "Carefully paint your skin color, working around your eyes, lips, and nose. Paint your hair in a solid color. For the roses in your hair, paint a spiral working outward in red, then do the same again in pink on top — that's how you get a pretty rose shape. Paint the leaves green and pick one bold color for the whole background.",
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Add Facial Details',
        instructions:
          "Paint your eyebrows — a single unibrow if you want to be extra accurate to Frida! Paint your eyes in any color with a black pupil, add softly blended red cheeks, and paint your lips in a bright color. Use a smaller brush for these details so you can go slow and stay precise.",
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Add a Dreamlike, Surreal Touch',
        instructions:
          'For a Frida-style twist, paint your lips or one eye a second time, slightly offset from the first, so your face looks a little less realistic and more dreamlike. Finish by outlining your arms, shirt, and background details in black to make everything look clean and finished.',
        videoId: null,
        videoFile: null,
      },
    ],
  },

  // ---------------------------------------------------------------- David Hockney
  {
    id: 'hockney-landscapes',
    title: 'David Hockney — His Landscape Paintings',
    type: 'history',
    artist: 'David Hockney',
    era: 'Contemporary Art',
    difficulty: 2,
    premium: false,
    videoId: '_Ebm3pzxDbk',
    description:
      "Explore David Hockney's colorful, dreamlike landscapes and his love of bright, bold color.",
    funFact:
      'David Hockney is one of the few living artists to have a museum wing dedicated entirely to his work while he is still painting.',
  },
  {
    id: 'hockney-collage',
    title: "Hockney's Photo Collage",
    type: 'tutorial',
    artist: 'David Hockney',
    era: 'Contemporary Art',
    difficulty: 3,
    premium: false,
    videoId: 'mx3Pcowy1Ro',
    videoFile: null,
    // Video confirmed on the channel, but its transcript hasn't been pulled
    // yet, so `materials` / `steps` are left out rather than guessed.
    description:
      "Make your own photo collage inspired by David Hockney's playful, puzzle-like compositions.",
  },
  {
    id: 'hockney-swimming-pool',
    title: 'David Hockney — His Swimming Pool',
    type: 'history',
    artist: 'David Hockney',
    era: 'Contemporary Art',
    difficulty: 2,
    premium: false,
    videoId: 'aHFYDQyP_6M',
    description:
      "Dive into David Hockney's famous swimming pool paintings and how he captured sunny California light.",
    funFact:
      "Hockney invented new painted patterns just to capture how sunlight breaks apart on rippling water — no two 'splash' paintings use the same technique.",
  },

  // ---------------------------------------------------------------- Gustav Klimt
  {
    id: 'klimt-ornamental',
    title: "Klimt's Ornamental Designs",
    type: 'history',
    artist: 'Gustav Klimt',
    era: 'Art Nouveau & Symbolism',
    difficulty: 2,
    premium: false,
    videoId: 'u5C1VmP9rgY',
    description:
      "Discover Gustav Klimt's shimmering, pattern-covered paintings and his love of gold leaf.",
    funFact:
      "Klimt's father was a gold engraver, which is likely why Klimt learned to apply real gold leaf directly onto his canvases.",
  },
  {
    id: 'klimt-golden-portrait',
    title: 'Gustav Klimt — Golden Portrait Activity',
    type: 'tutorial',
    artist: 'Gustav Klimt',
    era: 'Art Nouveau & Symbolism',
    difficulty: 3,
    premium: false,
    videoId: 'BZLBRhwrdBs',
    videoFile: null,
    duration: '11:15',
    description:
      "Paint a glittering golden portrait inspired by Klimt's most famous works, like The Kiss and Portrait of Adele Bloch-Bauer.",
    materials: [
      'Acrylic paint',
      'Markers',
      'Pencil',
      'A Sharpie',
      'Paintbrush, palette, and paper',
    ],
    steps: [
      {
        title: 'Paint a Golden Background',
        instructions:
          'Mix brown, yellow, and yellow ochre paint together (or use real gold paint if you have it) and paint the entire background. Let it dry completely before moving on.',
        videoId: 'BZLBRhwrdBs',
        videoFile: null,
      },
      {
        title: 'Sketch a Girl in a Big Dress',
        instructions:
          "In pencil, draw a girl's face, hair, and neck — add a flower in her hair if you like. Then draw her dress really big, taking up most of the rest of the page. The bigger you draw it, the more room you'll have for patterns.",
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Sketch Patterns Into the Dress',
        instructions:
          "Draw lines dividing the dress into sections, then fill each section with a different Klimt-style pattern: boxes, zigzagging triangles (with a smaller triangle inside each one), horizontal lines, eyes, or circles.",
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Outline and Color',
        instructions:
          'Outline everything in Sharpie or black marker. Then color in some sections with paint or marker and leave others just outlined — randomize which ones you fill in so the pattern looks more natural, the way Klimt did.',
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Add Gold Patches and Jewels',
        instructions:
          "Mix white into your yellow to make a lighter gold, and dab scattered patches of it across the background — Klimt often used real gold leaf this way. Finish with small dots of white paint at edges and corners to look like sewn-on jewels.",
        videoId: null,
        videoFile: null,
      },
    ],
  },

  // ---------------------------------------------------------------- René Magritte
  {
    id: 'magritte-surrealism',
    title: 'René Magritte — Surrealism Adventures',
    type: 'history',
    artist: 'René Magritte',
    era: 'Surrealism',
    difficulty: 2,
    premium: false,
    videoId: '8QyBN5Uouzw',
    description:
      "Step into René Magritte's strange, wonderful world where umbrellas float and apples hide faces.",
    funFact:
      'Magritte painted ordinary objects — apples, pipes, bowler hats — but placed them in impossible situations, which is what made Surrealism so surprising.',
  },
  {
    id: 'magritte-apple',
    title: 'René Magritte — Apple Activity',
    type: 'tutorial',
    artist: 'René Magritte',
    era: 'Surrealism',
    difficulty: 3,
    premium: false,
    videoId: 'uBHHitq-xiA',
    videoFile: null,
    duration: '13:55',
    description:
      'Glue a realistic apple into the middle of a cartoon city scene for a surreal contrast, Magritte-style.',
    materials: [
      'Pencil',
      'Markers',
      'Glue stick',
      'Colored pencils',
      'Scissors and paper',
    ],
    steps: [
      {
        title: 'Draw and Cut Out a Realistic Apple',
        instructions:
          "On a separate piece of paper, draw and color a realistic-looking apple (or cut a photo of one from a magazine or newspaper). This contrast between a realistic apple and a cartoon background is exactly the trick Magritte used to make his work feel surreal.",
        videoId: 'uBHHitq-xiA',
        videoFile: null,
      },
      {
        title: 'Sketch a Cartoon City Scene',
        instructions:
          "Trace your apple's outline onto your background paper so you know what to draw around and leave empty. Then sketch a scene around it — try a fountain in a park, with trees, benches, a crosswalk, cars, and a city skyline of buildings in the distance.",
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Outline and Add Bold Color',
        instructions:
          "Outline your drawing in black marker or Sharpie, adding extra details like brick patterns as you go. Then color everything in with bright, vibrant markers or colored pencils — the colors don't need to be realistic, just eye-catching. Colored pencil looks great for extra texture in areas like the sky or road.",
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Glue In the Apple',
        instructions:
          "Outline the empty apple-shaped space in black so there's no white gap, then glue your realistic apple right into the center of your cartoon scene. That contrast is your finished artwork.",
        videoId: null,
        videoFile: null,
      },
    ],
  },

  // ---------------------------------------------------------------- James Rizzi
  {
    id: 'rizzi-houses',
    title: 'James Rizzi — Interesting Houses Around the World',
    type: 'history',
    artist: 'James Rizzi',
    era: 'Pop Art',
    difficulty: 1,
    premium: false,
    videoId: 'SWris9h_Mn8',
    description:
      "Tour James Rizzi's fun, colorful cartoon-style buildings and see how art can be silly and joyful.",
    funFact:
      "James Rizzi called his colorful, cartoon-like buildings 'a happy, chaotic world' — he wanted his art to make people smile.",
  },

  // ---------------------------------------------------------------- Yayoi Kusama
  {
    id: 'kusama-dots',
    title: 'Yayoi Kusama — The Wonder of Dots',
    type: 'history',
    artist: 'Yayoi Kusama',
    era: 'Contemporary Art',
    difficulty: 1,
    premium: false,
    videoId: 'Cp2ZJoiVc5Q',
    description:
      'Meet Yayoi Kusama and her endless, mesmerizing polka dots that cover entire rooms and pumpkins.',
    funFact:
      'Yayoi Kusama has said that painting dots helps calm her mind — she has been creating dot-covered art for over 70 years.',
  },
  {
    id: 'kusama-pumpkin',
    title: 'Yayoi Kusama — Pumpkin Holiday Activity',
    type: 'tutorial',
    artist: 'Yayoi Kusama',
    era: 'Contemporary Art',
    difficulty: 3,
    premium: false,
    videoId: '2VRjGfwnEjI',
    videoFile: null,
    duration: '7:55',
    description:
      'Sculpt a 3D clay pumpkin and mount it on a patterned paper background, covered in Kusama-style polka dots.',
    materials: [
      'Acrylic paint',
      'Air-dry clay',
      'Water',
      'A Sharpie and pencil',
      'A paintbrush',
      'Hot glue',
      'A piece of colorful paper',
    ],
    steps: [
      {
        title: 'Pattern Your Background Paper',
        instructions:
          "Divide a piece of colorful paper into sections — diagonally, in half, however you like — and leave the center open for your pumpkin. Fill the sections with a pattern; polka dots are the most Kusama move. Pick paint colors that contrast with your paper (opposite sides of the color wheel) so they really pop — for example, blue paint on hot-pink paper.",
        videoId: '2VRjGfwnEjI',
        videoFile: null,
      },
      {
        title: 'Sculpt a Clay Pumpkin',
        instructions:
          "Mold an air-dry clay pumpkin with a few overlapping sections and a stem on top — place thinner pieces underneath thicker ones for a 3D layered look. Let it dry, then glue it into the center of your patterned paper with hot glue.",
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Paint the Pumpkin',
        instructions:
          "Paint the pumpkin a bright color like yellow, pink, or blue (it doesn't need to look realistic — Kusama's pumpkins never do), and mix a dark green for the stem. Add a second coat if any clay still shows through.",
        videoId: null,
        videoFile: null,
      },
      {
        title: "Add Kusama's Polka Dots",
        instructions:
          "Once the paint is fully dry, dip the back of a paintbrush in black paint (its round handle makes a perfect dot) and cover the pumpkin in dots — bigger dots near the center of each section, smaller ones as you move toward the edges. A Sharpie or the back of a pencil works too.",
        videoId: null,
        videoFile: null,
      },
    ],
  },

  // ---------------------------------------------------------------- Van Gogh
  {
    id: 'van-gogh-starry-night',
    title: "Van Gogh's Starry Night",
    type: 'history',
    artist: 'Vincent van Gogh',
    era: 'Post-Impressionism',
    difficulty: 2,
    premium: false,
    videoId: '3kNVpAWIBsk',
    description:
      "Swirl through the night sky of Van Gogh's most famous painting and learn what inspired it.",
    funFact:
      'Van Gogh painted The Starry Night from memory while staying at a mental health hospital in France, looking out his window before sunrise.',
  },
  {
    id: 'van-gogh-chair',
    title: "Van Gogh's Chair",
    type: 'history',
    artist: 'Vincent van Gogh',
    era: 'Post-Impressionism',
    difficulty: 2,
    premium: false,
    videoId: 'AqGAYvhST00',
    description:
      'A humble wooden chair becomes a masterpiece — see how Van Gogh found beauty in everyday objects.',
    funFact:
      'Van Gogh painted his own simple chair and a fancier chair belonging to his friend Paul Gauguin as a kind of painted conversation between the two artists.',
  },

  // ---------------------------------------------------------------- Rembrandt
  {
    id: 'rembrandt-house-museum',
    title: 'The Rembrandt House Museum',
    type: 'history',
    artist: 'Rembrandt van Rijn',
    era: 'Dutch Golden Age (Baroque)',
    difficulty: 3,
    premium: true,
    videoId: 'ryTsLBbRI0Y',
    description:
      "Take an extensive, deep-dive tour through Rembrandt's real house and studio in Amsterdam.",
    funFact:
      "Rembrandt's actual house in Amsterdam has been rebuilt to look exactly as it did in the 1600s, including his real paint-grinding tools.",
  },

  // ---------------------------------------------------------------- Street Art / Valparaíso
  {
    id: 'valparaiso-muralism',
    title: 'Valparaíso — Graffiti and Muralism',
    type: 'history',
    artist: 'Street Artists of Valparaíso',
    era: 'Street Art & Muralism',
    difficulty: 2,
    premium: false,
    videoId: 'HB5jfxw8m74',
    description:
      "Explore the hillside city of Valparaíso, Chile, where entire streets are covered in vibrant murals.",
    funFact:
      "Valparaíso's street art became so celebrated that the whole hillside historic quarter was named a UNESCO World Heritage Site.",
  },

  // ---------------------------------------------------------------- Roy Lichtenstein
  {
    id: 'lichtenstein-comic',
    title: 'Roy Lichtenstein — Comic Style',
    type: 'history',
    artist: 'Roy Lichtenstein',
    era: 'Pop Art',
    difficulty: 2,
    premium: false,
    videoId: 'CDrU68HyBlk',
    description:
      "Discover how Roy Lichtenstein turned comic-book panels and dots into gallery-worthy pop art.",
    funFact:
      "Lichtenstein painted his famous dots by hand using a metal stencil — a technique that mimics the mass-printed Ben-Day dots found in comic books.",
  },
  {
    id: 'lichtenstein-activity',
    title: 'Roy Lichtenstein — Pop Art Activity',
    type: 'tutorial',
    artist: 'Roy Lichtenstein',
    era: 'Pop Art',
    difficulty: 3,
    premium: false,
    videoId: 'i37bQul_U4M',
    videoFile: null,
    duration: '7:25',
    description:
      'Turn a single comic-book word into a bold pop art piece with 3D lettering, a sectioned background, and Ben-Day dots.',
    materials: ['Markers', 'Paper', 'Pencil and eraser', 'A black Sharpie'],
    steps: [
      {
        title: 'Write a Bold Comic Word',
        instructions:
          'Write a word of your choice in thick "bubble" letters in the center of your page — something short and punchy, like "BANG" or "POW."',
        videoId: 'i37bQul_U4M',
        videoFile: null,
      },
      {
        title: 'Add Spikes, a Cloud, and Extra Shapes',
        instructions:
          "Draw spikes shooting out from your letters in a random order, then draw a cloud shape around all of them so the shapes layer on top of each other. Add more shapes that match your word's meaning — the video used stars and lightning bolts for the word \"BANG.\"",
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Make It 3D and Divide the Background',
        instructions:
          'Pick one edge of each letter and draw a thicker outline along it to make the letters look 3D. Then, from the center of the page, draw four diagonal lines out to each corner, and divide each of those four sections again with two more lines — that gives you a comic-panel background.',
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Outline and Color',
        instructions:
          'Outline every single line with a black Sharpie — this bold outlining is a hallmark of pop art. Once it is dry, erase any leftover pencil marks, then color everything using a few bold, high-contrast colors like the primary colors Lichtenstein loved: red, yellow, and blue.',
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Add Ben-Day Dots',
        instructions:
          "Finish with the classic pop-art dot pattern: lightly dot one color across your cloud shape in an even grid, keeping the dots the same size and spacing and going around the spikes. A marker works, or dip the back of a paintbrush in paint for faster, rounder dots.",
        videoId: null,
        videoFile: null,
      },
    ],
  },

  // ---------------------------------------------------------------- Monet
  {
    id: 'monet-sailboats',
    title: "Monet's Sailboats — Impressionism",
    type: 'history',
    artist: 'Claude Monet',
    era: 'Impressionism',
    difficulty: 2,
    premium: false,
    videoId: 'jgWMSQOMPWM',
    description:
      'Watch sailboats shimmer on the water as we explore how Monet captured light with quick brushstrokes.',
    funFact:
      "The word 'Impressionism' actually started as an insult — a critic used it to mock one of Monet's paintings for looking unfinished.",
  },
  {
    id: 'monet-gardens',
    title: "Monet's Impressionism and His Gardens",
    type: 'history',
    artist: 'Claude Monet',
    era: 'Impressionism',
    difficulty: 2,
    premium: false,
    videoId: 'XuW9GN4ymuI',
    description:
      "Stroll through Monet's famous water-lily gardens at Giverny and see what inspired his paintings.",
    funFact:
      "Monet designed and planted his own gardens at Giverny specifically to paint them, and he painted his water lily pond over 250 times.",
  },

  // ---------------------------------------------------------------- Ben Nicholson
  {
    id: 'nicholson-still-life',
    title: "Ben Nicholson's Abstract Still Life",
    type: 'history',
    artist: 'Ben Nicholson',
    era: 'Abstract Modernism',
    difficulty: 3,
    premium: false,
    videoId: '9GJZByYygB8',
    description:
      'See how Ben Nicholson broke everyday objects into simple shapes and lines.',
    funFact:
      'Ben Nicholson often carved into his painted panels as well as painting them, blurring the line between painting and sculpture.',
  },

  // ---------------------------------------------------------------- Modigliani
  {
    id: 'modigliani-portraits',
    title: 'Amedeo Modigliani — Portraits With Long Necks & Soulful Eyes',
    type: 'history',
    artist: 'Amedeo Modigliani',
    era: 'Modernism',
    difficulty: 2,
    premium: false,
    videoId: 'eMqgy8ipqd4',
    description:
      "Meet the elegant, elongated portraits of Amedeo Modigliani and his distinct, dreamy style.",
    funFact:
      "Modigliani was inspired by African and ancient sculpture, which is part of why his painted faces look mask-like and elongated.",
  },
  {
    id: 'modigliani-self-portrait',
    title: 'Amedeo Modigliani — Self-Portrait Activity',
    type: 'tutorial',
    artist: 'Amedeo Modigliani',
    era: 'Modernism',
    difficulty: 3,
    premium: false,
    videoId: 'Nv0Ddo0k-3k',
    videoFile: null,
    duration: '11:42',
    description:
      'Paint your own stylized self-portrait with the long, graceful lines and muted colors Modigliani loved.',
    materials: [
      'Pencil and eraser',
      'Paintbrushes',
      'Water',
      'Acrylic paints',
      'A piece of watercolor paper',
    ],
    steps: [
      {
        title: 'Sketch an Elongated Face and Neck',
        instructions:
          "In pencil, sketch a face that's a little longer and narrower than usual, sitting on a long neck — Modigliani's faces are famous for this stretched, almond shape. Use a mirror or a photo of yourself as reference, and don't worry about redoing parts you don't like; that's exactly why we sketch in pencil first.",
        videoId: 'Nv0Ddo0k-3k',
        videoFile: null,
      },
      {
        title: 'Paint the Hair and Skin',
        instructions:
          "Water down your acrylic paint so it behaves like watercolor. Paint the hair with a base brown, then mix a darker brown for shadow areas, brushing in the direction hair naturally grows. For the skin, paint a base tone over the whole head and neck, then mix a darker shadow color for under the chin, around the nose, and along the sides of the face — use lots of water so the shadow blends in softly.",
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Add Small Facial Details',
        instructions:
          "Paint small, almond-shaped eyes — Modigliani usually left out pupils and irises entirely, giving his portraits a dreamy, faraway look. You can add a touch of light color like pale blue in the center if you want. Use a smaller brush and a light hand for the lips and any final eyebrow details.",
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Paint a Two-Tone Background',
        instructions:
          "Modigliani's portraits often have a background split into two colors. Paint one heavily watered-down color around most of the background, then a second color (try a muted yellow ochre) on the rest. Finish by wetting a brush and gently blending the seam between the two colors so it isn't too sharp.",
        videoId: null,
        videoFile: null,
      },
    ],
  },

  // ---------------------------------------------------------------- Otani
  {
    id: 'otani-monster-workshop',
    title: "Otani's Monster Workshop",
    type: 'tutorial',
    artist: 'Otani',
    era: 'Contemporary Art',
    difficulty: 2,
    premium: false,
    videoId: 'jLzpsJSHfbk',
    videoFile: null,
    // Video confirmed on the channel, but its transcript hasn't been pulled
    // yet, so `materials` / `steps` are left out rather than guessed.
    description:
      'Design your own friendly monster character in this playful, imagination-first workshop.',
  },

  // ---------------------------------------------------------------- Arcimboldo
  {
    id: 'arcimboldo-faces',
    title: 'Giuseppe Arcimboldo — Fruits and Flowers as Faces',
    type: 'history',
    artist: 'Giuseppe Arcimboldo',
    era: 'Mannerism (Renaissance)',
    difficulty: 2,
    premium: false,
    videoId: 'U3bUXXyRU-k',
    description:
      'Meet the Renaissance painter who built portraits entirely out of fruits, vegetables, and flowers.',
    funFact:
      'Arcimboldo worked as a court painter in the 1500s, and his fruit-and-vegetable portraits were actually meant as clever, respectful compliments to nobles.',
  },

  // ---------------------------------------------------------------- Dubuffet
  {
    id: 'dubuffet-scribbles',
    title: 'Jean Dubuffet — Master of the Scribbles',
    type: 'history',
    artist: 'Jean Dubuffet',
    era: 'Art Brut',
    difficulty: 2,
    premium: false,
    videoId: 'pq2-u95lvU0',
    description:
      "Discover Jean Dubuffet's raw, scribbly, childlike style and why he celebrated 'outsider art.'",
    funFact:
      "Dubuffet coined the term 'Art Brut' (raw art) to celebrate art made outside the traditional art world — including art made by children.",
  },
  {
    id: 'dubuffet-portrait',
    title: 'Jean Dubuffet — Self Portrait Activity',
    type: 'tutorial',
    artist: 'Jean Dubuffet',
    era: 'Art Brut',
    difficulty: 2,
    premium: false,
    videoId: 'MOJIMh-GFL8',
    videoFile: null,
    duration: '6:59',
    description:
      'Sketch a loose, abstract self-portrait using organic shapes and shadow "patches," Dubuffet-style.',
    materials: ['Paper', 'Pencil', 'Blue, red, and black markers (or other high-contrast colors)'],
    steps: [
      {
        title: 'Sketch Your Face with Organic Shapes',
        instructions:
          'Sketch the outline of your face and hair using loose, flowing "organic" shapes — the kind you would naturally see, not perfectly geometric ones. Dubuffet called this raw, unrefined style "Art Brut."',
        videoId: 'MOJIMh-GFL8',
        videoFile: null,
      },
      {
        title: 'Add Features and Shadow Patches',
        instructions:
          "Draw in your eyes, nose, and mouth, then add hair using flowy, abstract lines. Add small scribbled \"patches\" in spots where shadow would naturally fall — underneath the eyebrows and around the nose — which is a Dubuffet signature.",
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Color with High-Contrast Markers',
        instructions:
          'Color everything in using bold, high-contrast markers — blue, red, and black work well, but any strongly contrasting colors will do.',
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Outline Everything in Black',
        instructions:
          'Finish by taking a black marker and outlining all of your lines so every shape stands out clearly.',
        videoId: null,
        videoFile: null,
      },
    ],
  },

  // ---------------------------------------------------------------- Munch
  {
    id: 'munch-scream',
    title: "Munch's Scream",
    type: 'history',
    artist: 'Edvard Munch',
    era: 'Expressionism',
    difficulty: 2,
    premium: false,
    videoId: 'SVGcTxX84cM',
    duration: '7:32',
    description:
      "Uncover the story behind Edvard Munch's swirling, emotional masterpiece, The Scream.",
    funFact:
      'Edvard Munch made several versions of The Scream, and said he painted it after feeling a sudden "great scream" pass through nature during a walk.',
  },

  // ---------------------------------------------------------------- Paul Klee
  {
    id: 'klee-dancing-figures',
    title: 'Paul Klee — Dancing Little Figures',
    type: 'history',
    artist: 'Paul Klee',
    era: 'Bauhaus & Abstract Art',
    difficulty: 2,
    premium: false,
    videoId: 'PEZJStfluvg',
    duration: '7:50',
    description:
      "Watch Paul Klee's playful stick-figures dance across the canvas in this Bauhaus favorite.",
    funFact:
      'Paul Klee taught at the Bauhaus, a famous German art school, where he believed a single line could "take a walk" across the page.',
  },
  {
    id: 'klee-chorus-of-colors',
    title: 'A Grand Chorus of Colors and Lines',
    type: 'tutorial',
    artist: 'Paul Klee',
    era: 'Bauhaus & Abstract Art',
    difficulty: 3,
    premium: false,
    videoId: 'Dc1IfqpqBNs',
    videoFile: null,
    // Video confirmed on the channel, but its transcript hasn't been pulled
    // yet, so `materials` / `steps` are left out rather than guessed.
    description:
      'Build your own abstract composition of colorful shapes and lines, Klee-style.',
  },

  // ---------------------------------------------------------------- Henri Rousseau
  {
    id: 'henri-magical-jungle',
    title: "Henri's Magical Jungle",
    type: 'history',
    artist: 'Henri Rousseau',
    era: 'Post-Impressionism (Naive Art)',
    difficulty: 2,
    premium: false,
    videoId: 'XoNKY0jMdCY',
    duration: '4:12',
    description:
      "Wander into Henri Rousseau's lush, dreamlike jungle paintings full of hidden animals.",
    funFact:
      'Henri Rousseau never actually left France or saw a real jungle — he painted his lush jungle scenes after visiting botanical gardens and zoos.',
  },

  // ---------------------------------------------------------------- Seurat
  {
    id: 'seurat-pointillism-science',
    title: 'Georges Seurat — Pointillism and Painting with Science',
    type: 'history',
    artist: 'Georges Seurat',
    era: 'Pointillism (Neo-Impressionism)',
    difficulty: 3,
    premium: true,
    videoId: 'xq64kn8nYPc',
    duration: '10:33',
    description:
      'An extensive look at how Georges Seurat used thousands of tiny dots — and color science — to paint.',
    funFact:
      "Seurat's largest pointillist painting is made of over 3 million tiny painted dots and took him more than two years to complete.",
  },
  {
    id: 'seurat-landscape-activity',
    title: 'Georges Seurat — Pointillist Landscape Activity',
    type: 'tutorial',
    artist: 'Georges Seurat',
    era: 'Pointillism (Neo-Impressionism)',
    difficulty: 3,
    premium: false,
    videoId: 'JiwrDv97P-o',
    videoFile: null,
    duration: '11:54',
    description:
      'Dot by dot, paint your own pointillist landscape inspired by Georges Seurat.',
    materials: [
      'Acrylic paint',
      'Paper',
      'A palette',
      'A paintbrush',
      'Pencil and water',
    ],
    steps: [
      {
        title: 'Sketch a Simple Landscape',
        instructions:
          "Lightly sketch a simple outdoor scene in pencil — Seurat painted riversides a lot, so try a boat on the water with some trees, but any landscape works. Keep it simple: since the dot technique does most of the work, a detailed sketch isn't needed.",
        videoId: 'JiwrDv97P-o',
        videoFile: null,
      },
      {
        title: 'Paint a Light Base Layer',
        instructions:
          "Paint a thin, watered-down base color under everything that will get dots later — green for grass and trees, light blue for water, yellow for the sandy areas, brown for tree trunks and boats. Keep this base lighter than you think you'll need, so your dots have room to add darker dimension on top.",
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Mix a Darker and a Lighter Shade',
        instructions:
          'For each base color, mix one darker version and one lighter version. Adding both — not just one — is what gives the painting shadow, highlight, and dimension instead of looking flat.',
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Dot, Dot, Dot',
        instructions:
          "Now the fun part: dot your darker and lighter shades all over each area instead of blending them. Try two techniques — the rounded back of a paintbrush gives neat, uniform dots, while using just the tip of the brush gives messier, more impressionist-looking dots. Scatter the dots randomly rather than in an even pattern, and don't be afraid to add a few bright, unexpected accent colors (like pink or neon orange) for extra pop.",
        videoId: null,
        videoFile: null,
      },
    ],
  },

  // ---------------------------------------------------------------- NYC New Museum
  {
    id: 'nyc-new-museum',
    title: "Inside NYC's New Museum: Contemporary Art That Will Blow Your Mind",
    type: 'history',
    artist: 'Various Contemporary Artists',
    era: 'Contemporary Art',
    difficulty: 2,
    premium: true,
    videoId: 'AVUrxDwafmE',
    duration: '9:34',
    description:
      "An extensive tour inside New York City's New Museum, packed with bold contemporary art.",
    funFact:
      "New York's New Museum is dedicated entirely to contemporary art — it only shows work made by living artists.",
  },

  // ---------------------------------------------------------------- Hundertwasser
  {
    id: 'hundertwasser-dream-homes',
    title: 'Friedensreich Hundertwasser — Dream Homes',
    type: 'history',
    artist: 'Friedensreich Hundertwasser',
    era: 'Contemporary Architecture & Art',
    difficulty: 2,
    premium: false,
    videoId: 'VqBPWwV7XM0',
    duration: '8:40',
    description:
      "Explore Hundertwasser's wavy, colorful buildings that look like they popped out of a fairy tale.",
    funFact:
      'Hundertwasser believed straight lines were "godless" and designed his buildings with almost no straight walls or floors.',
  },

  // ---------------------------------------------------------------- Huang Yongyu
  {
    id: 'huang-yongyu-lotus',
    title: 'Huang Yongyu — Wild Lotus Painter',
    type: 'history',
    artist: 'Huang Yongyu',
    era: 'Chinese Contemporary Ink Painting',
    difficulty: 3,
    premium: false,
    videoId: 'hqb0RYV0jpQ',
    description:
      "Meet Huang Yongyu, celebrated for his free-spirited ink paintings of lotus flowers.",
    funFact:
      'Huang Yongyu was almost entirely self-taught and continued painting well into his 90s.',
  },

  // ---------------------------------------------------------------- Murakami
  {
    id: 'murakami-sunflowers',
    title: 'Takashi Murakami — Healing Sunflowers',
    type: 'history',
    artist: 'Takashi Murakami',
    era: 'Contemporary Art (Superflat)',
    difficulty: 2,
    premium: false,
    videoId: 'YIbWfdXgsaU',
    description:
      "Discover Takashi Murakami's smiling flowers and colorful 'Superflat' art style from Japan.",
    funFact:
      "Murakami named his art style 'Superflat' because it blends fine art with the flat, graphic look of Japanese anime and manga.",
  },
  {
    id: 'murakami-cartoon-portrait',
    title: 'Takashi Murakami — Cartoon Portrait Activity',
    type: 'tutorial',
    artist: 'Takashi Murakami',
    era: 'Contemporary Art (Superflat)',
    difficulty: 3,
    premium: false,
    videoId: 'z3qqozRSfM4',
    videoFile: null,
    duration: '8:44',
    description:
      "Draw your favorite cartoon character surrounded by Murakami's iconic smiling flowers.",
    materials: ['Paper', 'Markers', 'A compass (or anything round to trace)', 'A Sharpie and pencil'],
    steps: [
      {
        title: 'Draw a Big Circle and Your Cartoon Character',
        instructions:
          "Draw a large circle that fills most of your page. Inside it, draw your favorite cartoon character as big as you can (a reference photo helps a lot) — or try a cartoon-style self-portrait instead. Murakami loved blending fine art with pop culture and anime-style characters, so either works.",
        videoId: 'z3qqozRSfM4',
        videoFile: null,
      },
      {
        title: 'Outline Your Character',
        instructions:
          "Trace your character in Sharpie. If your character is black and white, you can leave it that way; if it's colorful, feel free to color it in fully before moving on to the background.",
        videoId: null,
        videoFile: null,
      },
      {
        title: "Draw Murakami's Smiling Flowers",
        instructions:
          'Around your circle, draw smaller circles for flowers. For each one, divide the outline into 12 sections (draw lines out from the top, bottom, left, and right, then one more line splitting each of those gaps), then connect each section with a rounded arc to make petals. Add a huge smile and two eyes in the center — this is one of Murakami\'s most recognizable motifs.',
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Fill the Background with Flowers',
        instructions:
          'Repeat flowers of different sizes all over the background until it feels full — overlap some of them, and let others get cut off at the edge of the page for a sense that the pattern keeps going. Smaller flowers can skip the face if there is not enough room to keep it clear.',
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Color Your Flowers',
        instructions:
          "Outline everything in black marker. Then color your flowers using a few different Murakami-style patterns: a rainbow (one color per petal), alternating colors petal by petal, or one solid color for the whole flower — mixing all three styles across your background looks great.",
        videoId: null,
        videoFile: null,
      },
    ],
  },

  // ---------------------------------------------------------------- Dali
  {
    id: 'dali-crazy-surrealism',
    title: 'Salvador Dalí — Crazy Surrealism',
    type: 'history',
    artist: 'Salvador Dalí',
    era: 'Surrealism',
    difficulty: 3,
    premium: true,
    videoId: 'o9G4alVU628',
    duration: '11:54',
    description:
      "An extensive dive into Salvador Dalí's melting clocks and bizarre dreamscapes.",
    funFact:
      "Dalí said his melting clocks in The Persistence of Memory were inspired by watching a wheel of Camembert cheese melt in the sun.",
  },

  // ---------------------------------------------------------------- Da Vinci
  {
    id: 'mona-lisa-secrets',
    title: 'The Secrets of Mona Lisa by Da Vinci',
    type: 'history',
    artist: 'Leonardo da Vinci',
    era: 'Renaissance',
    difficulty: 2,
    premium: false,
    videoId: 'TPVvS4ICOSg',
    duration: '6:42',
    description:
      "Uncover the mysteries behind the world's most famous smile in Leonardo da Vinci's Mona Lisa.",
    funFact:
      'Leonardo da Vinci worked on the Mona Lisa for years and reportedly kept it with him until he died — it never actually went to the person who supposedly commissioned it.',
  },

  // ---------------------------------------------------------------- Geography of Art series (premium)
  {
    id: 'geography-of-art-ep1-florence',
    title: 'The Geography of Art Ep. 1 — Florence and the Renaissance',
    type: 'history',
    artist: 'Various Renaissance Masters',
    era: 'Renaissance',
    difficulty: 3,
    premium: true,
    videoId: 'IVG065hJQ-c',
    duration: '10:14',
    description:
      'An extensive journey through Florence, the birthplace of the Renaissance.',
    funFact:
      'Florence became the birthplace of the Renaissance partly because one wealthy family, the Medici, funded so many artists directly.',
  },
  {
    id: 'geography-of-art-ep2-venice-1',
    title: 'The Geography of Art Ep. 2 — The Venetian Renaissance, Pt. 1',
    type: 'history',
    artist: 'Various Renaissance Masters',
    era: 'Renaissance',
    difficulty: 3,
    premium: true,
    videoId: 'BY1dIs4tTJo',
    duration: '8:21',
    description:
      'Part one of an extensive look at Venice and the artists who made it a Renaissance jewel.',
    funFact:
      "Venice's location as a trading port meant Venetian painters had access to rare, expensive pigments other Renaissance cities didn't.",
  },
  {
    id: 'geography-of-art-ep2-venice-2',
    title: 'The Geography of Art Ep. 2 — The Venetian Renaissance, Pt. 2',
    type: 'history',
    artist: 'Various Renaissance Masters',
    era: 'Renaissance',
    difficulty: 3,
    premium: true,
    videoId: 'xMzmHsztxNo',
    duration: '10:47',
    description:
      'Part two of the extensive Venetian Renaissance deep dive.',
    funFact:
      'Venetian Renaissance painters were among the first to fully embrace oil paint, which let them build up rich, glowing layers of color.',
  },

  // ---------------------------------------------------------------- Cezanne
  {
    id: 'cezanne-apples',
    title: "Tracing Cézanne's Brush with Apples",
    type: 'history',
    artist: 'Paul Cézanne',
    era: 'Post-Impressionism',
    difficulty: 2,
    premium: false,
    videoId: '6ZWQcmpqoSU',
    description:
      'See how Paul Cézanne turned a simple bowl of apples into the foundation of modern art.',
    funFact:
      "Pablo Picasso and Henri Matisse both called Cézanne 'the father of us all' because his still lifes inspired the birth of Cubism.",
  },

  // ---------------------------------------------------------------- Chinese classical / modern ink
  {
    id: 'thousand-miles-rivers-mountains',
    title: 'A Thousand Miles of Rivers and Mountains',
    type: 'history',
    artist: 'Wang Ximeng',
    era: 'Chinese Classical Painting (Song Dynasty)',
    difficulty: 3,
    premium: true,
    videoId: 'h2aLQGgeh9c',
    description:
      'An extensive look at one of the greatest scroll paintings in Chinese art history.',
    funFact:
      'Wang Ximeng completed this famous 39-foot-long scroll painting when he was still a teenager, working in the Song Dynasty imperial court.',
  },
  {
    id: 'liu-guosong-ink-painting',
    title: 'Father of Chinese Modern Ink Painting — Liu Guosong',
    type: 'history',
    artist: 'Liu Guosong',
    era: 'Chinese Modern Ink Painting',
    difficulty: 3,
    premium: false,
    videoId: 'qFnIy1faZoY',
    duration: '9:00',
    description:
      'Meet Liu Guosong, who reinvented centuries-old Chinese ink painting for the modern world.',
    funFact:
      'Liu Guosong invented his own textured paper, now called "Liu paper," specifically to create the streaky white lines seen throughout his ink paintings.',
  },

  // ---------------------------------------------------------------- Keith Haring
  {
    id: 'haring-graffiti-figures',
    title: "Keith Haring's Graffiti Figures",
    type: 'history',
    artist: 'Keith Haring',
    era: 'Street Art & Pop Art',
    difficulty: 1,
    premium: false,
    videoId: '8292QUz-KGM',
    duration: '8:05',
    description:
      'Meet the bold, dancing figures that made Keith Haring one of the most recognizable street artists ever.',
    funFact:
      'Keith Haring first became known for drawing chalk figures on blank advertising panels in New York City subway stations.',
  },
  {
    id: 'haring-dancing-figures',
    title: 'Keith Haring — Dancing Figures Activity',
    type: 'tutorial',
    artist: 'Keith Haring',
    era: 'Street Art & Pop Art',
    difficulty: 3,
    premium: false,
    videoId: 'Ro-Hi1_YgIM',
    videoFile: null,
    duration: '8:41',
    description:
      'Cut and arrange colorful paper figures into a Keith Haring-style dancing collage.',
    materials: [
      'A few colors of construction or colored paper',
      'Scissors',
      'A glue stick',
      'Pencil and marker',
      'Optional: the free Manikin app (manikin.app) for pose reference',
    ],
    steps: [
      {
        title: 'Glue Down a Background',
        instructions:
          'Glue a sheet or strip of paper down as a simple background — think of it as the "floor" your dancing figures will stand on.',
        videoId: 'Ro-Hi1_YgIM',
        videoFile: null,
      },
      {
        title: 'Sketch Dancing Figures on Colored Paper',
        instructions:
          "On separate sheets of colored paper, sketch simple doll-like figures in dynamic dancing poses. The free Manikin app is a great tool for realistic pose reference, but photos or your imagination work too. Keep the figures simplified and a little exaggerated rather than perfectly proportional — that stylized look is exactly what makes it feel like Keith Haring.",
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Cut Out a Few Figures',
        instructions:
          'Cut out each figure, then repeat the sketch-and-cut process to make several more (try four total), using a different color of paper for each one.',
        videoId: null,
        videoFile: null,
      },
      {
        title: 'Arrange, Glue, and Add Motion Lines',
        instructions:
          'Arrange your figures across the background in a fun composition, then glue them down. Finish with marker: add short motion lines around the figures and any last background details to bring the whole dancing scene to life.',
        videoId: null,
        videoFile: null,
      },
    ],
  },

  // ---------------------------------------------------------------- Vermeer
  {
    id: 'vermeer-master-of-light',
    title: 'Johannes Vermeer — The Master of Light',
    type: 'history',
    artist: 'Johannes Vermeer',
    era: 'Dutch Golden Age (Baroque)',
    difficulty: 3,
    premium: true,
    videoId: 'ug3CkJ8AtgI',
    duration: '7:19',
    description:
      'An extensive study of how Johannes Vermeer painted light so realistically it looks alive.',
    funFact:
      'Only about 34 paintings by Vermeer are known to exist today, making his work some of the rarest in Western art history.',
  },
];

function getLessonById(id) {
  return LESSONS.find((l) => l.id === id);
}

function getUniqueValues(field) {
  return [...new Set(LESSONS.map((l) => l[field]))].sort();
}
