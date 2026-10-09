function teacherCardHTML(teacher) {
  const initial = teacher.name.trim().charAt(0).toUpperCase();
  const avatar = teacher.photo
    ? `<img class="teacher-card__photo" src="${teacher.photo}" alt="${teacher.name}" />`
    : `<div class="teacher-card__initial">${initial}</div>`;

  return `
    <div class="teacher-card">
      ${avatar}
      <h3>${teacher.name}</h3>
      <p class="teacher-card__role">${teacher.role}</p>
      <p class="teacher-card__bio">${teacher.bio}</p>
    </div>
  `;
}

function renderTeachers(root) {
  root.innerHTML = `
    <section class="page-header page-header--teachers">
      <h1>👩‍🏫 Our Teachers</h1>
      <p>
        Brush &amp; Beyond is taught by real young artists who love sharing art
        history and hands-on projects with kids everywhere.
      </p>
    </section>

    <div class="teacher-grid">
      ${TEACHERS.map(teacherCardHTML).join('')}
    </div>
  `;
}
