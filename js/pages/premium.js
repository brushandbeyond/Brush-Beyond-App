function renderPremium(root) {
  const premiumLessons = LESSONS.filter((l) => l.premium);

  function draw() {
    const active = isPremium();
    root.innerHTML = `
      <section class="page-header page-header--premium">
        <h1>Brush &amp; Beyond Premium</h1>
        <p>
          Unlock our most extensive art history deep-dives, with longer, more complex
          episodes like our multi-part <em>Geography of Art</em> series and
          full museum tours. Every Art Tutorial stays free, always!
        </p>
      </section>

      <div class="premium-status ${active ? 'premium-status--active' : ''}">
        ${
          active
            ? `<p>🎉 Premium is active on this device (demo mode).</p>
               <button type="button" class="btn btn--ghost" id="premium-toggle">Turn off demo Premium</button>`
            : `<p>No payment is wired up yet — this button just simulates Premium locally so you can preview the experience.</p>
               <button type="button" class="btn btn--premium" id="premium-toggle">✨ Try Premium (Demo)</button>`
        }
      </div>

      <h2 class="premium-section-title">Included in Premium</h2>
      ${lessonGridHTML(premiumLessons)}
    `;

    root.querySelector('#premium-toggle').addEventListener('click', () => {
      setPremium(!active);
      draw();
    });
  }

  draw();
}
