import App from './App';

// @ts-ignore
window.addEventListener('load', () => {
    window.game = new App();
    globalThis.__PIXI_APP__ = window.game;
    window.game.init();

    window.addEventListener('resize', () => window.game.appResize());
    window.addEventListener('orientationchange', () => window.game.appResize());
    window.addEventListener('focus', () => window.game.onFocusChange(true));
    window.addEventListener('blur', () => window.game.onFocusChange(false));
});
