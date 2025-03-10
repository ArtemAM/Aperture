function closeMenu() {
  // Если мобильное меню открыто, закрываем его
  if (document.documentElement.classList.contains('is-lock') && window.mobileMenuTimeline) {
    window.mobileMenuTimeline.reverse(); // Запускаем анимацию закрытия меню
    document.documentElement.classList.remove('is-lock');
  }
}

export default closeMenu