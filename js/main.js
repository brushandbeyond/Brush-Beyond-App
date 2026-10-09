renderHeader(document.getElementById('header'));
renderFooter(document.getElementById('footer'));

addRoute('/', renderHome);
addRoute('/history', (root) => renderExplore(root, { lockType: 'history' }));
addRoute('/tutorials', (root) => renderExplore(root, { lockType: 'tutorial' }));
addRoute('/explore', (root) => renderExplore(root, { lockType: 'all' }));
addRoute('/lesson/:id', renderLessonDetail);
addRoute('/premium', renderPremium);
addRoute('/teachers', renderTeachers);
addRoute('/profile', renderProfile);
addRoute('/celebrate/:count', renderCelebrate);

startRouter();
